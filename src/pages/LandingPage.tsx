import { useState, useCallback, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  CalendarHeart, Tv, Users, ArrowRight, Menu, X, CheckCircle, Wallet, Package, MessageCircle,
  CreditCard, Smartphone,
} from 'lucide-react';
import TestimonialsSection from '../components/TestimonialsSection';
import PlansSection from '../components/PlansSection';
import WhatsAppCta from '../components/WhatsAppCta';
import { PlatformSettingsService, bankNames, type PlatformSettingsDto } from '../services/platformSettingsService';
import './LandingPage.css';

const PORTAL_LOGIN_URL = `${import.meta.env.VITE_PORTAL_ADMIN_URL || 'http://localhost:5173'}/login`;

// WhatsApp primero: es lo que más busca una dueña de salón y lo que nos distingue.
const FEATURES = [
  {
    icon: MessageCircle, title: 'Confirmaciones y recordatorios por WhatsApp',
    desc: 'Salen solos desde el WhatsApp de tu salón. Menos clientas que se olvidan de la cita.',
    points: ['Confirmación apenas se agenda la cita', 'Recordatorio 1 día antes y 1 hora antes'],
  },
  {
    icon: CalendarHeart, title: 'Agenda y reservas online',
    desc: 'Tu enlace de reservas muestra solo los horarios libres, las 24 horas.',
    points: ['Tus clientas reservan sin llamarte', 'Servicios, precios y horarios siempre al día'],
  },
  {
    icon: Users, title: 'Equipo y comisiones',
    desc: 'Sabé cuánto produce cada estilista y cuánto le toca.',
    points: ['Citas y servicios por estilista', 'Comisiones calculadas por cita, con historial de pagos'],
  },
  {
    icon: Wallet, title: 'Caja y finanzas',
    desc: 'Ingresos, gastos y la ganancia real de tu salón.',
    points: ['Efectivo, transferencia y tarjeta', 'Precios en córdobas o dólares, facturación en córdobas', 'Saldo a favor de clientas'],
  },
  {
    icon: Package, title: 'Insumos y proveedores',
    desc: 'Inventario que se descuenta solo con cada servicio.',
    points: ['Alertas de stock bajo', 'Compras a crédito o de contado'],
  },
  {
    icon: Tv, title: 'Pantalla para la sala de espera',
    desc: 'Los turnos del día en un TV, actualizados al instante.',
    points: ['Vista de hoy, semana o mes', 'Sin tocar nada: se actualiza sola'],
  },
];

const STEPS = [
  { title: 'Registrá tu salón', desc: 'Tus datos y los de tu usuario. Sin tarjeta.' },
  { title: 'Cargá lo básico', desc: 'Sucursal, horarios, servicios y tu equipo.' },
  { title: 'Compartí tu enlace', desc: 'Tus clientas reservan y les llega la confirmación.' },
];

const LandingPage = () => {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [settings, setSettings] = useState<PlatformSettingsDto | null>(null);

  useEffect(() => {
    PlatformSettingsService.getSettings().then(setSettings).catch(() => {});
  }, []);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 600);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Cierra el menú móvil con Escape (el overlay no es alcanzable por teclado más allá del botón)
  useEffect(() => {
    if (!isMobileMenuOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMobileMenuOpen(false);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isMobileMenuOpen]);

  const toggleMobileMenu = useCallback(() => setMobileMenuOpen(prev => !prev), []);
  const closeMobileMenu = useCallback(() => setMobileMenuOpen(false), []);

  const supportEmail = settings?.supportEmail;
  const waPrice = settings?.whatsAppAddonPriceMonthly;
  const banks = bankNames(settings);

  const FAQ = [
    {
      q: '¿Necesito tarjeta para probar?',
      a: 'No. Te registrás y usás iziSalon 15 días con todo el plan Premium, sin dar ningún dato de pago.',
    },
    {
      q: '¿Qué pasa cuando terminan los 15 días?',
      a: 'No se te cobra nada automáticamente. Para seguir agendando elegís un plan y pagás el mes.',
    },
    {
      q: '¿Cómo pago?',
      a: banks.length
        ? `Por transferencia a ${banks.join(' o ')}. Los precios están en dólares.`
        : 'Por transferencia bancaria. Los precios están en dólares.',
    },
    {
      q: '¿El WhatsApp está incluido?',
      a: `Es un complemento opcional${waPrice ? ` de $${waPrice} al mes` : ''} que se suma a cualquier plan. Vinculás el WhatsApp de tu salón escaneando un código QR y los mensajes salen desde tu número.`,
    },
    {
      q: '¿Mis clientas tienen que descargar algo?',
      a: 'No. Reservan desde tu enlace en el navegador del celular, y la confirmación les llega por WhatsApp.',
    },
    {
      q: '¿Puedo cancelar cuando quiera?',
      a: 'Sí. No hay contrato: pagás mes a mes (o el año, si preferís el descuento) y dejás de pagar cuando quieras.',
    },
  ];

  return (
    <div className="landing-wrapper">
      <a href="#contenido" className="skip-link">Saltar al contenido</a>
      <WhatsAppCta />

      {/* Nav */}
      <nav className={`glass-nav ${scrolled ? 'nav-compact' : ''}`} aria-label="Principal">
        <div className="container nav-container">
          <a href="#top" className="logo" aria-label="iziSalon, inicio">
            <img src="/isotipo.svg" alt="" width={28} height={28} />
            <span className="logo-text"><span className="izi">izi</span>Salon</span>
          </a>
          <button className="hamburger-btn" onClick={toggleMobileMenu}
            aria-label={isMobileMenuOpen ? 'Cerrar menú' : 'Abrir menú'} aria-expanded={isMobileMenuOpen}>
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
          <div className={`nav-actions ${isMobileMenuOpen ? 'mobile-open' : ''}`}>
            <a href="#funciones" className="nav-link" onClick={closeMobileMenu}>Funciones</a>
            <a href="#planes" className="nav-link" onClick={closeMobileMenu}>Precios</a>
            <a href="#preguntas" className="nav-link" onClick={closeMobileMenu}>Preguntas</a>
            <a href={PORTAL_LOGIN_URL} className="nav-link" onClick={closeMobileMenu}>Iniciar sesión</a>
            <Link to="/registro" className="btn btn-primary btn-sm" onClick={closeMobileMenu}>Probar gratis</Link>
          </div>
        </div>
        {isMobileMenuOpen && <div className="mobile-overlay" onClick={closeMobileMenu} />}
      </nav>

      <main id="contenido">
        {/* Hero */}
        <header id="top" className="hero section container">
          <div className="hero-content">
            <h1 className="hero-title">
              Tu agenda y los recordatorios por WhatsApp, <em>en un solo lugar</em>.
            </h1>
            <p className="hero-subtitle">
              Tus clientas reservan solas desde tu enlace, les llega la confirmación por WhatsApp
              y un recordatorio antes de la cita. Vos dejás de contestar mensajes para dar horarios.
            </p>
            <div className="hero-actions">
              <Link to="/registro" className="btn btn-primary btn-lg">
                Probar 15 días gratis <ArrowRight size={20} className="btn-arrow" />
              </Link>
              <a href="#planes" className="btn btn-ghost btn-lg">Ver precios</a>
            </div>
            <ul className="hero-trust">
              <li><CreditCard size={16} aria-hidden="true" /> Sin tarjeta</li>
              <li><CheckCircle size={16} aria-hidden="true" /> Sin contrato</li>
              <li><Smartphone size={16} aria-hidden="true" /> Funciona en el celular</li>
            </ul>
          </div>

          {/* Mensaje real que manda iziSalon (mismo formato que WhatsAppNotificationService y el workflow de n8n) */}
          <figure className="hero-visual" aria-label="Ejemplo de confirmación por WhatsApp">
            <div className="wa-phone">
              <div className="wa-phone-header">
                <img src="/isotipo.svg" alt="" width={32} height={32} className="wa-avatar" />
                <div>
                  <strong>Tu salón</strong>
                  <span>en línea</span>
                </div>
              </div>
              <div className="wa-chat">
                <span className="wa-day">Ayer</span>
                <p className="wa-bubble wa-bubble-1">
                  ✨ ¡Hola Ana! ✨<br /><br />
                  Tu cita en <strong>Tu Salón</strong> (Centro) quedó confirmada 💜<br /><br />
                  📅 26/09<br />
                  🕐 03:00 pm<br />
                  💇 Manicure, Pedicure<br /><br />
                  ¡Te esperamos para consentirte! 🌟
                  <time>4:10 pm</time>
                </p>
                <span className="wa-day">Hoy</span>
                <p className="wa-bubble wa-bubble-2">
                  ¡Hola Ana! Tu cita en <strong>Tu Salón</strong> (Centro) es en 1 hora 💜<br />
                  🕐 03:00 pm
                  <time>2:00 pm</time>
                </p>
              </div>
            </div>
            <figcaption>Así le llega a tu clienta, desde el WhatsApp de tu salón.</figcaption>
          </figure>
        </header>

        {/* Cómo funciona */}
        <section className="how-it-works section">
          <div className="container">
            <div className="section-header text-center">
              <h2>Empezá hoy, en 3 pasos</h2>
              <p>No necesitás instalar nada ni saber de computadoras.</p>
            </div>
            <ol className="steps-row">
              {STEPS.map((step, i) => (
                <li key={step.title} className="step-card">
                  <span className="step-number" aria-hidden="true">{i + 1}</span>
                  <h3>{step.title}</h3>
                  <p>{step.desc}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* Funciones */}
        <section className="features section" id="funciones">
          <div className="container">
            <div className="section-header text-center">
              <h2>Todo tu salón en una sola app</h2>
              <p>Lo que hoy tenés repartido entre el cuaderno, el WhatsApp y la calculadora.</p>
            </div>
            <div className="features-grid">
              {FEATURES.map((f, i) => {
                const Icon = f.icon;
                return (
                  <article key={f.title} className={`feature${i === 0 ? ' feature-lead' : ''}`}>
                    <h3><span className="feature-icon" aria-hidden="true"><Icon size={20} /></span>{f.title}</h3>
                    <p className="feature-desc">{f.desc}</p>
                    <ul className="feature-points">
                      {f.points.map(pt => (
                        <li key={pt}><CheckCircle size={14} aria-hidden="true" /> {pt}</li>
                      ))}
                    </ul>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        {/* Testimonios reales, enviados por dueños de salones desde su Portal */}
        <TestimonialsSection />

        <PlansSection settings={settings} />

        {/* Preguntas frecuentes */}
        <section className="faq section" id="preguntas">
          <div className="container faq-container">
            <div className="section-header text-center">
              <h2>Preguntas frecuentes</h2>
            </div>
            {FAQ.map(item => (
              <details key={item.q} className="faq-item">
                <summary>{item.q}</summary>
                <p>{item.a}</p>
              </details>
            ))}
          </div>
        </section>

        {/* CTA Final */}
        <section className="cta-final section">
          <div className="container">
            <div className="cta-card text-center">
              <h2>Probá iziSalon 15 días gratis</h2>
              <p>Cargá tu salón hoy y compartí tu enlace de reservas con tus clientas.</p>
              <Link to="/registro" className="btn btn-primary btn-lg">
                Crear mi cuenta gratis <ArrowRight size={20} className="btn-arrow" />
              </Link>
              <p className="cta-note">Sin tarjeta · Sin contrato · Cancelás cuando quieras</p>
            </div>
          </div>
        </section>
      </main>

      {/* Floating mobile CTA */}
      <Link to="/registro" className={`mobile-float-cta ${scrolled ? 'visible' : ''}`}>
        Probar gratis <ArrowRight size={18} />
      </Link>

      {/* Footer */}
      <footer className="footer section">
        <div className="container footer-content">
          <div className="footer-brand">
            <div className="logo">
              <img src="/isotipo.svg" alt="" width={24} height={24} />
              <span className="logo-text"><span className="izi">izi</span>Salon</span>
            </div>
            <p>Agenda, recordatorios por WhatsApp y caja para tu salón de belleza.</p>
          </div>
          <div className="footer-links">
            <div className="footer-col">
              <h2>Producto</h2>
              <Link to="/registro">Probar gratis</Link>
              <a href="#planes">Precios</a>
              <a href={PORTAL_LOGIN_URL}>Iniciar sesión</a>
            </div>
            <div className="footer-col">
              <h2>Contacto</h2>
              {supportEmail && <a href={`mailto:${supportEmail}`}>{supportEmail}</a>}
              {settings?.whatsappNumber && (
                <a href={`https://wa.me/${settings.whatsappNumber.replace(/\D/g, '')}`} target="_blank" rel="noreferrer">WhatsApp</a>
              )}
            </div>
            <div className="footer-col">
              <h2>Legal</h2>
              <Link to="/legal">Términos y Condiciones</Link>
              <Link to="/legal">Política de Privacidad</Link>
            </div>
          </div>
        </div>
        <div className="container footer-bottom"><p>© {new Date().getFullYear()} iziSalon. Todos los derechos reservados.</p></div>
      </footer>
    </div>
  );
};

export default LandingPage;
