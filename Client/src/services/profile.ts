import { api, refreshToken } from './auth';

export const getProfileData = () =>
  api({
    method: 'get',
    url: 'profile/',
  })
    .then((response) => response.data)
    .catch((e) => {
      if (e.status === 401) {
        refreshToken().then(() => getProfileData());
      } else throw new Error(e.response.data.message);
    });

export const getProfileDataId = (id: number) =>
  api({
    method: 'get',
    url: 'profile/',
    params: { id },
  })
    .then((response) => response.data)
    .catch((e) => {
      if (e.status === 401) {
        refreshToken().then(() => getProfileDataId(id));
      } else throw new Error(e.response.data.message);
    });
