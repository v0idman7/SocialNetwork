import { api, refreshToken } from './auth';

export const uploadImage = (formData: FormData, id: number) =>
  api({
    method: 'post',
    url: 'upload/one/',
    params: { id },
    data: formData,
  })
    .then((response) => response.data)
    .catch((e) => {
      if (e.response.status === 401) {
        refreshToken().then(() => uploadImage(formData, id));
      } else throw new Error(e.response.data.message);
    });

export const uploadManyImages = (formData: FormData) =>
  api({
    method: 'post',
    url: 'upload/many/',
    data: formData,
  })
    .then((response) => response.data)
    .catch((e) => {
      if (e.response.status === 401) {
        refreshToken().then(() => uploadManyImages(formData));
      } else throw new Error(e.response.data.message);
    });
