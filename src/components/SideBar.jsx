import React from 'react';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useAtom } from 'jotai';
// import { useContext } from 'react';
// import { SearchContext } from '../context/search.context';
import { displayProfileAtom, isLoadingAtom } from '../state/searchAtom';
import { useContext } from 'react';
import { AuthContext } from '../context/auth.context';

function SideBar() {
  const [searchProfile, setSearchProfile] = useState('');
  //add token
  const { isLoggedIn, getToken } = useContext(AuthContext);
  // set token to a variable
  const token = getToken();
  const [languagesUserInfo, setUserLanguagesInfo] = useState({
    languages: [],
  });
  const [contractsUserInfo, setContractsUserInfo] = useState({
    contracts: [],
  });
  const [experiencesUserInfo, setExperiencesUserInfo] = useState({
    experiences: [],
  });
  //   const [displayProfile, setDisplayProfile] = useState([]);
  //this atoms can be used throughout the application as pieces of state
  const [displayProfile, setDisplayProfile] = useAtom(displayProfileAtom);
  const [isLoading, setIsLoading] = useAtom(isLoadingAtom);
  const [query, setQuery] = useState({});

  useEffect(() => {
    async function fetchData() {
      setIsLoading(true);
      setDisplayProfile(await getRelevantUsers(query));
      setIsLoading(false);
    }
    fetchData();
  }, [query]);

  const handleChange = (event) => {
    setSearchProfile(event.target.value);
  };
  const handleClick = (event) => {
    event.preventDefault();
  };
  const handleChangeCheckbox = async (event, type) => {
    // Destructuring
    const { value, checked } = event.target;
    const { languages } = languagesUserInfo;
    const { contracts } = contractsUserInfo;
    const { experiences } = experiencesUserInfo;
    // console.log(`${value} is ${checked}`);

    // Case 1 : The user checks the box
    // let query = {};
    if (checked) {
      if (type === 'lang') {
        setUserLanguagesInfo({
          languages: [...languages, value],
        });
        query.lang = [...languages, value];
      }

      if (type === 'cont') {
        setContractsUserInfo({
          contracts: [...contracts, value],
        });
        query.cont = [...contracts, value];
      }

      if (type === 'expe') {
        setExperiencesUserInfo({
          experiences: [...experiences, value],
        });
        query.expe = [...experiences, value];
      }

      setQuery(query);
    }

    // Case 2  : The user unchecks the box
    else {
      if (type === 'lang') {
        const languagesToKeep = languages.filter((event) => event !== value);
        setUserLanguagesInfo({
          languages: languagesToKeep,
        });
        query.lang = languagesToKeep;
      }

      if (type === 'cont') {
        const contractsToKeep = contracts.filter((event) => event !== value);
        setContractsUserInfo({
          contracts: contractsToKeep,
        });
        query.cont = contractsToKeep;
      }

      if (type === 'expe') {
        const experiencesToKeep = experiences.filter(
          (event) => event !== value
        );
        setExperiencesUserInfo({
          experiences: experiencesToKeep,
        });
        query.expe = experiencesToKeep;
      }

      setQuery(query);
    }

    setDisplayProfile(await getRelevantUsers(query));
  };

  const getRelevantUsers = async (query) => {
    console.log(query);
    const { data } = await axios.get(`http://localhost:5005/profile`, {
      params: query,
      //protect root
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return data;
  };

  return (
    <div className="filter-container">
      {/* <input
        type="text"
        placeholder=""
        value={searchProfile}
        onChange={handleChange}
        className="searchbar"
      />
      <button onClick={handleClick}>🔍</button> */}

      {/* checkbox languages */}
      <h4 className="language-checkbox">Languages</h4>
      <div className="language-checkbox-container">
        <form className="search-form">
          <div className="row">
            <input
              type="checkbox"
              name="languages"
              id="languages"
              value="JavaScript"
              onChange={(e) => handleChangeCheckbox(e, 'lang')}
              className="filter-checkbox"
            />
            <span class="checkmark"></span>
            <label className="label" htmlFor="languages">
              JavaScript
            </label>
          </div>
          <div className="row">
            <input
              type="checkbox"
              name="languages"
              id="languages"
              value="HTML"
              onChange={(e) => handleChangeCheckbox(e, 'lang')}
              className="filter-checkbox"
            />
            <span class="checkmark"></span>
            <label className="label" htmlFor="languages">
              HTML
            </label>
          </div>
          <div className="row">
            <input
              type="checkbox"
              name="languages"
              id="languages"
              value="CSS"
              onChange={(e) => handleChangeCheckbox(e, 'lang')}
              className="filter-checkbox"
            />
            <span class="checkmark"></span>
            <label className="label" htmlFor="languages">
              CSS
            </label>
          </div>
          <div className="row">
            <input
              type="checkbox"
              name="languages"
              id="languages"
              value="ReactJS"
              onChange={(e) => handleChangeCheckbox(e, 'lang')}
              className="filter-checkbox"
            />
            <span class="checkmark"></span>
            <label className="label" htmlFor="languages">
              ReactJS
            </label>
          </div>
          <div className="row">
            <input
              type="checkbox"
              name="languages"
              id="languages"
              value="NodeJS"
              onChange={(e) => handleChangeCheckbox(e, 'lang')}
              className="filter-checkbox"
            />
            <span class="checkmark"></span>
            <label className="label" htmlFor="languages">
              NodeJS
            </label>
          </div>
          <div className="row">
            <input
              type="checkbox"
              name="languages"
              id="languages"
              value="MongoDB"
              onChange={(e) => handleChangeCheckbox(e, 'lang')}
              className="filter-checkbox"
            />
            <span class="checkmark"></span>
            <label className="label" htmlFor="languages">
              MongoDB
            </label>
          </div>
          <div className="row">
            <input
              type="checkbox"
              name="languages"
              id="languages"
              value="ExpressJS"
              onChange={(e) => handleChangeCheckbox(e, 'lang')}
              className="filter-checkbox"
            />
            <span class="checkmark"></span>
            <label className="label" htmlFor="languages">
              ExpressJS
            </label>
          </div>
          <div className="row">
            <input
              type="checkbox"
              name="languages"
              id="languages"
              value="Python"
              onChange={(e) => handleChangeCheckbox(e, 'lang')}
              className="filter-checkbox"
            />
            <span class="checkmark"></span>
            <label className="label" htmlFor="languages">
              Python
            </label>
          </div>
        </form>
      </div>
      {/* checkbox contract type */}
      <h4 className="contract-checkbox">Contracts</h4>
      <div className="contract-checkbox-container">
        <form>
          <div className="row">
            <input
              type="checkbox"
              name="contracts"
              id="contracts"
              value="Internship"
              onChange={(e) => handleChangeCheckbox(e, 'lang')}
              className="filter-checkbox"
            />
            <label className="label" htmlFor="contracts">
              Internship
            </label>
          </div>
          <div className="row">
            <input
              type="checkbox"
              name="contracts"
              id="contracts"
              value="part-time"
              onChange={(e) => handleChangeCheckbox(e, 'cont')}
              className="filter-checkbox"
            />
            <label className="label" htmlFor="contracts">
              Part-time
            </label>
          </div>
          <div className="row">
            <input
              type="checkbox"
              name="contracts"
              id="contracts"
              value="Full-time"
              onChange={(e) => handleChangeCheckbox(e, 'cont')}
              className="filter-checkbox"
            />
            <label className="label" htmlFor="contracts">
              Full-time
            </label>
          </div>
          <div className="row">
            <input
              type="checkbox"
              name="contracts"
              id="contracts"
              value="Freelance"
              onChange={(e) => handleChangeCheckbox(e, 'cont')}
              className="filter-checkbox"
            />
            <label className="label" htmlFor="contracts">
              Freelance
            </label>
          </div>
        </form>
      </div>
      <div>
        {/* checkbox experience */}
        <h4 className="experience-checkbox">Experiences</h4>
        <div className="experience-checkbox-container">
          <form>
            <div className="row">
              <input
                type="checkbox"
                name="experiences"
                id="experiences"
                value="< 2 years"
                onChange={(e) => handleChangeCheckbox(e, 'expe')}
                className="filter-checkbox"
              />
              <label className="label" htmlFor="experiences">
                Less than 2 years
              </label>
            </div>
            <div className="row">
              <input
                type="checkbox"
                name="experiences"
                id="experiences"
                value="2-5 years"
                onChange={(e) => handleChangeCheckbox(e, 'expe')}
                className="filter-checkbox"
              />
              <label className="label" htmlFor="experiences">
                2-5 years
              </label>
            </div>
            <div className="row">
              <input
                type="checkbox"
                name="experiences"
                id="experiences"
                value="5-10 years"
                onChange={(e) => handleChangeCheckbox(e, 'expe')}
                className="filter-checkbox"
              />
              <label className="label" htmlFor="experiences">
                5-10 years
              </label>
            </div>
            <div className="row">
              <input
                type="checkbox"
                name="experiences"
                id="experiences"
                value="> 10 years"
                onChange={(e) => handleChangeCheckbox(e, 'expe')}
                className="filter-checkbox"
              />
              <label className="label" htmlFor="experiences">
                More than 10 years
              </label>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default SideBar;
