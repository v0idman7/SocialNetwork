import { useEffect, useState } from 'react';
import { getProfilePost } from '../../services/post';
import ProfileInfo from '../ProfileInfo/ProfileInfo';
import ProfilePostBlock from '../ProfilePostBlock/ProfilePostBlock';

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

const ProfilePage = () => {
  const [posts, setPosts] = useState<Array<PostType> | null>(null);

  useEffect(() => {
    getProfilePost()
      .then((result) => setPosts(result))
      .catch((e) => console.error(e));
  }, []);

  return (
    <>
      {posts && <ProfilePostBlock posts={posts} />}
      <ProfileInfo />
    </>
  );
};

export default ProfilePage;
