import React from "react";
import map from "../assets/ironhackadress.png";
import "./Contact.css";

const Contact = () => {
  return (
    <div className="contact">
      <div className="flex-text">
        <p>
          <strong>Developers: </strong>Tzu Yu Chiu & Bénédicte Coulon
        </p>
        <p>
          <strong>Address: </strong>226 Bd Voltaire, 75011 Paris
        </p>

        <p>For any queries:</p>
        <p>
          <button
            className="contact-button"
            onClick={() =>
              (window.location = "mailto:contact.magneticrecruitment@gmail.com")
            }
          >
            Contact Us
          </button>
        </p>
      </div>

      <div className="flex-image">
        <img src={map} alt="" width="600px" className="map" />
      </div>
    </div>
  );
};

export default Contact;
