import './App.css';
import { Routes, Route } from "react-router-dom";
//COMPONENTS:
import Navbar from "./components/Navbar";
//PAGES:
import HomePage from "./pages/HomePage";
import CandidateProfilePage from "./pages/CandidateProfilePage"
import SignupCandidatePage from "./pages/SignupCandidatePage"
import LoginCandidatePage from "./pages/LoginCandidatePage"
import { BrowserRouter } from "react-router-dom";


function App() {
  return (
    <div className="App">
      {/* <Navbar />*/}
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<HomePage />}/>
          <Route exact path="/profile/create" element={<CandidateProfilePage />}/>
        </Routes>
      </BrowserRouter>
      {/* <SignupCandidatePage />
      <LoginCandidatePage /> */}
    </div>
  );
}

export default App;
