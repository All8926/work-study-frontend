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
    path: '/job',
    icon: 'ProjectOutlined',
    name: '岗位中心',
    routes: [
      { path: '/job', redirect: '/job/list' },
      { path: '/job/list', component: './JobPost/JobList',   name: '岗位列表' },
      { path: '/job/application', component: './JobPost/JobApplication',   name: '申请记录' },
    ],
  },
  {
    name: '录用管理',
    icon: 'UserAddOutlined',
    path: '/hired',
    component: './HiringRecord',
  },
  {
    name: '考勤管理',
    icon: 'ScheduleOutlined',
    path: '/attendance',
    component: './Attendance',
  },
  {
    name: '薪酬管理',
    icon: 'DollarCircleOutlined',
    path: '/Salary',
    component: './Salary',
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
