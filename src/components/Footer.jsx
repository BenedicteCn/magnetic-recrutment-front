import React from 'react';
import './Footer.css';
import { Link } from 'react-router-dom';
function Footer() {
  return (
    <>
      <hr />
      <footer>
        <p>&copy; Magnetic Recrutment 2022</p>
        <Link to="/contact">
          <p>About us</p>
        </Link>
      </footer>
    </>
  );
}
export default Footer;
