import React from 'react'
import { MultiSelect } from "react-multi-select-component";
import { useState } from 'react'

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

  const [selectedRemote, setSelectedRemote] = useState([]);
  const [selectedSalary, setSelectedSalary] = useState([]);
  const [selectedContract, setSelectedContract] = useState([]);
  const [selectedPosition, setSelectedPosition] = useState([]);
  const [selectedExperience, setSelectedExperience] = useState([]);

  return (
    <div>

  <h2>Edit your profile</h2>
  <p>Please tell us more about you and the job you are looking for!</p>
  <div class="row">
  <div class="col-md-6">
    <form action="/movies/create" method="post" enctype="multipart/form-data">

        <div class="form-group">
          <label> Upload your CV (can be a PDF or a PNG only)
            <input type="file" name="document-cv" class="form-control-file" />
          </label>

        <h3>Remote option desired:</h3>
        <MultiSelect
        options={optionsRemote}
        value={selectedRemote}
        onChange={setSelectedRemote}
        labelledBy="Select"
        />

      <h3>Expected salary:</h3>
      <MultiSelect
        options={optionsSalary}
        value={selectedSalary}
        onChange={setSelectedSalary}
        labelledBy="Select"
      />

      <h3>Contract type:</h3>
      <MultiSelect
        options={optionsContract}
        value={selectedContract}
        onChange={setSelectedContract}
        labelledBy="Select"
      />

      <h3>Position searched:</h3>
      <MultiSelect
        options={optionsPosition}
        value={selectedPosition}
        onChange={setSelectedPosition}
        labelledBy="Select"
      />

      <h3>Professional experience:</h3>
      <MultiSelect
        options={optionsExperience}
        value={selectedExperience}
        onChange={setSelectedExperience}
        labelledBy="Select"
      />
        </div>
        <button type="submit" class="btn btn-primary">Edit</button>
      </form>
    </div>
  </div>

    </div>
  )
}
export default CandidateProfilePage
