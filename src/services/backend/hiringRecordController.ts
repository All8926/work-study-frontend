// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** addHiringRecord POST /hiringRecord/add */
export async function addHiringRecordUsingPost(
  body: API.HiringRecordAddRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseBoolean_>('/hiringRecord/add', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** deleteHiringRecord POST /hiringRecord/delete */
export async function deleteHiringRecordUsingPost(
  body: API.DeleteRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseBoolean_>('/hiringRecord/delete', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** editHiringRecord POST /hiringRecord/edit */
export async function editHiringRecordUsingPost(
  body: API.HiringRecordEditRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseBoolean_>('/hiringRecord/edit', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** listHiringRecordVOByPage POST /hiringRecord/list/page/vo */
export async function listHiringRecordVoByPageUsingPost(
  body: API.HiringRecordQueryRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponsePageHiringRecordVO_>('/hiringRecord/list/page/vo', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
