import { useContext, useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/auth.context';
import { API_URL } from '../utils/constants';
import './Auth.css'

function LoginCandidatePage(props) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState(undefined);

  const { storeToken, authenticateUser } = useContext(AuthContext);

  const navigate = useNavigate();

  const handleEmail = (e) => setEmail(e.target.value);
  const handlePassword = (e) => setPassword(e.target.value);

  const handleLoginSubmit = (e) => {
    e.preventDefault();

    axios({
      url: '/candidate/login',
      baseURL: API_URL,
      method: 'post',
      data: {
        email,
        password,
      },
    }).then((response) => {
      const { authToken } = response.data;
      console.log(authToken)
      // let the AuthContext have the authToken
      storeToken(authToken);
      authenticateUser();
      // redirect home
      navigate('/');
    });
  };

  return (
    <div className="LoginPage">
      <h2>Login</h2>

      <form onSubmit={handleLoginSubmit}>
        <label>Email:</label>
        <input type="email" name="email" value={email} onChange={handleEmail} />

        <label>Password:</label>
        <input
          type="password"
          name="password"
          value={password}
          onChange={handlePassword}
        />

        <button className="signup" type="submit">Login</button>
      </form>
      {errorMessage && <p className="error-message">{errorMessage}</p>}

      <a className="github" href="http://localhost:5005/candidate/auth/github">
        Log in with Github
      </a>

      <p className ="already">Don't have an account yet?

      <Link to={'/candidate/signup'}> Sign Up</Link></p>
    </div>
  );
}

export default LoginCandidatePage;
