import { useEffect, useState } from 'react';
import { getFriends, getOther } from '../../services/friends';
import './FriendBlock.scss';
import camera from '../../images/camera.jpg';

type friendType = {
  id: number;
  firstName: string;
  lastName: string;
  photo: string;
};

const FriendBlock = () => {
  const [friends, setFriends] = useState<Array<friendType> | null>(null);
  const [others, setOthers] = useState<Array<friendType> | null>(null);

  useEffect(() => {
    getFriends().then((result) => setFriends(result));
    getOther().then((result) => setOthers(result));
  }, []);

  return (
    <div className='friendBlock'>
      {friends && friends.length > 0 && (
        <>
          <div className='friendBlock__lineBlock'>
            <hr className='friendBlock__line' />
            <span className='friendBlock__lineText'>Your friends</span>
          </div>
          <ul className='friendBlock__friendList'>
            {friends.map((friend) => (
              <li key={friend.id} className='friendBlock__user'>
                <img
                  className='friendBlock__userPhoto'
                  src={
                    friend.photo
                      ? `http://localhost:3000/images/${friend.photo}`
                      : camera
                  }
                  alt='friend'
                />
                <span className='friendBlock__userName'>{`${friend.firstName} ${friend.lastName}`}</span>
              </li>
            ))}
          </ul>
        </>
      )}
      {others && others.length > 0 && (
        <>
          <div className='friendBlock__lineBlock'>
            <hr className='friendBlock__line' />
            <span className='friendBlock__lineText'>People you may know</span>
          </div>
          <ul className='friendBlock__otherList'>
            {others.map((other) => (
              <li key={other.id} className='friendBlock__user'>
                <img
                  className='friendBlock__userPhoto'
                  src={
                    other.photo
                      ? `http://localhost:3000/images/${other.photo}`
                      : camera
                  }
                  alt='friend'
                />
                <span className='friendBlock__userName'>{`${other.firstName} ${other.lastName}`}</span>
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
};

export default FriendBlock;
