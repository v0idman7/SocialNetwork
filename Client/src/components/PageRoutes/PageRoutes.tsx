import { Route, Routes, useLocation } from 'react-router-dom';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import ChatsMenu from '../ChatsMenu/ChatsMenu';
import FriendPage from '../FriendPage/FriendPage';
import NewsPage from '../NewsPage/NewsPage';
import ProfilePage from '../ProfilePage/ProfilePage';
import './PageRoutes.scss';

const PageRoutes = () => {
  const location = useLocation();
  return (
    <TransitionGroup component={null}>
      <CSSTransition key={location.pathname} classNames='fade' timeout={500}>
        <Routes location={location}>
          <Route path='/' element={<NewsPage />} />
          <Route path='/chats' element={<ChatsMenu />} />
          <Route path='/friends' element={<FriendPage />} />
          <Route path='/profile' element={<ProfilePage />} />
        </Routes>
      </CSSTransition>
    </TransitionGroup>
  );
};

export default PageRoutes;
