

import {  Descriptions, DescriptionsProps, Modal } from 'antd';
import React from 'react';

interface Props {
  oldData?: API.SalaryVO;
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
  const salaryTypeMap: { [key: string]: string } = {
    'date': '日结',
    'week': '周结',
    'month': '月结',
  };

  const items: DescriptionsProps['items'] = [
    {
      key: '2',
      label: '公司名称',
      children: oldData?.enterprise?.nickName || '无',
    },
    {
      key: '8',
      label: '发放用户',
      children: oldData?.user?.userName || '无',
    },
    {
      key: '9',
      label: '结算类型',
      children: salaryTypeMap[oldData?.salaryType ?? '未知'],
    },
    {
      key: '10',
      label: '结算周期',
      children: oldData?.periodDate,
    },
    {
      key: '11',
      label: '出勤时长',
      children: oldData?.workDuration || '暂无',
    },
    {
      key: '12',
      label: '绩效等级',
      children: oldData?.performance || '暂无',
    },
    {
      key: '13',
      label: '实发工资',
      children: oldData?.salaryAmount || '暂无',
    },
    {
      key: '3',
      label: '当前状态',
      children: oldData?.issueStatus  === 0? '未发放' : oldData?.issueStatus === 1 ? '已发放' : '未知',
    },
    {
      key: '3',
      label: '发放时间',
      children: oldData?.issueTime || '暂无',
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
