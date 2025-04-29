// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** addJobPost POST /jobPost/add */
export async function addJobPostUsingPost(
  body: API.JobPostAddRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseLong_>('/jobPost/add', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** auditJobPost POST /jobPost/audit */
export async function auditJobPostUsingPost(
  body: API.AuditRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseBoolean_>('/jobPost/audit', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** deleteJobPost POST /jobPost/delete */
export async function deleteJobPostUsingPost(
  body: API.DeleteRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseBoolean_>('/jobPost/delete', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** editJobPost POST /jobPost/edit */
export async function editJobPostUsingPost(
  body: API.JobPostEditRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseBoolean_>('/jobPost/edit', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** listJobPostVOByPage POST /jobPost/list/page/vo */
export async function listJobPostVoByPageUsingPost(
  body: API.JobPostQueryRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponsePageJobPostVO_>('/jobPost/list/page/vo', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** publishJobPost POST /jobPost/publish */
export async function publishJobPostUsingPost(body: number, options?: { [key: string]: any }) {
  return request<API.BaseResponseBoolean_>('/jobPost/publish', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
