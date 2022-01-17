import './ProfilePost.scss';

type ProfilePostType = {
  name: string;
  text: string;
  photo?: string;
};

const ProfilePost: React.FC<ProfilePostType> = ({ name, text, photo }) => (
  <li className='profilePost'>
    <span className='profilePost__name'>{name}</span>
    <p className='profilePost__text'>{text}</p>
    {photo && (
      <img
        className='profilePost__photo'
        src={`http://localhost:3000/images/${photo}`}
        alt='post'
      />
    )}
  </li>
);

export default ProfilePost;
