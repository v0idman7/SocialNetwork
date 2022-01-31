import { useEffect, useState } from 'react';
import camera from '../../images/camera.jpg';
import { addComment, deleteComment, getComments } from '../../services/comment';
import './CommentBlock.scss';

type CommentType = {
  id: number;
  text: string;
  post_id: number;
  user_id: number;
  User: {
    id: number;
    firstName: string;
    lastName: string;
    photo: string;
  };
  commentOwner: boolean;
};

const CommentBlock = ({ postID }: { postID: number }) => {
  const [input, setInput] = useState('');
  const [comments, setComments] = useState<Array<CommentType> | null>(null);

  useEffect(() => {
    getComments(postID).then((result) => setComments(result));
  }, [postID]);

  const onAdd = () => {
    if (input) {
      addComment(postID, input).then((result) =>
        setComments((prevComments) => {
          if (prevComments) {
            return [...prevComments, result];
          }
          return [result];
        })
      );
      setInput('');
    }
  };
  const deleteClick = (id: number) => {
    deleteComment(id).then(() =>
      setComments((prevComments) => {
        if (prevComments) {
          return prevComments.filter((comment) => comment.id !== id);
        }
        return null;
      })
    );
  };

  return (
    <div className='commentBlock'>
      <ul className='commentBlock__commentList'>
        {comments?.map((comment) => (
          <div className='commentBlock__comment' key={comment.id}>
            <div className='commentBlock__imgWrap'>
              <img
                className='commentBlock__userPhoto'
                src={
                  comment.User.photo
                    ? `http://localhost:3000/images/${comment.User.photo}`
                    : camera
                }
                alt='comment owner'
              />
            </div>
            <div className='commentBlock__text'>
              <span className='commentBlock__userName'>
                {`${comment.User.firstName} ${comment.User.lastName}`}{' '}
                {comment.commentOwner && (
                  <button
                    className='commentBlock__delete'
                    type='button'
                    onClick={() => deleteClick(comment.id)}
                  >
                    1
                  </button>
                )}
              </span>
              <span className='commentBlock__commentText'>{comment.text}</span>
            </div>
          </div>
        ))}
      </ul>
      <form className='commentBlock__form'>
        <input
          className='commentBlock__input'
          value={input}
          onInput={(e) => setInput(e.currentTarget.value)}
        />
        <button className='commentBlock__button' type='button' onClick={onAdd}>
          Add Comment
        </button>
      </form>
    </div>
  );
};

export default CommentBlock;
