import { api, getAuthorization, refreshToken } from './auth';

export const getChats = () =>
  api({
    method: 'get',
    headers: { Authorization: getAuthorization() },
    url: 'chat/',
  })
    .then((response) => response.data)
    .catch((e) => {
      if (e.response.status === 401) {
        refreshToken().then(() => getChats());
      } else throw new Error(e.response.data.message);
    });

export const getChatId = (id: number) =>
  api({
    method: 'get',
    headers: { Authorization: getAuthorization() },
    url: 'chat/',
    params: { id },
  })
    .then((response) => response.data)
    .catch((e) => {
      if (e.response.status === 401) {
        refreshToken().then(() => getChatId(id));
      } else throw new Error(e.response.data.message);
    });

export const addChat = (id: number) =>
  api({
    method: 'post',
    headers: { Authorization: getAuthorization() },
    url: 'chat/',
    params: { id },
  })
    .then((response) => response.data)
    .catch((e) => {
      if (e.response.status === 401) {
        refreshToken().then(() => addChat(id));
      } else throw new Error(e.response.data.message);
    });

export const deleteChat = (id: number) =>
  api({
    method: 'delete',
    headers: { Authorization: getAuthorization() },
    url: 'chat/',
    params: { id },
  })
    .then((response) => response.data)
    .catch((e) => {
      if (e.response.status === 401) {
        refreshToken().then(() => addChat(id));
      } else throw new Error(e.response.data.message);
    });
