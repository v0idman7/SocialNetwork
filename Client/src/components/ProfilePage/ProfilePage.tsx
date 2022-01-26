import './ProfilePage.scss';
import { useEffect, useState } from 'react';
import { getProfilePost } from '../../services/post';
import { getProfileData } from '../../services/profile';
import ProfileInfo, { ProfileType } from '../ProfileInfo/ProfileInfo';
import ProfilePostBlock from '../ProfilePostBlock/ProfilePostBlock';

type PostType = {
  id: number;
  text: string;
  photo: string;
  User: {
    id: number;
    firstName: string;
    lastName: string;
    photo: string;
  };
};

const ProfilePage = () => {
  const [posts, setPosts] = useState<Array<PostType> | null>(null);
  const [profile, setProfile] = useState<ProfileType | null>(null);

  useEffect(() => {
    getProfilePost()
      .then((result) => setPosts(result))
      .catch((e) => console.error(e));
  }, []);

  useEffect(() => {
    getProfileData().then((profileData) => setProfile(profileData));
  }, []);

  return (
    <div className='wrapCss'>
      <ProfilePostBlock posts={posts} />
      <ProfileInfo profile={profile} />
    </div>
  );
};

export default ProfilePage;
