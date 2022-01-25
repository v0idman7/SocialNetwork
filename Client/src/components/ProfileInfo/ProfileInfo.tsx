import './ProfileInfo.scss';
import { useEffect, useState } from 'react';
import camera from '../../images/camera.jpg';
import { addFriend, checkFriend, deleteFriend } from '../../services/friends';

type UserType = {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  photo: string;
  friends: string;
};

export type ProfileType = {
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

const ProfileInfo = ({
  profile,
  friend,
}: {
  profile: ProfileType | null;
  friend?: boolean;
}) => {
  const [isFriend, setIsFriend] = useState(false);
  useEffect(() => {
    if (friend && profile) {
      checkFriend(profile?.user.id).then((result) => setIsFriend(result));
    }
  }, [friend, profile]);

  const handleClick = () => {
    if (profile) {
      if (isFriend) {
        deleteFriend(profile?.user.id).then(() =>
          setIsFriend((prevIsFriend) => !prevIsFriend)
        );
      } else {
        addFriend(profile?.user.id).then(() =>
          setIsFriend((prevIsFriend) => !prevIsFriend)
        );
      }
    }
  };

  return (
    profile && (
      <div className='profileInfo'>
        <div className='profileInfo__photoWrap'>
          <img
            className='profileInfo__photo'
            alt='profile'
            src={
              profile?.user.photo
                ? `http://localhost:3000/images/${profile?.user.photo}`
                : camera
            }
          />
        </div>
        <span className='profileInfo__name'>
          {`${profile?.user.firstName} ${profile?.user.lastName}`}
        </span>
        {friend && (
          <button
            type='button'
            className='profileInfo__subscribe'
            onClick={() => handleClick()}
          >
            {isFriend ? 'Unsubscribe' : 'Subscribe'}
          </button>
        )}
        <ul className='profileInfo__links'>
          <li className='profileInfo__link'>
            <a className='socialLink vk' href={profile?.social?.vk}>
              Vk
            </a>
          </li>
          <li className='profileInfo__link'>
            <a
              className='socialLink instagram'
              href={profile?.social?.instagram}
            >
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
        {profile?.user.friends && (
          <span className='profileInfo__friendsText'>Friends</span>
        )}
        <ul className='profileInfo__friends friendsList'>
          {profile?.friends.map((friendProfile) => (
            <li key={friendProfile.id} className='friendsList__item'>
              <a href='123' className='friendsList__itemLink'>
                <img
                  className='friendsList__itemPhoto'
                  alt='friend'
                  src={
                    friendProfile.photo
                      ? `http://localhost:3000/images/${friendProfile.photo}`
                      : camera
                  }
                />
                <span className='friendsList__itemName'>
                  {friendProfile.firstName}
                </span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    )
  );
};

ProfileInfo.defaultProps = {
  friend: false,
};

export default ProfileInfo;
