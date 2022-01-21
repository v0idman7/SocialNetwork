import { io } from 'socket.io-client';
import MessageItem from '../MessageItem/MessageItem';
import './MessageBlock.scss';
import camera from '../../images/camera.jpg';

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

const MessageBlock = ({ chat }: { chat: ChatType | null }) => {
  const connectSocket = () => {
    io('http://localhost:3000');
  };
  return (
    chat && (
      <div className='messageBlock'>
        <div className='messageBlock__header'>
          <img
            className='messageBlock__header__photo'
            src={
              chat.user.photo
                ? `http://localhost:3000/images/${chat.user.photo}`
                : camera
            }
            alt='friend'
          />
          <span className='messageBlock__header__name'>{`${chat.user.firstName} ${chat.user.lastName}`}</span>
        </div>
        <hr className='messageBlock__line' />
        <ul className='messageBlock__chat'>
          <MessageItem text='qwe qwe qwe qwe qwe qwe qwe qwe' owner='friend' />
          <MessageItem text='asd asd asd asd asd asd asd asd' owner='my' />
          <MessageItem text='qwe qwe qwe qwe qwe qwe qwe qwe' owner='friend' />
          <MessageItem text='asd asd asd asd asd asd asd asd' owner='my' />
        </ul>
        <hr className='messageBlock__line' />
        <div className='messageBlock__inputBlock'>
          <input className='messageBlock__inputBlock__input' />
          <button
            type='button'
            className='messageBlock__inputBlock__send'
            onClick={connectSocket}
          >
            Send
          </button>
        </div>
      </div>
    )
  );
};

export default MessageBlock;
