import { SwitchTransition, CSSTransition } from 'react-transition-group';
import { useState } from 'react';

import './FriendPage.scss';
import { getProfileDataId } from '../../services/profile';
import FriendBlock from '../FriendBlock/FriendBlock';
import FriendSearch from '../FriendSearch/FriendSearch';
import ProfileInfo, { ProfileType } from '../ProfileInfo/ProfileInfo';

const FriendPage = () => {
  const [profile, setProfile] = useState<ProfileType | null>(null);

  const handleClick = (id: number) => {
    getProfileDataId(id).then((result) =>
      setProfile({ ...result, friend: true })
    );
  };
  return (
    <div className='wrapCss'>
      <div className='friendPage'>
        <FriendSearch friendClick={handleClick} />
        <FriendBlock friendClick={handleClick} />
      </div>
      <SwitchTransition>
        <CSSTransition
          key={profile ? profile.user.email : 'null'}
          addEndListener={(node, done) =>
            node.addEventListener('transitionend', done, false)
          }
          classNames='profileInfoCss'
        >
          <ProfileInfo profile={profile} friend />
        </CSSTransition>
      </SwitchTransition>
    </div>
  );
};

export default FriendPage;
