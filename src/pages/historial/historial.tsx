import { useState } from 'react';
import './historial.css';

const Historial = () => {
  // Datos simulados (como si vinieran de una base de datos)
  const datos = [
    { dni: '12345678', nombre: 'Juan Pérez', domicilio: 'posadas', fnacimiento: '05/01/1999', finicio: '20/05/2020', hisclinica: 'linkhistotia', id: '1' },
    { dni: '87654321', nombre: 'Ana López', domicilio: 'pampa', fnacimiento: '01/01/1999', finicio: '20/08/2021', hisclinica: 'linkhistotia', id: '2' },
    { dni: '56781234', nombre: 'Luis García', domicilio: 'Peru', fnacimiento: '30/03/1950', finicio: '06/06/2022', hisclinica: 'linkhistotia', id: '3' },
    { dni: '43218765', nombre: 'María Torres', domicilio: 'Argentina', fnacimiento: '08/05/2000', finicio: '03/03/2020', hisclinica: 'linkhistotia', id: '4' },
    { dni: '11111111', nombre: 'Carlos Méndez', domicilio: 'Chile', fnacimiento: '15/04/1985', finicio: '10/10/2020', hisclinica: 'linkhistotia', id: '5' },
    { dni: '22222222', nombre: 'Elena Ruiz', domicilio: 'México', fnacimiento: '22/02/1990', finicio: '18/09/2019', hisclinica: 'linkhistotia', id: '6' },
    { dni: '33333333', nombre: 'Miguel Vega', domicilio: 'Uruguay', fnacimiento: '13/07/1995', finicio: '25/12/2021', hisclinica: 'linkhistotia', id: '7' },
    { dni: '44444444', nombre: 'Lucía Salinas', domicilio: 'Paraguay', fnacimiento: '09/11/1980', finicio: '07/07/2023', hisclinica: 'linkhistotia', id: '8' },
    { dni: '55555555', nombre: 'Javier Ortega', domicilio: 'Bolivia', fnacimiento: '01/03/1978', finicio: '14/04/2018', hisclinica: 'linkhistotia', id: '9' },
    { dni: '66666666', nombre: 'Sofía Vargas', domicilio: 'Ecuador', fnacimiento: '20/12/1992', finicio: '02/02/2021', hisclinica: 'linkhistotia', id: '10' },
    { dni: '77777777', nombre: 'Fernando Castillo', domicilio: 'Brasil', fnacimiento: '18/06/1987', finicio: '30/08/2022', hisclinica: 'linkhistotia', id: '11' },
    { dni: '88888888', nombre: 'Paula Gómez', domicilio: 'Colombia', fnacimiento: '05/09/1975', finicio: '20/03/2020', hisclinica: 'linkhistotia', id: '12' },
    { dni: '99999999', nombre: 'Héctor Ramírez', domicilio: 'Venezuela', fnacimiento: '12/05/1965', finicio: '11/11/2017', hisclinica: 'linkhistotia', id: '13' },
    { dni: '12341234', nombre: 'Marina López', domicilio: 'España', fnacimiento: '07/08/1993', finicio: '15/01/2023', hisclinica: 'linkhistotia', id: '14' },
    { dni: '56785678', nombre: 'Ramiro Díaz', domicilio: 'Perú', fnacimiento: '03/10/1983', finicio: '23/05/2019', hisclinica: 'linkhistotia', id: '15' },
    { dni: '87658765', nombre: 'Carla Nieto', domicilio: 'Argentina', fnacimiento: '11/02/2000', finicio: '01/09/2020', hisclinica: 'linkhistotia', id: '16' },
    { dni: '31415926', nombre: 'Gabriel Fernández', domicilio: 'Uruguay', fnacimiento: '14/03/1989', finicio: '16/06/2021', hisclinica: 'linkhistotia', id: '17' },
    { dni: '98765432', nombre: 'Laura Pérez', domicilio: 'México', fnacimiento: '28/02/1997', finicio: '05/05/2022', hisclinica: 'linkhistotia', id: '18' },
    { dni: '13579135', nombre: 'Diego Herrera', domicilio: 'Chile', fnacimiento: '09/11/1982', finicio: '12/12/2020', hisclinica: 'linkhistotia', id: '19' },
    { dni: '24682468', nombre: 'Patricia Silva', domicilio: 'Brasil', fnacimiento: '04/04/1990', finicio: '08/08/2023', hisclinica: 'linkhistotia', id: '20' },
  ];

  const [criterio, setCriterio] = useState('');
  const [resultados, setResultados] = useState(datos);

  const filtrar = () => {
    const filtro = criterio.toLowerCase();
    const filtrados = datos.filter(
      (item) =>
        item.nombre.toLowerCase().includes(filtro) ||
        item.dni.includes(filtro) ||
        item.domicilio.toLowerCase().includes(filtro)
    );
    setResultados(filtrados);
  };

  return (
    <div className="d-flex flex-column min-vh-100" style={{ maxWidth: '1800px' }}>
      {/* Campo de entrada y botón de filtro */}
      <div style={{ margin: '10px', padding: '10px' }}>
        <input
          type="text"
          placeholder="Nombre, DNI o Domicilio"
          value={criterio}
          onChange={(e) => setCriterio(e.target.value)}
          style={{
            padding: '8px',
            borderRadius: '8px',
            border: '1px solid #004C79',
            marginRight: '8px',
          }}
        />
        <button
          onClick={filtrar}
          style={{
            padding: '8px 16px',
            borderRadius: '8px',
            background: '#004C79',
            color: '#fff',
            border: 'none',
            boxShadow: '0px 0px 10px 0px rgba(0,0,0,0.75)',
          }}
        >
          Buscar
        </button>
      </div>

      <div
        className="rounded-3 custom-scroll"
        style={{
          margin: '0px 10px',
          padding: '0px',
          overflow: 'hidden',
          boxShadow: '0px 0px 15px 0px rgba(0,0,0,0.75)',
          maxHeight: '1000px',
        }}
      >
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          {/* Encabezado de la tabla */}
          <thead>
            <tr
              style={{
                border: 'solid 1px #004C79',
                height: '50px',
                textAlign: 'center',
                backgroundColor: '#004C79',
                color: 'white',
              }}
            >
              <th style={{ border: 'solid 1px #004C79', width: '12.5%', padding: '10px' }}>DNI</th>
              <th style={{ border: 'solid 1px #004C79', width: '14%', padding: '10px' }}>NOMBRE</th>
              <th style={{ border: 'solid 1px #004C79', width: '14%', padding: '10px' }}>DOMICILIO</th>
              <th style={{ border: 'solid 1px #004C79', width: '14%', padding: '10px' }}>FECHA DE NACIMIENTO</th>
              <th style={{ border: 'solid 1px #004C79', width: '14%', padding: '10px' }}>FECHA DE INICIO</th>
              <th style={{ border: 'solid 1px #004C79', width: '14%', padding: '10px' }}>Historia Clinica</th>
            </tr>
          </thead>
        </table>

        <div
          style={{
            maxHeight: '600px',
            overflowY: 'auto',
          }}
          className="custom-scroll"
        >
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <tbody>
              {resultados.map((fila, index) => (
                <tr
                  key={index}
                  style={{
                    border: 'solid 1px #004C79',
                    height: '40px',
                    textAlign: 'center',
                    backgroundColor: index % 2 === 0 ? '#e3f2fd' : '#ffffff',
                  }}
                >
                  <td style={{ border: 'solid 1px #004C79', padding: '10px' }}>{fila.dni}</td>
                  <td style={{ border: 'solid 1px #004C79', padding: '10px' }}>{fila.nombre}</td>
                  <td style={{ border: 'solid 1px #004C79', padding: '10px' }}>{fila.domicilio}</td>
                  <td style={{ border: 'solid 1px #004C79', padding: '10px' }}>{fila.fnacimiento}</td>
                  <td style={{ border: 'solid 1px #004C79', padding: '10px' }}>{fila.finicio}</td>
                  <td style={{ border: 'solid 1px #004C79', padding: '10px' }}><a href={`historial/paciente`}>{fila.hisclinica}</a></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Historial;

