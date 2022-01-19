import FriendBlock from '../FriendBlock/FriendBlock';
import FriendSearch from '../FriendSearch/FriendSearch';
import './FriendPage.scss';

const FriendPage = () => (
  <div className='friendPage'>
    <FriendSearch />
    <FriendBlock />
  </div>
);

export default FriendPage;
