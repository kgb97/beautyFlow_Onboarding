import { useEffect, useState } from 'react';
import { MessageCircle, X, Loader2 } from 'lucide-react';
import { PlatformSettingsService } from '../services/platformSettingsService';
import { LeadsService } from '../services/leadsService';
import './WhatsAppCta.css';

function waLink(phone: string, message: string): string {
  const digits = phone.replace(/[^0-9]/g, '');
  return `https://wa.me/${digits}?text=${encodeURIComponent(message)}`;
}

const WhatsAppCta = () => {
  const [whatsappNumber, setWhatsappNumber] = useState('');
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phone, setPhone] = useState('');
  const [isSending, setIsSending] = useState(false);

  useEffect(() => {
    PlatformSettingsService.getSettings()
      .then(s => setWhatsappNumber(s.whatsappNumber))
      .catch(() => setWhatsappNumber(''));
  }, []);

  if (!whatsappNumber) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSending(true);
    try {
      await LeadsService.createLead({ firstName, lastName, phone });
    } catch {
      // Si falla el registro del lead, igual dejamos que la persona hable por WhatsApp.
    } finally {
      setIsSending(false);
      window.open(waLink(whatsappNumber, `Hola, soy ${firstName} ${lastName}. Quiero saber más sobre BeautyFlow.`), '_blank');
      setIsFormOpen(false);
      setFirstName(''); setLastName(''); setPhone('');
    }
  };

  return (
    <>
      <button className="wa-fab" onClick={() => setIsFormOpen(true)} aria-label="Contactar por WhatsApp">
        <MessageCircle size={26} />
      </button>

      {isFormOpen && (
        <div className="wa-modal-backdrop" onClick={() => setIsFormOpen(false)}>
          <div className="wa-modal-content" onClick={e => e.stopPropagation()}>
            <button className="wa-modal-close" onClick={() => setIsFormOpen(false)} aria-label="Cerrar"><X size={20} /></button>
            <div className="wa-modal-icon"><MessageCircle size={24} /></div>
            <h3>Hablemos por WhatsApp</h3>
            <p className="wa-modal-desc">Dejanos tus datos y te contactamos enseguida.</p>
            <form onSubmit={handleSubmit}>
              <input className="wa-input" required placeholder="Nombre" value={firstName} onChange={e => setFirstName(e.target.value)} />
              <input className="wa-input" required placeholder="Apellido" value={lastName} onChange={e => setLastName(e.target.value)} />
              <input className="wa-input" required placeholder="Teléfono (con código de país)" value={phone} onChange={e => setPhone(e.target.value)} />
              <button type="submit" className="wa-submit-btn" disabled={isSending}>
                {isSending ? <Loader2 className="spin" size={18} /> : <MessageCircle size={18} />}
                Continuar a WhatsApp
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default WhatsAppCta;
