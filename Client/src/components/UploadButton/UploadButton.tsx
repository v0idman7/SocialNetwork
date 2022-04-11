import './UploadButton.scss';
import add from '../../images/add.svg';

type UploadButtonType = {
  one: boolean;
  setValue: (file: FileList | File) => void;
  setCountFiles: (count: number) => void;
  countFiles: number;
};

const UploadButton: React.FC<UploadButtonType> = ({
  one,
  setValue,
  setCountFiles,
  countFiles,
}) => (
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
          if (one) {
            setValue(input[0]);
          } else setValue(input);
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
        {countFiles ? `${countFiles} photos selected` : 'Select photo'}
      </span>
    </label>
  </div>
);

export default UploadButton;
