import { useState, useCallback, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import {
  Scissors, CalendarHeart, Tv, Users, ArrowRight, Menu, X,
  CheckCircle, Star, Clock, Smartphone,
} from 'lucide-react';
import Particles from '../components/Particles';
import SalonChairSVG from '../components/svg/SalonChairSVG';
import MirrorSVG from '../components/svg/MirrorSVG';
import HairDryerSVG from '../components/svg/HairDryerSVG';
import ScissorsAnimatedSVG from '../components/svg/ScissorsAnimatedSVG';
import ScrollReveal from '../components/ScrollReveal';
import TrustBar from '../components/TrustBar';
import { useCountUp } from '../hooks/useCountUp';
import ClickSparkleStyles from '../components/svg/ClickSparkleStyles';
import './LandingPage.css';

function handleTiltMove(e: React.MouseEvent<HTMLDivElement>) {
  const el = e.currentTarget;
  const rect = el.getBoundingClientRect();
  const x = (e.clientX - rect.left) / rect.width;
  const y = (e.clientY - rect.top) / rect.height;
  el.style.transform = `perspective(800px) rotateX(${(y - 0.5) * -12}deg) rotateY(${(x - 0.5) * 12}deg) scale(1.02)`;
}

function handleTiltLeave(e: React.MouseEvent<HTMLDivElement>) {
  const el = e.currentTarget;
  el.style.transform = 'perspective(800px) rotateX(0deg) rotateY(0deg) scale(1)';
  el.style.transition = 'transform 0.5s ease';
  setTimeout(() => { el.style.transition = ''; }, 500);
}

const FEATURES = [
  {
    icon: CalendarHeart, color: 'bg-pink', title: 'Agenda Online',
    desc: 'Reservas 24/7 sin llamadas telefónicas.',
    points: ['Recordatorios automáticos SMS/email', 'Menos ausencias, más ingresos'],
  },
  {
    icon: Scissors, color: 'bg-purple', title: 'Booking Público',
    desc: 'Tu página de reservas con disponibilidad en tiempo real.',
    points: ['Servicios, precios y horarios sincronizados', 'Sin intervención manual'],
  },
  {
    icon: Tv, color: 'bg-blue', title: 'Pantalla Display',
    desc: 'Turnos en vivo en tu sala de espera.',
    points: ['Experiencia de lujo para tus clientes', 'Personalizable con tu marca'],
  },
  {
    icon: Users, color: 'bg-orange', title: 'Gestión de Equipo',
    desc: 'Control total de tu staff desde un panel.',
    points: ['Comisiones, horarios y permisos', 'Reportes de ingresos y rendimiento'],
  },
];

const STEPS = [
  { icon: Star, title: 'Registrá tu salón', desc: 'Completá tus datos en 3 minutos. Sin tarjeta.' },
  { icon: Smartphone, title: 'Configurá tu espacio', desc: 'Agregá sucursales, servicios y horarios.' },
  { icon: CalendarHeart, title: 'Recibí reservas', desc: 'Tus clientes reservan online 24/7.' },
];

const MOCKUP_STATUSES = [
  { text: 'Confirmado', cls: 'badge-success' },
  { text: 'Llegando', cls: 'badge-warning' },
  { text: 'En espera', cls: 'badge-default' },
];

const LandingPage = () => {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0.5, y: 0.5 });
  const [scissorClick, setScissorClick] = useState(0);
  const [chairHover, setChairHover] = useState(false);
  const [mirrorHover, setMirrorHover] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [mockIdx, setMockIdx] = useState(0);
  const { count: count2k, ref: countRef } = useCountUp({ end: 2000, duration: 2500 });

  const heroRef = useRef<HTMLElement>(null);
  const chairRef = useRef<HTMLDivElement>(null);
  const mirrorRef = useRef<HTMLDivElement>(null);

  // Live mockup rotation
  useEffect(() => {
    const t = setInterval(() => setMockIdx(prev => (prev + 1) % MOCKUP_STATUSES.length), 2500);
    return () => clearInterval(t);
  }, []);

  // Scroll detection
  useEffect(() => {
    const handleScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 600);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Hero mouse parallax
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!heroRef.current) return;
      const rect = heroRef.current.getBoundingClientRect();
      setMousePos({ x: (e.clientX - rect.left) / rect.width, y: (e.clientY - rect.top) / rect.height });
    };
    const hero = heroRef.current;
    if (hero) hero.addEventListener('mousemove', handleMouseMove);
    return () => { if (hero) hero.removeEventListener('mousemove', handleMouseMove); };
  }, []);

  const chairTilt = chairHover ? Math.max(-20, Math.min(20, (mousePos.y - 0.5) * 60)) : 0;
  const mirrorShineX = mousePos.x * 100;
  const mirrorShineY = mousePos.y * 100;

  const toggleMobileMenu = useCallback(() => setMobileMenuOpen(prev => !prev), []);
  const closeMobileMenu = useCallback(() => setMobileMenuOpen(false), []);
  const handleScissorClick = useCallback(() => {
    setScissorClick(prev => prev + 1);
    setTimeout(() => setScissorClick(prev => prev - 1), 500);
  }, []);

  const currentStatus = MOCKUP_STATUSES[mockIdx];

  return (
    <div className="landing-wrapper">
      <ClickSparkleStyles />
      <Particles />

      {/* Nav */}
      <nav className={`glass-nav ${scrolled ? 'nav-compact' : ''}`}>
        <div className="container nav-container">
          <div className="logo">
            <span className="logo-icon">✨</span>
            <span className="logo-text">BeautyFlow</span>
          </div>
          <button className="hamburger-btn" onClick={toggleMobileMenu}
            aria-label={isMobileMenuOpen ? 'Cerrar menú' : 'Abrir menú'} aria-expanded={isMobileMenuOpen}>
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
          <div className={`nav-actions ${isMobileMenuOpen ? 'mobile-open' : ''}`}>
            <Link to="/registro" className="btn btn-outline btn-sm" onClick={closeMobileMenu}>Comenzar</Link>
          </div>
        </div>
        {isMobileMenuOpen && <div className="mobile-overlay" onClick={closeMobileMenu} />}
      </nav>

      {/* Hero */}
      <header ref={heroRef} className="hero section container"
        style={{ '--mouse-x': mousePos.x, '--mouse-y': mousePos.y } as React.CSSProperties}>
        <div className="hero-content">
          <div className="hero-badge animate-bounce-in delay-1">🌟 Plataforma #1 para salones</div>
          <h1 className="hero-title animate-fade-in stagger-1">
            Gestioná tu salón <span className="text-gradient">como un spa de lujo</span>
          </h1>
          <p className="hero-subtitle animate-fade-in stagger-2">
            La plataforma que tus clientes van a amar.
          </p>
          <div className="hero-actions animate-fade-in stagger-3">
            <Link to="/registro" className="btn btn-primary btn-lg animate-pulse-glow">
              Crear cuenta gratis <ArrowRight size={20} className="btn-arrow" />
            </Link>
          </div>
          <div className="hero-trust animate-fade-in stagger-4">
            <div className="trust-item"><Clock size={16} /> Registro en 3 min</div>
            <div className="trust-item"><Star size={16} /> Sin tarjeta</div>
            <div className="trust-item"><Users size={16} />
              <span ref={countRef}>
                <strong>{count2k.toLocaleString()}+</strong>
              </span> salones
            </div>
          </div>
        </div>

        <div className="hero-visual animate-fade-in stagger-3 float-animation">
          <div className="glass-panel app-mockup">
            <div className="mockup-header">
              <div className="dots"><i /><i /><i /></div>
              <span>Agenda Hoy</span>
              <span className={`mockup-live-badge ${currentStatus.cls}`}>{currentStatus.text}</span>
            </div>
            <div className="mockup-body">
              {[
                { time: '09:00', title: 'Corte y Color', client: 'Maria S. con Ana', status: 'Confirmado', cls: 'badge-success' },
                { time: '10:30', title: 'Manicuría Spa', client: 'Juliana M. con Luis', status: 'Llegando', cls: 'badge-warning' },
                { time: '13:00', title: 'Tratamiento Facial', client: 'Cliente Nuevo', status: 'En espera', cls: 'badge-default' },
              ].map((item, i) => (
                <div key={i} className="mockup-item" style={{ animationDelay: `${i * 0.1}s` }}>
                  <div className="calendar-icon">{item.time}</div>
                  <div className="item-info"><h4>{item.title}</h4><p>{item.client}</p></div>
                  <div className={`status ${item.cls}`}>{item.status}</div>
                </div>
              ))}
            </div>
          </div>
          <div className="hero-decorations">
            <div ref={chairRef} className="deco-chair"
              style={{ transform: `rotate(${chairTilt}deg)`, transition: chairHover ? 'transform 0.1s ease' : 'transform 0.4s ease', opacity: chairHover ? 0.6 : 0.25 }}
              onMouseEnter={() => setChairHover(true)} onMouseLeave={() => setChairHover(false)}>
              <SalonChairSVG size={80} />
            </div>
            <div ref={mirrorRef} className="deco-mirror" style={{ opacity: mirrorHover ? 0.5 : 0.2 }}
              onMouseEnter={() => setMirrorHover(true)} onMouseLeave={() => setMirrorHover(false)}>
              <div className="mirror-shine" style={{ '--shine-x': `${mirrorShineX}%`, '--shine-y': `${mirrorShineY}%` } as React.CSSProperties}>
                <MirrorSVG size={48} />
              </div>
            </div>
            <div className="deco-dryer" style={{ opacity: 0.35 }}><HairDryerSVG size={40} /></div>
            <div className="deco-scissors" onClick={handleScissorClick} style={{ cursor: 'pointer', opacity: 0.35 }} title="¡Click! ✂️">
              <ScissorsAnimatedSVG size={28} style={{ animationDuration: scissorClick > 0 ? '0.3s' : '1.5s' }} />
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Hero Fallback */}
      <div className="hero-mobile-fallback container">
        <div className="mobile-features-grid">
          {FEATURES.map((f, i) => {
            const Icon = f.icon;
            return (
              <div key={i} className="mobile-feat-item animate-fade-in" style={{ animationDelay: `${0.3 + i * 0.1}s` }}>
                <Icon size={20} />
                <span>{f.title}</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Cómo funciona */}
      <section className="how-it-works section">
        <div className="container">
          <ScrollReveal animation="slide-up">
            <div className="section-header text-center">
              <h2>Empezá en 3 pasos</h2>
              <p>Registrate, configurá y recibí reservas. Así de simple.</p>
            </div>
          </ScrollReveal>
          <div className="steps-row">
            {STEPS.map((step, i) => {
              const Icon = step.icon;
              return (
                <ScrollReveal key={i} animation="slide-up" delay={i + 1}>
                  <div className="step-card">
                    <div className="step-number">{i + 1}</div>
                    <div className="step-icon-bg"><Icon size={28} /></div>
                    <h3>{step.title}</h3>
                    <p>{step.desc}</p>
                  </div>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* Features expandidas */}
      <section className="features section">
        <div className="container">
          <ScrollReveal animation="slide-up">
            <div className="section-header text-center">
              <h2>Todo lo que necesitás para crecer</h2>
              <p>Cuatro herramientas diseñadas para impulsar tu salón.</p>
            </div>
          </ScrollReveal>
          <div className="features-grid">
            {FEATURES.map((f, i) => {
              const Icon = f.icon;
              return (
                <ScrollReveal key={i} animation="slide-up" delay={i + 1}>
                  <div onMouseMove={handleTiltMove} onMouseLeave={handleTiltLeave} className="glass-panel feature-card card-tilt">
                    <div className={`feature-icon ${f.color}`}><Icon size={28} /></div>
                    <h3>{f.title}</h3>
                    <p className="feature-desc">{f.desc}</p>
                    <ul className="feature-points">
                      {f.points.map((pt, j) => (
                        <li key={j}><CheckCircle size={14} /> {pt}</li>
                      ))}
                    </ul>
                  </div>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* Trust Bar */}
      <TrustBar />

      {/* CTA Final */}
      <section className="cta-final section">
        <div className="container">
          <ScrollReveal animation="bounce-in">
            <div className="cta-card glass-panel text-center">
              <h2>¿Listo para transformar tu salón?</h2>
              <p>Unite a más de {count2k.toLocaleString()} salones que ya confían en BeautyFlow.</p>
              <Link to="/registro" className="btn btn-primary btn-lg animate-pulse-glow">
                Quiero empezar ahora <ArrowRight size={20} className="btn-arrow" />
              </Link>
              <p className="cta-note">✂️ Registro en 3 min · Sin compromiso · Cancelá cuando quieras</p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Floating mobile CTA */}
      <Link to="/registro" className={`mobile-float-cta ${scrolled ? 'visible' : ''}`}>
        Comenzar gratis <ArrowRight size={18} />
      </Link>

      {/* Footer */}
      <footer className="footer section">
        <div className="container footer-content">
          <div className="footer-brand">
            <div className="logo"><span className="logo-icon">✨</span><span className="logo-text">BeautyFlow</span></div>
            <p>Elevando el standard de la industria de la belleza.</p>
          </div>
          <div className="footer-links">
            <div className="footer-col"><h4>Producto</h4><Link to="/registro">Comenzar gratis</Link></div>
            <div className="footer-col"><h4>Contacto</h4><p>hola@beautyflow.com</p></div>
            <div className="footer-col"><h4>Legal</h4><a href="#">Términos</a><a href="#">Privacidad</a></div>
          </div>
        </div>
        <div className="shimmer-divider" />
        <div className="container footer-bottom"><p>© 2026 BeautyFlow. Todos los derechos reservados.</p></div>
      </footer>
    </div>
  );
};

export default LandingPage;
