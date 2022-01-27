import { useEffect, useState } from 'react';
import { SwitchTransition, CSSTransition } from 'react-transition-group';
import { deletePost } from '../../services/post';
import { checkPosition, throttle } from '../../services/scroll';
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
  getPosts,
  news,
}: {
  getPosts: (page: number) => Promise<any>;
  news?: boolean;
}) => {
  const [allPosts, setAllPosts] = useState<Array<PostType> | null>(null);
  const [userId, setUserId] = useState(0);
  const [hidden, setHidden] = useState(false);
  const [page, setPage] = useState(1);
  const [isEnd, setIsEnd] = useState(false);

  useEffect(() => {
    const postList = document.querySelector('.profilePostBlock__list');
    if (postList) {
      postList.addEventListener(
        'scroll',
        throttle(checkPosition(postList, setPage), 1000)
      );
      postList.addEventListener(
        'resize',
        throttle(checkPosition(postList, setPage), 1000)
      );
    }
    getUserData().then((result) => setUserId(result.id));
  }, []);

  useEffect(() => {
    if (!isEnd) {
      getPosts(page)
        .then((result: Array<PostType>) => {
          setAllPosts((prevPosts) => {
            if (prevPosts) {
              return [...prevPosts, ...result];
            }
            return [...result];
          });
          if (result.length < 10) setIsEnd(true);
        })
        .catch((e) => console.error(e));
    }
  }, [page, getPosts, isEnd]);

  const handleDelete = (id: number) => () => {
    deletePost(id).then(() =>
      setAllPosts((prevPosts) => prevPosts!.filter((post) => post.id !== id))
    );
  };

  const hideClick = () => {
    setHidden((prevHidden) => !prevHidden);
  };

  const addToState = (post: PostType) => {
    setAllPosts((prevPosts) => [post, ...prevPosts!]);
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
            <AddPostBlock hidden={hidden} addToState={addToState} />
          </CSSTransition>
        </SwitchTransition>
        <hr className='profilePostBlock__line' />
        <ul className='profilePostBlock__list'>
          <button
            className='profilePostBlock__hide'
            type='button'
            onClick={hideClick}
          >
            <div
              className={`${
                hidden
                  ? 'profilePostBlock__hideIcon'
                  : 'profilePostBlock__hideIcon--reverse'
              }`}
            >
              ▼
            </div>
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
