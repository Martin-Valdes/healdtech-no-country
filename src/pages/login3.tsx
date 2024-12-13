import React, { useState, useEffect } from 'react';
import backgroundImg from '../assets/2dab48e71b17bd29b01469f11981c192.jpg';
import { UserManager } from '../utils/UserManager';

export const Login = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string>('');

  useEffect(() => {
    UserManager.initializeDefaultUsers();
  }, []);

  const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!email || !password) {
      setErrorMessage('Por favor, completa todos los campos.');
      return;
    }

    const isAuthenticated = UserManager.authenticateUser(email, password);

    if (isAuthenticated) {
      alert('Inicio de sesión exitoso.');
      setErrorMessage('');
      // Redirigir o actualizar estado aquí
    } else {
      setErrorMessage('Correo o contraseña incorrectos.');
    }
  };

  return (
    <div
      className="d-flex flex-column min-vh-100"
      style={{
        backgroundImage: `url(https://i.pinimg.com/736x/8d/da/b9/8ddab9867f98cf741e397fe51fd058c5.jpg)`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        width: '100vw',
      }}
    >
      {/* Header */}
      <header className="bg-primary text-white  w-100"style={{
        margin: 0,
        padding:0
      }}>
        <nav className="container-fluid">
          <h1 className="text-center">Hospital el PEPE</h1>
        </nav>
      </header>

      {/* Layout principal */}
      <div className="d-flex flex-grow-1 justify-content-center align-items-center w-100 px-4" >
        <div
          className="card shadow-sm"
          style={{
            width: '100%',
            height: '70%',
            maxWidth: '450px',
            position: 'absolute',
            right: '0',
            marginRight: '60px',
            padding: '20px',
            borderRadius: '8px',
            backgroundColor: 'rgba(200,200,200,0.4)',
          }}
        >
          <div className="card-body">
            <h4 className="card-title text-center mb-4">Bienvenido de nuevo</h4>
            <form onSubmit={handleLogin}>
              <div className="mb-3">
                <label htmlFor="email" className="form-label">Correo electrónico</label>
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
                <label htmlFor="password" className="form-label">Contraseña</label>
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
              {errorMessage && <p className="text-danger">{errorMessage}</p>}
              <button type="submit" className="btn btn-primary w-100">Iniciar sesión</button>
            </form>
            <div className="text-center mt-3">
              <a href="/forgot-password" className="text-decoration-none">¿Olvidaste tu contraseña?</a>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="text-black w-100" style={{ 
        padding: '0px',
        paddingTop: '5px', 
        paddingBottom: '5px', 
        margin: '0px', 
        backgroundColor: 'rgba(200,200,200,0.4)',
        fontSize: '12px'}}>
        <div className="container text-center">
          <p style={{padding: '0px', margin:'0px'}}>&copy; 2024 Hospital el PEPE</p>
        </div>
      </footer>
    </div>
  );
};