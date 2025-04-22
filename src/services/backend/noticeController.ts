// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** addNotice POST /notice/add */
export async function addNoticeUsingPost(
  body: API.NoticeAddRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseLong_>('/notice/add', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** deleteNotice POST /notice/delete */
export async function deleteNoticeUsingPost(
  body: API.DeleteRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseBoolean_>('/notice/delete', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** listNoticeVOByPage POST /notice/list/page/vo */
export async function listNoticeVoByPageUsingPost(
  body: API.NoticeQueryRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponsePageNoticeVO_>('/notice/list/page/vo', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** publishNotice POST /notice/publish */
export async function publishNoticeUsingPost(body: number, options?: { [key: string]: any }) {
  return request<API.BaseResponseBoolean_>('/notice/publish', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** updateNotice POST /notice/update */
export async function updateNoticeUsingPost(
  body: API.NoticeUpdateRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseBoolean_>('/notice/update', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
