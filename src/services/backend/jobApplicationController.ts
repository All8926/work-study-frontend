// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** addJobApplication POST /jobApplication/add */
export async function addJobApplicationUsingPost(
  body: API.JobApplicationAddRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseLong_>('/jobApplication/add', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** auditJobApplication POST /jobApplication/audit */
export async function auditJobApplicationUsingPost(
  body: API.AuditRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseBoolean_>('/jobApplication/audit', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** deleteJobApplication POST /jobApplication/delete */
export async function deleteJobApplicationUsingPost(
  body: API.DeleteRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseBoolean_>('/jobApplication/delete', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** editJobApplication POST /jobApplication/edit */
export async function editJobApplicationUsingPost(
  body: API.JobApplicationEditRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseBoolean_>('/jobApplication/edit', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** getInterviewPassedUser GET /jobApplication/get/interview/passed */
export async function getInterviewPassedUserUsingGet(options?: { [key: string]: any }) {
  return request<API.BaseResponseListUserVO_>('/jobApplication/get/interview/passed', {
    method: 'GET',
    ...(options || {}),
  });
}

/** listJobApplicationVOByPage POST /jobApplication/list/page/vo */
export async function listJobApplicationVoByPageUsingPost(
  body: API.JobApplicationQueryRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponsePageJobApplicationVO_>('/jobApplication/list/page/vo', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
