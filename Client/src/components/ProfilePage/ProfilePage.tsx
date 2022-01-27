import './ProfilePage.scss';
import { useEffect, useState } from 'react';
import { getProfilePost } from '../../services/post';
import { getProfileData } from '../../services/profile';
import ProfileInfo, { ProfileType } from '../ProfileInfo/ProfileInfo';
import ProfilePostBlock from '../ProfilePostBlock/ProfilePostBlock';

const ProfilePage = () => {
  const [profile, setProfile] = useState<ProfileType | null>(null);

  useEffect(() => {
    getProfileData().then((profileData) => setProfile(profileData));
  }, []);

  return (
    <div className='wrapCss'>
      <ProfilePostBlock getPosts={getProfilePost} />
      <ProfileInfo profile={profile} />
    </div>
  );
};

export default ProfilePage;
