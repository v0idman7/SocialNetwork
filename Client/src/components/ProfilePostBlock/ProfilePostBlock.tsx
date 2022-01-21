import { useCallback, useEffect, useState } from 'react';
import { getProfilePost } from '../../services/post';
import AddPostBlock from '../AddPostBlock/AddPostBlock';
import ProfilePost from '../ProfilePost/ProfilePost';
import './ProfilePostBlock.scss';

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

const ProfilePostBlock = ({
  posts,
  news,
}: {
  posts: Array<PostType> | null;
  news?: boolean;
}) => (
  <div className={`profilePostBlock ${news ? 'newsPostBlock' : ''}`}>
    <div className='profilePostBlock__wrap'>
      <AddPostBlock />
      <hr className='profilePostBlock__line' />
      <ul className='profilePostBlock__list'>
        {posts &&
          posts.map((post: PostType) => (
            <ProfilePost
              key={post.id}
              text={post.text}
              photo={post.photo}
              user={{
                userPhoto: post.User.photo,
                userName: `${post.User.firstName} ${post.User.lastName}`,
              }}
            />
          ))}
      </ul>
    </div>
  </div>
);

ProfilePostBlock.defaultProps = {
  news: false,
};

export default ProfilePostBlock;
