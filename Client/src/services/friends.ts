import { api, refreshToken } from './auth';

export const getSearch = (search: string) =>
  api({
    method: 'get',
    url: 'friend/all/',
    params: { search },
  })
    .then((response) => response.data)
    .catch((e) => {
      if (e.status === 401) {
        refreshToken().then(() => getSearch(search));
      } else throw new Error(e.response.data.message);
    });

export const getFriends = () =>
  api({
    method: 'get',
    url: 'friend/friends/',
  })
    .then((response) => response.data)
    .catch((e) => {
      if (e.status === 401) {
        refreshToken().then(() => getFriends());
      } else throw new Error(e.response.data.message);
    });

export const getOther = () =>
  api({
    method: 'get',
    url: 'friend/other/',
  })
    .then((response) => response.data)
    .catch((e) => {
      if (e.status === 401) {
        refreshToken().then(() => getOther());
      } else throw new Error(e.response.data.message);
    });

export const checkFriend = (id: number) =>
  api({
    method: 'get',
    url: 'friend/check/',
    params: { id },
  })
    .then((response) => response.data)
    .catch((e) => {
      if (e.status === 401) {
        refreshToken().then(() => checkFriend(id));
      } else throw new Error(e.response.data.message);
    });

export const addFriend = (id: number) =>
  api({
    method: 'get',
    url: 'friend/add/',
    params: { id },
  })
    .then((response) => response.data)
    .catch((e) => {
      if (e.status === 401) {
        refreshToken().then(() => addFriend(id));
      } else throw new Error(e.response.data.message);
    });

export const deleteFriend = (id: number) =>
  api({
    method: 'get',
    url: 'friend/delete/',
    params: { id },
  })
    .then((response) => response.data)
    .catch((e) => {
      if (e.status === 401) {
        refreshToken().then(() => deleteFriend(id));
      } else throw new Error(e.response.data.message);
    });
