import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const API_URL = 'http://localhost:5005';

function SignupCandidatePage(props) {

  // const github = () => {
  //   window.open("http://localhost:3000/candidate/auth/github", "_self");
  // };
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState("");
  const [errorMessage, setErrorMessage] = useState(undefined);

  const navigate = useNavigate();

  const handleEmail = (e) => setEmail(e.target.value);
  const handlePassword = (e) => setPassword(e.target.value);
  const handleName = (e) => setUsername(e.target.value);

  const handleSignupSubmit = (e) => {
    e.preventDefault();
    axios({
      url: '/candidate/signup',
      baseURL: API_URL,
      method: 'post',
      data: {
        email,
        password,
        username,
      },
    })
      .then((response) => {
        navigate('/candidate/login');
      })
      .catch((error) => {
        const errorDescription = error.response.data.message;
        setErrorMessage(errorDescription);
      });
  };

  return (
    <div className="SignupPage">
      <h1>Sign Up</h1>

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
        <input type="text" name="username" value={username} onChange={handleName} />

        <button type="submit">Sign Up</button>
      </form>
      {errorMessage && <p className="error-message">{errorMessage}</p>}

      <a href="http://localhost:5005/candidate/auth/github">
              Sign in with Github

      </a>

      {/* <div className="github" onClick={github}> */}
       {/* <img src={Github} alt="" className="icon" /> */}
      {/* </div> */}

      <hr/>

      <p>Already have account?</p>
      <Link to={'/candidate/login'}> Login</Link>

    </div>
  );
}

export default SignupCandidatePage;
