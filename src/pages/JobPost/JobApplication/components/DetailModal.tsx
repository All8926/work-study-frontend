import {auditJobApplicationUsingPost} from '@/services/backend/jobApplicationController';

import {ProForm, ProFormRadio, ProFormTextArea} from '@ant-design/pro-components';

import {Button, Descriptions, DescriptionsProps, message, Modal,  } from 'antd';
import React from 'react';
import {Access, useAccess} from 'umi';

interface Props {
  oldData?: API.JobApplicationVO;
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
    0: '待审核',
    1: '已拒绝',
    2: '待面试',
    3: '面试不通过',
    4: '面试通过',
    5: '未知状态',
  };

  const items: DescriptionsProps['items'] = [
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
      label: '申请人姓名',
      children: oldData?.user?.userName || '无',
    },
    {
      key: '9',
      label: '申请人手机号',
      children: oldData?.user?.userPhone || '无',
    },
    {
      key: '10',
      label: '面试时间',
      children: oldData?.interviewTime,
    },
    {
      key: '3',
      label: '当前状态',
      children: statusMap[oldData?.status ?? 5],
    },
    {
      key: '4',
      label: '申请时间',
      children: oldData?.createTime,
    },
    {
      key: '5',
      label: '备注',
      children: oldData?.remark || '无',
    span:2,
    },
  ];

  /**
   * 审核节点
   * @param fields
   */
  const handleUpdate = async (fields: API.AuditRequest) => {
    const hide = message.loading('正在操作');
    console.log('fields', fields);
    try {
      await auditJobApplicationUsingPost(fields);
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
          <Descriptions style={{whiteSpace: 'pre-wrap'}} column={2} title={oldData.job?.title} items={items}/>
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

            {oldData?.status !== 0 && (
              <Descriptions.Item label="审核说明" key={'8'} span={2}>
                {oldData?.auditExplain || '暂无'}
              </Descriptions.Item>
            )}
          </Descriptions>


          <Access accessible={access.canEnterprise} fallback={null}>
            {oldData.status === 0 && (
              <ProForm
                style={{marginTop: 24}}
                layout="horizontal"
                onFinish={async (values) => {
                  console.log('表单提交数据：', values);
                  const success = await handleUpdate({...values, id: oldData.id});
                  if (success) {
                    onSubmit?.();
                  }
                }}
              >
                <ProFormRadio.Group
                  style={{marginTop: 16}}
                  rules={[{required: true, message: '请选择'}]}
                  name="status"
                  label="审核"
                  options={[
                    {
                      label: '通过',
                      value: 1,
                    },
                    {
                      label: '拒绝',
                      value: 0,
                    },
                  ]}
                />
                <ProFormTextArea name="reason" label="审核说明"/>
              </ProForm>
            )}
            {oldData.status === 2 && (
              <ProForm
                style={{marginTop: 24}}
                layout="horizontal"
                onFinish={async (values) => {
                  console.log('表单提交数据：', values);
                  const success = await handleUpdate({...values, id: oldData.id});
                  if (success) {
                    onSubmit?.();
                  }
                }}
              >
                <ProFormRadio.Group
                  style={{marginTop: 16}}
                  rules={[{required: true, message: '请选择面试结果'}]}
                  name="status"
                  label="面试结果"
                  options={[
                    {
                      label: '通过',
                      value: 1,
                    },
                    {
                      label: '不通过',
                      value: 0,
                    },
                  ]}
                />
                <ProFormTextArea name="reason" label="说明"/>
              </ProForm>
            )}
          </Access>
        </>
      </Modal>
    </>
  );
};
export default DetailModal;
