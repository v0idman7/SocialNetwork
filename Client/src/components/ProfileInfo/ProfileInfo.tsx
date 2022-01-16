import { useEffect, useState } from 'react';
import { getProfileData } from '../../services/profile';
import './ProfileInfo.scss';
import camera from '../../images/camera.jpg';

type UserType = {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  photo: string;
};

type ProfileType = {
  user: UserType;
  friends: Array<UserType>;
  social: {
    vk?: string;
    instagram?: string;
    facebook?: string;
    github?: string;
    linkedIn?: string;
  };
};

const ProfileInfo = () => {
  const [profile, setProfile] = useState<ProfileType | null>(null);

  useEffect(() => {
    getProfileData().then((profileData) => setProfile(profileData));
  }, []);
  return (
    <div className='profileInfo'>
      <img
        className='profileInfo__photo'
        alt='profile'
        src={
          profile?.user.photo
            ? `http://localhost:3000/images/${profile?.user.photo}`
            : camera
        }
      />
      <span className='profileInfo__name'>
        {`${profile?.user.firstName} ${profile?.user.lastName}`}
      </span>
      <ul className='profileInfo__links'>
        <li className='profileInfo__link'>
          <a className='socialLink vk' href={profile?.social?.vk}>
            Vk
          </a>
        </li>
        <li className='profileInfo__link'>
          <a className='socialLink instagram' href={profile?.social?.instagram}>
            Instagram
          </a>
        </li>
        <li className='profileInfo__link'>
          <a className='socialLink facebook' href={profile?.social?.facebook}>
            Facebook
          </a>
        </li>
        <li className='profileInfo__link'>
          <a className='socialLink github' href={profile?.social?.github}>
            GitHub
          </a>
        </li>
        <li className='profileInfo__link'>
          <a className='socialLink linkedIn' href={profile?.social?.linkedIn}>
            LinkedIn
          </a>
        </li>
      </ul>
      <div className='profileInfo__contacts contact'>
        <span className='contact__name'>Email</span>
        <span className='contact__item'>{profile?.user.email}</span>
      </div>
      <div className='profileInfo__contacts contact'>
        <span className='contact__name'>Phone</span>
        <span className='contact__item'>{profile?.user.phone}</span>
      </div>
      <ul className='profileInfo__friends friendsList'>
        {profile?.friends.map((friend) => (
          <li key={friend.id} className='friendsList__item friend'>
            <a href='123' className='friend__link'>
              <img className='friend__photo' alt='friend' />
              <span className='friend__name'>{`${friend.firstName} ${friend.lastName}`}</span>
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProfileInfo;
