import { useEffect, useState } from 'react';
import useDebounce from '../../hooks/useDebounce';
import { getSearch } from '../../services/friends';
import './FriendSearch.scss';
import camera from '../../images/camera.jpg';

type friendType = {
  id: number;
  firstName: string;
  lastName: string;
  photo: string;
};

const FriendSearch = () => {
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
            <li key={friend.id} className='friendSearch__user'>
              <img
                className='friendSearch__userPhoto'
                src={
                  friend.photo
                    ? `http://localhost:3000/images/${friend.photo}`
                    : camera
                }
                alt='friend'
              />
              <span className='friendSearch__userName'>{`${friend.firstName} ${friend.lastName}`}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default FriendSearch;
