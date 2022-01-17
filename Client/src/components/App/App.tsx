import { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import ChatsMenu from '../ChatsMenu/ChatsMenu';
import LoginPage from '../LoginPage/LoginPage';
import MainNavigation from '../MainNavigation/MainNavigation';
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
          <Route index element={<ProfilePage />} />
          <Route path='chats' element={<ChatsMenu />} />
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
