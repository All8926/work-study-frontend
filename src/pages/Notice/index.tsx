import DetailModal from '@/pages/Notice/components/DetailModal';
import {
  deleteNoticeUsingPost,
  listNoticeVoByPageUsingPost,
  publishNoticeUsingPost,
} from '@/services/backend/noticeController';
import { useModel } from '@@/exports';
import { PlusOutlined } from '@ant-design/icons';
import type { ActionType, ProColumns } from '@ant-design/pro-components';
import { PageContainer, ProTable } from '@ant-design/pro-components';
import { Button, message, Modal, Space, Tag, Typography } from 'antd';
import React, { useRef, useState } from 'react';
import { Access, useAccess } from 'umi';
import CreateModal from './components/CreateModal';
import UpdateModal from './components/UpdateModal';

/**
 * 公告管理页面
 *
 * @constructor
 */
const NoticePage: React.FC = () => {
  // 是否显示新建窗口
  const [createModalVisible, setCreateModalVisible] = useState<boolean>(false);
  // 是否显示更新窗口
  const [updateModalVisible, setUpdateModalVisible] = useState<boolean>(false);
  // 是否显示查看窗口
  const [detailModalVisible, setDetailModalVisible] = useState<boolean>(false);
  const actionRef = useRef<ActionType>();
  // 当前用户点击的数据
  const [currentRow, setCurrentRow] = useState<API.NoticeVO>();

  const access = useAccess();
  /**
   * 删除节点
   *
   * @param row
   */
  const handleDelete = async (row: API.DeleteRequest) => {
    Modal.confirm({
      title: '确认删除?',
      content: `你确定要删除该公告吗?`,
      onOk: async () => {
        const hide = message.loading('正在删除');
        if (!row) return true;
        try {
          await deleteNoticeUsingPost({
            id: row.id as any,
          });
          hide();
          message.success('删除成功');
          actionRef?.current?.reload();
          return true;
        } catch (error: any) {
          hide();
          message.error('删除失败，' + error.message);
          return false;
        }
      },
      onCancel() {
        message.info('取消删除');
      },
    });
  };

  /**
   * 发布/取消发布
   * @param id 公告id
   */
  const handlePublish = async (id: number) => {
    const hide = message.loading('正在操作');
    try {
      await publishNoticeUsingPost(id);
      hide();
      message.success('操作成功');
      actionRef?.current?.reload();
    } catch (error: any) {
      hide();
    }
  };


  /**
   * 表格列配置
   */
  const columns: ProColumns<API.NoticeVO>[] = [
    {
      title: 'id',
      dataIndex: 'id',
      valueType: 'text',
      hideInForm: true,
      hideInSearch: true,
      width: 50,
    },
    {
      title: '标题',
      dataIndex: 'title',
      valueType: 'text',
    },
    {
      title: '创建时间',
      dataIndex: 'createTime',
      valueType: 'dateTime',
      sorter: true,
      hideInSearch: true,
      hideInForm: true,
    },

    {
      title: '状态',
      dataIndex: 'status',
      hideInForm: true,
      valueEnum: {
        0: '未发布',
        1: '已发布',
      },
      render: (_, record) => {
        if (record.status === 0) {
          return <Tag color="warning">未发布</Tag>;
        }
        if (record.status === 1) {
          return <Tag color="success">已发布</Tag>;
        }
        return <Tag color="default">未知</Tag>;
      },
    },

    {
      title: '操作',
      dataIndex: 'option',
      valueType: 'option',
      render: (_, record) => (
        <Space size="middle">
           <Access accessible={access.canAdmin} fallback={null} key="createBtn">
           <Space size="middle">
                <Typography.Link
                  key="update"
                  onClick={() => {
                    setCurrentRow(record);
                    setUpdateModalVisible(true);
                  }}
                >
                  修改
                </Typography.Link>
              <Typography.Link type="danger" onClick={() => handleDelete(record)} key="delete">
                删除
              </Typography.Link>
              <Typography.Link type="warning" onClick={() => handlePublish(record.id || 0)} key="publish">
                {record.status === 0 ? '发布' : '取消发布'}
              </Typography.Link>
              </Space>
          </Access>
          <Typography.Link
            key="detail"
            onClick={() => {
              setCurrentRow(record);
              setDetailModalVisible(true);
            }}
          >
            查看
          </Typography.Link>
        </Space>
      ),
    },
  ];
  return (
    <PageContainer>
      <ProTable<API.NoticeVO>
        headerTitle={'公告列表'}
        actionRef={actionRef}
        rowKey="key"
        search={{
          labelWidth: 120,
        }}
        toolBarRender={() => [
          <Access accessible={access.canAdmin} fallback={null} key="createBtn">
            <Button
              key="create"
              type="primary"
              onClick={() => {
                setCreateModalVisible(true);
              }}
            >
              <PlusOutlined /> 新建
            </Button>
            ,
          </Access>,
        ]}
        request={async (params, sort, filter) => {
          const sortField = Object.keys(sort)?.[0];
          const sortOrder = sort?.[sortField] ?? undefined;

          const { data, code } = await listNoticeVoByPageUsingPost({
            ...params,
            sortField,
            sortOrder,
            ...filter,
          } as API.UserQueryRequest);

          return {
            success: code === 0,
            data: data?.records || [],
            total: Number(data?.total) || 0,
          };
        }}
        columns={columns}
      />
      <CreateModal
        visible={createModalVisible}
        columns={columns}
        onSubmit={() => {
          setCreateModalVisible(false);
          actionRef.current?.reload();
        }}
        onCancel={() => {
          setCreateModalVisible(false);
        }}
      />
      <UpdateModal
        columns={columns}
        visible={updateModalVisible}
        oldData={currentRow}
        onSubmit={() => {
          setUpdateModalVisible(false);
          setCurrentRow(undefined);
          actionRef.current?.reload();
        }}
        onCancel={() => {
          setUpdateModalVisible(false);
        }}
      />
      <DetailModal
        visible={detailModalVisible}
        onCancel={setDetailModalVisible.bind(null, false)}
        oldData={currentRow}
        onSubmit={() => {
          setDetailModalVisible(false);
          setCurrentRow(undefined);
          actionRef.current?.reload();
        }}
      />
    </PageContainer>
  );
};
export default NoticePage;
