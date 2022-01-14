import { useEffect, useState } from 'react';
import { getProfileData } from '../../services/profile';
import './ProfileInfo.scss';

type UserType = {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
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
      <img className='profileInfo__photo' alt='profile' />
      <span className='profileInfo__name'>
        {`${profile?.user.firstName} ${profile?.user.lastName}`}
      </span>
      <ul className='profileInfo__links'>
        <li className='profileInfo__link'>
          <a className='socialLink instagram' href={profile?.social?.instagram}>
            1
          </a>
        </li>
        <li className='profileInfo__link'>
          <a className='socialLink facebook' href={profile?.social?.facebook}>
            1
          </a>
        </li>
        <li className='profileInfo__link'>
          <a className='socialLink github' href={profile?.social?.github}>
            1
          </a>
        </li>
        <li className='profileInfo__link'>
          <a className='socialLink linkedIn' href={profile?.social?.linkedIn}>
            1
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
