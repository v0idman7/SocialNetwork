import { useState } from 'react';
import add from '../../images/add.svg';
import './UploadButton.scss';

const UploadButton = ({ setValue }: { setValue: (file: any) => void }) => {
  const [countFiles, setCountFiles] = useState(0);
  return (
    <div className='uploadButton'>
      <input
        name='file'
        type='file'
        id='inputFile'
        className='inputFile'
        multiple
        onChange={(event) => {
          const input = event.currentTarget.files;
          if (input) {
            setValue(input[0]);
          }
          if (input && input?.length >= 1) {
            setCountFiles(input.length);
          } else setCountFiles(0);
        }}
      />
      <label htmlFor='inputFile' className='inputFile__button'>
        <span className='inputFile__iconWrapper'>
          <img
            className='inputFile__icon'
            src={add}
            alt='Выбрать файл'
            width='25'
          />
        </span>
        <span className='inputFile__buttonText'>
          {countFiles ? `Выбрано фото: ${countFiles}` : 'Выберите фото'}
        </span>
      </label>
    </div>
  );
};

export default UploadButton;
