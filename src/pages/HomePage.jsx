import React from 'react';
import { Link } from 'react-router-dom';


function HomePage() {
  return (
    <div>
      <h1>Magnetic Recruitment</h1>
      <p>
        We match candidates with tech profile to the inspiring companies. Tell
        us more about your goals and we'll match you with the right jobs.
      </p>
      <Link to={'/candidate/login'}><button>I AM A CANDIDATE</button></Link>
      <Link to={'/hr/login'}><button>I AM A RECRUITER</button></Link>
      <div>
        <h4>Want to get a job?</h4>
        <p>
          Create your free profile by uploading CV or GitHub to get interview
          invites and jobs that work for you.
        </p>
      </div>
      <div>
        <h4>Want to get the perfect candidates?</h4>
        <p>We offer 30 days free trais. Suscribe us to review the talents!</p>
      </div>
    </div>
  );
}

export default HomePage;
