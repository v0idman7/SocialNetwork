import { Route, Routes } from 'react-router-dom';
import ChatsMenu from '../ChatsMenu/ChatsMenu';
import MainNavigation from '../MainNavigation/MainNavigation';
import './App.scss';

const App = () => (
  <Routes>
    <Route path='/' element={<MainNavigation />}>
      <Route path='chats' element={<ChatsMenu />} />
    </Route>
  </Routes>
);

export default App;
