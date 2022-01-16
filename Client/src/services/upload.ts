export const uploadImage = (formData: FormData, id: number) =>
  fetch(`http://localhost:3000/api/upload?id=${id}`, {
    method: 'POST',
    body: formData,
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

export const uploadI = () =>
  fetch(`http://localhost:3000/api/upload/`)
    .then(async (res) => {
      if (res.status !== 200) {
        const responce = await res.json();
        throw new Error(responce.message);
      }
      return res;
    })
    .then((responce) => responce.json())
    .catch((e) => console.error(e));
