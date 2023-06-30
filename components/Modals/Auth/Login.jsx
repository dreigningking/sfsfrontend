import ApplicationLogo from "@/components/ApplicationLogo"
import { useGetUserQuery, useLoginMutation } from "@/lib/redux/apis/endpoints/auth"
import { hide, showRegister } from "@/lib/redux/slices/authModalSlice"
import { Formik } from "formik"
import Cookies from "js-cookie"
import { memo, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Button, Input, InputGroup, Modal } from "reactstrap"
import * as yup from 'yup'

const Login = () => {

  const [loginError, setLoginError] = useState('')
  const [passwordVisible, setPasswordVisible] = useState(false);

  const openModal = useSelector(state => state.authModal)
  const dispatch = useDispatch()

  const [useLogin, { isLoading }] = useLoginMutation()

  const { data: user } = useGetUserQuery()

  const validationSchema = yup.object().shape({
    email: yup.string().email('Invalid email').required('Email is required'),
    password: yup.string().required('Password is required'),
  });

  const handleLogin = async (values) => {
    setLoginError('')

    await useLogin(values)
      .unwrap()
      .then(res => Cookies.set('user_session', res.token, { expires: 365 }))
      .catch(e => setLoginError(e?.data?.message))
  }

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible)
  }

  const requestClose = () => dispatch(hide())

  return (
    <Modal isOpen={(openModal == 'login' && !user)} toggle={requestClose} centered >
      <div className="p-4 p-md-5">
        <ApplicationLogo />

        <Formik
          initialValues={{ email: '', password: '' }}
          validationSchema={validationSchema}
          onSubmit={handleLogin} >
          {({ handleChange, handleBlur, handleSubmit, errors, values }) => (
            <div className="pt-5">

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

              <p className='form-error pt-3'>{loginError}</p>

              <div className="pt-3 flex align-center">
                <Button
                  type="submit"
                  onClick={handleSubmit}
                  active={!isLoading}
                  color="warning"
                  disabled={isLoading}>
                  Login
                </Button>

                <Button
                  onClick={() => dispatch(showRegister())}
                  color="link"
                  active={!isLoading}
                  disabled={isLoading}>
                  Create Account
                </Button>
              </div>
            </div>
          )}
        </Formik>
      </div>
    </Modal>
  )
}

export default memo(Login)