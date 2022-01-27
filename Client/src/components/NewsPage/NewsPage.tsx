import { getNewsPost } from '../../services/post';
import ProfilePostBlock from '../ProfilePostBlock/ProfilePostBlock';
import './NewsPage.scss';

const NewsPage = () => (
  <div className='wrapCss'>
    <ProfilePostBlock getPosts={getNewsPost} news />
  </div>
);

export default NewsPage;
