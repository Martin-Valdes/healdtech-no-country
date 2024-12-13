import React, { useState } from 'react';
import backgroundImg from '../assets/2dab48e71b17bd29b01469f11981c192.jpg';
import { useAuthStore } from '../store/useAuth';
import { authApi } from '../api/auth.api';
import { useNavigate } from 'react-router-dom';


export const Login = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string>('');

  const navigate = useNavigate();
  const { login } = useAuthStore();

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!email || !password) {
      setErrorMessage('Por favor, completa todos los campos.');
      return;
    }
    try {
      
      const response = await authApi.login({ email, password });
      
      login(response.email, response.rol);
     console.log(response.rol)
      if (response.rol === 'admin') {
        return navigate('/app-administrador');
      } else if (response.rol === 'doctor') {
        return navigate('/app-medico');
      } else {
        return navigate('/app-paciente');
      }
      
    } catch (error) {
      
      console.log(error);
    }
  };

  return (
    <div className="d-flex flex-column min-vh-100">
      {/* Layout principal */}
      <div className="d-flex flex-grow-1 w-100">
        {/* Sección de imagen */}
        <div
          style={{
            flex: 1,
            backgroundImage: `url(${backgroundImg})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        ></div>

        {/* Sección del formulario */}
        <div
          className="d-flex justify-content-center align-items-center"
          style={{ width: '30%', background: 'rgba(200,200,200,0.4)' }}
        >
          <div
            style={{
              width: '450px',
              padding: '30px',
              color: '#004C79',
              fontSize: '15px',
            }}
          >
            <div className="card-body">
              <h2
                className="card-title text-center mb-4"
                style={{ color: '#004C79', fontWeight: '700px' }}
              >
                Bienvenido de nuevo!
              </h2>
              <br />
              <br />
              <form onSubmit={handleLogin}>
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">
                    Correo electrónico
                  </label>
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    placeholder="Ingresa tu correo"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="password" className="form-label">
                    Contraseña
                  </label>
                  <input
                    type="password"
                    className="form-control"
                    id="password"
                    placeholder="Ingresa tu contraseña"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                <div className="text-end">
                  <a
                    href="#"
                    className="text-decoration-none mt-3"
                    style={{ color: '#004C79', margin: '0' }}
                  >
                    ¿Olvidaste tu contraseña?
                  </a>
                </div>
                <br />
                {errorMessage && <p className="text-danger">{errorMessage}</p>}
                <button
                  type="submit"
                  className="btn w-100"
                  style={{
                    background: '#004C79',
                    color: 'white',
                    boxShadow: '0px 6px 12px rgba(0, 76, 121, 0.6)',
                  }}
                >
                  Iniciar sesión
                </button>
              </form>
              <div className="text-center mt-3">
                <a
                  href="/forgot-password"
                  className="text-decoration-none"
                  style={{ color: '#004C79' }}
                >
                  ¿No tienes una cuenta? Regístrate
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
