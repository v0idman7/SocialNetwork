import { api, getAuthorization, refreshToken } from './auth';

export const getComments = (post: number) =>
  api({
    method: 'get',
    headers: { Authorization: getAuthorization() },
    url: 'comment/',
    params: { post },
  })
    .then((response) => response.data)
    .catch((e) => {
      if (e.response.status === 401) {
        refreshToken().then(() => getComments(post));
      } else throw new Error(e.response.data.message);
    });

export const addComment = (post: number, text: string) =>
  api({
    method: 'post',
    headers: { Authorization: getAuthorization() },
    url: 'comment/',
    data: { post, text },
  })
    .then((response) => response.data)
    .catch((e) => {
      if (e.response.status === 401) {
        refreshToken().then(() => addComment(post, text));
      } else throw new Error(e.response.data.message);
    });

export const deleteComment = (id: number) =>
  api({
    method: 'delete',
    headers: { Authorization: getAuthorization() },
    url: 'comment/',
    data: { id },
  })
    .then((response) => response.data)
    .catch((e) => {
      if (e.response.status === 401) {
        refreshToken().then(() => deleteComment(id));
      } else throw new Error(e.response.data.message);
    });
