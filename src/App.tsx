import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import RegistrationPage from './pages/RegistrationPage';
import ConfirmationPage from './pages/ConfirmationPage';
import './App.css';

// Mock components for non-existent screens
const LoginMock = () => <div className="app-container"><h2>Pantalla Login</h2></div>;
const DashboardMock = () => <div className="app-container"><h2>[Portal Admin] Dashboard</h2><p>Simulando redirección a app.beautyflow.com/dashboard</p></div>;

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/registro" element={<RegistrationPage />} />
        <Route path="/step3" element={<ConfirmationPage />} />
        <Route path="/login" element={<LoginMock />} />
        <Route path="/dashboard" element={<DashboardMock />} />
      </Routes>
    </Router>
  )
}

export default App;
