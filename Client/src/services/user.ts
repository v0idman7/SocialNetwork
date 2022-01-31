import { api, getAuthorization, refreshToken } from './auth';

const getUserData = () =>
  api({
    method: 'get',
    headers: { Authorization: getAuthorization() },
    url: 'user/',
  })
    .then((response) => response.data)
    .catch((e) => {
      if (e.response.status === 401) {
        refreshToken().then(() => getUserData());
      } else throw new Error(e.response.data.message);
    });

export default getUserData;
