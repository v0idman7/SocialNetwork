import { Route, Routes } from 'react-router-dom';
import ChatsMenu from '../ChatsMenu/ChatsMenu';
import LoginPage from '../LoginPage/LoginPage';
import MainNavigation from '../MainNavigation/MainNavigation';
import RegistrationPage from '../RegistrationPage/RegistrationPage';
import './App.scss';

const App = () => (
  <Routes>
    <Route path='/' element={<MainNavigation />}>
      <Route path='chats' element={<ChatsMenu />} />
      <Route path='login' element={<LoginPage />} />
      <Route path='registration' element={<RegistrationPage />} />
    </Route>
  </Routes>
);

export default App;
