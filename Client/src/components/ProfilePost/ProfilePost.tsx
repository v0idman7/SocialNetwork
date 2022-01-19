import { useEffect, useState } from 'react';
import './ProfilePost.scss';
import ImageGallery from 'react-image-gallery';
import camera from '../../images/camera.jpg';

type ProfilePostType = {
  text?: string;
  photo?: string;
  user: { userPhoto: string; userName: string };
};

type imageType = {
  original: string;
};

const ProfilePost: React.FC<ProfilePostType> = ({ text, photo, user }) => {
  const [images, setImages] = useState<Array<imageType>>([]);
  useEffect(() => {
    if (photo) {
      setImages(
        photo?.split(' ').map((image) => ({
          original: `http://localhost:3000/images/${image}`,
        }))
      );
    }
  }, [photo]);

  return (
    <li className='profilePost'>
      <div className='profilePost__user'>
        <img
          className='profilePost__userPhoto'
          src={
            user.userPhoto
              ? `http://localhost:3000/images/${user.userPhoto}`
              : camera
          }
          alt='post owner'
        />
        <span className='profilePost__userName'>{user.userName}</span>
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
    </li>
  );
};

export default ProfilePost;
