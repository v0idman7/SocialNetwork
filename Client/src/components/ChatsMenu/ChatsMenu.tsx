import { useEffect, useState } from 'react';
import { SwitchTransition, CSSTransition } from 'react-transition-group';

import './ChatsMenu.scss';
import { addChat, deleteChat, getChats } from '../../services/chat';
import ChatsItem from '../ChatsItem/ChatsItem';
import FriendBlock from '../FriendBlock/FriendBlock';
import MessageBlock from '../MessageBlock/MessageBlock';
import plus from '../../images/plus.png';
import FriendSearch from '../FriendSearch/FriendSearch';

type UserType = {
  firstName: string;
  lastName: string;
  photo: string;
};

type ChatType = {
  id: number;
  user_id: number;
  friend_id: number;
  friend: UserType;
};

const ChatsMenu = () => {
  const [chats, setChats] = useState<Array<ChatType> | null>(null);
  const [currentChat, setCurrentChat] = useState<ChatType | null>(null);
  const [search, setSearch] = useState('');
  const [isAdd, setIsAdd] = useState(false);

  useEffect(() => {
    if (!isAdd) getChats().then((result) => setChats(result));
  }, [isAdd]);

  const addChatClick = () => {
    setIsAdd(true);
    setCurrentChat(null);
  };

  const friendClick = (id: number) => {
    addChat(id).then((result) => {
      setCurrentChat(result);
      setIsAdd(false);
    });
  };

  const deleteChatClick = (id: number) => {
    if (chats && currentChat) {
      deleteChat(id)
        .then(() =>
          setChats((prevChats) =>
            prevChats!.filter((chat) => chat.id !== currentChat.id)
          )
        )
        .then(() => setCurrentChat(null));
    }
  };

  return (
    <div className='wrapCss'>
      {isAdd ? (
        <div className='addChatMenu'>
          <FriendSearch friendClick={friendClick} />
          <FriendBlock friendClick={friendClick} />
        </div>
      ) : (
        <div className='chatsMenu'>
          <input
            className='chatsMenu__search'
            value={search}
            onInput={(e) => setSearch(e.currentTarget.value)}
          />
          <hr className='chatsMenu__line' />
          <ul className='chatsMenu__list'>
            <ChatsItem
              key='add'
              name='Add new chat'
              photo={plus}
              plus
              click={addChatClick}
            />
            {chats &&
              chats
                .filter((chat) =>
                  `${chat.friend.firstName} ${chat.friend.lastName}`
                    .toLowerCase()
                    .includes(search.toLowerCase())
                )
                .map((chat) => (
                  <ChatsItem
                    key={chat.id}
                    name={`${chat.friend.firstName} ${chat.friend.lastName}`}
                    photo={chat.friend.photo}
                    click={() => setCurrentChat(chat)}
                  />
                ))}
          </ul>
        </div>
      )}
      <SwitchTransition>
        <CSSTransition
          key={currentChat ? currentChat.id : 'null'}
          addEndListener={(node, done) =>
            node.addEventListener('transitionend', done, false)
          }
          classNames='chatMenuCss'
        >
          <MessageBlock chatInfo={currentChat} deleteClick={deleteChatClick} />
        </CSSTransition>
      </SwitchTransition>
    </div>
  );
};

export default ChatsMenu;
