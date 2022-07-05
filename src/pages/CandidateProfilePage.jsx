import React, { useContext } from "react";
import { MultiSelect } from "react-multi-select-component";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import "./CandidateProfile.css";
import DeleteImage from "../assets/svg/trash-bin.svg";
import DownloadImage from "../assets/svg/download-svgrepo-com2.svg";
import makeRequest from "../utils/service";
import { AuthContext } from "../context/auth.context";

const optionsRemote = [
  { value: "Full", label: "Full" },
  { value: "Hybride", label: "Hybride" },
  { value: "On-site", label: "On-site" },
];

const optionsSalary = [
  { label: "< 30 000 €", value: "<30 000" },
  { label: "30 000 - 40 000 €", value: "[30 000 - 40 000]" },
  { label: "40 000 - 55 000 €", value: "[40 000 - 55 000]" },
  { label: "55 000 - 70 000 €", value: "[55 000 - 70 000]" },
  { label: "70 000 - 85 000 €", value: "[70 000 - 85 000]" },
  { label: "> 85 000 €", value: "> 85 000" },
];

const optionsContract = [
  { label: "Internship", value: "Internship" },
  { label: "Freelance", value: "Freelance" },
  { label: "Full-time", value: "Full-time" },
  { label: "Part-time", value: "Part-time" },
];

const optionsTechnologies = [
  { label: "HTML", value: "HTML" },
  { label: "CSS", value: "CSS" },
  { label: "Ruby", value: "Ruby" },
  { label: "JavaScript", value: "JavaScript" },
  { label: "React", value: "React" },
  { label: "Java", value: "Java" },
  { label: "Python", value: "Python" },
  { label: "PHP", value: "PHP" },
  { label: "Angular", value: "Angular" },
  { label: "Swift", value: "Swift" },
  { label: "C++, C or C#", value: "C++, C or C#" },
  { label: "Rust", value: "Rust" },
  { label: "Scala", value: "Scala" },
  { label: "MongoDB", value: "MongoDB" },
  { label: "SQL", value: "SQL" },
  { label: "Other", value: "Other" },
];

const optionsPosition = [
  { label: "Full-stack Developer", value: "Full-stack Developer" },
  { label: "Front-end Developer", value: "Front-end Developer" },
  { label: "Back-end Developer", value: "Back-end Developer" },
  { label: "Software Engineer", value: "Software Engineer" },
];

const optionsExperience = [
  { label: "< 2 years", value: "< 2 years" },
  { label: "2-5 years", value: "2-5 years" },
  { label: "5-10 years", value: "5-10 years" },
  { label: "> 10 years", value: "> 10 years" },
];

const CandidateProfilePage = () => {
  const [username, setUserName] = useState("");
  const [remote, setSelectedRemote] = useState([]);
  const [salary, setSelectedSalary] = useState([]);
  const [contract, setSelectedContract] = useState([]);
  const [technologies, setSelectedTechnologies] = useState([]);
  const [position, setSelectedPosition] = useState([]);
  const [experience, setSelectedExperience] = useState([]);
  const [cv, setCV] = useState("");

  const { getToken } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const remoteCopy = remote.map((x) => x.value);
    const salaryCopy = salary.map((x) => x.value);
    const contractCopy = contract.map((x) => x.value);
    const technologiesCopy = technologies.map((x) => x.value);
    const positionCopy = position.map((x) => x.value);
    const experienceCopy = experience.map((x) => x.value);
    //const requestBody = { remoteCopy, salaryCopy, contractCopy, positionCopy, experienceCopy };

    //console.log("array", requestBody)
    const token = getToken();
    makeRequest({
      token,
      method: "PATCH",
      url: "/profile",
      data: {
        username: username,
        remote: remoteCopy,
        salary: salaryCopy,
        contract: contractCopy,
        technologies: technologiesCopy,
        position: positionCopy,
        experience: experienceCopy,
      },
    }).then((response) => {
      console.log(response);
      let successMessageTwo = document.querySelector(".success-message-two");
      successMessageTwo.innerHTML = "Profile updated";
    });

    // )
    //     // Reset the state
    //     setSelectedRemote("");
    //     setSelectedSalary("");
    //     setSelectedContract("");
    //     setSelectedPosition("");
    //     setSelectedExperience("");
    //   })
    // .catch((error) => console.log(error));
  };

  const handleCVUpload = (e) => {
    e.preventDefault();
    const fd = new FormData();
    console.log(cv);
    fd.append("cv", cv);
    makeRequest({
      token: getToken(),
      method: "PATCH",
      url: "/profile",
      data: fd,
    })
      .then(function (response) {
        let successMessage = document.querySelector(".success-message");
        successMessage.innerHTML = "CV uploaded";
      })
      .catch(function (error) {
        let successMessage = document.querySelector(".success-message");
        successMessage.innerHTML = "Please upload a file";
      });
  };

  const deleteProfile = (e) => {
    const token = getToken();
    makeRequest({
      token,
      method: "DELETE",
      url: "/delete/:id",
    }).then((response) => {
      console.log(response);
      navigate("/");
    });
  };

  return (
    <div className="EditProfile">
      <h2 className="section_text"> Edit your profile</h2>
      <p className="description">
        Please tell us more about you and the job you are looking for!
      </p>
      <div className="row">
        <div className="col-md-6">
          <div className="form-group-one">
            <form onSubmit={handleCVUpload}>
              <label>
                <div className="flexbox">
                  <img
                    src={DownloadImage}
                    className="cloud"
                    alt=""
                    width="200"
                  />
                  <input
                    type="file"
                    name="cv"
                    className="cloudinaryinput"
                    onChange={(e) => setCV(e.target.files[0])}
                  />
                </div>
              </label>
              <div className="ulpoaded-file"></div>
              <button className="submit" type="submit">
                Upload CV
              </button>
              <p>PDF or PNG accepted only</p>
              <div className="error-message"></div>
              <div className="success-message"></div>
            </form>
          </div>

          <form onSubmit={handleSubmit}>
            <label>Username:</label>
            {/* <input
              type="text"
              name="name"
              value={username}
              onChange={(item) => {
                setUserName(item);
              }}
            /> */}
            <input
              value={username}
              type="text"
              className="usernameinput"
              placeholder="e.g. John Doe"
              onChange={(event) => setUserName(event.target.value)}
            />

            <label>Remote option desired:</label>
            <MultiSelect
              options={optionsRemote}
              value={remote}
              onChange={(item) => setSelectedRemote(item)}
              labelledBy="Select"
            />

            <label>Expected salary:</label>
            <MultiSelect
              options={optionsSalary}
              value={salary}
              onChange={(item) => setSelectedSalary(item)}
              labelledBy="Select"
            />

            <label>Contract type:</label>
            <MultiSelect
              options={optionsContract}
              value={contract}
              onChange={(item) => setSelectedContract(item)}
              labelledBy="Select"
            />

            <label>Technologies used:</label>
            <MultiSelect
              options={optionsTechnologies}
              value={technologies}
              onChange={(item) => setSelectedTechnologies(item)}
              labelledBy="Select"
            />

            <label>Position searched:</label>
            <MultiSelect
              options={optionsPosition}
              value={position}
              onChange={(item) => setSelectedPosition(item)}
              labelledBy="Select"
            />

            <label>Professional experience:</label>
            <MultiSelect
              options={optionsExperience}
              value={experience}
              onChange={(item) => setSelectedExperience(item)}
              labelledBy="Select"
            />

            <button className="submit" type="submit">
              Edit Profile
            </button>
            <div className="success-message-two"></div>
          </form>

          <button
            onClick={(e) => deleteProfile(e.target.value)}
            className="delete-account"
          >
            <img src={DeleteImage} alt="" width="16px" />
            &nbsp;Delete my account
          </button>
        </div>
      </div>
    </div>
  );
};
export default CandidateProfilePage;
