import type {ActionType, ProColumns} from '@ant-design/pro-components';
import {PageContainer, ProTable} from '@ant-design/pro-components';
import UpdateModal from '@/pages/Attendance/components/UpdateModal';

import {
  deleteAttendanceUsingPost,
  listAttendanceVoByPageUsingPost
} from '@/services/backend/attendanceController';

import {Button, message, Modal, Space, Tag, Typography,} from 'antd';
import React, {useEffect, useRef, useState} from 'react';
import DetailModal from "@/pages/Attendance/components/DetailModal";
import {useModel} from "@umijs/max";
import CreateModal from "@/pages/Attendance/components/CreateModal";
import {PlusOutlined} from "@ant-design/icons";

import {Access, useAccess} from 'umi';
import {getUserListUsingGet} from "@/services/backend/hiringRecordController";

/**
 * 考勤管理页面
 *
 * @constructor
 */
const AttendancePage: React.FC = () => {
  // 是否显示新建窗口
  const [createModalVisible, setCreateModalVisible] = useState<boolean>(false);
  // 是否显示更新窗口
  const [updateModalVisible, setUpdateModalVisible] = useState<boolean>(false);
  // 是否显示查看窗口
  const [detailModalVisible, setDetailModalVisible] = useState<boolean>(false);
  const actionRef = useRef<ActionType>();
  // 当前用户点击的数据
  const [currentRow, setCurrentRow] = useState<API.AttendanceVO>();

  const {initialState} = useModel('@@initialState');
  const access = useAccess();
  const [interviewerUser, setInterviewerUser] = useState<API.UserVO[]>([]);

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


  const attendanceStatusMap: Record<number, { label: string; color: string }>  = {
    0: { label: '正常', color: 'success' },
    1: { label: '迟到', color: 'volcano' },
    2: { label: '早退', color: 'volcano' },
    3: { label: '旷工', color: 'red' },
    4: { label: '请假', color: 'warning' },
  };

  /**
   * 删除节点
   *
   * @param row
   */
  const handleDelete = async (row: API.DeleteRequest) => {
    Modal.confirm({
      title: '确认删除?',
      content: `你确定要删除该考勤吗?`,
      onOk: async () => {
        const hide = message.loading('正在删除');
        if (!row) return true;
        try {
          await deleteAttendanceUsingPost({
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
  const columns: ProColumns<API.AttendanceVO>[] = [
    {
      title: 'id',
      dataIndex: 'id',
      valueType: 'text',
      hideInForm: true,
      hideInSearch: true,
      width: 50
    },
    {
      title: '考勤用户',
      dataIndex: 'userId',
      valueType: 'select',
      hideInTable:true,
      hideInSearch:true,
      fieldProps: {
        options: interviewerUser.map(user => ({
          label: user.userName,
          value: user.id,
        })),
        showSearch: true, // 可选：支持搜索
      },
      formItemProps: {
        rules: [{ required: true, message: '请选择考勤用户' }],
      },
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
      title: '考勤日期',
      dataIndex: 'attendanceDate',
      valueType: 'date',
      formItemProps: {
        rules: [{ required: true, message: '请选择考勤日期' }],
      },
    },
    {
      title: '上班打卡时间',
      dataIndex: 'checkInTime',
      valueType: 'time',
      hideInSearch: true,
    },
    {
      title: '下班打卡时间',
      dataIndex: 'checkOutTime',
      valueType: 'time',
      hideInSearch: true,
    },
    {
      title: '工作时长',
      dataIndex: 'workDuration',
      valueType: 'text',
      hideInSearch: true,
    },
    {
      title: '状态',
      dataIndex: 'status',
      valueEnum: Object.fromEntries(
        Object.entries(attendanceStatusMap).map(([key, { label }]) => [key, label])
      ),
      fieldProps: {
        options: Object.entries(attendanceStatusMap).map(([value, { label }]) => ({
          label,
          value: Number(value),
        })),
      },
      render: (_, record ) => {
        const status = attendanceStatusMap[record.status ?? 999] ?? { label: '未知', color: 'default' };
        return <Tag color={status?.color || 'default'}>{status?.label || '未知'}</Tag>;
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
      <ProTable<API.AttendanceVO>
        headerTitle={'考勤列表'}
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

          const {data, code} = await listAttendanceVoByPageUsingPost({
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
          setCurrentRow(undefined);
          actionRef.current?.reload();
        }}
        onCancel={() => {
          setCreateModalVisible(false);
        }}/>

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
      <DetailModal visible={detailModalVisible} onCancel={setDetailModalVisible.bind(null, false)} oldData={currentRow}
                   onSubmit={() => {
                     setDetailModalVisible(false);
                     setCurrentRow(undefined);
                     actionRef.current?.reload();
                   }}/>
    </PageContainer>
  );
};
export default AttendancePage;
