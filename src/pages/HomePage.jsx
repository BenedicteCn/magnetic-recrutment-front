import React from "react";
import { Link } from "react-router-dom";
import "./HomePage.css";
import ImageOne from "../assets/header.png";
import ImageTwo from "../assets/01.png";

function HomePage() {
  return (
    <>
      <div className="section-one">
        <div className="text">
          <h1>
            Where you find the <div className="maintitle">perfect match</div>
          </h1>
          <div className="blank-text">
            Finding the perfect job, or the right candidate today with Magnetic
            Recruitment.
          </div>
          <div className="buttons-section-one">
            <Link to={"/candidate/login"}>
              <button id="candidatebuttonwhite">I am looking for a job</button>
            </Link>
            <Link to={"/hr/login"}>
              <button id="hrbuttonwhite">I want to recruit</button>
            </Link>
          </div>
        </div>
        <div className="img">
          <img className="ImageOne" src={ImageOne} alt="" width="700" />
        </div>
      </div>
      <div className="section-two">
        <img className="ImageTwo" src={ImageTwo} alt="" />
        <div className="textpart">
          <h2>
            <div className="introduction">Introduction</div> of Magnetic
            Recrutment
          </h2>
          <p id="black-text">
            Use Magnetic Recruitment to search for your perfect job or the next
            step on your career journey.You define your most important critera
            and let recruiters contact you directly. No more need to apply.
            Subscription is 100% free and takes only 5 minutes.
          </p>
        </div>
      </div>
      <div className="section-three">
        <div className="textpartthree">
          <h2>
            <div className="search">
              Search for your perfect job or the next step on your career
              journey.
            </div>
          </h2>
          <p id="black-text">
            Get access to a large database of developers ready to start their
            next adventure! Select through a wild range of criteria your
            favorites candidates and contact them directly. We offer 30 days
            free trial. Suscribe to access our database!
          </p>
          <Link to={"/candidate/login"}>
            <button id="candidatebutton">I am candidate</button>
          </Link>
          <Link to={"/hr/login"}>
            <button id="hrbutton">I am a recruiter</button>
          </Link>
        </div>
      </div>
    </>
  );
}

export default HomePage;
