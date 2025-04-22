
import {
  getLoginUserUsingGet,
  updateMyUserUsingPost
} from '@/services/backend/userController';
import { PageContainer  } from '@ant-design/pro-components';
import '@umijs/max';
import {Button, Form, Input, message } from 'antd';
import React, {useEffect, useRef } from 'react';
import {useModel} from "@@/exports";
import {flushSync} from "react-dom";
import {FormRef} from "rc-field-form";

/**
 * 用户管理页面
 *
 * @constructor
 */
const UserAdminPage: React.FC = () => {

  const formRef = useRef<FormRef>(null);

  const {initialState,setInitialState} = useModel('@@initialState');
  console.log(initialState?.currentUser,'initialState')

  useEffect(() => {
    if (initialState?.currentUser) {
      formRef.current?.setFieldsValue(initialState?.currentUser)
    }
  }, [initialState?.currentUser])


  /**
   * 修改个人信息
   * @param values
   */
  const onFinish = async (values: any) => {
    console.log('Success:', values);
    const hide = message.loading('正在更新');

    try {
      await updateMyUserUsingPost({ ...values });

      const res = await getLoginUserUsingGet();
      flushSync(() => {
        setInitialState((s) => ({ ...s, currentUser: res.data }));
      });
      hide();
      message.success('更新成功');

    } catch (error: any) {
      hide();
      message.error('更新失败，' + error.message);

    }
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };


  return (
    <PageContainer>
      <Form
        ref={formRef}
        name="basic"
        labelCol={{ span: 7 }}
        wrapperCol={{ span: 8 }}
        initialValues={initialState?.currentUser}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
           <Form.Item
          label="昵称"
          name="nickName"
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="用户名"
          name="userName"
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="账号"
          name="userAccount"
        >
          <Input readOnly />
        </Form.Item>
        <Form.Item
          label="手机号"
          name="userPhone"
          rules={[{pattern: /^1[3-9]\d{9}$/, message: '请输入正确的手机号'}]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="简介"
          name="userProfile"
        >
          <Input.TextArea />
        </Form.Item>



        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" htmlType="submit">
            提交修改
          </Button>
        </Form.Item>
      </Form>
    </PageContainer>
  );
};
export default UserAdminPage;
