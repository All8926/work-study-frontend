import { addNoticeUsingPost } from '@/services/backend/noticeController';
import {ProColumns, ProForm, ProFormInstance, ProFormText } from '@ant-design/pro-components';
import '@umijs/max';
import { Form, message, Modal  } from 'antd';
import React, { useRef, useState } from 'react';
import WangEditor from "@/components/WangEditor/index";



interface Props {
  visible: boolean;
  onSubmit: (values: API.NoticeAddRequest) => void;
  onCancel: () => void;
  columns: ProColumns<API.NoticeAddRequest>[];
}

/**
 * 创建弹窗
 * @param props
 * @constructor
 */
const CreateModal: React.FC<Props> = (props) => {
  const { visible, onSubmit, onCancel } = props;

const formRef = useRef<ProFormInstance>();

  const [content, setContent] = useState<string>('');



  /**
   * 添加节点
   * @param fields
   */
  const handleAdd = async (fields: API.NoticeAddRequest) => {
    const hide = message.loading('正在添加');
    try {
      await addNoticeUsingPost(fields);
      hide();
      setContent('')
      message.success('创建成功');
      return true;
    } catch (error: any) {
      hide();
      message.error('创建失败，' + error.message);
      return false;
    }
  };

  return (
    <Modal
      width={'45%'}
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
          console.log('表单提交数据：', values);
          const success = await handleAdd({...values, content});
          if (success) {
            onSubmit?.(values);
          }
        }}
      >
        <ProFormText rules={[{ required: true, message: '标题不能为空' }]} name="title" label="标题" />
        <Form.Item label="详情"   required >
          <WangEditor value={content} onChange={setContent} height={400} />
        </Form.Item>
      </ProForm>
    </Modal>
  );
};
export default CreateModal;
