import React from "react";
import { MultiSelect } from "react-multi-select-component";
import { useState } from "react";
import axios from "axios";
import "./CandidateProfile.css";
import DeleteImage from "../assets/svg/trash-bin.svg";
import DownloadImage from "../assets/svg/download-svgrepo-com2.svg";
import { API_URL } from "../utils/constants";

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
  const [remote, setSelectedRemote] = useState([]);
  const [salary, setSelectedSalary] = useState([]);
  const [contract, setSelectedContract] = useState([]);
  const [position, setSelectedPosition] = useState([]);
  const [experience, setSelectedExperience] = useState([]);
  const [cv, setCV] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const remoteCopy = remote.map((x) => x.value);
    const salaryCopy = salary.map((x) => x.value);
    const contractCopy = contract.map((x) => x.value);
    const positionCopy = position.map((x) => x.value);
    const experienceCopy = experience.map((x) => x.value);
    //const requestBody = { remoteCopy, salaryCopy, contractCopy, positionCopy, experienceCopy };

    //console.log("array", requestBody)
    axios({
      method: "PATCH",
      url: "/profile/create",
      baseURL: API_URL,
      data: {
        remote: remoteCopy,
        salary: salaryCopy,
        contract: contractCopy,
        position: positionCopy,
        experience: experienceCopy,
      },
      withCredentials: true,
    }).then((response) => {
      console.log(response);
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
    axios({
      method: "PATCH",
      url: "/profile/create",
      baseURL: API_URL,
      data: fd,
      withCredentials: true,
    })
      .then(function (response) {
        let successMessage = document.querySelector(".success-message");
        successMessage.innerHTML = JSON.stringify(response.data);
      })
      .catch(function (error) {
        let successMessage = document.querySelector(".success-message");
        successMessage.innerHTML = "Please upload a file";
      });

    // const getFileUploaded = () => {
    //   axios
    //     .get(`${API_URL}/api/projects/${projectId}`)
    //     .then((response) => {
    //       const oneProject = response.data;
    //       setProject(oneProject);
    //     })
    //     .catch((error) => console.log(error));
    // };
  };

  return (
    <div>
      <h2 className="section_text"> Edit your profile</h2>
      <p className="description">
        Please tell us more about you and the job you are looking for!
      </p>
      <div className="row">
        <div className="col-md-6">
          <div className="form-group-one">
            <form onSubmit={handleCVUpload}>
              <label>
                <img src={DownloadImage} alt="" width="60" />
                <input
                  type="file"
                  name="cv"
                  class="hidden"
                  onChange={(e) => setCV(e.target.files[0])}
                />
              </label>
              <div className="ulpoaded-file"></div>
              <button className="submit" type="submit">
                Upload CV
              </button>
              <h4>PDF or PNG accepted only</h4>
              <div className="error-message"></div>
            </form>
          </div>

          <form onSubmit={handleSubmit}>
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
          </form>

          <p className="delete">
            <img src={DeleteImage} alt="" width="16px" />
            Delete my account
          </p>
        </div>
      </div>
    </div>
  );
};
export default CandidateProfilePage;
