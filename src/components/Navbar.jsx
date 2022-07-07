import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../context/auth.context';
import Logo from '../assets/svg/logo.svg';
import './Navbar.css';

const Navbar = () => {
  const { isLoggedIn, user, logout } = useContext(AuthContext);

  return (
    <div className="navbar">
      <Link to="/">
        <img className="logo" src={Logo} alt="" width="250px" />
      </Link>

      {isLoggedIn && user.role === 'HR' && (
        <div className="nav-hr">
          <span>Hi, {user.username}</span>
          <Link to="/hr/search">
            <button className="profilesearchcv">Search candidates</button>
          </Link>
          <Link to="/hr/cvsaved">
            <button className="profilesearchcv">CV saved</button>
          </Link>
          <button className="logout" onClick={logout}>
            Logout
          </button>
        </div>
      )}

      {isLoggedIn && user.role === 'Candidate' && (
        <div className="nav-candidate">
          <span>Hi, {user.username}</span>
          <Link to="/profile/create">
            <button className="profilesearchcv">Profile</button>
          </Link>
          <button className="logout" onClick={logout}>
            Logout
          </button>
        </div>
      )}

      {!isLoggedIn && (
        <div className="notloggedin">
          <Link to="/candidate/login">
            {' '}
            <button id="iamacandidate">I am a candidate</button>{' '}
          </Link>
          <Link to="/hr/login">
            {' '}
            <button id="iamarecruiter">I am a recruiter</button>{' '}
          </Link>
        </div>
      )}
    </div>
  );
};

export default Navbar;
