import React from 'react';
import { Link } from 'react-router-dom';
import './HomePage.css'
import sectionOneImage from '../assets/headway-5QgIuuBxKwM-unsplash.jpg'

function HomePage() {
  return (
    <>
    <div className="section-one">
      <div className='text'>
      <h1>Where you find the perfect match</h1>
      <div className = "blank-text">
          Finding the perfect job, or the right candidate today with Magnetic Recruitment.
          <p>
          <strong>Want to get the perfect job? </strong>
             It takes one subscription to find a job, instead of hundreds of applications.
          </p>
          <p>
           <strong>Want to get the perfect candidates? </strong>
          It takes one subscription to access thousands of profiles.</p>
      <div className="buttons-section-one">
      <Link to={'/candidate/login'}><button id="candidatebutton">I am looking for a job</button></Link>
      <Link to={'/hr/login'}><button id="hrbutton">I want to recruit</button></Link>
      </div>
      </div>
      </div>
      <div className='img'>
      <img src={sectionOneImage} alt="" width="550"/>
      </div>
    </div>
    <div className="section-two">
      <h2>Candidates</h2>
      <p id="black-text">Use Magnetic Recruitment to search for your perfect job or the next step on your career journey. </p>
      <p id="black-text">You define your most important critera and let recruiters contact you directly. No more need to apply.</p>
      <p id="black-text">Subscription is 100% free and takes only 5 minutes.</p>
      <Link to={'/candidate/login'}><button id="candidatebutton">I am candidate</button></Link>
    </div>
    <div className="section-three">
    <h3>Recruiters</h3>
    <p id="black-text">Get access to a large database of developers ready to start their next adventure!</p>
    <p id="black-text">Select through a wild range of criteria your favorites candidates and contact them directly.</p>
    <p id="black-text">We offer 30 days free trial. Suscribe to access our database!</p>
    <Link to={'/hr/login'}><button id="hrbutton">I am a recruiter</button></Link>

    </div>
    </>
  );
}

export default HomePage;
