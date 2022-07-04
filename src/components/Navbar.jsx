import { Link } from "react-router-dom";
import { useContext } from "react"; // <== IMPORT
import { AuthContext } from "../context/auth.context"; // <== IMPORT
import Logo from "../assets/svg/logo.svg";
import "./Navbar.css";

const Navbar = () => {
  const { isLoggedIn, user, logout } = useContext(AuthContext); // <== ADD

  return (
    <div className="navbar">
      <Link to="/">
        <img className="logo" src={Logo} alt="" width="250px" />
      </Link>

      {/* {console.log(user)} */}

      {/*    UPDATE     */}
      {/*    add the role of the user     */}
      {isLoggedIn && user.role === "HR" && (
        <>
          <Link to="/">
            <button>Search candidates</button>
          </Link>
          <Link to="/">
            <button>CV saved</button>
          </Link>
        </>
      )}

      {isLoggedIn && user.role === "Candidate" && (
        <>
          <Link to="/">
            <button>Profile</button>
          </Link>
        </>
      )}

      {isLoggedIn && (
        <>
          <button onClick={logout}>Logout</button>
          <span>Hi, {user.username}</span>
        </>
      )}

      {!isLoggedIn && (
        <>
          <Link to="/candidate/login">
            {" "}
            <button>I am a candidate</button>{" "}
          </Link>
          <Link to="/hr/login">
            {" "}
            <button>I am a recruiter</button>{" "}
          </Link>
        </>
      )}
    </div>
  );
};

export default Navbar;
