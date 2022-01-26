import { refreshToken } from './auth';

export const uploadImage = (formData: FormData, id: number) =>
  fetch(`http://localhost:3000/api/upload/one?id=${id}`, {
    method: 'POST',
    body: formData,
  })
    .then(async (res) => {
      if (res.status !== 200) {
        if (res.status === 401) {
          refreshToken().then(() => uploadImage(formData, id));
        }
        const responce = await res.json();
        throw new Error(responce.message);
      }
      return res;
    })
    .then((responce) => responce.json())
    .catch((e) => console.error(e));

export const uploadManyImages = (formData: FormData) =>
  fetch(`http://localhost:3000/api/upload/many`, {
    method: 'POST',
    body: formData,
  })
    .then(async (res) => {
      if (res.status !== 200) {
        if (res.status === 401) {
          refreshToken().then(() => uploadManyImages(formData));
        }
        const responce = await res.json();
        throw new Error(responce.message);
      }
      return res;
    })
    .then((responce) => responce.json())
    .catch((e) => console.error(e));
