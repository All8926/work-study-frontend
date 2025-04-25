import { addFeedbackUsingPost } from '@/services/backend/feedbackController';
import { uploadFileUsingPost } from '@/services/backend/fileController';
import { checkImageFile } from '@/utils';
import { ProForm, ProFormInstance, ProFormText, ProFormTextArea } from '@ant-design/pro-components';
import '@umijs/max';
import { Form, message, Modal, Upload } from 'antd';
import { UploadFile, UploadProps } from 'antd/lib/upload/interface';
import React, { useRef, useState } from 'react';

interface Props {
  visible: boolean;
  onSubmit: (values: API.FeedbackAddRequest) => void;
  onCancel: () => void;
}

/**
 * 创建弹窗
 * @param props
 * @constructor
 */
const CreateModal: React.FC<Props> = (props) => {
  const { visible, onSubmit, onCancel } = props;

  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [imageUrls, setImageUrls] = useState<string[]>([]);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState('');
  const [previewTitle, setPreviewTitle] = useState('');
  const formRef = useRef<ProFormInstance>();

  /**
   * 添加节点
   * @param fields
   */
  const handleAdd = async (fields: API.FeedbackAddRequest) => {
    const hide = message.loading('正在添加');
    try {
      await addFeedbackUsingPost(fields);
      hide();
      setFileList([])
      setImageUrls([]);
      message.success('创建成功');
      return true;
    } catch (error: any) {
      hide();
      message.error('创建失败，' + error.message);
      return false;
    }
  };


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


  return (
    <Modal
      key={'createModal'}
      maskClosable={false}
      destroyOnClose
      title={'创建'}
      open={visible}
      footer={null}
      onCancel={() => {

        onCancel?.();
      }}
    >
      <ProForm
        formRef={formRef}
        onFinish={async (values) => {
          values.imageList = imageUrls;
          console.log('表单提交数据：', values);
          const success = await handleAdd(values);
          if (success) {
            onSubmit?.(values);
          }
        }}
      >
        <ProFormText rules={[{ required: true, message: '标题不能为空' }]} name="title" label="标题" />
        <ProFormTextArea name="content" label="详情" />

        <Form.Item
          label="图片"
          name="imageList"

        >
          <Upload
            listType="picture-card"
            accept="image/*"
            multiple
            fileList={fileList}
            customRequest={customRequest}
            onPreview={handlePreview}
            beforeUpload={(file) => checkImageFile(file)}
            onChange={({ fileList: newFileList }) => {
              console.log('fileList:', newFileList);
              setFileList(newFileList);
              const urls = newFileList
                .filter((file) => file.status === 'done' && (file.url || file.response?.data))
                .map((file) => file.url || file.response?.data);
              setImageUrls(urls);
            }}

          >
            上传
          </Upload>
        </Form.Item>
      </ProForm>
      <Modal
        key={'imageList'}
        open={previewOpen}
        title={previewTitle}
        footer={null}
        onCancel={handleCancel}
      >
        <img alt="example" style={{ width: '100%' }} src={previewImage} />
      </Modal>
    </Modal>
  );
};
export default CreateModal;
