import type {ActionType, ProColumns} from '@ant-design/pro-components';
import {PageContainer, ProTable} from '@ant-design/pro-components';
import CreateModal from './components/CreateModal';
import UpdateModal from './components/UpdateModal';

import DetailModal from '@/pages/JobPost/components/DetailModal';
import {
  deleteJobPostUsingPost,
  listJobPostVoByPageUsingPost, publishJobPostUsingPost,
} from '@/services/backend/jobPostController';
import {useModel} from '@@/exports';
import {PlusOutlined} from '@ant-design/icons';
import {Button, message, Modal, Space, Tag, Typography} from 'antd';
import React, {useRef, useState} from 'react';
import {Access, useAccess} from 'umi';
import dayjs from "dayjs";


/**
 * 岗位管理页面
 *
 * @constructor
 */
const JobPostPage: React.FC = () => {
  // 是否显示新建窗口
  const [createModalVisible, setCreateModalVisible] = useState<boolean>(false);
  // 是否显示更新窗口
  const [updateModalVisible, setUpdateModalVisible] = useState<boolean>(false);
  // 是否显示查看窗口
  const [detailModalVisible, setDetailModalVisible] = useState<boolean>(false);
  const actionRef = useRef<ActionType>();
  // 当前用户点击的数据
  const [currentRow, setCurrentRow] = useState<API.JobPostVO>();

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
      content: `你确定要删除该岗位吗?`,
      onOk: async () => {
        const hide = message.loading('正在删除');
        if (!row) return true;
        try {
          await deleteJobPostUsingPost({
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
   * 发布/下线
   * @param id id
   */
  const handlePublish = async (id: number) => {
    const hide = message.loading('正在操作');
    try {
      await publishJobPostUsingPost(id);
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
  const columns: ProColumns<API.JobPostVO>[] = [

    {
      title: 'id',
      dataIndex: 'id',
      valueType: 'text',
      hideInForm: true,
      hideInSearch: true,
      width: 50,
    },
    {
      title: '岗位名称',
      dataIndex: 'title',
      valueType: 'text',
      formItemProps: {
        rules: [
          {
            required: true,
            message: '请输入岗位名称',
          },
        ],
      }
    },
    {
      title: '薪资',
      dataIndex: 'salary',
      valueType: 'text',
      formItemProps: {
        rules: [
          {
            required: true,
            message: '请输入薪资',
          },
        ],
      }
    },


    {
      title: '公司名称',
      dataIndex: ['user', 'nickName'],
      valueType: 'text',
      hideInSearch: true,
      hideInForm: true,
    },
    {
      title: '工作地点',
      dataIndex: 'workAddress',
      valueType: 'text',
      formItemProps: {
        rules: [
          {
            required: true,
            message: '请输入工作地点',
          },
        ],
      }
    },
    {
      title: '招聘人数',
      dataIndex: 'maxCount',
      valueType: 'digit',
      hideInSearch: true,
      sorter: true,
      fieldProps: {
        style: {width: '40%'},
        placeholder: '为空则不限人数',
      },
      render: (_, record) => {
        if (!record.maxCount) {
          return '不限';
        } else {
          return record.maxCount;
        }
      }
    },
    {
      title: '截止时间',
      dataIndex: 'expirationTime',
      valueType: 'dateTime',
      hideInSearch: true,
      hideInTable: true,
      formItemProps: {
        rules: [
          {
            required: true,
            message: '请选择截止时间',
          },
        ],
      },
      fieldProps: {
        disabledDate: (current: any) => {
          return current && current < dayjs().endOf('day');
        }
      }
    },
    {
      title: '岗位描述',
      dataIndex: 'description',
      valueType: 'textarea',
      ellipsis: true,
      formItemProps: {
        rules: [
          {
            required: true,
            message: '请输入岗位描述',
          },
        ],
      }
    },
    {
      title: '任职要求',
      dataIndex: 'requirement',
      valueType: 'textarea',
      hideInSearch: true,
      hideInTable: true,
      ellipsis: true,
      formItemProps: {
        rules: [
          {
            required: true,
            message: '请输入任职要求',
          },
        ],
      }
    },
    {
      title: '当前状态',
      dataIndex: 'status',
      hideInForm: true,
      valueEnum: {
        0: '审核中',
        1: '已发布',
        2: '已下线',
        3: '审核不通过',
      },
      render: (_, record) => {
        if (record.status === 0) {
          return <Tag color="processing">审核中</Tag>;
        }
        if (record.status === 1) {
          return <Tag color="success">招聘中</Tag>;
        }
        if (record.status === 2) {
          return <Tag color="orange">已下线</Tag>;
        }
        if (record.status === 3) {
          return <Tag color="error">审核不通过</Tag>;
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
          {initialState?.currentUser?.id === record.userId && (
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
          <Access accessible={access.canAdmin} fallback={null}>
          <Typography.Link
            key="publish"
            type='warning'
            onClick={() => handlePublish(record.id || 0)}
          >
            {record.status === 1 ? '下线' : record.status === 2 ? '发布' : ''}
          </Typography.Link>
          </Access>
        </Space>
      ),
    },
  ];
  return (
    <PageContainer>
      <ProTable<API.JobPostVO>
        headerTitle={'岗位列表'}
        actionRef={actionRef}
        rowKey="key"
        search={{
          labelWidth: 120,
        }}
        toolBarRender={() => [
          <Access accessible={access.canEnterprise} fallback={null} key="createBtn">
            <Button
              key="create"
              type="primary"
              onClick={() => {
                setCreateModalVisible(true);
              }}
            >
              <PlusOutlined/> 新建
            </Button>,
          </Access>
        ]}
        request={async (params, sort, filter) => {
          const sortField = Object.keys(sort)?.[0];
          const sortOrder = sort?.[sortField] ?? undefined;

          const {data, code} = await listJobPostVoByPageUsingPost({
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
        columns={columns}
        visible={createModalVisible}
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
export default JobPostPage;
