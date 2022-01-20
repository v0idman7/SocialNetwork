import { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import ChatsMenu from '../ChatsMenu/ChatsMenu';
import FriendPage from '../FriendPage/FriendPage';
import LoginPage from '../LoginPage/LoginPage';
import MainNavigation from '../MainNavigation/MainNavigation';
import NewsPage from '../NewsPage/NewsPage';
import ProfilePage from '../ProfilePage/ProfilePage';
import RegistrationPage from '../RegistrationPage/RegistrationPage';
import './App.scss';

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(
    localStorage.getItem('isAuthenticated')
  );

  const changeAuth = (login: boolean) => {
    if (login) {
      localStorage.setItem('isAuthenticated', 'true');
      setIsAuthenticated('true');
    } else {
      localStorage.removeItem('isAuthenticated');
      setIsAuthenticated(null);
    }
  };

  if (isAuthenticated) {
    return (
      <Routes>
        <Route path='/' element={<MainNavigation auth={changeAuth} />}>
          <Route index element={<NewsPage />} />
          <Route path='chats' element={<ChatsMenu />} />
          <Route path='friends' element={<FriendPage />} />
          <Route path='profile' element={<ProfilePage />} />
        </Route>
      </Routes>
    );
  }
  return (
    <Routes>
      <Route path='/' element={<MainNavigation disable auth={changeAuth} />}>
        <Route index element={<LoginPage auth={changeAuth} />} />
        <Route
          path='/registration'
          element={<RegistrationPage auth={changeAuth} />}
        />
      </Route>
    </Routes>
  );
};

export default App;
