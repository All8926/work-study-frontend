import { editJobApplicationUsingPost } from '@/services/backend/jobApplicationController';
import { uploadFileUsingPost } from '@/services/backend/fileController';
import {checkFile,  } from '@/utils';
import {
  ProForm,
  ProFormDateTimePicker,
  ProFormInstance,
  ProFormTextArea
} from '@ant-design/pro-components';

import {Button, Form, message, Modal, Typography, Upload} from 'antd';
import {   UploadProps } from 'antd/lib/upload/interface';
import React, { useEffect, useRef, useState } from 'react';
import dayjs from "dayjs";
import {UploadOutlined} from "@ant-design/icons";

interface Props {
  visible: boolean;
  oldData: API.JobApplicationVO | undefined;
  onSubmit: (values: API.JobApplicationAddRequest) => void;
  onCancel: () => void;
}

/**
 * 修改弹窗
 * @param props
 * @constructor
 */
const UpdateModal: React.FC<Props> = (props) => {
  const { visible, onSubmit, onCancel, oldData } = props;
  const [fileList, setFileList] = useState<any[]>([]);
  useEffect(() => {
    if (oldData?.fileList) {
      const defaultList = oldData.fileList.map((item, index) => {

       return {
          uid: `${index}`,
          name: item.name,
          status: 'done' as const,
          url:item.url,
          thumbUrl: item.url,
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
  const handleUpdate = async (fields: API.JobApplicationEditRequest) => {
    const hide = message.loading('正在修改');
    try {
      await editJobApplicationUsingPost(fields);
      hide();
      message.success('操作成功');
      return true;
    } catch (error: any) {
      hide();
      message.error('操作失败，' + error.message);
      return false;
    }
  };

  const formRef = useRef<ProFormInstance>();

  const customRequest: UploadProps['customRequest'] = async ({ file, onSuccess, onError }) => {
    try {
      const result = await uploadFileUsingPost({ biz: 'job_application' }, {}, file as File);
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
        <ProFormDateTimePicker  fieldProps={{disabledDate: (current) => current && current < dayjs().startOf('day')}}
                                name="interviewTime" label="面试时间" rules={[{ required: true, message: '面试时间不能为空' }]} />

        <Form.Item
          label="图片"
          name="fileList"
        >
          <Upload
            accept="*"
            multiple
            fileList={fileList}
            customRequest={customRequest}
            beforeUpload={(file) => checkFile(file)}
            onChange={(info) => {
              let newFileList = [...info.fileList];
              console.log(newFileList,'newFileList')
              newFileList = newFileList.slice(-3);
              setFileList(newFileList);
              console.log(newFileList,'newFileList')
              const urls = newFileList
                .filter((file) => file.status === 'done' && (file.url || file.response?.data))
                .map((file) => {
                  return {
                    name: file.name,
                    url: file.url || null,
                  }

                });
              formRef.current?.setFieldValue('fileList', urls);
              console.log(urls,'urls')
            }}
          >
            <Button icon={<UploadOutlined />}>上传</Button>
            <Typography.Link  type={'secondary'} > (只支持上传图片和pdf文件)</Typography.Link >
          </Upload>
        </Form.Item>
        <ProFormTextArea name="remark" label="备注" />
      </ProForm>
    </Modal>
  );
};
export default UpdateModal;
