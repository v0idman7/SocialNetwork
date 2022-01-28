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

interface EditProfileValues {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  vk: string;
  instagram: string;
  facebook: string;
  github: string;
  linkedIn: string;
}

export const updateProfileData = (profile: EditProfileValues) =>
  api({
    method: 'post',
    url: 'profile/',
    data: profile,
  })
    .then((response) => response.data)
    .catch((e) => {
      if (e.status === 401) {
        refreshToken().then(() => updateProfileData(profile));
      } else throw new Error(e.response.data.message);
    });
