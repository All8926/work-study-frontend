
import {
  ProColumns,
  ProForm, ProFormDatePicker,
  ProFormDateTimePicker, ProFormDependency,
  ProFormInstance, ProFormSelect, ProFormText, ProTable,
} from '@ant-design/pro-components';
import {
  message,
  Modal,
  Space,
} from 'antd';
import React, {useEffect, useRef, useState} from 'react';

import {addAttendanceUsingPost} from "@/services/backend/attendanceController";
import {getUserListUsingGet} from "@/services/backend/hiringRecordController";

interface Props {
  visible: boolean;
  columns: ProColumns<API.AttendanceVO>[];
  onSubmit: (values: API.AttendanceAddRequest) => void;
  onCancel: () => void;
}


/**
 * 创建弹窗
 * @param props
 * @constructor
 */
const CreateModal: React.FC<Props> = (props) => {
  const {visible, onSubmit, onCancel,columns} = props;

  const [interviewerUser, setInterviewerUser] = useState<API.UserVO[]>([]);


  /**
   * 添加节点
   * @param fields
   */
  const handleAdd = async (fields: API.AttendanceAddRequest) => {
    console.log('表单提交数据：', fields)
    // return
    const hide = message.loading('正在添加');
    try {
      await addAttendanceUsingPost(fields);
      hide();
      message.success('创建成功');
      return true;
    } catch (error: any) {
      hide();
      message.error('创建失败，' + error.message);
      return false;
    }
  };

  // 获取在职人员
  const handleGetInterviewer = async () => {
    try {
      const result = await getUserListUsingGet();
      setInterviewerUser(result.data || [])
    } catch (error: any) {
      message.error('获取失败，' + error.message);
    }
  }

  useEffect(() => {
    handleGetInterviewer()
  }, [])


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
      <ProTable
        form={{
          initialValues: {
            status: 1, // 设置默认状态
          },
        }}
        type="form"
        columns={columns}
        onSubmit={async (values: API.AttendanceUpdateRequest) => {
          const success = await handleAdd({
            ...values,
          });
          if (success) {
            onSubmit?.(values);
          }
        }}
      />

    </Modal>
  );
};
export default CreateModal;
