
import type { ActionType, ProColumns } from '@ant-design/pro-components';
import { PageContainer, ProTable } from '@ant-design/pro-components';
import UpdateModal from '@/pages/JobPost/JobApplication/components/UpdateModal';

import {deleteJobApplicationUsingPost, listJobApplicationVoByPageUsingPost} from '@/services/backend/jobApplicationController';

import {   message, Modal, Space, Tag, Typography,  } from 'antd';
import React, { useRef, useState } from 'react';
import DetailModal from "@/pages/JobPost/JobApplication/components/DetailModal";
import {useModel} from "@umijs/max";

/**
 * 申请记录管理页面
 *
 * @constructor
 */
const JobApplicationPage: React.FC = () => {
  // 是否显示新建窗口
  const [createModalVisible, setCreateModalVisible] = useState<boolean>(false);
  // 是否显示更新窗口
  const [updateModalVisible, setUpdateModalVisible] = useState<boolean>(false);
  // 是否显示查看窗口
  const [detailModalVisible, setDetailModalVisible] = useState<boolean>(false);
  const actionRef = useRef<ActionType>();
  // 当前用户点击的数据
  const [currentRow, setCurrentRow] = useState<API.JobApplicationVO>();

  const { initialState  } = useModel('@@initialState');

  /**
   * 删除节点
   *
   * @param row
   */
  const handleDelete = async (row: API.DeleteRequest) => {
    Modal.confirm({
      title: '确认删除?',
      content: `你确定要删除该申请记录吗?`,
      onOk: async () => {
        const hide = message.loading('正在删除');
        if (!row) return true;
        try {
          await deleteJobApplicationUsingPost({
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
  const columns: ProColumns<API.JobApplicationVO>[] = [
    {
      title: 'id',
      dataIndex: 'id',
      valueType: 'text',
      hideInForm: true,
      hideInSearch: true,
      width: 50
    },
    {
      title: '岗位名称',
      dataIndex: ['job','title'],
      valueType: 'text',
    },
    {
      title: '申请人',
      dataIndex: ['user','userName'],
      valueType: 'text',
      hideInSearch: true,
      hideInForm: true,
    },
    {
      title: '公司名称',
      dataIndex: ['enterprise','nickName'],
      valueType: 'text',
      hideInSearch: true,
      hideInForm: true,
    },
    {
      title: '面试时间',
      dataIndex: 'interviewTime',
      valueType: 'dateTime',
      hideInSearch: true,
      sorter: true,
    },
    {
      title: '状态',
      dataIndex: 'status',
      hideInForm: true,
      valueEnum: {
        0: '待审核',
        1: '已拒绝',
        2: '待面试',
        3: '面试不通过',
        4: '面试通过',
      },
      render: (_, record) => {
        if (record.status === 0) {
          return <Tag color="processing" >待审核</Tag>;
        }
        if (record.status === 1) {
          return <Tag color="error">已拒绝</Tag>;
        }
        if (record.status === 2) {
          return <Tag color="warning">待面试</Tag>;
        }
        if (record.status === 3) {
          return <Tag color="error">面试不通过</Tag>;
        }
        if (record.status === 4) {
          return <Tag color="success">面试通过</Tag>;
        }
        return <Tag color="default">未知</Tag>;
      },
    },

    {
      title: '申请时间',
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
        <Space size="middle"  >
          {initialState?.currentUser?.id === record.userId && (
            <>
              {record.status === 0 && (<Typography.Link
                key="update"
                onClick={() => {
                  setCurrentRow(record);
                  setUpdateModalVisible(true);
                }}
              >
                修改
              </Typography.Link>)}
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
      <ProTable<API.JobApplicationVO>
        headerTitle={'申请记录列表'}
        actionRef={actionRef}
        rowKey="key"
        search={{
          labelWidth: 120,
        }}
        toolBarRender={() => [
          // <Button
          //   key="create"
          //   type="primary"
          //   onClick={() => {
          //     setCreateModalVisible(true);
          //   }}
          // >
          //   <PlusOutlined /> 新建
          // </Button>,
        ]}
        request={async (params, sort, filter) => {
          const sortField = Object.keys(sort)?.[0];
          const sortOrder = sort?.[sortField] ?? undefined;

          const { data, code } = await listJobApplicationVoByPageUsingPost({
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
      <DetailModal visible={detailModalVisible} onCancel={setDetailModalVisible.bind(null, false)} oldData={currentRow} onSubmit={() => {
        setDetailModalVisible(false);
        setCurrentRow(undefined);
        actionRef.current?.reload();
      }} />
    </PageContainer>
  );
};
export default JobApplicationPage;
