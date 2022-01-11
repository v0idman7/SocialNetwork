import './ChatsItem.scss';

type ChatsItemType = {
  photo: string;
  name: string;
  newMessage?: number;
};

const ChatsItem: React.FC<ChatsItemType> = ({ photo, name, newMessage }) => (
  <li className='chatsItem'>
    <div className='chatsItem__main'>
      <div className='chatsItem__photoWrap'>
        <img className='chatsItem__photoWrap__photo' src={photo} alt='friend' />
        {newMessage && (
          <div className='chatsItem__photoWrap__Message'>{newMessage}</div>
        )}
      </div>
      <span className='chatsItem__profileName'>{name}</span>
    </div>
    <hr className='chatsItem__line' />
  </li>
);

export default ChatsItem;
