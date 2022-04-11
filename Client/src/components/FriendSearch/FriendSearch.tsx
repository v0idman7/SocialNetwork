import { useEffect, useState } from 'react';

import './FriendSearch.scss';
import useDebounce from '../../hooks/useDebounce';
import { getSearch } from '../../services/friends';
import camera from '../../images/camera.jpg';

type friendType = {
  id: number;
  firstName: string;
  lastName: string;
  photo: string;
};

const FriendSearch = ({
  friendClick,
}: {
  friendClick: (id: number) => void;
}) => {
  const [input, setInput] = useState('');
  const [friends, setFriends] = useState<Array<friendType> | null>(null);

  const debouncedSearchTerm = useDebounce(input, 1000);

  useEffect(() => {
    if (debouncedSearchTerm) {
      getSearch(debouncedSearchTerm).then((results) => {
        setFriends(results);
      });
    } else {
      setFriends(null);
    }
  }, [debouncedSearchTerm]);

  return (
    <div className='friendSearch'>
      <input
        className='friendSearch__input'
        value={input}
        onInput={(e) => setInput(e.currentTarget.value)}
      />
      {friends && (
        <ul className='friendSearch__list'>
          {friends.map((friend) => (
            <li
              key={friend.id}
              className='friendSearch__user'
              onClick={() => friendClick(friend.id)}
              onKeyUp={() => friendClick(friend.id)}
              role='menuitem'
            >
              <div className='friendSearch__userPhotoWrap'>
                <img
                  className='friendSearch__userPhoto'
                  src={
                    friend.photo
                      ? `http://localhost:3000/images/${friend.photo}`
                      : camera
                  }
                  alt='friend'
                />
              </div>
              <span className='friendSearch__userName'>{`${friend.firstName} ${friend.lastName}`}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default FriendSearch;
