import { updateNoticeUsingPost } from '@/services/backend/noticeController';
import { ProColumns, ProForm,  ProFormText } from '@ant-design/pro-components';
import { Form, message, Modal } from 'antd';
import React, { useEffect, useState } from 'react';
import WangEditor from '@/components/WangEditor/index';  // 导入 WangEditor 组件

interface Props {
  visible: boolean;
  oldData: API.NoticeVO | undefined;
  onSubmit: (values: API.NoticeUpdateRequest) => void;
  onCancel: () => void;
  columns: ProColumns<API.NoticeUpdateRequest>[];
}

const UpdateModal: React.FC<Props> = (props) => {
  const { visible, onSubmit, onCancel, oldData } = props;

  const [content, setContent] = useState<string>('');

  useEffect(() => {
    if (oldData?.content) {
      setContent(oldData.content);
    }
  }, [oldData]);

  const handleUpdate = async (fields: API.NoticeUpdateRequest) => {
    const hide = message.loading('正在修改');
    try {
      await updateNoticeUsingPost(fields);
      hide();
      message.success('操作成功');
      return true;
    } catch (error: any) {
      hide();
      message.error('操作失败，' + error.message);
      return false;
    }
  };

  return (
    <Modal
      width={'45%'}
      maskClosable={false}
      destroyOnClose
      title={'修改'}
      open={visible}
      footer={null}
      onCancel={onCancel}
    >
      <ProForm
        initialValues={oldData}
        onFinish={async (values) => {
          const success = await handleUpdate({ ...values, id: oldData?.id, content });
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

export default UpdateModal;
