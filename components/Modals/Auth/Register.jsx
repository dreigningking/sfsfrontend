import ApplicationLogo from "@/components/ApplicationLogo"
import { useGetUserQuery, useRegisterMutation } from "@/lib/redux/apis/endpoints/auth"
import { hide, showLogin } from "@/lib/redux/slices/authModalSlice"
import { Formik } from "formik"
import Cookies from "js-cookie"
import { memo, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Button, Input, InputGroup, Modal } from "reactstrap"
import * as yup from 'yup'

const Register = () => {

  const [registerError, setRegisterError] = useState('')
  const [passwordVisible, setPasswordVisible] = useState(false);

  const openModal = useSelector(state => state.authModal)
  const dispatch = useDispatch()

  const [register, { isLoading }] = useRegisterMutation()

  const validationSchema = yup.object().shape({
    name: yup.string().required('Your name please').min(2, 'Use a real name'),
    email: yup.string().email('Invalid email').required('Email is required'),
    password: yup.string()
      .required('Password is required')
      .min(8, 'Password should be at least 8 characters'),
    password_confirmation: yup.string()
      .required('Confirm Password is required')
      .oneOf([yup.ref('password')], 'Passwords do not match')
  });

  const handleRegister = async (values) => {
    await register(values)
      .unwrap()
      .then(res => Cookies.set('user_session', res?.token, { expires: 365 }))
      .catch(e => setRegisterError(e?.data?.message))
  }

  const requestClose = () => dispatch(hide())

  const { data: user } = useGetUserQuery()

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible)
  }

  return (
    <Modal isOpen={(openModal == 'register' && !user)} toggle={requestClose} centered>
      <div className="p-4 p-md-5">
        <ApplicationLogo />

        <Formik
          initialValues={{ name: '', email: '', password: '', password_confirmation: '' }}
          validationSchema={validationSchema}
          onSubmit={handleRegister} >
          {({ handleChange, handleBlur, handleSubmit, errors, values }) => (
            <div className="pt-5">

              <div className="mb-3">
                <Input
                  placeholder="Name"
                  name="name"
                  aria-label="Name"
                  value={values.name}
                  onChange={handleChange('name')}
                  onBlur={handleBlur('name')}
                />
                {errors.name && <p className="form-error">{errors.name}</p>}
              </div>

              <div className="mb-3">
                <Input
                  placeholder="Email"
                  name="email"
                  aria-label="Email"
                  value={values.email}
                  onChange={handleChange('email')}
                  onBlur={handleBlur('email')}
                  autoCapitalize="none"
                />
                {errors.email && <p className="form-error">{errors.email}</p>}
              </div>

              <div className="mb-3">
                <InputGroup>
                  <Input
                    placeholder="Password"
                    aria-label="Password"
                    type={passwordVisible ? 'text' : 'password'}
                    name="password"
                    value={values.password}
                    onBlur={handleBlur('password')}
                    onChange={handleChange('password')}
                  />
                  <Button onClick={togglePasswordVisibility}>
                    {passwordVisible ? 'hide' : 'show'}
                  </Button>
                </InputGroup>
                {errors.password && <p className="form-error">{errors.password}</p>}
              </div>

              <div className="mb-3">
                <Input
                  placeholder="Confirm Password"
                  aria-label="Confirm Password"
                  type='password'
                  name="password_confirmation"
                  value={values.password_confirmation}
                  onBlur={handleBlur('password_confirmation')}
                  onChange={handleChange('password_confirmation')}
                />
                {errors.password_confirmation && <p className="form-error">{errors.password_confirmation}</p>}
              </div>

              <p className='form-error pt-3'>{registerError}</p>

              <div className="pt-3 flex align-center">
                <Button
                  type="submit"
                  onClick={handleSubmit}
                  active={!isLoading}
                  disabled={isLoading}>
                  Register
                </Button>

                <Button
                  onClick={() => dispatch(showLogin())}
                  color="link"
                  active={!isLoading}
                  disabled={isLoading}>
                  Back to Login
                </Button>
              </div>
            </div>
          )}
        </Formik>
      </div>
    </Modal>
  )
}

export default memo(Register)