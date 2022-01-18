import './RegistrationPage.scss';
import * as Yup from 'yup';
import { Formik, Form, Field } from 'formik';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { userRegistration } from '../../services/auth';
import { uploadImage } from '../../services/upload';
import UploadButton from '../UploadButton/UploadButton';

interface RegistrationValues {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  password: string;
  confirmPassword: string;
  file: Blob | '';
}

const RegistrationPage = ({ auth }: { auth: (login: boolean) => void }) => {
  const [countFiles, setCountFiles] = useState(0);

  const initialValues: RegistrationValues = {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    file: '',
  };

  const phoneRegExp =
    /^\s{0,}\+{1,1}375\s{0,}\({0,1}(([2]{1}([5]{1}|[9]{1}))|([3]{1}[3]{1})|([4]{1}[4]{1}))\){0,1}\s{0,}\s{0,}[0-9]{3,3}\s{0,}[0-9]{4,4}$/;

  const navigate = useNavigate();

  const sendFile = (img: Blob | string, id: number) => {
    if (img === '') return null;
    const data = new FormData();
    data.append('profile', img);
    return uploadImage(data, id);
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={Yup.object({
        firstName: Yup.string()
          .min(6, 'Must be 6 characters or more')
          .required('Required'),
        lastName: Yup.string()
          .min(6, 'Must be 6 characters or more')
          .required('Required'),
        email: Yup.string().email('Invalid email address').required('Required'),
        phone: Yup.string().matches(phoneRegExp, 'Phone number is not valid'),
        password: Yup.string()
          .min(6, 'Must be 6 characters or more')
          .required('Required'),
        confirmPassword: Yup.string()
          .oneOf([Yup.ref('password')], 'Password mismatch')
          .min(6, 'Must be 6 characters or more')
          .required('Required'),
      })}
      validateOnBlur
      onSubmit={(values, actions) => {
        userRegistration({
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
          .catch((error) => actions.setStatus(error.message));
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
        <Form className='registration'>
          <div className='registration__inputWrap'>
            <label className='registration__inputLabel' htmlFor='firstName'>
              FirstName
              <Field
                id='firstName'
                className='registration__input registration__firstName'
                name='firstName'
                required
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.firstName}
              />
            </label>
            {touched.firstName && errors.firstName && (
              <div className='registration__alert'>{errors.firstName}</div>
            )}
          </div>
          <div className='registration__inputWrap'>
            <label className='registration__inputLabel' htmlFor='lastName'>
              LastName
              <Field
                id='lastName'
                className='registration__input registration__lastName'
                name='lastName'
                required
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.lastName}
              />
            </label>
            {touched.lastName && errors.lastName && (
              <div className='registration__alert'>{errors.lastName}</div>
            )}
          </div>
          <div className='registration__inputWrap'>
            <label className='registration__inputLabel' htmlFor='email'>
              Email
              <Field
                id='email'
                type='email'
                className='registration__input registration__email'
                name='email'
                required
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.email}
              />
            </label>
            {touched.email && errors.email && (
              <div className='registration__alert'>{errors.email}</div>
            )}
          </div>
          <div className='registration__inputWrap'>
            <label className='registration__inputLabel' htmlFor='phone'>
              Phone
              <Field
                id='phone'
                className='registration__input registration__phone'
                name='phone'
                placeholder='+375 29 1234567'
                required
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.phone}
              />
            </label>
            {touched.phone && errors.phone && (
              <div className='registration__alert'>{errors.phone}</div>
            )}
          </div>
          <div className='registration__inputWrap'>
            <label className='registration__inputLabel' htmlFor='password'>
              Password
              <Field
                id='password'
                type='password'
                className='registration__input registration__password'
                name='password'
                required
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.password}
              />
            </label>
            {touched.password && errors.password && (
              <div className='registration__alert'>{errors.password}</div>
            )}
          </div>
          <div className='registration__inputWrap'>
            <label
              className='registration__inputLabel'
              htmlFor='confirmPassword'
            >
              Confirm Password
              <Field
                id='confirmPassword'
                type='password'
                className='registration__input registration__confirmPassword'
                name='confirmPassword'
                required
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.confirmPassword}
              />
            </label>
            {touched.confirmPassword && errors.confirmPassword && (
              <div className='registration__alert'>
                {errors.confirmPassword}
              </div>
            )}
          </div>
          <div className='registration__inputWrap registration__upload'>
            <UploadButton
              countFiles={countFiles}
              setCountFiles={setCountFiles}
              one
              setValue={(value: any) => setFieldValue('file', value)}
            />
          </div>
          {/* <div className='registration__inputWrap'>
            <input
              name='file'
              type='file'
              id='inputFile'
              className='inputFile'
              multiple
              onChange={(event) => {
                const input = event.currentTarget.files;
                if (input) {
                  setFieldValue('file', input[0]);
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
          </div> */}
          <div className='registration__buttonsWrap'>
            {status && (
              <div className='registration__submitAlert'>{status}</div>
            )}
            <button
              type='submit'
              className='registration__button registration__registration'
            >
              Registration
            </button>
            <button
              type='button'
              className='registration__button registration__clear'
              onClick={() => resetForm()}
            >
              Clear
            </button>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default RegistrationPage;
