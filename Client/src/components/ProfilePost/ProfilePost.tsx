import { useEffect, useState } from 'react';
import './ProfilePost.scss';
import ImageGallery from 'react-image-gallery';
import camera from '../../images/camera.jpg';
import like from '../../images/like.png';
import dislike from '../../images/dislike.png';
import comment from '../../images/comment.png';

type ProfilePostType = {
  text?: string;
  photo?: string;
  user: { userPhoto: string; userName: string };
  deleteClick?: (() => void) | false;
};

type imageType = {
  original: string;
};

const ProfilePost: React.FC<ProfilePostType> = ({
  text,
  photo,
  user,
  deleteClick,
}) => {
  const [images, setImages] = useState<Array<imageType>>([]);
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
        <li className='profilePost__like'>
          <img className='profilePost__likeImg' src={like} alt='like' />
        </li>
        <li className='profilePost__dislike'>
          <img
            className='profilePost__dislikeImg'
            src={dislike}
            alt='dislike'
          />
        </li>
        <li className='profilePost__comment'>
          <img
            className='profilePost__commentImg'
            src={comment}
            alt='comment'
          />
        </li>
      </ul>
    </li>
  );
};

export default ProfilePost;
