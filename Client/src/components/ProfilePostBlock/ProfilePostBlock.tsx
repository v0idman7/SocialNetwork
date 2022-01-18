import { useEffect, useState } from 'react';
import { getProfilePost } from '../../services/post';
import AddPostBlock from '../AddPostBlock/AddPostBlock';
import ProfilePost from '../ProfilePost/ProfilePost';
import './ProfilePostBlock.scss';

type PostType = {
  id: number;
  text: string;
  photo: string;
};

const ProfilePostBlock = () => {
  const [posts, setPosts] = useState<Array<PostType> | null>(null);

  useEffect(() => {
    getProfilePost()
      .then((result) => setPosts(result))
      .catch((e) => console.error(e));
  }, []);

  return (
    <div className='profilePostBlock'>
      <AddPostBlock />
      <hr className='profilePostBlock__line' />
      <ul className='profilePostBlock__list'>
        {posts &&
          posts.map((post: PostType) => (
            <ProfilePost key={post.id} text={post.text} photo={post.photo} />
          ))}
      </ul>
    </div>
  );
};

export default ProfilePostBlock;
