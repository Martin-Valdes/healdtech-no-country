import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import styles from './landingPage.module.css';
import { useAuthStore } from '../../store/useAuth';

const LandingPage = () => {
  const navigate = useNavigate();
  const [isScrolled, setIsScrolled] = useState(false);
  const {isAuthenticated,user} = useAuthStore();
  const [activeSection, setActiveSection] = useState('inicio');

 

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);

      // Detectar sección activa
      const sections = ['inicio', 'servicios', 'funcionamiento', 'especialistas'];
      const scrollPosition = window.scrollY + 100;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const top = element.offsetTop;
          const height = element.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleAppointmentClick = () => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }
    if(user.role === 'patient'){
      navigate('/app-paciente/dashboard');
      return;
    }
    document.getElementById('contacto')?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleNavClick = (sectionId: string) => {
    setActiveSection(sectionId);
    document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className={styles.pageContainer}>
      {/* Navbar */}
      <nav className={`${styles.navbar} ${isScrolled ? styles.navbarScrolled : ''}`}>
        <div className="container d-flex justify-content-between align-items-center">
          <div className={styles.logo}>
            <span className={styles.logoIcon}>🏥</span>
            <span className={styles.logoText}>MediConnect</span>
          </div>
          <div className={styles.navLinks}>
            <button 
              onClick={() => handleNavClick('inicio')}
              className={`${styles.navLink} ${activeSection === 'inicio' ? styles.active : ''}`}
            >
              Inicio
            </button>
            <button 
              onClick={() => handleNavClick('servicios')}
              className={`${styles.navLink} ${activeSection === 'servicios' ? styles.active : ''}`}
            >
              Servicios
            </button>
            <button 
              onClick={() => handleNavClick('funcionamiento')}
              className={`${styles.navLink} ${activeSection === 'funcionamiento' ? styles.active : ''}`}
            >
              Cómo Funciona
            </button>
            <button 
              onClick={() => handleNavClick('especialistas')}
              className={`${styles.navLink} ${activeSection === 'especialistas' ? styles.active : ''}`}
            >
              Especialistas
            </button>
            {(!isAuthenticated || (isAuthenticated && user?.role !== 'patient')) ? (
              <button 
                onClick={() => navigate('/login')} 
                className={styles.loginButton}
              >
                Iniciar Sesión
              </button>
            ) : (
              <button 
                onClick={() => navigate('/app-paciente/dashboard')} 
                className={styles.loginButton}
              >
                Dashboard
              </button>
            )}
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="inicio" className={styles.heroSection}>
        <div className={styles.heroContent}>
          <h1 className={styles.heroTitle}>
            Atención médica profesional<br/>
            <span className={styles.heroHighlight}>desde tu hogar</span>
          </h1>
          <p className={styles.heroSubtitle}>
            Consulta con especialistas certificados a través de videollamadas seguras.
            Diagnóstico, tratamiento y seguimiento, todo en un solo lugar.
          </p>
          <div className={styles.heroButtons}>
            <button 
              className={styles.primaryButton}
              onClick={handleAppointmentClick}
            >
              {isAuthenticated ? 'Agendar Consulta' : 'Comenzar Ahora'}
            </button>
            <button 
              onClick={() => handleNavClick('funcionamiento')} 
              className={styles.secondaryButton}
            >
              Ver Cómo Funciona
            </button>
          </div>
          <div className={styles.heroStats}>
            <div className={styles.statItem}>
              <span className={styles.statNumber}>10k+</span>
              <span className={styles.statLabel}>Pacientes Atendidos</span>
            </div>
            <div className={styles.statItem}>
              <span className={styles.statNumber}>50+</span>
              <span className={styles.statLabel}>Especialistas</span>
            </div>
            <div className={styles.statItem}>
              <span className={styles.statNumber}>4.9</span>
              <span className={styles.statLabel}>Calificación</span>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="servicios" className={styles.servicesSection}>
        <div className="container">
          <div className={styles.sectionHeader}>
            <h2>Nuestros Servicios</h2>
            <p>Atención médica integral adaptada a tus necesidades</p>
          </div>
          <div className="row g-4">
            {[
              {
                title: 'Consulta General',
                icon: '👨‍⚕️',
                description: 'Atención médica general con diagnóstico y tratamiento personalizado',
                features: ['Consultas de 30 minutos', 'Recetas digitales', 'Seguimiento incluido']
              },
              {
                title: 'Especialidades',
                icon: '🏥',
                description: 'Acceso a médicos especialistas en diferentes áreas de la salud',
                features: ['Pediatría', 'Cardiología', 'Dermatología', 'Nutrición']
              },
              {
                title: 'Salud Mental',
                icon: '🧠',
                description: 'Apoyo profesional para tu bienestar emocional',
                features: ['Psicología', 'Psiquiatría', 'Terapia en línea']
              }
            ].map((service, index) => (
              <div key={index} className="col-md-4">
                <div className={styles.serviceCard}>
                  <span className={styles.serviceIcon}>{service.icon}</span>
                  <h3>{service.title}</h3>
                  <p>{service.description}</p>
                  <ul className={styles.featureList}>
                    {service.features.map((feature, i) => (
                      <li key={i}>{feature}</li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it Works Section */}
      <section id="funcionamiento" className={styles.howItWorksSection}>
        <div className="container">
          <div className={styles.sectionHeader}>
            <h2>Cómo Funciona</h2>
            <p>Consulta con un especialista en 3 simples pasos</p>
          </div>
          <div className="row g-4">
            {[
              {
                step: 1,
                title: 'Regístrate',
                description: 'Crea tu cuenta en minutos y completa tu perfil médico'
              },
              {
                step: 2,
                title: 'Agenda tu Cita',
                description: 'Elige el especialista y horario que mejor te convenga'
              },
              {
                step: 3,
                title: 'Consulta Online',
                description: 'Conéctate a tu videoconsulta y recibe atención personalizada'
              }
            ].map((step, index) => (
              <div key={index} className="col-md-4">
                <div className={styles.stepCard}>
                  <div className={styles.stepNumber}>{step.step}</div>
                  <h3>{step.title}</h3>
                  <p>{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Specialists Section */}
      <section id="especialistas" className={styles.specialistsSection}>
        <div className="container">
          <div className={styles.sectionHeader}>
            <h2>Nuestros Especialistas</h2>
            <p>Profesionales certificados listos para atenderte</p>
          </div>
          <div className="row g-4">
            {[
              {
                name: 'Dra. María García',
                specialty: 'Medicina General',
                image: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=200',
                rating: '4.9',
                experience: '10 años'
              },
              {
                name: 'Dr. Carlos Rodríguez',
                specialty: 'Pediatría',
                image: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&q=80&w=200',
                rating: '4.8',
                experience: '15 años'
              },
              {
                name: 'Dra. Ana Martínez',
                specialty: 'Cardiología',
                image: 'https://images.unsplash.com/photo-1594824476967-48c8b964273f?auto=format&fit=crop&q=80&w=200',
                rating: '5.0',
                experience: '12 años'
              }
            ].map((specialist, index) => (
              <div key={index} className="col-md-4">
                <div className={styles.specialistCard}>
                  <img 
                    src={specialist.image} 
                    alt={specialist.name}
                    className={styles.specialistImage}
                  />
                  <h3>{specialist.name}</h3>
                  <p className={styles.specialty}>{specialist.specialty}</p>
                  <div className={styles.specialistDetails}>
                    <span>⭐ {specialist.rating}</span>
                    <span>|</span>
                    <span>{specialist.experience}</span>
                  </div>
                  <button 
                    className={styles.primaryButton}
                    onClick={handleAppointmentClick}
                  >
                    Agendar Consulta
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className={styles.ctaSection}>
        <div className="container">
          <div className={styles.ctaContent}>
            <h2>Comienza tu consulta hoy mismo</h2>
            <p>
              Únete a miles de pacientes que confían en nosotros para su atención médica.
              Consultas seguras y profesionales desde la comodidad de tu hogar.
            </p>
            <button 
              className={styles.primaryButton}
              onClick={handleAppointmentClick}
            >
              Comenzar Ahora
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className={styles.footer}>
        <div className="container">
          <div className="row">
            <div className="col-md-4">
              <div className={styles.footerBrand}>
                <span className={styles.logoIcon}>🏥</span>
                <span className={styles.logoText}>MediConnect</span>
                <p>Cuidando tu salud en la era digital</p>
              </div>
            </div>
            <div className="col-md-2">
              <h4>Servicios</h4>
              <ul>
                <li><a href="#servicios">Consulta General</a></li>
                <li><a href="#servicios">Especialidades</a></li>
                <li><a href="#servicios">Salud Mental</a></li>
              </ul>
            </div>
            <div className="col-md-2">
              <h4>Empresa</h4>
              <ul>
                <li><a href="#about">Sobre Nosotros</a></li>
                <li><a href="#especialistas">Especialistas</a></li>
                <li><a href="#contact">Contacto</a></li>
              </ul>
            </div>
            <div className="col-md-4">
              <h4>Contacto</h4>
              <p>📧 contacto@mediconnect.com</p>
              <p>📱 (123) 456-7890</p>
              <div className={styles.socialLinks}>
                <a href="#" className={styles.socialIcon}>Twitter</a>
                <a href="#" className={styles.socialIcon}>Facebook</a>
                <a href="#" className={styles.socialIcon}>LinkedIn</a>
              </div>
            </div>
          </div>
          <div className={styles.footerBottom}>
            <p> 2024 MediConnect - Todos los derechos reservados</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;