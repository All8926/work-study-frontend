// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** addFeedback POST /feedback/add */
export async function addFeedbackUsingPost(
  body: API.FeedbackAddRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseLong_>('/feedback/add', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** deleteFeedback POST /feedback/delete */
export async function deleteFeedbackUsingPost(
  body: API.DeleteRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseBoolean_>('/feedback/delete', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** editFeedback POST /feedback/edit */
export async function editFeedbackUsingPost(
  body: API.FeedbackEditRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseBoolean_>('/feedback/edit', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** listFeedbackVOByPage POST /feedback/list/page/vo */
export async function listFeedbackVoByPageUsingPost(
  body: API.FeedbackQueryRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponsePageFeedbackVO_>('/feedback/list/page/vo', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** updateFeedback POST /feedback/update */
export async function updateFeedbackUsingPost(
  body: API.FeedbackUpdateRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseBoolean_>('/feedback/update', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
