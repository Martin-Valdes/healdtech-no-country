import { NavLink } from 'react-router-dom'
import styles from './Sidebar.module.css'
import { useAuthStore } from '../../../store/useAuth'

// Define las propiedades requeridas para un NavLink
interface NavLinkItemProps {
  to: string
  badge?: number
  children: React.ReactNode
}

const NavLinkItem = ({ to, badge, children }: NavLinkItemProps) => (
  <NavLink
    to={to}
    className={({ isActive }) =>
      `btn btn-outline-primary border-0 d-flex justify-content-between ${
        styles['btn-outline-primary']
      } ${isActive ? styles.active : ''}`
    }
  >
    {children}
    {badge && (
      <span className={`badge rounded-pill align-self-center ${styles.badge}`}>
        {badge}
      </span>
    )}
  </NavLink>
)

const Sidebar = () => {
  const { user } = useAuthStore()

  return (
    <div className={styles.sidebar}>
      {/* Perfil */}
      <div className="p-3 pt-4">
        <div className="d-flex align-items-center">
          <div className={styles['avatar-container']}>
            {user?.firstName?.[0]?.toUpperCase()}
            {user?.lastName?.[0]?.toUpperCase()}
          </div>
          <div className="ms-3">
            <div className="fw-bold">
              {user?.firstName} {user?.lastName}
            </div>
            <small>{user?.role.toUpperCase()}</small>
          </div>
        </div>
      </div>
      
      {/* nav */}
      <nav className="mt-3">
        {/* Principal */}
        <div className="px-3 mb-2">
          <small className="text-secondary text-uppercase">Principal</small>
        </div>
        <ul className="nav flex-column">
          <li className="nav-item">
            <NavLinkItem to="dashboard">Panel Principal</NavLinkItem>
          </li>
          {/* fin - Panel Principal*/}
          <li className="nav-item">
            <NavLinkItem to="mis-citas" badge={5}>
            {user?.role === 'doctor' ? 'Citas pendientes' : 'Mis citas'}
            </NavLinkItem>
          </li>
          {/* fin - Citas Pendientes*/}
        </ul>

        {/* Pacientes */}
        <div className="px-3 mb-2 mt-4">
          <small className="text-secondary text-uppercase">
            {user?.role === 'doctor' ? 'Pacientes' : 'Doctores'}
          </small>
        </div>
        <ul className="nav flex-column">
          <li className="nav-item">
            <NavLinkItem to={user?.role === 'doctor' ? 'pacientes' : 'doctores'}
             badge={120}>
              {user?.role === 'doctor' ? 'Todos los Pacientes' : 'Todos los Doctores'}
            </NavLinkItem>
          </li>
          {/* fin - Todos los Pacientes*/}
          <li className="nav-item">
            <NavLinkItem to="historial">
              {user?.role === 'doctor' ? 'Historiales' : 'Mi historial'}
              </NavLinkItem>
          </li>
          {/* fin - Historiales*/}
        </ul>

        {/* Administración */}
        <div className="px-3 mb-2 mt-4">
          <small className="text-secondary text-uppercase">
            Administración
          </small>
        </div>
        <ul className="nav flex-column">
          <li className="nav-item">
            <NavLinkItem to="configuracion">Configuración</NavLinkItem>
          </li>
          {/* fin - Configuración*/}
          <li className="nav-item">
            <NavLinkItem to="Reportes">Reportes</NavLinkItem>
          </li>
          {/* fin - Reportes*/}
        </ul>

        {/* cerrar sesión */}
        <div className="mt-4 text-center">
          <button
            className="btn btn-outline-danger text-decoration-none text-white "
            onClick={() => {
              const logout = useAuthStore.getState().logout
              logout()
              window.location.href = '/login'
            }}
          >
            Cerrar Sesión
          </button>
        </div>
      </nav>
    </div>
  )
}

export default Sidebar
