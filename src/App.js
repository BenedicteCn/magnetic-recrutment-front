import './App.css';
import { Routes, Route } from 'react-router-dom';
//COMPONENTS:
import Navbar from './components/Navbar';
//PAGES:
import HomePage from './pages/HomePage';
import CandidateProfilePage from './pages/CandidateProfilePage';
import SignupCandidatePage from './pages/SignupCandidatePage';
import LoginCandidatePage from './pages/LoginCandidatePage';
import SearchUser from './components/SearchUser';

function App() {
  return (
    <div className="App">
      {/* <SearchUser /> */}
      <Navbar />
      <Routes>
        <Route exact path="/" element={<HomePage />} />
        <Route
          exact
          path="/profile/create"
          element={<CandidateProfilePage />}
        />
      </Routes>
      {/* <SignupCandidatePage />
      <LoginCandidatePage />  */}
    </div>
  );
}

export default App;
