
import { uploadFileUsingPost } from '@/services/backend/fileController';
import {checkFile, } from '@/utils';
import {
  ProForm,
  ProFormDateTimePicker,
  ProFormInstance, ProFormSelect,
  ProFormTextArea
} from '@ant-design/pro-components';
import {Button, Form, message, Modal, Typography, Upload} from 'antd';
import { UploadFile, UploadProps } from 'antd/lib/upload/interface';
import React, {useEffect, useRef, useState} from 'react';
import {UploadOutlined} from "@ant-design/icons";
import {getInterviewPassedUserUsingGet} from "@/services/backend/jobApplicationController";

import dayjs from "dayjs";
import {addHiringRecordUsingPost} from "@/services/backend/hiringRecordController";

interface Props {
  visible: boolean;
  onSubmit: (values: API.HiringRecordAddRequest) => void;
  onCancel: () => void;
}

/**
 * 创建弹窗
 * @param props
 * @constructor
 */
const CreateModal: React.FC<Props> = (props) => {
  const { visible, onSubmit, onCancel } = props;

  const [pathList, setPathList] = useState<any[]>([]);
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [interviewerUser, setInterviewerUser] = useState<API.UserVO[]>([]);

  const formRef = useRef<ProFormInstance>();

  /**
   * 添加节点
   * @param fields
   */
  const handleAdd = async (fields: API.HiringRecordAddRequest) => {
    const hide = message.loading('正在添加');
    try {
      await addHiringRecordUsingPost(fields);
      hide();
      setFileList([])
      message.success('创建成功');
      return true;
    } catch (error: any) {
      hide();
      message.error('创建失败，' + error.message);
      return false;
    }
  };

  // 获取面试通过人员
  const handleGetInterviewer = async () => {
    try {
      const result = await getInterviewPassedUserUsingGet();
      setInterviewerUser(result.data || [])
    } catch (error: any) {
      message.error('获取失败，' + error.message);
    }
  }

  useEffect(() => {
    handleGetInterviewer()
  },[])


  const customRequest: UploadProps['customRequest'] = async ({ file, onSuccess, onError }) => {
    try {
      const result = await uploadFileUsingPost({ biz: 'hiring_record' }, {}, file as File);
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
          values.fileList = pathList;
          console.log('表单提交数据：', values);
          const success = await handleAdd(values);
          if (success) {
            onSubmit?.(values);
          }
        }}
      >
        <ProFormSelect label={"入职用户"} name={"userId"}  options={interviewerUser} fieldProps={{fieldNames:{label:'userName',value:'id'}}} rules={[{ required: true, message: '入职用户不能为空' }]} />
        <ProFormDateTimePicker  fieldProps={{disabledDate: (current) => current && current < dayjs().startOf('day')}}
                                name="hireDate" label="入职时间" rules={[{ required: true, message: '入职时间不能为空' }]} />
        <ProFormTextArea name="remark" label="备注" />

        <Form.Item
          label="附件"
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
              // 限制最多上传3个文件
              newFileList = newFileList.slice(-3);
              console.log('fileList:', newFileList);
              setFileList(newFileList);
              const urls = newFileList
                .filter((file) => file.status === 'done' && (file.url || file.response?.data))
                .map((file) => {
                  return {
                    name: file.name,
                    url: file.url || null,
                  }

                });
              setPathList(urls);
            }}

          >
            <Button icon={<UploadOutlined />}>上传</Button>
            <Typography.Link  type={'secondary'} > (只支持上传图片和pdf文件)</Typography.Link >
          </Upload>
        </Form.Item>
      </ProForm>

    </Modal>
  );
};
export default CreateModal;
