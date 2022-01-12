import './LoginPage.scss';
import * as Yup from 'yup';
import { Formik, Form, Field } from 'formik';
import { Link } from 'react-router-dom';

interface LoginValues {
  email: string;
  password: string;
}

const LoginPage = () => {
  const initialValues: LoginValues = { email: '', password: '' };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={Yup.object({
        email: Yup.string().email('Invalid email address').required('Required'),
        password: Yup.string()
          .min(6, 'Must be 6 characters or more')
          .required('Required'),
      })}
      validateOnBlur
      onSubmit={(values, actions) => {
        actions.setStatus('ok');
      }}
    >
      {({ values, errors, status, touched, handleChange, handleBlur }) => (
        <Form className='login'>
          <div className='login__inputWrap'>
            <label className='login__inputLabel' htmlFor='email'>
              Email
              <Field
                id='email'
                type='email'
                className='login__input login__email'
                name='email'
                required
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.email}
              />
            </label>
            {touched.email && errors.email && (
              <div className='login__alert'>{errors.email}</div>
            )}
          </div>
          <div className='login__inputWrap'>
            <label className='login__inputLabel' htmlFor='password'>
              Password
              <Field
                id='password'
                type='password'
                className='login__input login__password'
                name='password'
                required
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.password}
              />
            </label>
            {touched.password && errors.password && (
              <div className='login__alert'>{errors.password}</div>
            )}
          </div>
          <div className='login__buttonsWrap'>
            {status && <div className='login__submitAlert'>{status}</div>}
            <button type='submit' className='login__button login__login'>
              Sign In
            </button>
            <Link
              to='/registration'
              className='login__button login__registration'
            >
              Registration
            </Link>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default LoginPage;
