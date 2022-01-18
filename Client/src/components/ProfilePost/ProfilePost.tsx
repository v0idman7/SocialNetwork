import './ProfilePost.scss';

type ProfilePostType = {
  text: string;
  photo?: string;
};

const ProfilePost: React.FC<ProfilePostType> = ({ text, photo }) => (
  <li className='profilePost'>
    {text && <p className='profilePost__text'>{text}</p>}
    {photo &&
      photo
        .split(' ')
        .map((image) => (
          <img
            key={image.length}
            className='profilePost__photo'
            src={`http://localhost:3000/images/${image}`}
            alt='post'
          />
        ))}
  </li>
);

export default ProfilePost;
