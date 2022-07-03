import React from 'react';
import { Link } from 'react-router-dom';
import { useState } from 'react';
// import axios from 'axios';
import { useContext } from 'react';
import { SearchContext } from '../context/search.context';

function SideBar() {
  const [searchProfile, setSearchProfile] = useState('');

  const [languagesUserInfo, setUserLanguagesInfo] = useState({
    languages: [],
  });
  const [contractsUserInfo, setContractsUserInfo] = useState({
    contracts: [],
  });
  const [experiencesUserInfo, setExperiencesUserInfo] = useState({
    experiences: [],
  });
  const [displayProfile, setDisplayProfile] = useState([]);
  const { query, setQuery } = useContext(SearchContext);
  //   useEffect(() => {
  //     async function fetchData() {
  //       setDisplayProfile(await getRelevantUsers([]));
  //     }
  //     fetchData();
  //   }, []);

  const handleChange = (event) => {
    setSearchProfile(event.target.value);
  };
  const handleClick = (event) => {
    event.preventDefault();
  };
  const handleChangeCheckbox = async (event) => {
    // Destructuring
    const { value, checked } = event.target;
    const { languages } = languagesUserInfo;
    const { contracts } = contractsUserInfo;
    const { experiences } = experiencesUserInfo;
    // console.log(`${value} is ${checked}`);

    // Case 1 : The user checks the box
    let query = {};
    if (checked) {
      setUserLanguagesInfo({
        languages: [...languages, value],
      });
      setContractsUserInfo({
        contracts: [...contracts, value],
      });
      setExperiencesUserInfo({
        experiences: [...experiences, value],
      });
      query.lang = [...languages, value];
      query.cont = [...contracts, value];
      query.expe = [...experiences, value];
      console.log(query);
      setQuery(query);
    }

    // Case 2  : The user unchecks the box
    else {
      const languagesToKeep = languages.filter((event) => event !== value);
      const contractsToKeep = contracts.filter((event) => event !== value);
      const experiencesToKeep = experiences.filter((event) => event !== value);
      setUserLanguagesInfo({
        languages: languagesToKeep,
      });
      query.lang = [...languagesToKeep];
      setContractsUserInfo({
        contracts: [...contracts, value],
      });
      query.cont = [...contractsToKeep];
      setExperiencesUserInfo({
        experiences: [...experiences, value],
      });
      query.expe = [...experiences, value];
      setQuery(query);
    }

    //     console.log(query.lang, query.cont);
    //     const relevantUsers = await getRelevantUsers(query);
    //     setDisplayProfile(relevantUsers);
  };

  //   const getRelevantUsers = async (query) => {
  //     const { data } = await axios.get(`http://localhost:5005/profile`, {
  //       params: query,
  //     });
  //     return data;
  //   };

  return (
    <div className="profile-container">
      <div>
        <h3>Find your perfect candidates</h3>
        {displayProfile.map((profile) => (
          <div key={profile._id} className="profilecard">
            <Link to={`/hr/search/${profile._id}`}>
              <h4>
                {profile.firstname} {profile.lastname}
              </h4>
              <img src={profile.url} alt="profileImg" width="200px" />
            </Link>
          </div>
        ))}
      </div>
      <input
        type="text"
        placeholder=""
        value={searchProfile}
        onChange={handleChangeCheckbox}
        className="searchbar"
      />
      <button onClick={handleClick}>🔍</button>

      {/* checkbox languages */}
      <h4 className="language-checkbox">Languages</h4>
      <div className="container">
        <form>
          <div className="row">
            <input
              type="checkbox"
              name="languages"
              id="languages"
              value="JavaScript"
              onChange={handleChangeCheckbox}
            />
            <label htmlFor="languages">JavaScript</label>
          </div>
          <div className="row">
            <input
              type="checkbox"
              name="languages"
              id="languages"
              value="HTML"
              onChange={handleChangeCheckbox}
            />
            <label htmlFor="languages">HTML</label>
          </div>
          <div className="row">
            <input
              type="checkbox"
              name="languages"
              id="languages"
              value="CSS"
              onChange={handleChangeCheckbox}
            />
            <label htmlFor="languages">CSS</label>
          </div>
          <div className="row">
            <input
              type="checkbox"
              name="languages"
              id="languages"
              value="ReactJS"
              onChange={handleChangeCheckbox}
            />
            <label htmlFor="languages">ReactJS</label>
          </div>
          <div className="row">
            <input
              type="checkbox"
              name="languages"
              id="languages"
              value="NodeJS"
              onChange={handleChangeCheckbox}
            />
            <label htmlFor="languages">NodeJS</label>
          </div>
          <div className="row">
            <input
              type="checkbox"
              name="languages"
              id="languages"
              value="MongoDB"
              onChange={handleChangeCheckbox}
            />
            <label htmlFor="languages">MongoDB</label>
          </div>
          <div className="row">
            <input
              type="checkbox"
              name="languages"
              id="languages"
              value="ExpressJS"
              onChange={handleChangeCheckbox}
            />
            <label htmlFor="languages">ExpressJS</label>
          </div>
          <div className="row">
            <input
              type="checkbox"
              name="languages"
              id="languages"
              value="Python"
              onChange={handleChangeCheckbox}
            />
            <label htmlFor="languages">Python</label>
          </div>
        </form>
      </div>
      {/* checkbox contract type */}
      <h4 className="contract-checkbox">Contracts</h4>
      <div className="container">
        <form>
          <div className="row">
            <input
              type="checkbox"
              name="contracts"
              id="contracts"
              value="Internship"
              onChange={handleChangeCheckbox}
            />
            <label htmlFor="contracts">Internship</label>
          </div>
          <div className="row">
            <input
              type="checkbox"
              name="contracts"
              id="contracts"
              value="part-time"
              onChange={handleChangeCheckbox}
            />
            <label htmlFor="contracts">Part-time</label>
          </div>
          <div className="row">
            <input
              type="checkbox"
              name="contracts"
              id="contracts"
              value="Full-time"
              onChange={handleChangeCheckbox}
            />
            <label htmlFor="contracts">Full-time</label>
          </div>
          <div className="row">
            <input
              type="checkbox"
              name="contracts"
              id="contracts"
              value="Freelance"
              onChange={handleChangeCheckbox}
            />
            <label htmlFor="contracts">Freelance</label>
          </div>
        </form>
      </div>
      <div>
        {/* checkbox experience */}
        <h4 className="experience-checkbox">Experiences</h4>
        <div className="container">
          <form>
            <div className="row">
              <input
                type="checkbox"
                name="experiences"
                id="experiences"
                value="< 2 years"
                onChange={handleChangeCheckbox}
              />
              <label htmlFor="experiences">Less than 2 years</label>
            </div>
            <div className="row">
              <input
                type="checkbox"
                name="experiences"
                id="experiences"
                value="2-5 years"
                onChange={handleChangeCheckbox}
              />
              <label htmlFor="experiences">2-5 years</label>
            </div>
            <div className="row">
              <input
                type="checkbox"
                name="experiences"
                id="experiences"
                value="5-10 years"
                onChange={handleChangeCheckbox}
              />
              <label htmlFor="experiences">5-10 years</label>
            </div>
            <div className="row">
              <input
                type="checkbox"
                name="experiences"
                id="experiences"
                value="> 10 years"
                onChange={handleChangeCheckbox}
              />
              <label htmlFor="experiences">More than 10 years</label>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default SideBar;
