import { useState } from 'react';

// Definición del tipo Paciente
type Paciente = {
  dni: string;
  nombre: string;
  domicilio: string;
  fnacimiento: string;
  fultimo: string;
};

 // Columnas de la tabla
 const columnas: (keyof Paciente)[] = ['dni', 'nombre', 'domicilio', 'fnacimiento', 'fultimo'];

export const Tpacientes = () => {
    // Datos simulados (como si vinieran de una base de datos)
    const [ordenarVisible, setOrdenarVisible] = useState(false);

  // Datos simulados (como si vinieran de una base de datos)
  const [datos, setDatos] = useState<Paciente[]>([
    { dni: '12345678', nombre: 'Juan Pérez', domicilio: 'posadas', fnacimiento: '05/01/1999', fultimo: '20/05/2020' },
    { dni: '87654321', nombre: 'Ana López', domicilio: 'pampa', fnacimiento: '01/01/1999', fultimo: '20/08/2021' },
    { dni: '56781234', nombre: 'Luis García', domicilio: 'Peru', fnacimiento: '30/03/1950', fultimo: '06/06/2022' },
    { dni: '43218765', nombre: 'María Torres', domicilio: 'Argentina', fnacimiento: '08/05/2000', fultimo: '03/03/2020' },
    { dni: '11223344', nombre: 'Carlos Gómez', domicilio: 'Buenos Aires', fnacimiento: '12/12/1985', fultimo: '10/02/2023' },
    { dni: '22334455', nombre: 'Lucía Martínez', domicilio: 'Córdoba', fnacimiento: '07/07/1990', fultimo: '15/07/2022' },
    { dni: '33445566', nombre: 'Javier Fernández', domicilio: 'Rosario', fnacimiento: '03/03/1975', fultimo: '22/11/2023' },
    { dni: '44556677', nombre: 'Sofía Rodríguez', domicilio: 'Santa Fe', fnacimiento: '21/06/1995', fultimo: '18/08/2023' },
    { dni: '55667788', nombre: 'Martín López', domicilio: 'Mendoza', fnacimiento: '11/04/1980', fultimo: '05/01/2023' },
    { dni: '66778899', nombre: 'Camila Sánchez', domicilio: 'Tucumán', fnacimiento: '28/09/1992', fultimo: '12/03/2023' },
    { dni: '77889900', nombre: 'Diego Torres', domicilio: 'Salta', fnacimiento: '15/01/1988', fultimo: '25/10/2023' },
    { dni: '88990011', nombre: 'Valentina Morales', domicilio: 'Neuquén', fnacimiento: '30/08/1999', fultimo: '10/06/2023' },
    { dni: '99001122', nombre: 'Sebastián Ramírez', domicilio: 'La Plata', fnacimiento: '05/05/1972', fultimo: '20/04/2023' },
    { dni: '10011223', nombre: 'Gabriela Méndez', domicilio: 'Mar del Plata', fnacimiento: '17/02/1983', fultimo: '02/09/2023' },
    { dni: '11221133', nombre: 'Roberto Castillo', domicilio: 'San Juan', fnacimiento: '08/11/1965', fultimo: '15/05/2023' },
    { dni: '12332144', nombre: 'Laura Domínguez', domicilio: 'Entre Ríos', fnacimiento: '20/12/1998', fultimo: '30/01/2023' },
    { dni: '23443255', nombre: 'Tomás Aguirre', domicilio: 'Chaco', fnacimiento: '09/09/2000', fultimo: '22/08/2023' },
    { dni: '34554366', nombre: 'Florencia Paredes', domicilio: 'Jujuy', fnacimiento: '01/03/1997', fultimo: '19/07/2023' },
    { dni: '45665477', nombre: 'Juan Cruz', domicilio: 'Catamarca', fnacimiento: '14/05/1993', fultimo: '25/11/2023' },
  ]);
  // Función para ordenar los datos
  const ordenarPor = (columna: keyof Paciente) => {
    const datosOrdenados = [...datos].sort((a, b) => {
      if (a[columna] < b[columna]) return -1;
      if (a[columna] > b[columna]) return 1;
      return 0;
    });
    setDatos(datosOrdenados); // Actualiza el estado con los datos ordenados
  };


  return (
    <div style={{maxHeight: '1000px',}}>
      {/* Botón de orden */}
      <div style={{ margin: '10px', padding: '10px' }}>
        <button  onClick={() => setOrdenarVisible(!ordenarVisible)}
        style={{ padding: '8px 16px', borderRadius: '8px', background: '#004C79', color: '#fff', border: 'none',boxShadow:'0px 0px 10px 0px rgba(0,0,0,0.75)' }}>
          ORDENAR
        </button>
      </div>

      {/* Contenedor de opciones de ordenar */}
      {ordenarVisible && (
        <div
          style={{
            marginBottom: '20px',
            padding: '10px',
            backgroundColor: '#f4f4f4',
            border: '1px solid #ccc',
            borderRadius: '8px',
          }}
        >
          <p style={{ margin: '0 0 10px' }}>Selecciona un criterio para ordenar:</p>
          {columnas.map((columna) => (
            <button
              key={columna}
              style={{
                margin: '5px',
                padding: '8px 12px',
                background: '#004C79',
                color: '#fff',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
              }}
              onClick={() => ordenarPor(columna)}
            >
              {columna.toUpperCase()}
            </button>
          ))}
        </div>
      )}

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
              <th style={{ border: 'solid 1px #004C79', width: '20%', padding: '10px' }}>DNI</th>
              <th style={{ border: 'solid 1px #004C79', width: '20%', padding: '10px' }}>NOMBRE</th>
              <th style={{ border: 'solid 1px #004C79', width: '20%', padding: '10px' }}>DOMICILIO</th>
              <th style={{ border: 'solid 1px #004C79', width: '20%', padding: '10px' }}>FECHA DE NACIMIENTO</th>
              <th style={{ border: 'solid 1px #004C79', width: '20%', padding: '10px' }}>ULTIMA VISITA</th>
            </tr>
          </thead>
        </table>

        {/* Contenedor con barra de desplazamiento para el cuerpo de la tabla */}
        <div
          style={{
            maxHeight: '600px', 
            overflowY: 'auto', // Barra de desplazamiento vertical
          }}
          className="custom-scroll"
        >
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <tbody>
              {datos.map((fila, index) => (
                <tr
                  key={index}
                  style={{
                    border: 'solid 1px #004C79',
                    height: '40px',
                    textAlign: 'center',
                    backgroundColor: index % 2 === 0 ? '#e3f2fd' : '#ffffff',
                  }}
                >
                  <td style={{ border: 'solid 1px #004C79', padding: '10px' , width:'12%'}}>{fila.dni}</td>
                  <td style={{ border: 'solid 1px #004C79', padding: '10px', width:'12%' }}>{fila.nombre}</td>
                  <td style={{ border: 'solid 1px #004C79', padding: '10px', width:'12%' }}>{fila.domicilio}</td>
                  <td style={{ border: 'solid 1px #004C79', padding: '10px' , width:'12%'}}>{fila.fnacimiento}</td>
                  <td style={{ border: 'solid 1px #004C79', padding: '10px', width:'12%' }}>{fila.fultimo}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
