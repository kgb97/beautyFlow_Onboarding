import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import RegistrationPage from './pages/RegistrationPage';
import ConfirmationPage from './pages/ConfirmationPage';
import LegalPage from './pages/LegalPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/registro" element={<RegistrationPage />} />
        <Route path="/step3" element={<ConfirmationPage />} />
        <Route path="/legal" element={<LegalPage />} />
      </Routes>
    </Router>
  )
}

export default App;
