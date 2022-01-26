import { getAuthorization, refreshToken } from './auth';

const getUserData = () =>
  fetch(`http://localhost:3000/api/user/`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: getAuthorization(),
    },
  })
    .then(async (res) => {
      if (res.status !== 200) {
        if (res.status === 401) {
          refreshToken().then(() => getUserData());
        }
        const responce = await res.json();
        throw new Error(responce.message);
      }
      return res;
    })
    .then((responce) => responce.json())
    .catch((e) => console.error(e));

export default getUserData;
