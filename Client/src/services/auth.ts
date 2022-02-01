import axios from 'axios';

export const getAuthorization = () => {
  const authorization = localStorage.getItem('Authorization');
  if (!authorization) {
    return '';
  }
  return authorization;
};

export const api = axios.create({
  baseURL: 'http://localhost:3000/api/',
  withCredentials: true,
});

export const userLogin = (signInData: { email: string; password: string }) =>
  api({
    method: 'post',
    url: 'user/login',
    data: signInData,
  })
    .then((response) => {
      localStorage.setItem(
        'Authorization',
        `Bearer ${response.data.accessToken}`
      );
      return response.data.user.id;
    })
    .catch((e) => {
      throw new Error(e.response.data.message);
    });

export const userRegistration = (registrationData: {
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  password: string;
}) =>
  api({
    method: 'post',
    url: 'user/registration',
    data: registrationData,
  })
    .then((response) => {
      localStorage.setItem(
        'Authorization',
        `Bearer ${response.data.accessToken}`
      );
      return response.data.user.id;
    })
    .catch((e) => {
      throw new Error(e.response.data.message);
    });

export const userLogout = () =>
  api({
    method: 'post',
    url: 'user/logout',
  })
    .then(() => localStorage.removeItem('Authorization'))
    .catch((e) => {
      throw new Error(e.response.data.message);
    });

export const refreshToken = () =>
  api({
    method: 'post',
    url: 'user/refresh',
  })
    .then((response) =>
      localStorage.setItem(
        'Authorization',
        `Bearer ${response.data.accessToken}`
      )
    )
    .catch((e) => {
      localStorage.removeItem('Authorization');
      localStorage.removeItem('isAuthenticated');
      // eslint-disable-next-line no-restricted-globals
      location.pathname = '/login';
      throw new Error(e.response.data.message);
    });
