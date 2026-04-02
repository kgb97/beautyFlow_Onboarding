import { Link } from 'react-router-dom';
import { Scissors, CalendarHeart, Tv, Users, ArrowRight } from 'lucide-react';
import './LandingPage.css';

const LandingPage = () => {
  return (
    <div className="landing-wrapper">
      {/* Abstract Background Elements */}
      <div className="bg-shape shape-1"></div>
      <div className="bg-shape shape-2"></div>
      <div className="bg-shape shape-3"></div>

      {/* Navigation */}
      <nav className="glass-nav">
        <div className="container nav-container">
          <div className="logo animate-fade-in">
            <span className="logo-icon">✨</span>
            <span className="logo-text">BeautyFlow</span>
          </div>
          <div className="nav-actions animate-fade-in stagger-1">
            <Link to="/registro" className="btn btn-primary">Registrar mi Salón</Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="hero section container">
        <div className="hero-content">
          <h1 className="hero-title animate-fade-in stagger-1">
            Gestiona tu salón de belleza de forma <span className="text-gradient">profesional</span>
          </h1>
          <p className="hero-subtitle animate-fade-in stagger-2">
            La plataforma todo-en-uno que centraliza tus citas, el control de tu equipo y asombra a tus clientes. Aumenta tus reservas hoy mismo.
          </p>
          <div className="hero-actions animate-fade-in stagger-3">
            <Link to="/registro" className="btn btn-primary btn-lg">
              Registrar mi Salón <ArrowRight size={20} />
            </Link>
          </div>
          
          <div className="social-proof animate-fade-in stagger-4">
            <div className="avatars">
              <div className="avatar"></div>
              <div className="avatar"></div>
              <div className="avatar"></div>
              <div className="avatar"></div>
            </div>
            <p>Únete a más de <strong>2,000+</strong> salones exitosos</p>
          </div>
        </div>

        <div className="hero-visual animate-fade-in stagger-3 float-animation">
          <div className="glass-panel app-mockup">
            <div className="mockup-header">
              <div className="dots"><i></i><i></i><i></i></div>
              <span>Agenda Hoy</span>
            </div>
            <div className="mockup-body">
              <div className="mockup-item">
                <div className="calendar-icon">09:00</div>
                <div className="item-info">
                  <h4>Corte y Color</h4>
                  <p>Maria S. con Estilista Ana</p>
                </div>
                <div className="status badge-success">Confirmado</div>
              </div>
              <div className="mockup-item">
                <div className="calendar-icon">10:30</div>
                <div className="item-info">
                  <h4>Manicuría Spa</h4>
                  <p>Juliana M. con Nail Tech Luis</p>
                </div>
                <div className="status badge-warning">Llegando</div>
              </div>
              <div className="mockup-item">
                <div className="calendar-icon">13:00</div>
                <div className="item-info">
                  <h4>Tratamiento Facial</h4>
                  <p>Cliente Nuevo</p>
                </div>
                <div className="status badge-default">En espera</div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Features Section */}
      <section className="features section container">
        <div className="section-header text-center animate-fade-in">
          <h2>Todo lo que necesitas en un solo lugar</h2>
          <p>Herramientas diseñadas específicamente para escalar tu negocio de belleza e impulsar tus ingresos.</p>
        </div>

        <div className="features-grid">
          <div className="glass-panel feature-card animate-fade-in stagger-1">
            <div className="feature-icon bg-pink">
              <CalendarHeart size={28} />
            </div>
            <h3>Agenda Online</h3>
            <p>Tus clientes pueden reservar 24/7 sin llamarte. Reduce las ausencias con recordatorios automáticos.</p>
          </div>

          <div className="glass-panel feature-card animate-fade-in stagger-2">
            <div className="feature-icon bg-purple">
              <Scissors size={28} />
            </div>
            <h3>Booking Público</h3>
            <p>Una página de reservas hermosa y personalizada con tus servicios, precios y disponibilidad en tiempo real.</p>
          </div>

          <div className="glass-panel feature-card animate-fade-in stagger-3">
            <div className="feature-icon bg-blue">
              <Tv size={28} />
            </div>
            <h3>Pantalla TV (Display)</h3>
            <p>Muestra turnos en vivo en la sala de espera de tu salón. Experiencia de lujo que sorprende a tus clientes.</p>
          </div>

          <div className="glass-panel feature-card animate-fade-in stagger-4">
            <div className="feature-icon bg-orange">
              <Users size={28} />
            </div>
            <h3>Gestión de Equipo</h3>
            <p>Controla comisiones, horarios de staffs y permisos granulares. Empodera a tu equipo fácilmente.</p>
          </div>
        </div>
      </section>

      {/* Pricing section removed as requested */}

      {/* Footer */}
      <footer className="footer section">
        <div className="container footer-content">
          <div className="footer-brand">
            <div className="logo">
              <span className="logo-icon">✨</span>
              <span className="logo-text">BeautyFlow</span>
            </div>
            <p>Elevando el standard de la industria de la belleza.</p>
          </div>
          <div className="footer-links">
            <div className="footer-col">
              <h4>Contacto</h4>
              <p>hola@beautyflow.com</p>
              <p>+54 9 11 1234 5678</p>
            </div>
            <div className="footer-col">
              <h4>Legal</h4>
              <a href="#">Términos y Condiciones</a>
              <a href="#">Privacidad</a>
            </div>
          </div>
        </div>
        <div className="container footer-bottom">
          <p>© 2026 BeautyFlow. Todos los derechos reservados.</p>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
