import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { useAtom } from "jotai";
import { displayProfileAtom, isLoadingAtom } from "../state/searchAtom";
import { useContext } from "react";
import { AuthContext } from "../context/auth.context";
import { API_URL } from "../utils/constants";

function SideBar() {
  const { isLoggedIn, getToken } = useContext(AuthContext);
  // Set token to a variable
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
  //This atoms can be used throughout the application as pieces of state
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

  const handleChangeCheckbox = async (event, type) => {
    // Destructuring
    const { value, checked } = event.target;
    const { languages } = languagesUserInfo;
    const { contracts } = contractsUserInfo;
    const { experiences } = experiencesUserInfo;

    // Case 1 : The user checks the box
    if (checked) {
      if (type === "lang") {
        setUserLanguagesInfo({
          languages: [...languages, value],
        });
        query.lang = [...languages, value];
      }

      if (type === "cont") {
        setContractsUserInfo({
          contracts: [...contracts, value],
        });
        query.cont = [...contracts, value];
      }

      if (type === "expe") {
        setExperiencesUserInfo({
          experiences: [...experiences, value],
        });
        query.expe = [...experiences, value];
      }

      setQuery(query);
    }

    // Case 2  : The user unchecks the box
    else {
      if (type === "lang") {
        const languagesToKeep = languages.filter((event) => event !== value);
        setUserLanguagesInfo({
          languages: languagesToKeep,
        });
        query.lang = languagesToKeep;
      }

      if (type === "cont") {
        const contractsToKeep = contracts.filter((event) => event !== value);
        setContractsUserInfo({
          contracts: contractsToKeep,
        });
        query.cont = contractsToKeep;
      }

      if (type === "expe") {
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
    const { data } = await axios.get(`/profile`, {
      baseURL: API_URL,
      params: query,
      //Protect root
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return data;
  };

  return (
    <div className="filter-container">
      {/* Checkbox languages */}
      <h4 className="language-checkbox">Languages</h4>
      <div className="language-checkbox-container">
        <form className="search-form">
          <div className="row">
            <input
              type="checkbox"
              name="languages"
              id="languages"
              value="JavaScript"
              onChange={(e) => handleChangeCheckbox(e, "lang")}
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
              onChange={(e) => handleChangeCheckbox(e, "lang")}
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
              onChange={(e) => handleChangeCheckbox(e, "lang")}
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
              value="React"
              onChange={(e) => handleChangeCheckbox(e, "lang")}
              className="filter-checkbox"
            />
            <span class="checkmark"></span>
            <label className="label" htmlFor="languages">
              React
            </label>
          </div>
          <div className="row">
            <input
              type="checkbox"
              name="languages"
              id="languages"
              value="Ruby"
              onChange={(e) => handleChangeCheckbox(e, "lang")}
              className="filter-checkbox"
            />
            <span class="checkmark"></span>
            <label className="label" htmlFor="languages">
              Ruby
            </label>
          </div>
          <div className="row">
            <input
              type="checkbox"
              name="languages"
              id="languages"
              value="MongoDB"
              onChange={(e) => handleChangeCheckbox(e, "lang")}
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
              value="PHP"
              onChange={(e) => handleChangeCheckbox(e, "lang")}
              className="filter-checkbox"
            />
            <span class="checkmark"></span>
            <label className="label" htmlFor="languages">
              PHP
            </label>
          </div>
          <div className="row">
            <input
              type="checkbox"
              name="languages"
              id="languages"
              value="Python"
              onChange={(e) => handleChangeCheckbox(e, "lang")}
              className="filter-checkbox"
            />
            <span class="checkmark"></span>
            <label className="label" htmlFor="languages">
              Python
            </label>
          </div>
          <div className="row">
            <input
              type="checkbox"
              name="languages"
              id="languages"
              value="Swift"
              onChange={(e) => handleChangeCheckbox(e, "lang")}
              className="filter-checkbox"
            />
            <span class="checkmark"></span>
            <label className="label" htmlFor="languages">
              Swift
            </label>
          </div>
          <div className="row">
            <input
              type="checkbox"
              name="languages"
              id="languages"
              value="Angular"
              onChange={(e) => handleChangeCheckbox(e, "lang")}
              className="filter-checkbox"
            />
            <span class="checkmark"></span>
            <label className="label" htmlFor="languages">
              Angular
            </label>
          </div>
          <div className="row">
            <input
              type="checkbox"
              name="languages"
              id="languages"
              value="Rust"
              onChange={(e) => handleChangeCheckbox(e, "lang")}
              className="filter-checkbox"
            />
            <span class="checkmark"></span>
            <label className="label" htmlFor="languages">
              Rust
            </label>
          </div>
          <div className="row">
            <input
              type="checkbox"
              name="languages"
              id="languages"
              value="Scala"
              onChange={(e) => handleChangeCheckbox(e, "lang")}
              className="filter-checkbox"
            />
            <span class="checkmark"></span>
            <label className="label" htmlFor="languages">
              Scala
            </label>
          </div>
          <div className="row">
            <input
              type="checkbox"
              name="languages"
              id="languages"
              value="C++, C or C#"
              onChange={(e) => handleChangeCheckbox(e, "lang")}
              className="filter-checkbox"
            />
            <span class="checkmark"></span>
            <label className="label" htmlFor="languages">
              C++, C or C#
            </label>
          </div>
          <div className="row">
            <input
              type="checkbox"
              name="languages"
              id="languages"
              value="SQL"
              onChange={(e) => handleChangeCheckbox(e, "lang")}
              className="filter-checkbox"
            />
            <span class="checkmark"></span>
            <label className="label" htmlFor="languages">
              SQL
            </label>
          </div>
          <div className="row">
            <input
              type="checkbox"
              name="languages"
              id="languages"
              value="Java"
              onChange={(e) => handleChangeCheckbox(e, "lang")}
              className="filter-checkbox"
            />
            <span class="checkmark"></span>
            <label className="label" htmlFor="languages">
              Java
            </label>
          </div>
        </form>
      </div>
      {/* Checkbox contracts*/}
      <h4 className="contract-checkbox">Contracts</h4>
      <div className="contract-checkbox-container">
        <form>
          <div className="row">
            <input
              type="checkbox"
              name="contracts"
              id="contracts"
              value="Internship"
              onChange={(e) => handleChangeCheckbox(e, "cont")}
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
              onChange={(e) => handleChangeCheckbox(e, "cont")}
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
              onChange={(e) => handleChangeCheckbox(e, "cont")}
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
              onChange={(e) => handleChangeCheckbox(e, "cont")}
              className="filter-checkbox"
            />
            <label className="label" htmlFor="contracts">
              Freelance
            </label>
          </div>
        </form>
      </div>
      <div>
        {/* Checkbox experiences */}
        <h4 className="experience-checkbox">Experiences</h4>
        <div className="experience-checkbox-container">
          <form>
            <div className="row">
              <input
                type="checkbox"
                name="experiences"
                id="experiences"
                value="< 2 years"
                onChange={(e) => handleChangeCheckbox(e, "expe")}
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
                onChange={(e) => handleChangeCheckbox(e, "expe")}
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
                onChange={(e) => handleChangeCheckbox(e, "expe")}
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
                onChange={(e) => handleChangeCheckbox(e, "expe")}
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
