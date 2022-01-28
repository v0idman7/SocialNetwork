import { api, refreshToken } from './auth';

const addLike = (id: number, like: boolean) =>
  api({
    method: 'post',
    url: 'likepost/',
    data: { id, like },
  })
    .then((response) => response.data)
    .catch((e) => {
      if (e.status === 401) {
        refreshToken().then(() => addLike(id, like));
      } else throw new Error(e.response.data.message);
    });

export default addLike;
