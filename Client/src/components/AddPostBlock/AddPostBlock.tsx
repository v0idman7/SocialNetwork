import { Field, Form, Formik } from 'formik';
import { useState } from 'react';
import { addPost } from '../../services/post';
import { uploadManyImages } from '../../services/upload';
import UploadButton from '../UploadButton/UploadButton';
import './AddPostBlock.scss';

type PostValues = {
  text: string;
  files: FileList | null;
};

const AddPostBlock = ({ hidden }: { hidden: boolean }) => {
  const [countFiles, setCountFiles] = useState(0);
  const initialValues: PostValues = {
    text: '',
    files: null,
  };
  return hidden ? null : (
    <Formik
      initialValues={initialValues}
      validateOnBlur
      onSubmit={async (values, { resetForm }) => {
        if (
          values.text ||
          (values.files !== null && values.files.length !== 0)
        ) {
          if (values.files !== null && values.files.length !== 0) {
            const data = new FormData();
            for (let i = 0; i < values.files.length; i += 1) {
              data.append('images', values.files[i]);
            }
            const files = await uploadManyImages(data);
            addPost(values.text, files.join(' '));
          } else addPost(values.text, '');
        }
        setCountFiles(0);
        resetForm();
      }}
    >
      {({ setFieldValue }) => (
        <Form className='addPostBlock'>
          <Field
            as='textarea'
            name='text'
            className='addPostBlock__textarea'
            placeholder='Input the text of the post'
          />
          <div className='addPostBlock__buttons'>
            <UploadButton
              countFiles={countFiles}
              setCountFiles={setCountFiles}
              one={false}
              setValue={(value: File | FileList) =>
                setFieldValue('files', value)
              }
            />
            <button type='submit' className='addPostBlock__submitButton'>
              Add Post
            </button>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default AddPostBlock;
