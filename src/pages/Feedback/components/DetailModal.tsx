import { updateFeedbackUsingPost } from '@/services/backend/feedbackController';
import { useAccess } from '@@/exports';
import { ProForm, ProFormRadio, ProFormTextArea } from '@ant-design/pro-components';
import '@umijs/max';
import { Descriptions, DescriptionsProps, Image, message, Modal } from 'antd';
import React from 'react';
import { Access } from 'umi';

interface Props {
  oldData?: API.FeedbackVO;
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
  const { oldData, visible, onCancel, onSubmit } = props;
  const access = useAccess();

  const items: DescriptionsProps['items'] = [
    {
      key: '1',
      label: '意见反馈人',
      children: oldData?.user?.userName,
    },
    {
      key: '2',
      label: '手机号码',
      children: oldData?.user?.userPhone || '无',
    },
    {
      key: '3',
      label: '当前状态',
      children: oldData?.status === 0 ? '待处理' : oldData?.status === 1 ? '已处理' : '不予处理',
    },
    {
      key: '4',
      label: '创建时间',
      children: oldData?.createTime,
    },
    {
      key: '5',
      label: '详情',
      children: oldData?.content,
      span:2
    },
  ];

  /**
   * 修改节点
   * @param fields
   */
  const handleUpdate = async (fields: API.FeedbackUpdateRequest) => {
    const hide = message.loading('正在操作');
    try {
      await updateFeedbackUsingPost(fields);
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
        <Descriptions style={{ whiteSpace: 'pre-wrap' }} column={2} title={oldData.title} items={items} />
        <Descriptions style={{ marginTop: '15px' }} column={2}>

          {oldData?.status !== 0 && (
            <Descriptions.Item label="回复" key={'8'} span={2}>
              {oldData?.responseText || '无'}
            </Descriptions.Item>
          )}
          <Descriptions.Item label="图片" key={'7'} span={2}>
            {oldData?.imageList?.length ? '' : '无'}
          </Descriptions.Item>
        </Descriptions>
        <Image.PreviewGroup
          preview={{
            onChange: (current, prev) =>
              console.log(`current index: ${current}, prev index: ${prev}`),
          }}
        >
          {oldData.imageList &&
            oldData.imageList.map((item) => {
              return (
                <Image
                  key={item}
                  width={200}
                  src={item}
                  placeholder={<Image preview={false} src={item} width={200} />}
                />
              );
            })}
        </Image.PreviewGroup>
        <Access accessible={access.canAdmin} fallback={null}>
          {oldData.status === 0 && (
            <ProForm
              style={{ marginTop: 24 }}
              layout="horizontal"
              onFinish={async (values) => {
                console.log('表单提交数据：', values);
                const success = await handleUpdate({ ...values, id: oldData.id });
                if (success) {
                  onSubmit?.();
                }
              }}
            >
              <ProFormRadio.Group
                style={{ marginTop: 16 }}
                rules={[{ required: true, message: '请选择状态' }]}
                name="status"
                label="状态"
                options={[
                  {
                    label: '已处理',
                    value: 1,
                  },
                  {
                    label: '不予处理',
                    value: 2,
                  },
                ]}
              />
              <ProFormTextArea name="responseText" label="回复" />
            </ProForm>
          )}
        </Access>
      </Modal>
    </>
  );
};
export default DetailModal;
