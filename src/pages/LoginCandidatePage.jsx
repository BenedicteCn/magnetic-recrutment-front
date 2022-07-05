import { useContext, useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/auth.context';
import { API_URL } from '../utils/constants';
import './Auth.css';
import LoginImage from '../assets/login.png';
import GithubImage from '../assets/svg/github.svg';

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
    })
      .then((response) => {
        const { authToken } = response.data;
        console.log(authToken);
        // let the AuthContext have the authToken
        storeToken(authToken);
        authenticateUser();
        // redirect home
        navigate('/profile/create');
      })
      .catch(function (error) {
        let message = document.querySelector('.error-message');
        message.innerHTML = 'Please connect with a candidate profile';
      });

    // axios.interceptors.response.use(undefined, (error) => {
    //   const statusCode = error.response ? error.response.status : null;

    //   if (statusCode === 401) {
    //     let errorMessage = document.querySelector(".error-message");
    //     errorMessage.innerHTML = JSON.stringify(error);
    //   }

    //   if (statusCode >= 500) {
    //     console.log(error);
    //   }

    //   if (statusCode === 400) {
    //     console.log(error);
    //   }

    //   return Promise.reject(error);
    // });
  };

  return (
    <div className="LoginPage auth">
      <h2>Login</h2>

      <img className="loginimage" src={LoginImage} alt="" width="250px" />

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

        <button className="signup" type="submit">
          Login
        </button>
      </form>

      <a className="github" href={`${API_URL}/candidate/auth/github`}>
        <img className="GithubImage" src={GithubImage} alt="" width="18px" />{' '}
        Login with Github
      </a>
      <div className="error-message"></div>

      <p className="already">
        Don't have an account yet?
        <Link to={'/candidate/signup'}> Sign Up</Link>
      </p>
    </div>
  );
}

export default LoginCandidatePage;
