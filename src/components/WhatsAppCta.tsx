import { useEffect, useRef, useState } from 'react';
import { X, Loader2 } from 'lucide-react';
import WhatsAppIcon from './svg/WhatsAppIcon';
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
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [isSending, setIsSending] = useState(false);
  const fabRef = useRef<HTMLButtonElement>(null);
  const nameRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    PlatformSettingsService.getSettings()
      .then(s => setWhatsappNumber(s.whatsappNumber))
      .catch(() => setWhatsappNumber(''));
  }, []);

  // Foco al primer campo al abrir; Escape cierra y devuelve el foco al botón.
  useEffect(() => {
    if (!isFormOpen) return;
    nameRef.current?.focus();
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') close(); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [isFormOpen]);

  if (!whatsappNumber) return null;

  function close() {
    setIsFormOpen(false);
    fabRef.current?.focus();
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSending(true);
    const [firstName, ...rest] = name.trim().split(/\s+/);
    try {
      await LeadsService.createLead({ firstName, lastName: rest.join(' '), phone });
    } catch {
      // Si falla el registro del lead, igual dejamos que la persona hable por WhatsApp.
    } finally {
      setIsSending(false);
      window.open(waLink(whatsappNumber, `Hola, soy ${name.trim()}. Quiero saber más sobre iziSalon.`), '_blank');
      close();
      setName(''); setPhone('');
    }
  };

  return (
    <>
      <button ref={fabRef} className="wa-fab" onClick={() => setIsFormOpen(true)} aria-label="Escribinos por WhatsApp">
        <WhatsAppIcon size={26} />
      </button>

      {isFormOpen && (
        <div className="wa-modal-backdrop" onClick={close}>
          <div className="wa-modal-content" role="dialog" aria-modal="true" aria-labelledby="wa-modal-title" onClick={e => e.stopPropagation()}>
            <button className="wa-modal-close" onClick={close} aria-label="Cerrar"><X size={20} /></button>
            <div className="wa-modal-icon"><WhatsAppIcon size={24} /></div>
            <h3 id="wa-modal-title">Hablemos por WhatsApp</h3>
            <p className="wa-modal-desc">Te respondemos desde el WhatsApp de iziSalon.</p>
            <form onSubmit={handleSubmit}>
              <label className="wa-label" htmlFor="wa-name">Tu nombre</label>
              <input ref={nameRef} id="wa-name" className="wa-input" required autoComplete="name"
                value={name} onChange={e => setName(e.target.value)} />
              <label className="wa-label" htmlFor="wa-phone">Tu teléfono</label>
              <input id="wa-phone" className="wa-input" required type="tel" inputMode="tel" autoComplete="tel"
                placeholder="8888 8888" value={phone} onChange={e => setPhone(e.target.value)} />
              <button type="submit" className="wa-submit-btn" disabled={isSending}>
                {isSending ? <Loader2 className="spin" size={18} /> : <WhatsAppIcon size={18} />}
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
