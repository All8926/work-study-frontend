/**
 * @see https://umijs.org/zh-CN/plugins/plugin-access
 * */
export default function access(initialState: { currentUser?: API.UserVO }) {
  const { currentUser } = initialState ?? {};
  return {
    canUser: !!currentUser,
    canAdmin: currentUser?.userRole === 'admin' ,
    canEnterprise: currentUser?.userRole === 'enterprise' ,
  };
}
