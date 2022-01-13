export const userLogin = (signInData: { email: string; password: string }) =>
  fetch(`http://localhost:3000/api/user/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(signInData),
  })
    .then(async (res) => {
      if (res.status !== 200) {
        const responce = await res.json();
        throw new Error(responce.message);
      }
      return res;
    })
    .then((responce) => responce.json())
    .then((result) => {
      localStorage.setItem('Authorization', `Bearer ${result.accessToken}`);
      return result.user.id;
    });

export const userRegistration = (registrationData: {
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  password: string;
}) =>
  fetch(`http://localhost:3000/api/user/registration`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(registrationData),
  })
    .then(async (res) => {
      if (res.status !== 200) {
        const responce = await res.json();
        throw new Error(responce.message);
      }
      return res;
    })
    .then((responce) => responce.json())
    .then((result) => {
      localStorage.setItem('Authorization', `Bearer ${result.accessToken}`);
      return result.user.id;
    });

export const userLogout = () =>
  fetch(`http://localhost:3000/api/user/logout`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((responce) => responce.json())
    .then(() => localStorage.removeItem('Authorization'))
    .catch((error) => console.error('Ошибка:', error));

export const refreshToken = () =>
  fetch(`http://localhost:3000/api/user/refresh`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((responce) => responce.json())
    .then((result) =>
      localStorage.setItem('Authorization', `Bearer ${result.accessToken}`)
    )
    .catch((error) => console.error('Ошибка:', error));
