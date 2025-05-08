import {addJobPostUsingPost} from '@/services/backend/jobPostController';
import {ProColumns,   ProTable} from '@ant-design/pro-components';
import '@umijs/max';
import { message, Modal } from 'antd';
import React, { } from 'react';

interface Props {
  visible: boolean;
  columns: ProColumns<API.JobPostVO>[];
  onSubmit: (values: API.JobPostAddRequest) => void;
  onCancel: () => void;
}

/**
 * 创建弹窗
 * @param props
 * @constructor
 */
const CreateModal: React.FC<Props> = (props) => {
  const {visible, onSubmit, onCancel,columns} = props;


  /**
   * 添加节点
   * @param fields
   */
  const handleAdd = async (fields: API.JobPostAddRequest) => {
    const hide = message.loading('正在添加');
    try {
      await addJobPostUsingPost(fields);
      hide();
      message.success('创建成功');
      return true;
    } catch (error: any) {
      hide();
      message.error('创建失败，' + error.message);
      return false;
    }
  };



  return (
    <Modal width={'30%'}
      destroyOnClose
      title={'创建'}
      open={visible}
      footer={null}
      onCancel={() => {
        onCancel?.();
      }}
    >
      <ProTable
        type="form"
        columns={columns}

        onSubmit={async (values: API.JobPostAddRequest) => {
          const success = await handleAdd(values);
          if (success) {
            onSubmit?.(values);
          }
        }}
      />
    </Modal>
  );
};
export default CreateModal;
