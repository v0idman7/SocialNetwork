import { useEffect, useState } from 'react';
import { SwitchTransition, CSSTransition } from 'react-transition-group';
import { deletePost } from '../../services/post';
import getUserData from '../../services/user';
import AddPostBlock from '../AddPostBlock/AddPostBlock';
import ProfilePost from '../ProfilePost/ProfilePost';
import './ProfilePostBlock.scss';

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

const ProfilePostBlock = ({
  posts,
  news,
}: {
  posts: Array<PostType> | null;
  news?: boolean;
}) => {
  const [allPosts, setAllPosts] = useState<Array<PostType> | null>(null);
  const [userId, setUserId] = useState(0);
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    getUserData().then((result) => setUserId(result.id));
  }, []);

  useEffect(() => {
    if (posts) setAllPosts(posts);
  }, [posts]);

  const handleDelete = (id: number) => () => {
    deletePost(id).then(() =>
      setAllPosts((prevPosts) => prevPosts!.filter((post) => post.id !== id))
    );
  };

  const hideClick = () => {
    setHidden((prevHidden) => !prevHidden);
  };
  return (
    <div
      className={`profilePostBlock ${news ? 'newsPostBlock' : ''} ${
        hidden ? 'profilePostBlock--big' : ''
      }`}
    >
      <div className='profilePostBlock__wrap'>
        <SwitchTransition>
          <CSSTransition
            key={hidden ? 'addPostBlockHidden' : 'addPostBlock'}
            addEndListener={(node, done) =>
              node.addEventListener('transitionend', done, false)
            }
            classNames='addPostBlockCss'
          >
            <AddPostBlock hidden={hidden} />
          </CSSTransition>
        </SwitchTransition>
        <hr className='profilePostBlock__line' />
        <ul className='profilePostBlock__list'>
          <button
            className='profilePostBlock__hide'
            type='button'
            onClick={hideClick}
          >
            {hidden ? '▼' : '▲'}
          </button>
          {allPosts &&
            allPosts.map((post: PostType) => (
              <ProfilePost
                key={post.id}
                text={post.text}
                photo={post.photo}
                user={{
                  userPhoto: post.User.photo,
                  userName: `${post.User.firstName} ${post.User.lastName}`,
                }}
                deleteClick={+userId === +post.User.id && handleDelete(post.id)}
              />
            ))}
        </ul>
      </div>
    </div>
  );
};

ProfilePostBlock.defaultProps = {
  news: false,
};

export default ProfilePostBlock;
