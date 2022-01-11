import ChatsItem from '../ChatsItem/ChatsItem';
import MessageBlock from '../MessageBlock/MessageBlock';
import './ChatsMenu.scss';

const ChatsMenu = () => (
  <>
    <div className='chatsMenu'>
      <input className='chatsMenu__search' />
      <hr className='chatsMenu__line' />
      <ul className='chatsMenu__list'>
        <ChatsItem
          newMessage={13}
          name='Сергей Войткевич'
          photo='https://sun9-85.userapi.com/impf/c638624/v638624222/498b7/6iq407TRpc0.jpg?size=1080x1080&quality=96&sign=b579a22952a4ca7fc471a3636b2d2ecc&type=album'
        />
        <ChatsItem
          newMessage={1}
          name='Сергей Войткевич'
          photo='https://sun9-85.userapi.com/impf/c638624/v638624222/498b7/6iq407TRpc0.jpg?size=1080x1080&quality=96&sign=b579a22952a4ca7fc471a3636b2d2ecc&type=album'
        />
        <ChatsItem
          name='Сергей Войткевич'
          photo='https://sun9-85.userapi.com/impf/c638624/v638624222/498b7/6iq407TRpc0.jpg?size=1080x1080&quality=96&sign=b579a22952a4ca7fc471a3636b2d2ecc&type=album'
        />
        <ChatsItem
          newMessage={123}
          name='Сергей Войткевич'
          photo='https://sun9-85.userapi.com/impf/c638624/v638624222/498b7/6iq407TRpc0.jpg?size=1080x1080&quality=96&sign=b579a22952a4ca7fc471a3636b2d2ecc&type=album'
        />
        <ChatsItem
          name='Сергей Войткевич'
          photo='https://sun9-85.userapi.com/impf/c638624/v638624222/498b7/6iq407TRpc0.jpg?size=1080x1080&quality=96&sign=b579a22952a4ca7fc471a3636b2d2ecc&type=album'
        />
        <ChatsItem
          newMessage={13}
          name='Сергей Войткевич'
          photo='https://sun9-85.userapi.com/impf/c638624/v638624222/498b7/6iq407TRpc0.jpg?size=1080x1080&quality=96&sign=b579a22952a4ca7fc471a3636b2d2ecc&type=album'
        />
        <ChatsItem
          newMessage={1}
          name='Сергей Войткевич'
          photo='https://sun9-85.userapi.com/impf/c638624/v638624222/498b7/6iq407TRpc0.jpg?size=1080x1080&quality=96&sign=b579a22952a4ca7fc471a3636b2d2ecc&type=album'
        />
        <ChatsItem
          name='Сергей Войткевич'
          photo='https://sun9-85.userapi.com/impf/c638624/v638624222/498b7/6iq407TRpc0.jpg?size=1080x1080&quality=96&sign=b579a22952a4ca7fc471a3636b2d2ecc&type=album'
        />
        <ChatsItem
          newMessage={123}
          name='Сергей Войткевич'
          photo='https://sun9-85.userapi.com/impf/c638624/v638624222/498b7/6iq407TRpc0.jpg?size=1080x1080&quality=96&sign=b579a22952a4ca7fc471a3636b2d2ecc&type=album'
        />
        <ChatsItem
          name='Сергей Войткевич'
          photo='https://sun9-85.userapi.com/impf/c638624/v638624222/498b7/6iq407TRpc0.jpg?size=1080x1080&quality=96&sign=b579a22952a4ca7fc471a3636b2d2ecc&type=album'
        />
        <ChatsItem
          newMessage={13}
          name='Сергей Войткевич'
          photo='https://sun9-85.userapi.com/impf/c638624/v638624222/498b7/6iq407TRpc0.jpg?size=1080x1080&quality=96&sign=b579a22952a4ca7fc471a3636b2d2ecc&type=album'
        />
        <ChatsItem
          newMessage={1}
          name='Сергей Войткевич'
          photo='https://sun9-85.userapi.com/impf/c638624/v638624222/498b7/6iq407TRpc0.jpg?size=1080x1080&quality=96&sign=b579a22952a4ca7fc471a3636b2d2ecc&type=album'
        />
        <ChatsItem
          name='Сергей Войткевич'
          photo='https://sun9-85.userapi.com/impf/c638624/v638624222/498b7/6iq407TRpc0.jpg?size=1080x1080&quality=96&sign=b579a22952a4ca7fc471a3636b2d2ecc&type=album'
        />
        <ChatsItem
          newMessage={123}
          name='Сергей Войткевич'
          photo='https://sun9-85.userapi.com/impf/c638624/v638624222/498b7/6iq407TRpc0.jpg?size=1080x1080&quality=96&sign=b579a22952a4ca7fc471a3636b2d2ecc&type=album'
        />
        <ChatsItem
          name='Сергей Войткевич'
          photo='https://sun9-85.userapi.com/impf/c638624/v638624222/498b7/6iq407TRpc0.jpg?size=1080x1080&quality=96&sign=b579a22952a4ca7fc471a3636b2d2ecc&type=album'
        />
      </ul>
    </div>
    <MessageBlock
      name='Сергей Войткевич'
      photo='https://sun9-85.userapi.com/impf/c638624/v638624222/498b7/6iq407TRpc0.jpg?size=1080x1080&quality=96&sign=b579a22952a4ca7fc471a3636b2d2ecc&type=album'
    />
  </>
);

export default ChatsMenu;
