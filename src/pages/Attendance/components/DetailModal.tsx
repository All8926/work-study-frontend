

import {  Descriptions, DescriptionsProps, Modal } from 'antd';
import React from 'react';

interface Props {
  oldData?: API.AttendanceVO;
  visible: boolean;
  onCancel: () => void;
  onSubmit: () => void;
}

/**
 * 详情弹窗
 * @param props
 * @constructor
 */
const DetailModal: React.FC<Props> = (props) => {
  const {oldData, visible, onCancel,  } = props;

  // 状态映射表
  const statusMap: { [key: number]: string } = {
    0: '正常',
    1: '迟到',
    2: '早退',
    3: '旷工',
    4: '请假',
    99: '未知',
  };

  const items: DescriptionsProps['items'] = [
    {
      key: '2',
      label: '公司名称',
      children: oldData?.enterprise?.nickName || '无',
    },
    {
      key: '8',
      label: '考勤用户',
      children: oldData?.user?.userName || '无',
    },
    {
      key: '9',
      label: '考勤日期',
      children: oldData?.attendanceDate,
    },
    {
      key: '13',
      label: '考勤状态',
      children: statusMap[oldData?.status ?? 99],
    },
    {
      key: '10',
      label: '上班打卡时间',
      children: oldData?.checkInTime || '无',
    },
    {
      key: '11',
      label: '下班打卡时间',
      children: oldData?.checkOutTime || '无',
    },
    {
      key: '12',
      label: '工作时长',
      children: oldData?.workDuration || '无',
    },

    {
      key: '4',
      label: '创建时间',
      children: oldData?.createTime,
    },
  ];




  if (!oldData) {
    return <></>;
  }

  return (
    <>
      <Modal
        width={'40%'}
        destroyOnClose
        title={'详情'}
        open={visible}
        footer={null}
        onCancel={() => {
          onCancel?.();
        }}
      >
        <>
          <Descriptions style={{whiteSpace: 'pre-wrap'}} column={2} title={''} items={items}/>
        </>
      </Modal>
    </>
  );
};
export default DetailModal;
