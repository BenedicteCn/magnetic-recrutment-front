import { Link } from 'react-router-dom';
import { useContext } from 'react'; // <== IMPORT
import { AuthContext } from '../context/auth.context'; // <== IMPORT

const Navbar = () => {
  const { isLoggedIn, user, removeToken } = useContext(AuthContext); // <== ADD

  return (
    <div className="navbar">
      <Link to="/">
        <button>Home</button>
      </Link>

      {/* {console.log(user)} */}

      {/*    UPDATE     */}
      {/*    add the role of the user     */}
      {isLoggedIn && user.role === 'HR' && (
        <>
          <Link to="/">
            <button>Search candidates</button>
          </Link>
          <Link to="/">
            <button>CV saved</button>
          </Link>
          <button onClick={removeToken}>Logout</button>
          <span>Hi, {user.username}</span>
        </>
      )}

      {isLoggedIn && user.role === 'Candidate' && (
        <>
          <Link to="/">
            <button>Profile</button>
          </Link>
          <button onClick={removeToken}>Logout</button>
          <span>Hi, {user.username}</span>
        </>
      )}

      {!isLoggedIn && (
        <>
          <Link to="/candidate/login">
            {' '}
            <button>I am a candidate</button>{' '}
          </Link>
          <Link to="/hr/login">
            {' '}
            <button>I am a recruiter</button>{' '}
          </Link>
        </>
      )}
    </div>
  );
};

export default Navbar;
