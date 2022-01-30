import { api, refreshToken } from './auth';

const getUserData = () =>
  api({
    method: 'get',
    url: 'user/',
  })
    .then((response) => response.data)
    .catch((e) => {
      if (e.response.status === 401) {
        refreshToken().then(() => getUserData());
      } else throw new Error(e.response.data.message);
    });

export default getUserData;
