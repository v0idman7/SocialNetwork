import './MessageItem.scss';

type MessageItemType = {
  text: string;
  owner: 'my' | 'friend';
};

const MessageItem: React.FC<MessageItemType> = ({ text, owner }) => (
  <div className={`messageItem ${owner}`}>
    <p className='messageItem__text'>{text}</p>
  </div>
);

export default MessageItem;
