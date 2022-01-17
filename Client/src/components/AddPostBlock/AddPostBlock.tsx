import { Field, Form, Formik } from 'formik';
import { useState } from 'react';
import add from '../../images/add.svg';
import UploadButton from '../UploadButton/UploadButton';
import './AddPostBlock.scss';

type PostValues = {
  text: string;
  files: FileList | null;
};

const AddPostBlock = () => {
  const [countFiles, setCountFiles] = useState(0);

  const initialValues: PostValues = {
    text: '',
    files: null,
  };
  return (
    <Formik
      initialValues={initialValues}
      validateOnBlur
      onSubmit={(values, actions) => {
        /* userRegistration({
          firstName: values.firstName,
          lastName: values.lastName,
          email: values.email,
          phone: values.phone,
          password: values.password,
        })
          .then(async (id) => {
            await sendFile(values.file, id);
            auth(true);
            navigate(`/`);
          })
          .catch((error) => actions.setStatus(error.message)); */
      }}
    >
      {({
        values,
        errors,
        status,
        touched,
        handleChange,
        handleBlur,
        resetForm,
        setFieldValue,
      }) => (
        <Form className='addPostBlock'>
          <Field
            as='textarea'
            name='text'
            className='addPostBlock__textarea'
            placeholder='Введите текст'
          />
          <div className='addPostBlock__buttons'>
            <UploadButton
              setValue={(value: any) => setFieldValue('files', value)}
            />
            <button type='submit' className='addPostBlock__submitButton'>
              Add
            </button>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default AddPostBlock;
