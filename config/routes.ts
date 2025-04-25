export default [
  {
    path: '/user',
    layout: false,
    routes: [
      { path: '/user/login', component: './User/Login' },
      { path: '/user/register', component: './User/Register' },
    ],
  },
  { path: '/welcome', icon: 'smile', component: './Welcome', name: 'Welcome' },
  {
    path: '/account',
    icon: 'UserOutlined',
    name: '用户中心',
    routes: [
      { path: '/account', redirect: '/account/user' },
      { icon: 'table', path: '/account/user', component: './Account/User',  access: 'canAdmin', name: '用户管理' },
      { icon: 'table', path: '/account/center', component: './Account/Center', name: '个人中心' },
    ],
  },
  {
    name: '公告管理',
    icon: 'NotificationOutlined',
    path: '/notice',
    component: './Notice',
  },
  {
    name: '意见反馈',
    icon: 'InfoCircleOutlined',
    path: '/feedback',
    component: './Feedback',
  },

  { path: '/', redirect: '/welcome' },
  { path: '*', layout: false, component: './404' },
];
