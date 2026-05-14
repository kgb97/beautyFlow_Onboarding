import { useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import { Store, Mail, FileText, UserCircle, ArrowRight, CheckSquare } from 'lucide-react';
import CheckmarkAnimatedSVG from '../components/svg/CheckmarkAnimatedSVG';
import Confetti from '../components/Confetti';
import './ConfirmationPage.css';

interface JwtPayload {
  unique_name?: string;
  email?: string;
  given_name?: string;
  nameid?: string;
  role?: string | string[];
  [key: string]: unknown;
}

type ConfirmationState = {
  companyName: string;
  ruc: string;
  companyEmail: string;
  fullName: string;
  ownerEmail: string;
}

function parseConfirmData(location: ReturnType<typeof useLocation>): ConfirmationState {
  const stateData = location.state as Record<string, unknown> | null;

  let decodedFullName = '';
  let decodedEmail = '';

  const currentToken = (stateData?.token as string | undefined) || sessionStorage.getItem('token');

  if (currentToken) {
    try {
      const decoded = jwtDecode<JwtPayload>(currentToken);
      decodedEmail = decoded.email || decoded.unique_name || '';
      decodedFullName = decoded.given_name || (decoded.name as string) || '';
    } catch {
      console.error("Invalid token format");
    }
  }

  return {
    companyName: (stateData?.companyName as string) || 'Tu Salón',
    ruc: (stateData?.ruc as string) || 'No especificado',
    companyEmail: (stateData?.companyEmail as string) || 'No especificado',
    fullName: (stateData?.fullName as string) || decodedFullName || 'Usuario',
    ownerEmail: (stateData?.ownerEmail as string) || decodedEmail || 'tu-email@ejemplo.com'
  };
}

const ConfirmationPage = () => {
  const location = useLocation();
  const data = useMemo(() => parseConfirmData(location), [location]);

  const handleGoToPortal = () => {
    const portalAdminUrl = import.meta.env.VITE_PORTAL_ADMIN_URL || 'http://localhost:5173';
    const currentToken = sessionStorage.getItem('token');
    const companyId = sessionStorage.getItem('companyId') || '';
    
    if (currentToken) {
      window.location.href = `${portalAdminUrl}/login#t=${currentToken}&c=${companyId}`;
    } else {
      window.location.href = portalAdminUrl;
    }
  };

  return (
    <div className="confirmation-wrapper">
      <Confetti />
      <div className="conf-bg-shape conf-shape-1"></div>
      <div className="conf-bg-shape conf-shape-2"></div>

      <div className="confirmation-card animate-fade-in">
        <div className="success-icon-container">
          <div className="icon-circle animate-bounce-in">
            <CheckmarkAnimatedSVG size={64} className="check-icon" style={{ color: 'hsl(335, 75%, 55%)' }} />
          </div>
          <div className="ripple-ring"></div>
          <div className="ripple-ring"></div>
          <div className="ripple-ring"></div>
        </div>

        <div className="confirmation-header animate-slide-up delay-1">
          <h1>¡Bienvenido a BeautyFlow, {data.fullName?.split(' ')[0]}!</h1>
          <p>Tu salón <strong>"{data.companyName}"</strong> ha sido creado exitosamente.</p>
        </div>

        <div className="confirmation-body animate-slide-up delay-2">
          
          <div className="glass-panel summary-card">
            <h3>Resumen de tu cuenta</h3>
            <ul className="summary-list">
              <li className="animate-slide-left delay-1">
                <Store size={18} className="text-primary"/>
                <div className="summary-info">
                  <span className="summary-label">Nombre del Salón</span>
                  <span className="summary-value">{data.companyName}</span>
                </div>
              </li>
              <li className="animate-slide-left delay-2">
                <FileText size={18} className="text-secondary"/>
                <div className="summary-info">
                  <span className="summary-label">RUC / NIT</span>
                  <span className="summary-value">{data.ruc}</span>
                </div>
              </li>
              <li className="animate-slide-left delay-3">
                <Mail size={18} className="text-primary"/>
                <div className="summary-info">
                  <span className="summary-label">Email de Contacto</span>
                  <span className="summary-value">{data.companyEmail}</span>
                </div>
              </li>
              <li className="animate-slide-left delay-4">
                <UserCircle size={18} className="text-secondary"/>
                <div className="summary-info">
                  <span className="summary-label">Tu cuenta Administrador</span>
                  <span className="summary-value">{data.ownerEmail}</span>
                </div>
              </li>
            </ul>
          </div>

          <div className="next-steps-container animate-slide-up delay-3">
            <h3>Próximos pasos para empezar:</h3>
            <ul className="todo-list">
              <li className="todo-item pending animate-slide-right delay-1">
                <CheckSquare size={20} className="todo-icon" />
                <span>Crear tu primera sucursal</span>
              </li>
              <li className="todo-item pending animate-slide-right delay-2">
                <CheckSquare size={20} className="todo-icon" />
                <span>Definir horarios de atención</span>
              </li>
              <li className="todo-item pending animate-slide-right delay-3">
                <CheckSquare size={20} className="todo-icon" />
                <span>Agregar tus servicios</span>
              </li>
              <li className="todo-item pending animate-slide-right delay-4">
                <CheckSquare size={20} className="todo-icon" />
                <span>Registrar tu equipo de estilistas</span>
              </li>
            </ul>
          </div>

        </div>

        <div className="confirmation-footer animate-slide-up delay-4">
          <button className="btn btn-primary btn-portal animate-pulse-glow" onClick={handleGoToPortal}>
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
