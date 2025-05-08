import {editSalaryUsingPost} from '@/services/backend/salaryController';
import {
  ProColumns,  ProTable
} from '@ant-design/pro-components';

import {  message, Modal, } from 'antd';
import React, { } from 'react';

interface Props {
  visible: boolean;
  columns: ProColumns<API.SalaryVO>[];
  oldData: API.SalaryVO | undefined;
  onSubmit: (values: API.SalaryAddRequest) => void;
  onCancel: () => void;
}

/**
 * 修改弹窗
 * @param props
 * @constructor
 */
const UpdateModal: React.FC<Props> = (props) => {
  const {visible, onSubmit, onCancel, oldData,columns} = props;


  /**
   * 修改节点
   * @param fields
   */
  const handleUpdate = async (fields: API.SalaryUpdateRequest) => {
    const hide = message.loading('正在修改');
    try {
      await editSalaryUsingPost(fields);
      hide();
      message.success('操作成功');
      return true;
    } catch (error: any) {
      hide();
      message.error('操作失败，' + error.message);
      return false;
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
      <ProTable
        type="form"
        columns={columns}
        form={{
          initialValues: oldData,
        }}
        onSubmit={async (values: API.SalaryUpdateRequest) => {
          const success = await handleUpdate({
            ...values,
            id: oldData.id as any,
          });
          if (success) {
            onSubmit?.(values);
          }
        }}
      />
    </Modal>
  );
};
export default UpdateModal;
