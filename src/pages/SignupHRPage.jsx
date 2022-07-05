import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Auth.css';
import HRImage from '../assets/recruiter.png';
import { API_URL } from '../utils/constants';

function SignupPage(props) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [errorMessage, setErrorMessage] = useState(undefined);

  const navigate = useNavigate();

  const handleEmail = (e) => setEmail(e.target.value);
  const handlePassword = (e) => setPassword(e.target.value);
  const handleName = (e) => setUsername(e.target.value);

  const handleSignupSubmit = (e) => {
    e.preventDefault();
    axios({
      url: '/hr/signup',
      baseURL: API_URL,
      method: 'post',
      data: {
        email,
        password,
        username,
      },
    })
      .then((response) => {
        navigate('/hr/login');
      })
      .catch((error) => {
        const errorDescription = error.response.data.message;
        setErrorMessage(errorDescription);
      });
  };

  return (
    <div className="SignupPage auth">
      <h2>Sign Up</h2>
      <h3 id="forrecruiter">
        For &nbsp;<div className="recruitercircle">recruiter</div>
      </h3>

      <img className="loginimage" src={HRImage} alt="" width="250px" />

      <form onSubmit={handleSignupSubmit}>
        <label>Email:</label>
        <input type="email" name="email" value={email} onChange={handleEmail} />

        <label>Password:</label>
        <input
          type="password"
          name="password"
          value={password}
          onChange={handlePassword}
        />

        <label>Username:</label>
        <input type="text" name="name" value={username} onChange={handleName} />

        <button className="signup" type="submit">
          Sign Up
        </button>
      </form>

      {errorMessage && <p className="error-message">{errorMessage}</p>}

      <p className="already">
        {' '}
        Already have account?
        <Link to={'/hr/login'}> Login</Link>
      </p>
    </div>
  );
}

export default SignupPage;
