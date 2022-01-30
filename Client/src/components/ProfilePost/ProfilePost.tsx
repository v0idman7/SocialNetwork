import { useEffect, useState } from 'react';
import './ProfilePost.scss';
import ImageGallery from 'react-image-gallery';
import camera from '../../images/camera.jpg';
import likeImg from '../../images/like.png';
import dislikeImg from '../../images/dislike.png';
import commentImg from '../../images/comment.png';
import addLike from '../../services/likepost';

type ProfilePostType = {
  id: number;
  text?: string;
  photo?: string;
  user: { userPhoto: string; userName: string };
  deleteClick?: (() => void) | false;
  like: number;
  dislike: number;
  currentUserLike: 'like' | 'dislike' | null;
};

type imageType = {
  original: string;
};

const ProfilePost: React.FC<ProfilePostType> = ({
  id,
  text,
  photo,
  user,
  deleteClick,
  like,
  dislike,
  currentUserLike,
}) => {
  const [images, setImages] = useState<Array<imageType>>([]);
  const [likeNum, setLikeNum] = useState(like);
  const [dislikeNum, setDislikeNum] = useState(dislike);
  const [yourLike, setYourLike] = useState<'like' | 'dislike' | null>(
    currentUserLike
  );
  useEffect(() => {
    if (photo) {
      setImages(
        photo?.split(' ').map((image) => ({
          original: `http://localhost:3000/images/${image}`,
          originalHeight: '400px',
        }))
      );
    }
  }, [photo]);

  const onLike = () => {
    addLike(id, true).then((response) => {
      if (!response.newLike) {
        setLikeNum((prevLikeNum) => prevLikeNum - 1);
        setYourLike(null);
      } else {
        if (response.change)
          setDislikeNum((prevDislikeNum) => prevDislikeNum - 1);
        setLikeNum((prevLikeNum) => prevLikeNum + 1);
        setYourLike('like');
      }
    });
  };
  const onDislike = () => {
    addLike(id, false).then((response) => {
      if (!response.newLike) {
        setDislikeNum((prevDislikeNum) => prevDislikeNum - 1);
        setYourLike(null);
      } else {
        if (response.change) setLikeNum((prevLikeNum) => prevLikeNum - 1);
        setDislikeNum((prevDislikeNum) => prevDislikeNum + 1);
        setYourLike('dislike');
      }
    });
  };

  return (
    <li className='profilePost'>
      <div className='profilePost__user'>
        <div className='profilePost__userPhotoWrap'>
          <img
            className='profilePost__userPhoto'
            src={
              user.userPhoto
                ? `http://localhost:3000/images/${user.userPhoto}`
                : camera
            }
            alt='post owner'
          />
        </div>
        <span className='profilePost__userName'>{user.userName}</span>
        {deleteClick && (
          <button
            className='profilePost__delete'
            type='button'
            onClick={deleteClick}
          >
            1
          </button>
        )}
      </div>
      {text && <p className='profilePost__text'>{text}</p>}
      {photo && (
        <div className='profilePost__photo'>
          <ImageGallery
            items={images}
            showThumbnails={false}
            showPlayButton={false}
          />
        </div>
      )}
      <ul className='profilePost__buttonsList'>
        <li
          className={`profilePost__like ${
            yourLike === 'like' && 'profilePost__like--active'
          }`}
          onClick={onLike}
          onKeyUp={onLike}
          role='menuitem'
        >
          <img className='profilePost__likeImg' src={likeImg} alt='like' />
          {likeNum > 0 && (
            <span className='profilePost__likeNum'>{likeNum}</span>
          )}
        </li>
        <li
          className={`profilePost__dislike ${
            yourLike === 'dislike' && 'profilePost__dislike--active'
          }`}
          onClick={onDislike}
          onKeyUp={onDislike}
          role='menuitem'
        >
          <img
            className='profilePost__dislikeImg'
            src={dislikeImg}
            alt='dislike'
          />
          {dislikeNum > 0 && (
            <span className='profilePost__dislikeNum'>{dislikeNum}</span>
          )}
        </li>
        <li className='profilePost__comment'>
          <img
            className='profilePost__commentImg'
            src={commentImg}
            alt='comment'
          />
        </li>
      </ul>
    </li>
  );
};

export default ProfilePost;
