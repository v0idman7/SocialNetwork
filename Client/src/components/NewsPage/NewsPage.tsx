import { useEffect, useState } from 'react';
import { getNewsPost } from '../../services/post';
import ProfilePostBlock from '../ProfilePostBlock/ProfilePostBlock';
import './NewsPage.scss';

type PostType = {
  id: number;
  text: string;
  photo: string;
  User: {
    id: number;
    firstName: string;
    lastName: string;
    photo: string;
  };
};

const NewsPage = () => {
  const [posts, setPosts] = useState<Array<PostType> | null>(null);

  useEffect(() => {
    getNewsPost()
      .then((result) => setPosts(result))
      .catch((e) => console.error(e));
  }, []);

  return (
    <div className='wrapCss'>
      <ProfilePostBlock posts={posts} news />
    </div>
  );
};

export default NewsPage;
