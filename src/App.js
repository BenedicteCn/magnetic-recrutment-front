import './App.css';
import { Routes, Route } from 'react-router-dom';
//COMPONENTS:
import Navbar from './components/Navbar';
//PAGES:

import HomePage from './pages/HomePage';
import CandidateProfilePage from './pages/CandidateProfilePage';
import SignupCandidatePage from './pages/SignupCandidatePage';
import LoginCandidatePage from './pages/LoginCandidatePage';
import LoginHRPage from './pages/LoginHRPage';
import SignupHRPage from './pages/SignupHRPage';
import Footer from './components/Footer';
import SearchPage from './pages/SearchPage';
import ProfileDetailsPages from './pages/ProfileDetailsPages';
import CVsaved from './pages/CVsaved';
import Contact from './pages/Contact';
function App() {
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route exact path="/" element={<HomePage />} />
        <Route exact path="/contact" element={<Contact />} />
        <Route
          exact
          path="/profile/create"
          element={<CandidateProfilePage />}
        />
        <Route exact path="/hr/login" element={<LoginHRPage />} />
        <Route exact path="/candidate/login" element={<LoginCandidatePage />} />
        <Route exact path="/hr/cvsaved" element={<CVsaved />} />

        <Route
          exact
          path="/candidate/signup"
          element={<SignupCandidatePage />}
        />

        <Route exact path="/hr/signup" element={<SignupHRPage />} />
        <Route exact path="/hr/search" element={<SearchPage />} />
        <Route path="/hr/search/:profileId" element={<ProfileDetailsPages />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
