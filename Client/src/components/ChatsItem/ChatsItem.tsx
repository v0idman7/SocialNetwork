import './ChatsItem.scss';
import camera from '../../images/camera.jpg';

type ChatsItemType = {
  photo: string;
  name: string;
  newMessage?: number;
  click: () => void;
};

const ChatsItem: React.FC<ChatsItemType> = ({
  photo,
  name,
  newMessage,
  click,
}) => (
  <li className='chatsItem' onClick={click} onKeyDown={click} role='menuitem'>
    <div className='chatsItem__main'>
      <div className='chatsItem__photoWrap'>
        <img
          className='chatsItem__photoWrap__photo'
          src={photo ? `http://localhost:3000/images/${photo}` : camera}
          alt='friend'
        />
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
