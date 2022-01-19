import { getAuthorization } from './auth';

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
        const responce = await res.json();
        throw new Error(responce.message);
      }
      return res;
    })
    .then((responce) => responce.json())
    .catch((e) => console.error(e));
