import {PageContainer} from '@ant-design/pro-components';
import {useModel} from '@umijs/max';
import {Card, theme} from 'antd';
import React from 'react';


const Welcome: React.FC = () => {
  const {token} = theme.useToken();
  const {initialState} = useModel('@@initialState');
  return (
    <PageContainer>
      <Card
        style={{
          borderRadius: 8,
        }}
        bodyStyle={{
          backgroundImage:
            initialState?.settings?.navTheme === 'realDark'
              ? 'background-image: linear-gradient(75deg, #1A1B1F 0%, #191C1F 100%)'
              : 'background-image: linear-gradient(75deg, #FBFDFF 0%, #F5F7FF 100%)',
        }}
      >
        <div
          style={{
            backgroundPosition: '100% -30%',
            backgroundRepeat: 'no-repeat',
            backgroundSize: '274px auto',
            backgroundImage:
              "url('https://gw.alipayobjects.com/mdn/rms_a9745b/afts/img/A*BuFmQqsB2iAAAAAAAAAAAAAAARQnAQ')",
          }}
        >
          <div
            style={{
              fontSize: '20px',
              color: token.colorTextHeading,
            }}
          >
            欢迎使用 勤工俭学管理系统
          </div>
          <p
            style={{
              fontSize: '14px',
              color: token.colorTextSecondary,
              lineHeight: '22px',
              marginTop: 16,
              marginBottom: 32,
              width: '65%',
            }}
          >
           欢迎使用我们的勤工俭学管理系统，这是一个专为促进学生与用工单位之间高效合作而设计的平台。在这个系统中，我们致力于为每一位有志于通过自身努力减轻经济负担、积累社会经验的学生提供一个公平竞争的机会。无论你是渴望寻找兼职工作的学生，还是希望找到合适人才的用工单位，这里都能为你提供全方位的支持和服务。我们的系统简化了从岗位信息发布到申请、面试、录用以及薪酬发放的每一个环节，确保流程透明、操作便捷。同时，我们也注重用户体验和反馈，旨在不断优化服务，满足用户需求。希望通过这个平台，不仅能帮助你实现个人价值，还能让你感受到来自社区的温暖和支持。让我们一起开启这段充满机遇和成长的旅程吧。
          </p>
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: 16,
            }}
          >

          </div>
        </div>
      </Card>
    </PageContainer>
  );
};

export default Welcome;
