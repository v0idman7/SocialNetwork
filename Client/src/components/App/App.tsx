import { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import { getUserData } from '../../services/user';
import ChatsMenu from '../ChatsMenu/ChatsMenu';
import LoginPage from '../LoginPage/LoginPage';
import MainNavigation from '../MainNavigation/MainNavigation';
import RegistrationPage from '../RegistrationPage/RegistrationPage';
import './App.scss';

const App = () => (
  <Routes>
    <Route path='/login' element={<LoginPage />} />
    <Route path='/registration' element={<RegistrationPage />} />
    <Route path='/' element={<MainNavigation />}>
      <Route index element={<ChatsMenu />} />
      <Route path='chats' element={<ChatsMenu />} />
    </Route>
  </Routes>
);

export default App;
