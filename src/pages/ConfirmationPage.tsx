import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import { CheckCircle, Store, Mail, FileText, UserCircle, ArrowRight, CheckSquare } from 'lucide-react';
import './ConfirmationPage.css';

interface ConfirmationState {
  companyName?: string;
  ruc?: string;
  companyEmail?: string;
  fullName?: string;
  ownerEmail?: string;
  token?: string;
}

interface JwtPayload {
  unique_name?: string;     // Usually mapped to email in .NET Identity
  email?: string;
  given_name?: string;      // Usually mapped to FullName
  nameid?: string;          // User ID
  role?: string | string[]; // User roles
  [key: string]: any;
}

const ConfirmationPage = () => {
  const location = useLocation();
  const [data, setData] = useState<ConfirmationState>({});

  useEffect(() => {
    // 1. Initial attempt: Grab data from router state (passed from RegistrationPage)
    let stateData = location.state as ConfirmationState;
    let decodedFullName = '';
    let decodedEmail = '';
    
    // 2. Fallback: Parse Token from state or from localStorage
    const currentToken = stateData?.token || localStorage.getItem('token');
    
    if (currentToken) {
      try {
        const decoded = jwtDecode<JwtPayload>(currentToken);
        // Map common JWT claims 
        decodedEmail = decoded.email || decoded.unique_name || '';
        decodedFullName = decoded.given_name || decoded.name || '';
      } catch (error) {
        console.error("Invalid token format", error);
      }
    }

    // Merge state with fallback data from JWT
    setData({
      companyName: stateData?.companyName || 'Tu Salón',
      ruc: stateData?.ruc || 'No especificado',
      companyEmail: stateData?.companyEmail || 'No especificado',
      fullName: stateData?.fullName || decodedFullName || 'Usuario',
      ownerEmail: stateData?.ownerEmail || decodedEmail || 'tu-email@ejemplo.com'
    });
  }, [location]);

  const handleGoToPortal = () => {
    const portalAdminUrl = import.meta.env.VITE_PORTAL_ADMIN_URL || 'http://localhost:5173';
    const currentToken = localStorage.getItem('token');
    const companyId = localStorage.getItem('companyId') || '';
    
    if (currentToken) {
      window.location.href = `${portalAdminUrl}/login?t=${currentToken}&c=${companyId}`;
    } else {
      window.location.href = portalAdminUrl;
    }
  };

  return (
    <div className="confirmation-wrapper">
      {/* Background decorations */}
      <div className="conf-bg-shape conf-shape-1"></div>
      <div className="conf-bg-shape conf-shape-2"></div>

      <div className="confirmation-card animate-fade-in">
        <div className="success-icon-container">
          <div className="icon-circle animate-scale-up">
            <CheckCircle className="check-icon animate-draw-check" size={64} />
          </div>
        </div>

        <div className="confirmation-header animate-fade-in stagger-1">
          <h1>¡Bienvenido a BeautyFlow, {data.fullName?.split(' ')[0]}!</h1>
          <p>Tu salón <strong>"{data.companyName}"</strong> ha sido creado exitosamente.</p>
        </div>

        <div className="confirmation-body animate-fade-in stagger-2">
          
          <div className="glass-panel summary-card">
            <h3>Resumen de tu cuenta</h3>
            <ul className="summary-list">
              <li>
                <Store size={18} className="text-primary"/>
                <div className="summary-info">
                  <span className="summary-label">Nombre del Salón</span>
                  <span className="summary-value">{data.companyName}</span>
                </div>
              </li>
              <li>
                <FileText size={18} className="text-secondary"/>
                <div className="summary-info">
                  <span className="summary-label">RUC / NIT</span>
                  <span className="summary-value">{data.ruc}</span>
                </div>
              </li>
              <li>
                <Mail size={18} className="text-primary"/>
                <div className="summary-info">
                  <span className="summary-label">Email de Contacto</span>
                  <span className="summary-value">{data.companyEmail}</span>
                </div>
              </li>
              <li>
                <UserCircle size={18} className="text-secondary"/>
                <div className="summary-info">
                  <span className="summary-label">Tu cuenta Administrador</span>
                  <span className="summary-value">{data.ownerEmail}</span>
                </div>
              </li>
            </ul>
          </div>

          <div className="next-steps-container animate-fade-in stagger-3">
            <h3>Próximos pasos para empezar:</h3>
            <ul className="todo-list">
              <li className="todo-item pending">
                <CheckSquare size={20} className="todo-icon" />
                <span>Crear tu primera sucursal</span>
              </li>
              <li className="todo-item pending">
                <CheckSquare size={20} className="todo-icon" />
                <span>Definir horarios de atención</span>
              </li>
              <li className="todo-item pending">
                <CheckSquare size={20} className="todo-icon" />
                <span>Agregar tus servicios</span>
              </li>
              <li className="todo-item pending">
                <CheckSquare size={20} className="todo-icon" />
                <span>Registrar tu equipo de estilistas</span>
              </li>
            </ul>
          </div>

        </div>

        <div className="confirmation-footer animate-fade-in stagger-4">
          <button className="btn btn-primary btn-portal" onClick={handleGoToPortal}>
            Configurar mi Salón <ArrowRight size={20} />
          </button>
          
          <button className="btn btn-tertiary" onClick={handleGoToPortal}>
            Lo haré después
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationPage;
