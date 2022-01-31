import { api, getAuthorization, refreshToken } from './auth';

export const getMessages = (id: number) =>
  api({
    method: 'get',
    headers: { Authorization: getAuthorization() },
    url: 'message/',
    params: { id },
  })
    .then((response) => response.data)
    .catch((e) => {
      if (e.response.status === 401) {
        refreshToken().then(() => getMessages(id));
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
