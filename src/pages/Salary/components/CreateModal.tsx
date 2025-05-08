
import {
  ProForm, ProFormDatePicker,
  ProFormDateTimePicker, ProFormDependency,
  ProFormInstance, ProFormSelect, ProFormText,
} from '@ant-design/pro-components';
import {
  message,
  Modal,
  Space,
} from 'antd';
import React, {useEffect, useRef, useState} from 'react';

import {addSalaryUsingPost} from "@/services/backend/salaryController";
import {getUserListUsingGet} from "@/services/backend/hiringRecordController";

interface Props {
  visible: boolean;
  onSubmit: (values: API.SalaryAddRequest) => void;
  onCancel: () => void;
}


/**
 * 创建弹窗
 * @param props
 * @constructor
 */
const CreateModal: React.FC<Props> = (props) => {
  const {visible, onSubmit, onCancel} = props;

  const [interviewerUser, setInterviewerUser] = useState<API.UserVO[]>([]);

  const formRef = useRef<ProFormInstance>();

  const salaryTypeOptions = [
    {
      value: 'date',
      label: '日结'
    },
    {
      value: 'week',
      label: '周结'
    },
    {
      value: 'month',
      label: '月结'
    },
  ]

  const sissueStatusOptions = [
    {
      value: 0,
      label: '待发放'
    },
    {
      value: 1,
      label: '已发放'
    },
  ]

  /**
   * 添加节点
   * @param fields
   */
  const handleAdd = async (fields: API.SalaryAddRequest) => {
    console.log('表单提交数据：', fields)
    // return
    const hide = message.loading('正在添加');
    try {
      await addSalaryUsingPost(fields);
      hide();
      message.success('创建成功');
      return true;
    } catch (error: any) {
      hide();
      message.error('创建失败，' + error.message);
      return false;
    }
  };

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


  return (
    <Modal
      key={'createModal'}
      maskClosable={false}
      destroyOnClose
      title={'创建'}
      open={visible}
      footer={null}
      onCancel={() => {

        onCancel?.();
      }}
    >
      <ProForm
        initialValues={{
          salaryType: 'date', // 设置结算类型默认值
        }}
        formRef={formRef}
        onFinish={async (values) => {
          console.log('表单提交数据：', values);
          const success = await handleAdd(values);
          if (success) {
            onSubmit?.(values);
          }
        }}
      >
        <ProFormSelect label={"发放用户"} name={"userId"} options={interviewerUser}
                       fieldProps={{fieldNames: {label: 'userName', value: 'id'}}}
                       rules={[{required: true, message: '发放用户不能为空'}]}/>
        <Space>
          <ProFormSelect
            label="结算类型"
            name="salaryType"
            options={salaryTypeOptions}
            rules={[{ required: true, message: '结算类型不能为空' }]}
            fieldProps={{
              onChange: () => {
                formRef.current?.setFieldsValue({ periodDate: null }); // 重置结算周期
              },
            }}
          />
          <ProFormDependency name={['salaryType']}>
            {({ salaryType }) => {
              let picker: 'date' | 'week' | 'month' = 'date';
              let format = 'YYYY-MM-DD';

              if (salaryType === 'week') {
                picker = 'week';
                format = 'gggg-[W]WW'; // 如：2025-W20（ISO周格式）
              } else if (salaryType === 'month') {
                picker = 'month';
                format = 'YYYY-MM'; // 月格式
              }

              return (
                <ProFormDatePicker
                  name="periodDate"
                  label="结算周期"
                  fieldProps={{
                    picker,
                    format,
                  }}
                  rules={[{ required: true, message: '结算周期不能为空' }]}
                />
              );
            }}
          </ProFormDependency>

        </Space>
        <ProFormText name={"workDuration"} label={"出勤时长"} rules={[{required: true, message: '出勤时长不能为空'}]}/>
        <ProFormText name={"performance"} label={"绩效等级"}/>
        <ProFormText name={"salaryAmount"} label={"实发工资"} rules={[{required: true, message: '实发工资不能为空'}]}/>
        <ProFormSelect
          label="发放状态"
          name="issueStatus"
          options={sissueStatusOptions}
          rules={[{ required: true, message: '发放状态不能为空' }]}
        />
        <ProFormDateTimePicker
          name="issueTime"
          label="发放时间"
        />


      </ProForm>

    </Modal>
  );
};
export default CreateModal;
