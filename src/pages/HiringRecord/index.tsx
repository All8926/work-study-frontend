import type {ActionType, ProColumns} from '@ant-design/pro-components';
import {PageContainer, ProTable} from '@ant-design/pro-components';
import UpdateModal from '@/pages/HiringRecord/components/UpdateModal';

import {
  deleteHiringRecordUsingPost,
  listHiringRecordVoByPageUsingPost
} from '@/services/backend/hiringRecordController';

import {Button, message, Modal, Space, Tag, Typography,} from 'antd';
import React, {useRef, useState} from 'react';
import DetailModal from "@/pages/HiringRecord/components/DetailModal";
import {useModel} from "@umijs/max";
import CreateModal from "@/pages/HiringRecord/components/CreateModal";
import {PlusOutlined} from "@ant-design/icons";

import {Access, useAccess} from 'umi';

/**
 * 录用记录管理页面
 *
 * @constructor
 */
const HiringRecordPage: React.FC = () => {
  // 是否显示新建窗口
  const [createModalVisible, setCreateModalVisible] = useState<boolean>(false);
  // 是否显示更新窗口
  const [updateModalVisible, setUpdateModalVisible] = useState<boolean>(false);
  // 是否显示查看窗口
  const [detailModalVisible, setDetailModalVisible] = useState<boolean>(false);
  const actionRef = useRef<ActionType>();
  // 当前用户点击的数据
  const [currentRow, setCurrentRow] = useState<API.HiringRecordVO>();

  const {initialState} = useModel('@@initialState');
  const access = useAccess();
  /**
   * 删除节点
   *
   * @param row
   */
  const handleDelete = async (row: API.DeleteRequest) => {
    Modal.confirm({
      title: '确认删除?',
      content: `你确定要删除该录用记录吗?`,
      onOk: async () => {
        const hide = message.loading('正在删除');
        if (!row) return true;
        try {
          await deleteHiringRecordUsingPost({
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
   * 表格列配置
   */
  const columns: ProColumns<API.HiringRecordVO>[] = [
    {
      title: 'id',
      dataIndex: 'id',
      valueType: 'text',
      hideInForm: true,
      hideInSearch: true,
      width: 50
    },
    {
      title: '用户姓名',
      dataIndex: ['user', 'userName'],
      valueType: 'text',
      hideInSearch: initialState?.currentUser?.userRole === 'user',
      hideInForm: true,
      hideInTable: initialState?.currentUser?.userRole === 'user',
      search: {
        transform: (value: string) => ({
          userName: value
        }),
      },
    },
    {
      title: '公司名称',
      dataIndex: ['enterprise', 'nickName'],
      valueType: 'text',
      hideInSearch: true,
      hideInForm: true,
      hideInTable: initialState?.currentUser?.userRole === 'enterprise',
    },
    {
      title: '岗位名称',
      dataIndex: ['jobPost', 'title'],
      valueType: 'text',
      hideInSearch: true,
      hideInForm: true,
    },

    {
      title: '入职时间',
      dataIndex: 'hireDate',
      valueType: 'dateTime',
      sorter: true,
      hideInForm: true,
    },
    {
      title: '备注',
      dataIndex: 'remark',
      valueType: 'text',
      ellipsis: true,
    },
    {
      title: '状态',
      dataIndex: 'status',
      hideInForm: true,

      valueEnum: {
        0: '已入职',
        1: '已离职',
      },
      render: (_, record) => {
        if (record.status === 0) {
          return <Tag color="success">已入职</Tag>;
        }
        if (record.status === 1) {
          return <Tag color="error">已离职</Tag>;
        }
        return <Tag color="default">未知</Tag>;
      },
    },

    {
      title: '创建时间',
      dataIndex: 'createTime',
      valueType: 'dateTime',
      hideInSearch: true,
      hideInForm: true,
      sorter: true,
    },

    {
      title: '操作',
      dataIndex: 'option',
      valueType: 'option',
      render: (_, record) => (
        <Space size="middle">
          {initialState?.currentUser?.id === record.enterPriseId && (
            <>
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
            </>
          )}
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
      <ProTable<API.HiringRecordVO>
        headerTitle={'录用记录列表'}
        actionRef={actionRef}
        rowKey="key"
        search={{
          labelWidth: 120,
        }}
        toolBarRender={() => [
          <Access accessible={access.canEnterprise} fallback={null} key="create">
            <Button
              key="create"
              type="primary"
              onClick={() => {
                setCreateModalVisible(true);
              }}
            >
              <PlusOutlined /> 新建
            </Button>,
          </Access>

        ]}
        request={async (params, sort, filter) => {
          const sortField = Object.keys(sort)?.[0];
          const sortOrder = sort?.[sortField] ?? undefined;

          const {data, code} = await listHiringRecordVoByPageUsingPost({
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
        onSubmit={() => {
          setCreateModalVisible(false);
          setCurrentRow(undefined);
          actionRef.current?.reload();
        }}
        onCancel={() => {
          setCreateModalVisible(false);
        }}/>

      <UpdateModal
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
      <DetailModal visible={detailModalVisible} onCancel={setDetailModalVisible.bind(null, false)} oldData={currentRow}
                   onSubmit={() => {
                     setDetailModalVisible(false);
                     setCurrentRow(undefined);
                     actionRef.current?.reload();
                   }}/>
    </PageContainer>
  );
};
export default HiringRecordPage;
