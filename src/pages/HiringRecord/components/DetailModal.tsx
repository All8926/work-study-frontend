

import {Button, Descriptions, DescriptionsProps, Modal } from 'antd';
import React from 'react';
import {Access, useAccess} from 'umi';

interface Props {
  oldData?: API.HiringRecordVO;
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
  const {oldData, visible, onCancel, onSubmit} = props;
  const access = useAccess();

  // 状态映射表
  const statusMap: { [key: number]: string } = {
    0: '在职',
    1: '已离职',
    2: '未知',
  };

  const items: DescriptionsProps['items'] = [
    {
      key: '1',
      label: '岗位名称',
      children: oldData?.jobPost?.title || '无',
    },
    {
      key: '2',
      label: '公司名称',
      children: oldData?.enterprise?.nickName || '无',
    },
    {
      key: '6',
      label: '招聘人姓名',
      children: oldData?.enterprise?.userName || '无',
    },
    {
      key: '7',
      label: '招聘人手机号',
      children: oldData?.enterprise?.userPhone || '无',
    },
    {
      key: '8',
      label: '入职用户姓名',
      children: oldData?.user?.userName || '无',
    },
    {
      key: '9',
      label: '入职用户手机号',
      children: oldData?.user?.userPhone || '无',
    },
    {
      key: '10',
      label: '入职时间',
      children: oldData?.hireDate,
    },
    {
      key: '11',
      label: '离职时间',
      children: oldData?.leaveDate || '暂无',
    },
    {
      key: '3',
      label: '当前状态',
      children: statusMap[oldData?.status ?? 2],
    },
    {
      key: '4',
      label: '创建时间',
      children: oldData?.createTime,
    },
    {
      key: '5',
      label: '备注',
      children: oldData?.remark || '无',
      span:2,
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
          <Descriptions style={{marginTop: '15px'}} column={2}>
            <Descriptions.Item label="附件" key={'7'} span={2}>
              {      <>
                {oldData.fileList?.map((item, index) => {
                  return (<Button onClick={() => {window.open(item.url)}} size={'small'} type="link" key={index}>{item.name}</Button>)
                })}
                {
                  oldData.fileList?.length === 0 && <span>无</span>
                }
              </>}
            </Descriptions.Item>

          </Descriptions>
        </>
      </Modal>
    </>
  );
};
export default DetailModal;
