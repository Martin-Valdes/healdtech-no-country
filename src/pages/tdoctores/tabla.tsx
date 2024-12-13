import { useState, useMemo } from 'react';

type Doctor = {
  nombre: string;
  hospital: string;
  especialidad: string;
  disponibilidad: string;
};

const columnas: (keyof Doctor)[] = ['nombre', 'hospital', 'especialidad', 'disponibilidad'];

export const TablaDoctores = () => {
  const [ordenarVisible, setOrdenarVisible] = useState(false);
  const [filtros, setFiltros] = useState<Partial<Doctor>>({});
  const [datos] = useState<Doctor[]>([
    { nombre: 'Juan Pérez', hospital: 'Hospital Central', especialidad: 'Cardiología', disponibilidad: '2024-05-20' },
    { nombre: 'Ana López', hospital: 'Clínica San José', especialidad: 'Neurología', disponibilidad: '2024-06-01' },
    { nombre: 'Luis García', hospital: 'Hospital Regional', especialidad: 'Pediatría', disponibilidad: '2024-03-15' },
    { nombre: 'María Torres', hospital: 'Clínica Norte', especialidad: 'Oncología', disponibilidad: '2023-12-10' },
    { nombre: 'Carlos Gómez', hospital: 'Hospital de Clínicas', especialidad: 'Dermatología', disponibilidad: '2024-01-05' },
    { nombre: 'Sofía Martínez', hospital: 'Clínica Santa Fe', especialidad: 'Ginecología', disponibilidad: '2024-02-14' },
    { nombre: 'Diego Fernández', hospital: 'Hospital Central', especialidad: 'Cirugía General', disponibilidad: '2024-07-18' },
    { nombre: 'Lucía Herrera', hospital: 'Hospital Regional', especialidad: 'Psiquiatría', disponibilidad: '2024-08-22' },
    { nombre: 'Javier Morales', hospital: 'Clínica San José', especialidad: 'Traumatología', disponibilidad: '2024-09-05' },
    { nombre: 'Camila Ríos', hospital: 'Hospital de Clínicas', especialidad: 'Reumatología', disponibilidad: '2024-11-30' },
    { nombre: 'Sebastián Ruiz', hospital: 'Clínica Norte', especialidad: 'Urología', disponibilidad: '2024-04-10' },
    { nombre: 'Andrea Castro', hospital: 'Hospital Central', especialidad: 'Oftalmología', disponibilidad: '2024-12-15' },
    { nombre: 'Miguel Álvarez', hospital: 'Hospital Regional', especialidad: 'Geriatría', disponibilidad: '2024-01-25' },
    { nombre: 'Valentina Vega', hospital: 'Clínica Santa Fe', especialidad: 'Neonatología', disponibilidad: '2024-03-08' },
    { nombre: 'Tomás Blanco', hospital: 'Clínica San José', especialidad: 'Endocrinología', disponibilidad: '2024-06-20' },

  ]);

  const datosOrdenados = useMemo(() => {
    return [...datos].sort((a, b) => new Date(a.disponibilidad).getTime() - new Date(b.disponibilidad).getTime());
  }, [datos]);

  const datosFiltrados = useMemo(() => {
    return datosOrdenados.filter((doctor) =>
      Object.entries(filtros).every(([clave, valor]) =>
        doctor[clave as keyof Doctor].toLowerCase().includes(valor!.toLowerCase())
      )
    );
  }, [datosOrdenados, filtros]);

  const manejarFiltro = (columna: keyof Doctor, valor: string) => {
    setFiltros((prev) => ({ ...prev, [columna]: valor }));
  };

  return (
    <div style={{ maxHeight: '1000px' }}>
      <div style={{ margin: '10px', padding: '10px' }}>
        <button
          onClick={() => setOrdenarVisible(!ordenarVisible)}
          style={{
            padding: '8px 16px',
            borderRadius: '8px',
            background: '#004C79',
            color: '#fff',
            border: 'none',
            boxShadow: '0px 0px 10px 0px rgba(0,0,0,0.75)',
          }}
        >
          FILTRAR
        </button>
      </div>

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
          <p style={{ margin: '0 0 10px' }}>Filtrar por:</p>
          {columnas.map((columna) => (
            <div key={columna} style={{ marginBottom: '10px' }}>
              <label>{columna.toUpperCase()}</label>
              <input
                type="text"
                value={filtros[columna] || ''}
                onChange={(e) => manejarFiltro(columna, e.target.value)}
                style={{
                  marginLeft: '10px',
                  padding: '5px',
                  borderRadius: '4px',
                  border: '1px solid #ccc',
                }}
              />
            </div>
          ))}
        </div>
      )}

      <div
        style={{
          margin: '0px 10px',
          padding: '0px',
          overflow: 'hidden',
          boxShadow: '0px 0px 15px 0px rgba(0,0,0,0.75)',
          maxHeight: '1000px',
        }}
      >
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
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
              {columnas.map((columna) => (
                <th key={columna} style={{ border: 'solid 1px #004C79', padding: '10px', width: '25%' }}>
                  {columna.toUpperCase()}
                </th>
              ))}
            </tr>
          </thead>
        </table>

        <div style={{ maxHeight: '600px', overflowY: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <tbody>
              {datosFiltrados.map((fila, index) => (
                <tr
                  key={index}
                  style={{
                    border: 'solid 1px #004C79',
                    height: '40px',
                    textAlign: 'center',
                    backgroundColor: index % 2 === 0 ? '#e3f2fd' : '#ffffff',
                  }}
                >
                  {columnas.map((columna) => (
                    <td key={columna} style={{ border: 'solid 1px #004C79', padding: '10px', width: '25%' }}>
                      {fila[columna]}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};