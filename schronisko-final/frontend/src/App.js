import './App.css';
import { Route, Routes } from 'react-router-dom';
import Footer from './components/layout/Footer';
import Navbar from './components/layout/Navbar';
import HomePage from './pages/HomePage';
import DogsPage from './pages/DogsPage';
import AdoptionPage from './pages/AdoptionPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';

import RequireAuth from './context/RequireAuth.jsx'
import RequireAdmin from './context/RequireAdmin.jsx'

import ProfilPage from './pages/ProfilPage.jsx';

import PeoplePageAdmin from './pages/admin/people/PeoplePage';
import PersonDetailsPage from './pages/admin/people/PersonDetailsPage.jsx';

import DogsPageAdmin from './pages/admin/dogs/DogsPage';
import AdoptionPageAdmin from './pages/admin/adoptions/AdoptionPage.jsx';

function App() {
  return (
    <>
      <Navbar />
      <div>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/dogs" element={<DogsPage />} />
          <Route path="/adoption" element={<AdoptionPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          {/* Profil */}
          <Route path="/profil" element={<RequireAuth><ProfilPage /></RequireAuth>} />
          {/* Admin */}
          <Route path="/profile/:id" element={<RequireAdmin><PersonDetailsPage /></RequireAdmin>}/>
          <Route path="/admin/people" element={<RequireAdmin><PeoplePageAdmin /></RequireAdmin>} />
          <Route path="/admin/dogs" element={<RequireAdmin><DogsPageAdmin /></RequireAdmin>} />
          <Route path="/admin/adoptions" element={<RequireAdmin><AdoptionPageAdmin /></RequireAdmin>} />
        </Routes>
      </div>
      <Footer />
    </>
  );
}

export default App;
