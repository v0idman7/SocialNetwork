import { api, getAuthorization, refreshToken } from './auth';

export const getProfilePost = (page: number) =>
  api({
    method: 'get',
    headers: { Authorization: getAuthorization() },
    url: 'post/',
    params: { user: true, page },
  })
    .then((response) => response.data)
    .catch((e) => {
      if (e.response.status === 401) {
        refreshToken().then(() => getProfilePost(page));
      } else throw new Error(e.response.data.message);
    });

export const addPost = (text: string, filesname: string) =>
  api({
    method: 'post',
    headers: { Authorization: getAuthorization() },
    url: 'post/',
    data: { text, filesname },
  })
    .then((response) => response.data)
    .catch((e) => {
      if (e.response.status === 401) {
        refreshToken().then(() => addPost(text, filesname));
      } else throw new Error(e.response.data.message);
    });

export const getNewsPost = (page: number) =>
  api({
    method: 'get',
    headers: { Authorization: getAuthorization() },
    url: 'post/',
    params: { user: true, friend: true, page },
  })
    .then((response) => response.data)
    .catch((e) => {
      if (e.response.status === 401) {
        refreshToken().then(() => getNewsPost(page));
      } else throw new Error(e.response.data.message);
    });

export const deletePost = (id: number) =>
  api({
    method: 'delete',
    headers: { Authorization: getAuthorization() },
    url: 'post/',
    params: { id },
  })
    .then((response) => response.data)
    .catch((e) => {
      if (e.response.status === 401) {
        refreshToken().then(() => deletePost(id));
      } else throw new Error(e.response.data.message);
    });
