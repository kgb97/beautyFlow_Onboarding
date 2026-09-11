import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, FileText } from 'lucide-react';
import { PlatformSettingsService, type PlatformSettingsDto } from '../services/platformSettingsService';
import './LegalPage.css';

// Pagina honesta de "en preparacion" -- el checkbox de Terminos y Condiciones del
// registro apuntaba antes a un <span> sin destino real (ver RegistrationPage.tsx).
// Mientras el equipo no publique el documento legal real, esto evita el dead-end
// para el usuario y el hueco de accesibilidad (un <span> no es navegable por lector
// de pantalla) sin inventar texto legal vinculante que no corresponde redactar aca.
const LegalPage = () => {
  const [settings, setSettings] = useState<PlatformSettingsDto | null>(null);

  useEffect(() => {
    PlatformSettingsService.getSettings().then(setSettings).catch(() => {});
  }, []);

  return (
    <div className="legal-page">
      <div className="legal-card glass-panel">
        <Link to="/registro" className="legal-back"><ChevronLeft size={16} /> Volver al registro</Link>
        <div className="legal-icon"><FileText size={28} /></div>
        <h1>Términos y Condiciones / Política de Privacidad</h1>
        <p>
          Estamos preparando estos documentos. Todavía no hay una versión publicada de los
          Términos y Condiciones ni de la Política de Privacidad de iziSalon.
        </p>
        <p>
          Si tenés dudas sobre cómo manejamos tus datos mientras tanto, escribinos:
        </p>
        <ul className="legal-contact">
          {settings?.supportEmail && <li>Email: <a href={`mailto:${settings.supportEmail}`}>{settings.supportEmail}</a></li>}
          {settings?.supportPhone && <li>Teléfono: {settings.supportPhone}</li>}
        </ul>
      </div>
    </div>
  );
};

export default LegalPage;
