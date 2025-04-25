import { editFeedbackUsingPost } from '@/services/backend/feedbackController';
import { uploadFileUsingPost } from '@/services/backend/fileController';
import { checkImageFile } from '@/utils';
import { ProForm, ProFormInstance, ProFormText, ProFormTextArea } from '@ant-design/pro-components';
import '@umijs/max';
import { Form, message, Modal, Upload } from 'antd';
import { UploadFile, UploadProps } from 'antd/lib/upload/interface';
import React, { useEffect, useRef, useState } from 'react';

interface Props {
  visible: boolean;
  oldData: API.FeedbackVO | undefined;
  onSubmit: (values: API.FeedbackAddRequest) => void;
  onCancel: () => void;
}

/**
 * 修改弹窗
 * @param props
 * @constructor
 */
const UpdateModal: React.FC<Props> = (props) => {
  const { visible, onSubmit, onCancel, oldData } = props;
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  useEffect(() => {
    if (oldData?.imageList) {
      const defaultList = oldData.imageList.map((url, index) => {
        console.log(url, index);

       return {
          uid: `${index}`,
          name: `图片-${index+1}`,
          status: 'done' as const,
          url,
          thumbUrl: url,
        }
      });
      console.log(defaultList);

      setFileList(defaultList); // ✅ 初始化受控值
    }
  }, [oldData]);
  /**
   * 修改节点
   * @param fields
   */
  const handleUpdate = async (fields: API.FeedbackEditRequest) => {
    const hide = message.loading('正在修改');
    try {
      await editFeedbackUsingPost(fields);
      hide();
      message.success('操作成功');
      return true;
    } catch (error: any) {
      hide();
      message.error('操作失败，' + error.message);
      return false;
    }
  };

  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState('');
  const [previewTitle, setPreviewTitle] = useState('');
  const formRef = useRef<ProFormInstance>();


  const handlePreview = async (file: UploadFile) => {
    setPreviewImage(file.url || (file.response?.data as string));
    setPreviewTitle(file.name || '');
    setPreviewOpen(true);
  };

  const handleCancel = () => setPreviewOpen(false);



  const customRequest: UploadProps['customRequest'] = async ({ file, onSuccess, onError }) => {
    try {
      const result = await uploadFileUsingPost({ biz: 'feedback' }, {}, file as File);
      (file as any).url = result.data; // 让上传组件能预览
      onSuccess?.(result, file);
    } catch (err) {
      message.error('上传失败');
      onError?.(err as any);
    }
  };


  if (!oldData) {
    return <></>;
  }

  return (
    <Modal
      maskClosable={false}
      destroyOnClose
      title={'修改'}
      open={visible}
      footer={null}
      onCancel={() => {
        onCancel?.();
      }}
    >
      <ProForm
        formRef={formRef}
        initialValues={oldData}
        onFinish={async (values) => {
          console.log('表单提交数据：', values);
          const success = await handleUpdate({...values, id: oldData.id});
          if (success) {
            onSubmit?.(values);
          }
        }}
      >
        <ProFormText name="title" label="标题" />
        <ProFormTextArea name="content" label="详情" />

        <Form.Item
          label="图片"
          name="imageList"
        >
          <Upload
            listType="picture-card"
            accept="image/*"
            multiple
            customRequest={customRequest}
            onPreview={handlePreview}
            fileList={fileList}
            beforeUpload={(file) => checkImageFile(file)}
            onChange={({ fileList }) => {
              setFileList(fileList);
              const urls = fileList
                .filter((file: any) => file.status === 'done' && (file.url || file.response?.data))
                .map((file: any) => file.url || file.response?.data);
              formRef.current?.setFieldValue('imageList', urls);
            }}
          >
            上传
          </Upload>
        </Form.Item>
      </ProForm>
      <Modal open={previewOpen} title={previewTitle} footer={null} onCancel={handleCancel}>
        <img alt="example" style={{ width: '100%' }} src={previewImage} />
      </Modal>
    </Modal>
  );
};
export default UpdateModal;
