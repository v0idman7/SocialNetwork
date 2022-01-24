import { useEffect, useRef, useState } from 'react';
import { io } from 'socket.io-client';
import { nanoid } from 'nanoid';
import MessageItem from '../MessageItem/MessageItem';
import './MessageBlock.scss';
import camera from '../../images/camera.jpg';
import { getMessages } from '../../services/message';

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

const socket = io('http://localhost:3000');

const MessageBlock = ({ chatInfo }: { chatInfo: ChatType | null }) => {
  const [chatMessage, setChatMessage] = useState('');
  const [chat, setChat] = useState<
    Array<{
      id: number;
      message: string;
    }>
  >([]);
  const [isAutoScroll, setIsAutoScroll] = useState(true);

  const messagesAnchorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isAutoScroll) {
      messagesAnchorRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [chat, isAutoScroll]);

  useEffect(() => {
    if (chatInfo) {
      getMessages(chatInfo.id).then((result) =>
        setChat(
          result.map((res: any) => ({
            id: res.user_id,
            message: res.message,
          }))
        )
      );
      socket.emit('create', chatInfo.id);

      socket.on('message', ({ chatId, id, message }) => {
        if (chatInfo.id === chatId)
          setChat((prevChat) => [...prevChat, { id, message }]);
      });
    }
  }, [chatInfo]);

  const sendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (chatInfo && chatMessage) {
      socket.emit('message', {
        chatId: chatInfo.id,
        id: chatInfo.user_id,
        message: chatMessage,
      });
    }
    setChatMessage('');
  };

  const scrollHandler = (e: React.UIEvent<HTMLUListElement, UIEvent>) => {
    const element = e.currentTarget;
    if (
      Math.abs(
        element.scrollHeight - element.scrollTop - element.clientHeight
      ) < 300
    ) {
      if (!isAutoScroll) setIsAutoScroll(true);
    } else if (isAutoScroll) setIsAutoScroll(false);
  };

  return (
    chatInfo && (
      <div className='messageBlock'>
        <div className='messageBlock__header'>
          <img
            className='messageBlock__header__photo'
            src={
              chatInfo.friend.photo
                ? `http://localhost:3000/images/${chatInfo.friend.photo}`
                : camera
            }
            alt='friend'
          />
          <span className='messageBlock__header__name'>{`${chatInfo.friend.firstName} ${chatInfo.friend.lastName}`}</span>
        </div>
        <hr className='messageBlock__line' />
        <ul className='messageBlock__chat' onScroll={scrollHandler}>
          {chat.map(({ id, message }) => (
            <MessageItem
              key={nanoid()}
              text={message}
              owner={id === chatInfo.user_id ? 'my' : 'friend'}
            />
          ))}
          <div ref={messagesAnchorRef} />
        </ul>
        <hr className='messageBlock__line' />
        <form className='messageBlock__inputBlock' onSubmit={sendMessage}>
          <input
            className='messageBlock__inputBlock__input'
            value={chatMessage}
            onInput={(e) => setChatMessage(e.currentTarget.value)}
          />
          <button type='submit' className='messageBlock__inputBlock__send'>
            Send
          </button>
        </form>
      </div>
    )
  );
};

export default MessageBlock;
