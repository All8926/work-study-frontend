declare namespace API {
  type BaseResponseBoolean_ = {
    code?: number;
    data?: boolean;
    message?: string;
  };

  type BaseResponseLong_ = {
    code?: number;
    data?: number;
    message?: string;
  };

  type BaseResponsePageFeedbackVO_ = {
    code?: number;
    data?: PageFeedbackVO_;
    message?: string;
  };

  type BaseResponsePageNoticeVO_ = {
    code?: number;
    data?: PageNoticeVO_;
    message?: string;
  };

  type BaseResponsePageUserVO_ = {
    code?: number;
    data?: PageUserVO_;
    message?: string;
  };

  type BaseResponseString_ = {
    code?: number;
    data?: string;
    message?: string;
  };

  type BaseResponseUserVO_ = {
    code?: number;
    data?: UserVO;
    message?: string;
  };

  type DeleteRequest = {
    id?: number;
  };

  type FeedbackAddRequest = {
    content?: string;
    imageList?: string[];
    title?: string;
  };

  type FeedbackEditRequest = {
    content?: string;
    id?: number;
    imageList?: string[];
    title?: string;
  };

  type FeedbackQueryRequest = {
    current?: number;
    id?: number;
    pageSize?: number;
    sortField?: string;
    sortOrder?: string;
    status?: number;
    title?: string;
  };

  type FeedbackUpdateRequest = {
    id?: number;
    responseText?: string;
    status?: number;
  };

  type FeedbackVO = {
    content?: string;
    createTime?: string;
    id?: number;
    imageList?: string[];
    responseText?: string;
    responseUserId?: number;
    responseUserName?: string;
    status?: number;
    title?: string;
    updateTime?: string;
    user?: UserVO;
    userId?: number;
  };

  type NoticeAddRequest = {
    content?: string;
    title?: string;
  };

  type NoticeQueryRequest = {
    current?: number;
    id?: number;
    pageSize?: number;
    publishTime?: string;
    sortField?: string;
    sortOrder?: string;
    status?: number;
    title?: string;
  };

  type NoticeUpdateRequest = {
    content?: string;
    id?: number;
    title?: string;
  };

  type NoticeVO = {
    content?: string;
    createTime?: string;
    id?: number;
    publishTime?: string;
    status?: number;
    title?: string;
    updateTime?: string;
    user?: UserVO;
    userId?: number;
  };

  type OrderItem = {
    asc?: boolean;
    column?: string;
  };

  type PageFeedbackVO_ = {
    countId?: string;
    current?: number;
    maxLimit?: number;
    optimizeCountSql?: boolean;
    orders?: OrderItem[];
    pages?: number;
    records?: FeedbackVO[];
    searchCount?: boolean;
    size?: number;
    total?: number;
  };

  type PageNoticeVO_ = {
    countId?: string;
    current?: number;
    maxLimit?: number;
    optimizeCountSql?: boolean;
    orders?: OrderItem[];
    pages?: number;
    records?: NoticeVO[];
    searchCount?: boolean;
    size?: number;
    total?: number;
  };

  type PageUserVO_ = {
    countId?: string;
    current?: number;
    maxLimit?: number;
    optimizeCountSql?: boolean;
    orders?: OrderItem[];
    pages?: number;
    records?: UserVO[];
    searchCount?: boolean;
    size?: number;
    total?: number;
  };

  type uploadFileUsingPOSTParams = {
    biz?: string;
  };

  type UserAddRequest = {
    userAccount?: string;
    userAvatar?: string;
    userName?: string;
    userRole?: string;
  };

  type UserLoginRequest = {
    userAccount?: string;
    userPassword?: string;
  };

  type UserQueryRequest = {
    current?: number;
    id?: number;
    nickName?: string;
    pageSize?: number;
    sortField?: string;
    sortOrder?: string;
    userAccount?: string;
    userName?: string;
    userPhone?: string;
    userProfile?: string;
    userRole?: string;
  };

  type UserRegisterRequest = {
    checkPassword?: string;
    nickName?: string;
    userAccount?: string;
    userName?: string;
    userPassword?: string;
    userPhone?: string;
    userRole?: string;
  };

  type UserUpdateMyRequest = {
    nickName?: string;
    userName?: string;
    userPhone?: string;
    userProfile?: string;
  };

  type UserUpdatePasswordRequest = {
    checkPassword?: string;
    id?: number;
    newPassword?: string;
    oldPassword?: string;
  };

  type UserUpdateRequest = {
    id?: number;
    nickName?: string;
    status?: number;
    userAvatar?: string;
    userName?: string;
    userPhone?: string;
    userProfile?: string;
    userRole?: string;
  };

  type UserVO = {
    createTime?: string;
    id?: number;
    nickName?: string;
    status?: number;
    updateTime?: string;
    userAccount?: string;
    userAvatar?: string;
    userName?: string;
    userPhone?: string;
    userProfile?: string;
    userRole?: string;
  };
}
