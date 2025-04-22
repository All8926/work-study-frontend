import Footer from '@/components/Footer';
import { userRegisterUsingPost } from '@/services/backend/userController';
import { LoginForm, ProFormText } from '@ant-design/pro-components';
import { useEmotionCss } from '@ant-design/use-emotion-css';
import { Helmet, history } from '@umijs/max';
import { message, Tabs } from 'antd';
import React, { useState } from 'react';
import { Link } from 'umi';
import Settings from '../../../../config/defaultSettings';

/**
 * 用户注册页面
 * @constructor
 */
const UserRegisterPage: React.FC = () => {
  const [type, setType] = useState<string>('user');
  const containerClassName = useEmotionCss(() => {
    return {
      display: 'flex',
      flexDirection: 'column',
      height: '100vh',
      overflow: 'auto',
      backgroundImage:
        "url('https://mdn.alipayobjects.com/yuyan_qk0oxh/afts/img/V-_oS6r-i7wAAAAAAAAAAAAAFl94AQBr')",
      backgroundSize: '100% 100%',
    };
  });


  /**
   * 提交注册
   * @param values
   */
  const handleSubmit = async (values: API.UserRegisterRequest) => {
    // 前端校验
    // 1. 判断密码是否一致
    const { userPassword, checkPassword } = values;
    if (userPassword !== checkPassword) {
      message.error('二次输入的密码不一致');
      return;
    }

    try {
      // 注册
      await userRegisterUsingPost({
        ...values,
        userRole:type
      });

      const defaultLoginSuccessMessage = '注册成功！';
      message.success(defaultLoginSuccessMessage);
      history.push('/user/login');
      return;
    } catch (error: any) {
      const defaultLoginFailureMessage = `注册失败，${error.message}`;
      message.error(defaultLoginFailureMessage);
    }
  };

  return (
    <div className={containerClassName}>
      <Helmet>
        <title>
          {'注册'}- {Settings.title}
        </title>
      </Helmet>
      <div
        style={{
          flex: '1',
          padding: '32px 0',
        }}
      >
        <LoginForm
        layout="horizontal"
        labelCol={{ span: 6 }}
          contentStyle={{
            minWidth: 280,
            maxWidth: '75vw',
          }}
          logo={<img alt="logo" style={{ height: '100%' }} src="/logo.png" />}
          title="勤工俭学管理系统 - 注册"
          subTitle={'一个专为促进学生与用工单位之间高效合作而设计的平台。'}
          initialValues={{
            autoLogin: true,
          }}
          submitter={{
            searchConfig: {
              submitText: '注册',
            },
          }}
          onFinish={async (values) => {
            await handleSubmit(values as API.UserLoginRequest);
          }}
        >
          <Tabs
            activeKey={type}
            onChange={setType}
            centered
            items={[
              {
                key: 'user',
                label: '用户注册',
              },
              {
                key: 'enterprise',
                label: '企业注册',
              },
            ]}
          />
          {
            <>
              <ProFormText
                name="nickName"
                label={type === 'user' ? '用户昵称' : '公司名称'}
                fieldProps={{
                  size: 'large',
                }}
                placeholder={type === 'user' ? '请输入用户昵称' : '请输入公司名称'}
                rules={[
                  {
                    required: true,
                    message: '必填项！',
                  },
                ]}
              />
              <ProFormText
                name="userName"
                label={'真实姓名'}
                fieldProps={{
                  size: 'large',
                }}
                placeholder={'请输入真实姓名'}
                rules={[
                  {
                    required: true,
                    message: '真实姓名必填项！',
                  },
                ]}
              />
              <ProFormText
                label={'登录账号'}
                name="userAccount"
                fieldProps={{
                  size: 'large',
                }}
                placeholder={'请输入登录账号'}
                rules={[
                  {
                    required: true,
                    message: '登录账号是必填项！',
                  },
                ]}
              />
              <ProFormText.Password
                label={'登录密码'}
                name="userPassword"
                fieldProps={{
                  size: 'large',
                }}
                placeholder={'请输入登录密码'}
                rules={[
                  {
                    required: true,
                    message: '登录密码是必填项！',
                  },
                ]}
              />
              <ProFormText.Password
                label={'确认密码'}
                name="checkPassword"
                fieldProps={{
                  size: 'large',
                }}
                placeholder={'请再次确认密码'}
                rules={[
                  {
                    required: true,
                    message: '确认密码是必填项！',
                  },
                ]}
              />
              <ProFormText
                label={'手机号码'}
                name="userPhone"
                fieldProps={{
                  size: 'large',
                }}
                placeholder={'请输入手机号'}
                rules={[
                  {
                    required: true,
                    message: '手机号是必填项！',
                  },
                ]}
              />

            </>
          }

          <div
            style={{
              marginBottom: 24,
              textAlign: 'right',
            }}
          >
            <Link to="/user/login">老用户登录</Link>
          </div>
        </LoginForm>
      </div>
      <Footer />
    </div>
  );
};
export default UserRegisterPage;
