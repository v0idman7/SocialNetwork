import { getAuthorization, refreshToken } from './auth';

export const getSearch = (search: string) =>
  fetch(`http://localhost:3000/api/friend/all?search=${search}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: getAuthorization(),
    },
  })
    .then(async (res) => {
      if (res.status !== 200) {
        if (res.status === 401) {
          refreshToken().then(() => getSearch(search));
        }
        const responce = await res.json();
        throw new Error(responce.message);
      }
      return res;
    })
    .then((responce) => responce.json())
    .catch((e) => console.error(e));

export const getFriends = () =>
  fetch(`http://localhost:3000/api/friend/friends`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: getAuthorization(),
    },
  })
    .then(async (res) => {
      if (res.status !== 200) {
        if (res.status === 401) {
          refreshToken().then(() => getFriends());
        }
        const responce = await res.json();
        throw new Error(responce.message);
      }
      return res;
    })
    .then((responce) => responce.json())
    .catch((e) => console.error(e));

export const getOther = () =>
  fetch(`http://localhost:3000/api/friend/other`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: getAuthorization(),
    },
  })
    .then(async (res) => {
      if (res.status !== 200) {
        if (res.status === 401) {
          refreshToken().then(() => getOther());
        }
        const responce = await res.json();
        throw new Error(responce.message);
      }
      return res;
    })
    .then((responce) => responce.json())
    .catch((e) => console.error(e));

export const checkFriend = (id: number) =>
  fetch(`http://localhost:3000/api/friend/check?id=${id}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: getAuthorization(),
    },
  })
    .then(async (res) => {
      if (res.status !== 200) {
        if (res.status === 401) {
          refreshToken().then(() => checkFriend(id));
        }
        const responce = await res.json();
        throw new Error(responce.message);
      }
      return res;
    })
    .then((responce) => responce.json())
    .catch((e) => console.error(e));

export const addFriend = (id: number) =>
  fetch(`http://localhost:3000/api/friend/add?id=${id}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: getAuthorization(),
    },
  })
    .then(async (res) => {
      if (res.status !== 200) {
        if (res.status === 401) {
          refreshToken().then(() => addFriend(id));
        }
        const responce = await res.json();
        throw new Error(responce.message);
      }
      return res;
    })
    .then((responce) => responce.json())
    .catch((e) => console.error(e));

export const deleteFriend = (id: number) =>
  fetch(`http://localhost:3000/api/friend/delete?id=${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      Authorization: getAuthorization(),
    },
  })
    .then(async (res) => {
      if (res.status !== 200) {
        if (res.status === 401) {
          refreshToken().then(() => deleteFriend(id));
        }
        const responce = await res.json();
        throw new Error(responce.message);
      }
      return res;
    })
    .then((responce) => responce.json())
    .catch((e) => console.error(e));
