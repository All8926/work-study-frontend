import {updateUserPasswordUsingPost, userLogoutUsingPost} from '@/services/backend/userController';
import {KeyOutlined, LogoutOutlined, UserOutlined} from '@ant-design/icons';
import {history, useModel} from '@umijs/max';
import {Avatar, Button, Form, Input, message, Modal, Space} from 'antd';
import {stringify} from 'querystring';
import type {MenuInfo} from 'rc-menu/lib/interface';
import React, {useCallback} from 'react';
import {flushSync} from 'react-dom';
import {Link} from 'umi';
import HeaderDropdown from '../HeaderDropdown';

export type GlobalHeaderRightProps = {
  menu?: boolean;
};

export const AvatarDropdown: React.FC<GlobalHeaderRightProps> = ({menu}) => {

  const [visible, setVisible] = React.useState<boolean>(false);
  const {initialState, setInitialState} = useModel('@@initialState');
  const {currentUser} = initialState || {};

  /**
   * 退出登录，并且将当前的 url 保存
   */
  const loginOut = async () => {
    await userLogoutUsingPost();
    const {search, pathname} = window.location;
    const urlParams = new URL(window.location.href).searchParams;
    /** 此方法会跳转到 redirect 参数所在的位置 */
    const redirect = urlParams.get('redirect');
    // Note: There may be security issues, please note
    if (window.location.pathname !== '/user/login' && !redirect) {
      history.replace({
        pathname: '/user/login',
        search: stringify({
          redirect: pathname + search,
        }),
      });
    }
  };


  /**
   * 修改密码
   */
  const handleUpdatePassword = async (values: API.UserUpdatePasswordRequest) => {
    console.log('Success:', values);
    const hide = message.loading('正在修改密码');

    try {
      await updateUserPasswordUsingPost({...values,id: currentUser?.id});
      hide();
      message.success('修改成功');
      setVisible(false);
      history.replace({
        pathname: '/user/login'
      });
    } catch (error: any) {
      hide();
      message.error('修改失败，' + error.message);
    }
  }




  const onMenuClick = useCallback(
    (event: MenuInfo) => {
      const {key} = event;
      if (key === 'logout') {
        flushSync(() => {
          setInitialState((s) => ({...s, currentUser: undefined}));
        });
        loginOut();
        return;
      }
      if (key === 'updatePassword') {
        setVisible(true)
        return;
      }
      history.push(`/account/${key}`);
    },
    [setInitialState],
  );



  if (!currentUser) {
    return (
      <Link to="/user/login">
        <Button type="primary" shape="round">
          登录
        </Button>
      </Link>
    );
  }

  const menuItems = [
    ...(menu
      ? [
        {
          key: 'center',
          icon: <UserOutlined/>,
          label: '个人信息',
        },
        {
          key: 'updatePassword',
          icon:<KeyOutlined />,
          label: '修改密码',
        },
        {
          type: 'divider' as const,
        },
      ]
      : []),
    {
      key: 'logout',
      icon: <LogoutOutlined/>,
      label: '退出登录',
    },
  ];

  return (
    <>
      <HeaderDropdown
        menu={{
          selectedKeys: [],
          onClick: onMenuClick,
          items: menuItems,
        }}
      >
        <Space>
          {currentUser?.userAvatar ? (
            <Avatar size="small" src={currentUser?.userAvatar}/>
          ) : (
            <Avatar size="small" icon={<UserOutlined/>}/>
          )}
          <span className="anticon">{currentUser?.userName ?? '请完善信息'}</span>
        </Space>
      </HeaderDropdown>
      <Modal
        destroyOnClose
        title={'修改密码'}
        open={visible}
        footer={null}
        onCancel={() => {
          setVisible(false);
        }}>
        <div style={{height:20}}></div>
        <Form
          name="updatePassword"
          onFinish={handleUpdatePassword}
          autoComplete="off"
          layout="horizontal"
        >
          <Form.Item
            label="旧密码"
            name="oldPassword"
            rules={[{required: true, message: '请输入旧密码'}]}
          >
            <Input.Password/>
          </Form.Item>
          <Form.Item
            label="新密码"
            name="newPassword"
            rules={[{required: true, message: '请输入新密码'}, {min: 6, message: '密码长度不能小于6位'}]}
          >
            <Input.Password/>
          </Form.Item>

          <Form.Item
            label="确认密码"
            name="checkPassword"
            dependencies={['newPassword']}
            hasFeedback
            rules={[
              {
                required: true,
                message: '请确认密码',
              },
              ({getFieldValue}) => ({
                validator(_, value) {
                  if (!value || getFieldValue('newPassword') === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error('两次密码不一致'));
                }
              })
            ]}
           >
          <Input.Password/>
        </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              提交
            </Button>
            <Button
              style={{
                marginLeft: 8,
              }}
              onClick={() => {
                setVisible(false);
              }}
            >
              取消
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export const AvatarName = () => {
};
