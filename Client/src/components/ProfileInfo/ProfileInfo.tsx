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

const ProfileInfo = ({ profile }: { profile: ProfileType | null }) =>
  profile && (
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
      {profile?.user.friends && (
        <span className='profileInfo__friendsText'>Friends</span>
      )}
      <ul className='profileInfo__friends friendsList'>
        {profile?.friends.map((friend) => (
          <li key={friend.id} className='friendsList__item'>
            <a href='123' className='friendsList__itemLink'>
              <img
                className='friendsList__itemPhoto'
                alt='friend'
                src={
                  friend.photo
                    ? `http://localhost:3000/images/${friend.photo}`
                    : camera
                }
              />
              <span className='friendsList__itemName'>{friend.firstName}</span>
            </a>
          </li>
        ))}
      </ul>
    </div>
  );

export default ProfileInfo;
