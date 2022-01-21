import { io } from 'socket.io-client';
import MessageItem from '../MessageItem/MessageItem';
import './MessageBlock.scss';

type MessageBlockType = {
  photo: string;
  name: string;
};

const MessageBlock: React.FC<MessageBlockType> = ({ photo, name }) => {
  const connectSocket = () => {
    io('http://localhost:3000');
  };
  return (
    <div className='messageBlock'>
      <div className='messageBlock__header'>
        <img className='messageBlock__header__photo' src={photo} alt='friend' />
        <span className='messageBlock__header__name'>{name}</span>
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
  );
};

export default MessageBlock;
