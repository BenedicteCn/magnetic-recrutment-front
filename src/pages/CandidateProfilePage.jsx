import React from 'react'
import { MultiSelect } from "react-multi-select-component";
import { useState } from 'react'
import axios from "axios";
import { Navigate } from 'react-router-dom';
import './CandidateProfile.css'


const optionsRemote = [
  { value: 'Full', label: 'Full' },
  { value: 'Hybride', label: 'Hybride' },
  { value: 'On-site', label: 'On-site' },
];

const optionsSalary = [
  { label: '< 30 000 €', value: '<30 000' },
  { label: '30 000 - 40 000 €', value: '[30 000 - 40 000]' },
  { label: '40 000 - 55 000 €', value: '[40 000 - 55 000]' },
  { label: '55 000 - 70 000 €', value: '[55 000 - 70 000]' },
  { label: '70 000 - 85 000 €', value: '[70 000 - 85 000]' },
  { label: '> 85 000 €', value: '> 85 000' },
];

const optionsContract = [
  { label: 'Internship', value: 'Internship' },
  { label: 'Freelance', value: 'Freelance' },
  { label: 'Full-time', value: 'Full-time' },
  { label: 'Part-time', value: 'Part-time' },
];

const optionsPosition = [
  { label: 'Full-stack Developer', value: 'Full-stack Developer' },
  { label: 'Front-end Developer', value: 'Front-end Developer' },
  { label: 'Back-end Developer', value: 'Back-end Developer' },
  { label: 'Software Engineer', value: 'Software Engineer' },
];

const optionsExperience = [
  { label: '< 2 years', value: '< 2 years' },
  { label: '2-5 years', value: '2-5 years' },
  { label: '5-10 years', value: '5-10 years' },
  { label: '> 10 years', value: '> 10 years' },
];

const CandidateProfilePage = () => {

  const [remote, setSelectedRemote] = useState([]);
  const [salary, setSelectedSalary] = useState([]);
  const [contract, setSelectedContract] = useState([]);
  const [position, setSelectedPosition] = useState([]);
  const [experience, setSelectedExperience] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const remoteCopy = remote.map(x => x.value)
    const salaryCopy = salary.map(x => x.value)
    const contractCopy = contract.map(x => x.value)
    const positionCopy = position.map(x => x.value)
    const experienceCopy = experience.map(x => x.value)
    //const requestBody = { remoteCopy, salaryCopy, contractCopy, positionCopy, experienceCopy };

    //console.log("array", requestBody)
    axios({
      method: 'PATCH',
      url: "http://localhost:5005/profile/create",
      data:{
        remote: remoteCopy,
        salary: salaryCopy,
        contract: contractCopy,
        position: positionCopy,
        experience: experienceCopy
      },
      withCredentials:true
      })
      // .post(`${API_URL}/profile/create`, requestBody)
      .then((response) => {
        console.log(response)
      })
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


  return (
    <div>

  <h2>Edit your profile</h2>
  <p>Please tell us more about you and the job you are looking for!</p>
  <div className="row">
  <div className="col-md-6">


      <form action="/profile/create" method="post" enctype="multipart/form-data">
        <div className="form-group">
          <label> Upload your CV (can be a PDF or a PNG only)
            <input type="file" name="cv-url" />
          </label>
        </div>
        <button className="submit" type="submit" >Upload CV</button>
      </form>


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
        <button className ="submit" type="submit">Edit Profile</button>
      </form>

      <p className="delete">Delete my account</p>
    </div>
  </div>

    </div>
  )
}
export default CandidateProfilePage
