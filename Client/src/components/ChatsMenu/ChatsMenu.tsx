import { useEffect, useState } from 'react';
import { SwitchTransition, CSSTransition } from 'react-transition-group';
import { getChats } from '../../services/chat';
import ChatsItem from '../ChatsItem/ChatsItem';
import MessageBlock from '../MessageBlock/MessageBlock';
import './ChatsMenu.scss';

type UserType = {
  firstName: string;
  lastName: string;
  photo: string;
};

type ChatType = {
  id: number;
  user_id: number;
  user: UserType;
};

const ChatsMenu = () => {
  const [chats, setChats] = useState<Array<ChatType> | null>(null);
  const [currentChat, setCurrentChat] = useState<ChatType | null>(null);

  useEffect(() => {
    getChats().then((result) => setChats(result));
  }, []);

  return (
    <div className='wrapCss'>
      <div className='chatsMenu'>
        <input className='chatsMenu__search' />
        <hr className='chatsMenu__line' />
        <ul className='chatsMenu__list'>
          {chats &&
            chats.map((chat) => (
              <ChatsItem
                key={chat.id}
                name={`${chat.user.firstName} ${chat.user.lastName}`}
                photo={chat.user.photo}
                click={() => setCurrentChat(chat)}
              />
            ))}
        </ul>
      </div>
      <SwitchTransition>
        <CSSTransition
          key={currentChat ? currentChat.id : 'null'}
          addEndListener={(node, done) =>
            node.addEventListener('transitionend', done, false)
          }
          classNames='chatMenuCss'
        >
          <MessageBlock chat={currentChat} />
        </CSSTransition>
      </SwitchTransition>
    </div>
  );
};

export default ChatsMenu;
