import { useEffect, useState } from 'react';
import { getNewsPost } from '../../services/post';
import ProfilePostBlock from '../ProfilePostBlock/ProfilePostBlock';
import './NewsPage.scss';

type PostType = {
  id: number;
  text: string;
  photo: string;
  User: {
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

  return posts && <ProfilePostBlock posts={posts} news />;
};

export default NewsPage;
