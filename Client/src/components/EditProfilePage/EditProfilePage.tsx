import './EditProfilePage.scss';
import * as Yup from 'yup';
import { Formik, Form, Field } from 'formik';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { uploadImage } from '../../services/upload';
import UploadButton from '../UploadButton/UploadButton';
import { ProfileType } from '../ProfileInfo/ProfileInfo';
import { getProfileData, updateProfileData } from '../../services/profile';

interface EditProfileValues {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  file: Blob | '';
  vk: string;
  instagram: string;
  facebook: string;
  github: string;
  linkedIn: string;
}

const EditProfilePage = () => {
  const [countFiles, setCountFiles] = useState(0);
  const [initialValues, setInitialValues] = useState<EditProfileValues | null>(
    null
  );

  useEffect(() => {
    getProfileData().then((profileData) => {
      setInitialValues({
        firstName: profileData.user.firstName,
        lastName: profileData.user.lastName,
        email: profileData.user.email,
        phone: profileData.user.phone,
        file: '',
        vk: profileData.social?.vk || '',
        instagram: profileData.social?.instagram || '',
        facebook: profileData.social?.facebook || '',
        github: profileData.social?.github || '',
        linkedIn: profileData.social?.linkedIn || '',
      });
    });
  }, []);

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
    initialValues && (
      <div className='wrapCss'>
        <Formik
          initialValues={initialValues}
          validationSchema={Yup.object({
            firstName: Yup.string().min(6, 'Must be 6 characters or more'),
            lastName: Yup.string().min(6, 'Must be 6 characters or more'),
            email: Yup.string().email('Invalid email address'),
            phone: Yup.string().matches(
              phoneRegExp,
              'Phone number is not valid'
            ),
            vk: Yup.string(),
            instagram: Yup.string(),
            facebook: Yup.string(),
            github: Yup.string(),
            linkedIn: Yup.string(),
          })}
          validateOnBlur
          onSubmit={(values, actions) => {
            updateProfileData({
              firstName: values.firstName,
              lastName: values.lastName,
              email: values.email,
              phone: values.phone,
              vk: values.vk,
              instagram: values.instagram,
              facebook: values?.facebook,
              github: values.github,
              linkedIn: values.linkedIn,
            }).then(async (id) => {
              await sendFile(values.file, id);
              navigate(`/profile`);
            });
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
            <Form className='editProfile'>
              <div className='editProfile__inputWrap'>
                <label className='editProfile__inputLabel' htmlFor='firstName'>
                  FirstName
                  <Field
                    id='firstName'
                    className='editProfile__input editProfile__firstName'
                    name='firstName'
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.firstName}
                  />
                </label>
                {touched.firstName && errors.firstName && (
                  <div className='editProfile__alert'>{errors.firstName}</div>
                )}
              </div>
              <div className='editProfile__inputWrap'>
                <label className='editProfile__inputLabel' htmlFor='lastName'>
                  LastName
                  <Field
                    id='lastName'
                    className='editProfile__input editProfile__lastName'
                    name='lastName'
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.lastName}
                  />
                </label>
                {touched.lastName && errors.lastName && (
                  <div className='editProfile__alert'>{errors.lastName}</div>
                )}
              </div>
              <div className='editProfile__inputWrap'>
                <label className='editProfile__inputLabel' htmlFor='email'>
                  Email
                  <Field
                    id='email'
                    type='email'
                    className='editProfile__input editProfile__email'
                    name='email'
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.email}
                  />
                </label>
                {touched.email && errors.email && (
                  <div className='editProfile__alert'>{errors.email}</div>
                )}
              </div>
              <div className='editProfile__inputWrap'>
                <label className='editProfile__inputLabel' htmlFor='phone'>
                  Phone
                  <Field
                    id='phone'
                    className='editProfile__input editProfile__phone'
                    name='phone'
                    placeholder='+375 29 1234567'
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.phone}
                  />
                </label>
                {touched.phone && errors.phone && (
                  <div className='editProfile__alert'>{errors.phone}</div>
                )}
              </div>
              <div className='editProfile__inputWrap'>
                <label className='editProfile__inputLabel' htmlFor='vk'>
                  Vk
                  <Field
                    id='vk'
                    className='editProfile__input editProfile__vk'
                    name='vk'
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.vk}
                  />
                </label>
                {touched.lastName && errors.lastName && (
                  <div className='editProfile__alert'>{errors.vk}</div>
                )}
              </div>
              <div className='editProfile__inputWrap'>
                <label className='editProfile__inputLabel' htmlFor='instagram'>
                  Instagram
                  <Field
                    id='instagram'
                    className='editProfile__input editProfile__instagram'
                    name='instagram'
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.instagram}
                  />
                </label>
                {touched.lastName && errors.lastName && (
                  <div className='editProfile__alert'>{errors.instagram}</div>
                )}
              </div>
              <div className='editProfile__inputWrap'>
                <label className='editProfile__inputLabel' htmlFor='facebook'>
                  Facebook
                  <Field
                    id='facebook'
                    className='editProfile__input editProfile__facebook'
                    name='facebook'
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.facebook}
                  />
                </label>
                {touched.lastName && errors.lastName && (
                  <div className='editProfile__alert'>{errors.facebook}</div>
                )}
              </div>
              <div className='editProfile__inputWrap'>
                <label className='editProfile__inputLabel' htmlFor='github'>
                  Github
                  <Field
                    id='github'
                    className='editProfile__input editProfile__github'
                    name='github'
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.github}
                  />
                </label>
                {touched.lastName && errors.lastName && (
                  <div className='editProfile__alert'>{errors.github}</div>
                )}
              </div>
              <div className='editProfile__inputWrap'>
                <label className='editProfile__inputLabel' htmlFor='linkedIn'>
                  LinkedIn
                  <Field
                    id='linkedIn'
                    className='editProfile__input editProfile__linkedIn'
                    name='linkedIn'
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.linkedIn}
                  />
                </label>
                {touched.lastName && errors.lastName && (
                  <div className='editProfile__alert'>{errors.linkedIn}</div>
                )}
              </div>
              <div className='editProfile__inputWrap editProfile__upload'>
                <UploadButton
                  countFiles={countFiles}
                  setCountFiles={setCountFiles}
                  one
                  setValue={(value: FileList | File) =>
                    setFieldValue('file', value)
                  }
                />
              </div>
              <div className='editProfile__buttonsWrap'>
                {status && (
                  <div className='editProfile__submitAlert'>{status}</div>
                )}
                <button
                  type='submit'
                  className='editProfile__button editProfile__editProfile'
                >
                  Save
                </button>
                <button
                  type='button'
                  className='editProfile__button editProfile__clear'
                  onClick={() => resetForm()}
                >
                  Clear
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    )
  );
};

export default EditProfilePage;
