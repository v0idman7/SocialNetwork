import { Link, Outlet } from 'react-router-dom';
import './MainNavigation.scss';

const MainNavigation = () => (
  <>
    <nav className='mainNavigation'>
      <ul className='mainNavigation__list navigationList'>
        <li className='navigationList__item'>
          <Link
            className='navigationList__item__link profile-icon'
            to='profile'
          />
        </li>
        <li className='navigationList__item'>
          <Link className='navigationList__item__link news-icon' to='news' />
        </li>
        <li className='navigationList__item'>
          <Link className='navigationList__item__link chats-icon' to='chats' />
        </li>
        <li className='navigationList__item'>
          <Link
            className='navigationList__item__link friends-icon'
            to='friends'
          />
        </li>
        <li className='navigationList__item'>
          <Link
            className='navigationList__item__link gallery-icon'
            to='gallery'
          />
        </li>
        <li className='navigationList__item'>
          <Link
            className='navigationList__item__link settings-icon'
            to='settings'
          />
        </li>
      </ul>
    </nav>
    <Outlet />
  </>
);

export default MainNavigation;
