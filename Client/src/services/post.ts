import { getAuthorization, refreshToken } from './auth';

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
        if (res.status === 401) {
          refreshToken().then(() => getProfilePost());
        }
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
        if (res.status === 401) {
          refreshToken().then(() => addPost(text, filesname));
        }
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
        if (res.status === 401) {
          console.log('sdjfhaksdjhfadhfdfkjshkj');
          refreshToken().then(() => getNewsPost());
        }
        const responce = await res.json();
        throw new Error(responce.message);
      }
      return res;
    })
    .then((responce) => responce.json())
    .catch((e) => console.error(e));

export const deletePost = (id: number) =>
  fetch(`http://localhost:3000/api/post?id=${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      Authorization: getAuthorization(),
    },
  })
    .then(async (res) => {
      if (res.status !== 200) {
        if (res.status === 401) {
          refreshToken().then(() => deletePost(id));
        }
        const responce = await res.json();
        throw new Error(responce.message);
      }
      return res;
    })
    .then((responce) => responce.json())
    .catch((e) => console.error(e));
