import { useContext, useState } from 'react'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'
import { AuthContext } from '../context/auth.context'
import { API_URL } from '../utils/constants'

function LoginPage(props) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errorMessage, setErrorMessage] = useState(undefined)

  const { storeToken, authenticateUser } = useContext(AuthContext)

  const navigate = useNavigate()

  const handleEmail = (e) => setEmail(e.target.value)
  const handlePassword = (e) => setPassword(e.target.value)

  const handleLoginSubmit = (e) => {
    e.preventDefault()

    axios({
      url: '/auth/login',
      baseURL: API_URL,
      method: 'post',
      data: {
        email,
        password,
      },
    }).then((response) => {
      const { authToken } = response.data
      // let the AuthContext have the authToken
      storeToken(authToken)
      authenticateUser()
      // redirect home
      navigate('/')
    })
  }

  return (
    <div className='LoginPage'>
      <h1>Login</h1>

      <form onSubmit={handleLoginSubmit}>
        <label>Email:</label>
        <input type='email' name='email' value={email} onChange={handleEmail} />

        <label>Password:</label>
        <input
          type='password'
          name='password'
          value={password}
          onChange={handlePassword}
        />

        <button type='submit'>Login</button>
      </form>
      {errorMessage && <p className='error-message'>{errorMessage}</p>}

      <p>Don't have an account yet?</p>
      <Link to={'/signup'}> Sign Up</Link>
    </div>
  )
}

export default LoginPage
