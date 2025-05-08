declare namespace API {
  type AttendanceAddRequest = {
    attendanceDate?: string;
    checkInTime?: string;
    checkOutTime?: string;
    status?: number;
    userId?: number;
    workDuration?: string;
  };

  type AttendanceQueryRequest = {
    attendanceDate?: string;
    current?: number;
    id?: number;
    pageSize?: number;
    sortField?: string;
    sortOrder?: string;
    status?: number;
    userName?: string;
  };

  type AttendanceUpdateRequest = {
    attendanceDate?: string;
    checkInTime?: string;
    checkOutTime?: string;
    id?: number;
    status?: number;
    workDuration?: string;
  };

  type AttendanceVO = {
    attendanceDate?: string;
    checkInTime?: string;
    checkOutTime?: string;
    createTime?: string;
    enterPriseId?: number;
    enterprise?: UserVO;
    id?: number;
    status?: number;
    updateTime?: string;
    user?: UserVO;
    userId?: number;
    workDuration?: string;
  };

  type AuditRequest = {
    id?: number;
    reason?: string;
    status?: number;
  };

  type BaseResponseBoolean_ = {
    code?: number;
    data?: boolean;
    message?: string;
  };

  type BaseResponseListUserVO_ = {
    code?: number;
    data?: UserVO[];
    message?: string;
  };

  type BaseResponseLong_ = {
    code?: number;
    data?: number;
    message?: string;
  };

  type BaseResponsePageAttendanceVO_ = {
    code?: number;
    data?: PageAttendanceVO_;
    message?: string;
  };

  type BaseResponsePageFeedbackVO_ = {
    code?: number;
    data?: PageFeedbackVO_;
    message?: string;
  };

  type BaseResponsePageHiringRecordVO_ = {
    code?: number;
    data?: PageHiringRecordVO_;
    message?: string;
  };

  type BaseResponsePageJobApplicationVO_ = {
    code?: number;
    data?: PageJobApplicationVO_;
    message?: string;
  };

  type BaseResponsePageJobPostVO_ = {
    code?: number;
    data?: PageJobPostVO_;
    message?: string;
  };

  type BaseResponsePageNoticeVO_ = {
    code?: number;
    data?: PageNoticeVO_;
    message?: string;
  };

  type BaseResponsePageSalaryVO_ = {
    code?: number;
    data?: PageSalaryVO_;
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

  type HiringRecordAddRequest = {
    fileList?: Record<string, any>[];
    hireDate?: string;
    remark?: string;
    userId?: number;
  };

  type HiringRecordEditRequest = {
    fileList?: Record<string, any>[];
    id?: number;
    leaveDate?: string;
    remark?: string;
    status?: number;
  };

  type HiringRecordQueryRequest = {
    current?: number;
    hireDate?: string;
    id?: number;
    pageSize?: number;
    remark?: string;
    sortField?: string;
    sortOrder?: string;
    status?: number;
    userName?: string;
  };

  type HiringRecordVO = {
    createTime?: string;
    enterPriseId?: number;
    enterprise?: UserVO;
    fileList?: Record<string, any>[];
    hireDate?: string;
    id?: number;
    jobPost?: JobPostVO;
    jobPostId?: number;
    leaveDate?: string;
    remark?: string;
    status?: number;
    updateTime?: string;
    user?: UserVO;
    userId?: number;
  };

  type JobApplicationAddRequest = {
    fileList?: Record<string, any>[];
    interviewTime?: string;
    jobId?: number;
    remark?: string;
  };

  type JobApplicationEditRequest = {
    fileList?: Record<string, any>[];
    id?: number;
    interviewTime?: string;
    remark?: string;
  };

  type JobApplicationQueryRequest = {
    current?: number;
    id?: number;
    jobName?: string;
    pageSize?: number;
    sortField?: string;
    sortOrder?: string;
    status?: number;
  };

  type JobApplicationVO = {
    auditExplain?: string;
    createTime?: string;
    enterprise?: UserVO;
    enterpriseId?: number;
    fileList?: Record<string, any>[];
    id?: number;
    interviewTime?: string;
    job?: JobPostVO;
    jobId?: number;
    remark?: string;
    status?: number;
    updateTime?: string;
    user?: UserVO;
    userId?: number;
  };

  type JobPostAddRequest = {
    description?: string;
    expirationTime?: string;
    maxCount?: number;
    requirement?: string;
    salary?: string;
    title?: string;
    workAddress?: string;
  };

  type JobPostEditRequest = {
    description?: string;
    expirationTime?: string;
    id?: number;
    maxCount?: number;
    requirement?: string;
    salary?: string;
    title?: string;
    workAddress?: string;
  };

  type JobPostQueryRequest = {
    current?: number;
    description?: string;
    id?: number;
    pageSize?: number;
    salary?: string;
    sortField?: string;
    sortOrder?: string;
    status?: number;
    title?: string;
    workAddress?: string;
  };

  type JobPostVO = {
    createTime?: string;
    description?: string;
    expirationTime?: string;
    id?: number;
    maxCount?: number;
    rejectReason?: string;
    requirement?: string;
    salary?: string;
    status?: number;
    title?: string;
    updateTime?: string;
    user?: UserVO;
    userId?: number;
    workAddress?: string;
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

  type PageAttendanceVO_ = {
    countId?: string;
    current?: number;
    maxLimit?: number;
    optimizeCountSql?: boolean;
    orders?: OrderItem[];
    pages?: number;
    records?: AttendanceVO[];
    searchCount?: boolean;
    size?: number;
    total?: number;
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

  type PageHiringRecordVO_ = {
    countId?: string;
    current?: number;
    maxLimit?: number;
    optimizeCountSql?: boolean;
    orders?: OrderItem[];
    pages?: number;
    records?: HiringRecordVO[];
    searchCount?: boolean;
    size?: number;
    total?: number;
  };

  type PageJobApplicationVO_ = {
    countId?: string;
    current?: number;
    maxLimit?: number;
    optimizeCountSql?: boolean;
    orders?: OrderItem[];
    pages?: number;
    records?: JobApplicationVO[];
    searchCount?: boolean;
    size?: number;
    total?: number;
  };

  type PageJobPostVO_ = {
    countId?: string;
    current?: number;
    maxLimit?: number;
    optimizeCountSql?: boolean;
    orders?: OrderItem[];
    pages?: number;
    records?: JobPostVO[];
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

  type PageSalaryVO_ = {
    countId?: string;
    current?: number;
    maxLimit?: number;
    optimizeCountSql?: boolean;
    orders?: OrderItem[];
    pages?: number;
    records?: SalaryVO[];
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

  type SalaryAddRequest = {
    issueStatus?: number;
    issueTime?: string;
    performance?: string;
    periodDate?: string;
    salaryAmount?: string;
    salaryType?: string;
    userId?: number;
    workDuration?: string;
  };

  type SalaryQueryRequest = {
    current?: number;
    id?: number;
    issueStatus?: number;
    pageSize?: number;
    performance?: string;
    periodDate?: string;
    salaryAmount?: string;
    salaryType?: string;
    sortField?: string;
    sortOrder?: string;
    userName?: string;
  };

  type SalaryUpdateRequest = {
    id?: number;
    issueStatus?: number;
    issueTime?: string;
    performance?: string;
    salaryAmount?: string;
    workDuration?: string;
  };

  type SalaryVO = {
    createTime?: string;
    enterPriseId?: number;
    enterprise?: UserVO;
    id?: number;
    issueStatus?: number;
    issueTime?: string;
    performance?: string;
    periodDate?: string;
    salaryAmount?: string;
    salaryType?: string;
    updateTime?: string;
    user?: UserVO;
    userId?: number;
    workDuration?: string;
  };

  type uploadFileUsingPOSTParams = {
    biz?: string;
  };

  type UserAddRequest = {
    nickName?: string;
    status?: number;
    userAccount?: string;
    userAvatar?: string;
    userName?: string;
    userPhone?: string;
    userProfile?: string;
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
