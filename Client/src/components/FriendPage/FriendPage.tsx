import { SwitchTransition, CSSTransition } from 'react-transition-group';
import { useState } from 'react';
import { getProfileDataId } from '../../services/profile';
import FriendBlock from '../FriendBlock/FriendBlock';
import FriendSearch from '../FriendSearch/FriendSearch';
import ProfileInfo, { ProfileType } from '../ProfileInfo/ProfileInfo';
import './FriendPage.scss';

const FriendPage = () => {
  const [profile, setProfile] = useState<ProfileType | null>(null);

  const handleClick = (id: number) => {
    getProfileDataId(id).then((result) => setProfile(result));
  };
  return (
    <div className='wrapCss'>
      <div className='friendPage'>
        <FriendSearch />
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
