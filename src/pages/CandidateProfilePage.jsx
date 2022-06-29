import React from 'react'
import Select  from 'react-select';
import { MultiSelect } from "react-multi-select-component";
import { useState } from 'react'


const optionsRemote = [
  { value: 'Full', label: 'Full' },
  { value: 'Hybride', label: 'Hybride' },
  { value: 'On-site', label: 'On-site' },
];

const optionsSalary = [
  { value: '<30 000', label: '< 30 000 €' },
  { value: '[30 000 - 40 000]', label: '30 000 - 40 000 €' },
  { value: '[40 000 - 55 000]', label: '40 000 - 55 000 €' },
  { value: '[55 000 - 70 000]', label: '55 000 - 70 000 €' },
  { value: '[70 000 - 85 000]', label: '70 000 - 85 000 €' },
  { value: '> 85 000', label: '> 85 000 €' },
];


const CandidateProfilePage = () => {

  const [selectedOptionRemote, setSelectedOptionRemote] = useState(null);
  const [selected, setSelected] = useState([]);


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
        </div>
        <h3>Remote:</h3>
        <MultiSelect
        defaultValue={selectedOptionRemote}
        onChange={setSelectedOptionRemote}
        options={optionsRemote}
        />

        <h3>Salary:</h3>
        <pre>{JSON.stringify(selectedOptionSalary)}</pre>
        <MultiSelect
        defaultValue={selectedOptionSalary}
        onChange={setSelectedOptionSalary}
        options={optionsSalary}
        />

      <h3>Select Fruits</h3>
      <pre>{JSON.stringify(selected)}</pre>
      <MultiSelect
        options={options}
        value={selected}
        onChange={setSelected}
        labelledBy="Select"
      />

        <button type="submit" class="btn btn-primary">Create</button>
      </form>
    </div>
  </div>

    </div>
  )
}
export default CandidateProfilePage
