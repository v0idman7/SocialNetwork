import { getAuthorization } from './auth';

export const getProfilePost = () =>
  fetch(`http://localhost:3000/api/post?user=true`, {
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

export const addPost = (text: string, filesname: string) => {
  fetch(`http://localhost:3000/api/post`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: getAuthorization(),
    },
    body: JSON.stringify({ text, filesname }),
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
};

export const getNewsPost = () =>
  fetch(`http://localhost:3000/api/post?user=true&friend=true`, {
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
