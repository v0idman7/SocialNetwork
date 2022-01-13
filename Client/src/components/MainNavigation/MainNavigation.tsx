import { Link, Outlet, useNavigate } from 'react-router-dom';
import { userLogout } from '../../services/auth';
import './MainNavigation.scss';

type MainNavigationType = {
  disable?: boolean;
};

const MainNavigation: React.FC<MainNavigationType> = ({ disable }) => {
  const navigate = useNavigate();

  const logoutClick = async () => {
    await userLogout();
    navigate('/');
  };

  return (
    <>
      <nav className='mainNavigation'>
        <ul className='mainNavigation__list navigationList'>
          <li className='navigationList__item'>
            <Link
              className={`navigationList__item__link profile-icon ${
                disable ? 'disabled-link' : ''
              }`}
              to='profile'
            />
          </li>
          <li className='navigationList__item'>
            <Link
              className={`navigationList__item__link news-icon ${
                disable ? 'disabled-link' : ''
              }`}
              to='/news'
            />
          </li>
          <li className='navigationList__item'>
            <Link
              className={`navigationList__item__link chats-icon ${
                disable ? 'disabled-link' : ''
              }`}
              to='/chats'
            />
          </li>
          <li className='navigationList__item'>
            <Link
              className={`navigationList__item__link friends-icon ${
                disable ? 'disabled-link' : ''
              }`}
              to='/friends'
            />
          </li>
          <li className='navigationList__item'>
            <Link
              className={`navigationList__item__link gallery-icon ${
                disable ? 'disabled-link' : ''
              }`}
              to='/gallery'
            />
          </li>
          <li className='navigationList__item'>
            <button
              type='button'
              className='navigationList__item__link settings-icon'
              onClick={logoutClick}
              disabled={disable}
            >
              1
            </button>
          </li>
        </ul>
      </nav>
      <Outlet />
    </>
  );
};

export default MainNavigation;
