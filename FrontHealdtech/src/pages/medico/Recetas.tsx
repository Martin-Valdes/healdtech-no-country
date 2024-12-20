import { useState, useEffect } from 'react';
import { FiSearch, FiPlus, FiDownload, FiEdit2, FiTrash2 } from 'react-icons/fi';
import jsPDF from 'jspdf';
import styles from './Recetas.module.css';
import NuevaRecetaModal from '../../components/Medic/dashboard/NuevaRecetaModal';
import useModal from '../../hooks/useModal';
interface Receta {
  id: string;
  paciente: string;
  fecha: string;
  medicamentos: {
    nombre: string;
    dosis: string;
    frecuencia: string;
    duracion: string;
    indicaciones?: string;
  }[];
  estado: 'activa' | 'completada' | 'cancelada';
}

const Recetas = () => {
  const [recetas, setRecetas] = useState<Receta[]>([]);
  const [filtro, setFiltro] = useState('');
  const [loading, setLoading] = useState(false);
  const { isOpen, openModal, closeModal } = useModal();
  const [recetaEditar, setRecetaEditar] = useState<Receta | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    cargarRecetas();
  }, []);

  const cargarRecetas = async () => {
    setLoading(true);
    setError(null);
    try {
      // TODO: Reemplazar con llamada real a la API
      const mockRecetas: Receta[] = [
        {
          id: '1',
          paciente: 'Juan Pérez',
          fecha: '2024-01-15',
          medicamentos: [
            {
              nombre: 'Paracetamol',
              dosis: '500mg',
              frecuencia: 'Cada 8 horas',
              duracion: '5 días',
              indicaciones: 'Tomar después de las comidas'
            }
          ],
          estado: 'activa'
        },
        {
          id: '2',
          paciente: 'María González',
          fecha: '2024-01-14',
          medicamentos: [
            {
              nombre: 'Amoxicilina',
              dosis: '875mg',
              frecuencia: 'Cada 12 horas',
              duracion: '7 días',
              indicaciones: 'Tomar con alimentos. Completar todo el tratamiento.'
            },
            {
              nombre: 'Ibuprofeno',
              dosis: '400mg',
              frecuencia: 'Cada 8 horas',
              duracion: '3 días',
              indicaciones: 'Tomar en caso de dolor o fiebre'
            }
          ],
          estado: 'activa'
        },
        {
          id: '3',
          paciente: 'Carlos Rodríguez',
          fecha: '2024-01-13',
          medicamentos: [
            {
              nombre: 'Metformina',
              dosis: '850mg',
              frecuencia: 'Cada 12 horas',
              duracion: '30 días',
              indicaciones: 'Tomar con las comidas principales'
            },
            {
              nombre: 'Losartán',
              dosis: '50mg',
              frecuencia: 'Una vez al día',
              duracion: '30 días',
              indicaciones: 'Tomar por la mañana'
            }
          ],
          estado: 'activa'
        },
        {
          id: '4',
          paciente: 'Ana Martínez',
          fecha: '2024-01-10',
          medicamentos: [
            {
              nombre: 'Salbutamol',
              dosis: '100mcg',
              frecuencia: '2 inhalaciones',
              duracion: 'Según necesidad',
              indicaciones: 'Usar en caso de crisis asmática'
            },
            {
              nombre: 'Fluticasona',
              dosis: '250mcg',
              frecuencia: '2 veces al día',
              duracion: '30 días',
              indicaciones: 'Usar por la mañana y noche'
            }
          ],
          estado: 'completada'
        },
        {
          id: '5',
          paciente: 'Luis Sánchez',
          fecha: '2024-01-08',
          medicamentos: [
            {
              nombre: 'Omeprazol',
              dosis: '20mg',
              frecuencia: 'Una vez al día',
              duracion: '14 días',
              indicaciones: 'Tomar en ayunas'
            },
            {
              nombre: 'Sucralfato',
              dosis: '1g',
              frecuencia: 'Cada 6 horas',
              duracion: '14 días',
              indicaciones: 'Tomar 1 hora antes de las comidas'
            }
          ],
          estado: 'completada'
        },
        {
          id: '6',
          paciente: 'Elena Torres',
          fecha: '2024-01-05',
          medicamentos: [
            {
              nombre: 'Ciprofloxacino',
              dosis: '500mg',
              frecuencia: 'Cada 12 horas',
              duracion: '7 días',
              indicaciones: 'No tomar con lácteos'
            }
          ],
          estado: 'cancelada'
        }
      ];
      setRecetas(mockRecetas);
    } catch (error) {
      console.error('Error al cargar recetas:', error);
      setError('Error al cargar las recetas. Por favor, intente nuevamente.');
    } finally {
      setLoading(false);
    }
  };

  const recetasFiltradas = recetas.filter(receta =>
    receta.paciente.toLowerCase().includes(filtro.toLowerCase()) ||
    receta.medicamentos.some(med => med.nombre.toLowerCase().includes(filtro.toLowerCase()))
  );

  const handleSaveReceta = async (nuevaReceta: any) => {
    setError(null);
    try {
      const recetaCompleta: Receta = {
        id: recetaEditar?.id || Date.now().toString(),
        paciente: nuevaReceta.paciente,
        fecha: recetaEditar?.fecha || new Date().toISOString(),
        medicamentos: nuevaReceta.medicamentos,
        estado: 'activa'
      };

      if (recetaEditar) {
        // Actualizar receta existente
        setRecetas(recetas.map(r => r.id === recetaEditar.id ? recetaCompleta : r));
      } else {
        // Agregar nueva receta
        setRecetas([recetaCompleta, ...recetas]);
      }

      closeModal();
      setRecetaEditar(null);
    } catch (error) {
      console.error('Error al guardar la receta:', error);
      setError('Error al guardar la receta. Por favor, intente nuevamente.');
    }
  };

  const handleEditarReceta = (receta: Receta) => {
    setRecetaEditar(receta);
    openModal();
  };

  const handleEliminarReceta = async (id: string) => {
    if (!window.confirm('¿Está seguro que desea eliminar esta receta?')) {
      return;
    }

    setError(null);
    try {
      // TODO: Implementar llamada a API para eliminar
      setRecetas(recetas.filter(r => r.id !== id));
    } catch (error) {
      console.error('Error al eliminar la receta:', error);
      setError('Error al eliminar la receta. Por favor, intente nuevamente.');
    }
  };

  const handleDescargarReceta = async (receta: Receta) => {
    try {
      const doc = new jsPDF();
      
      // Configuración de la página
      doc.setFont("helvetica", "bold");
      doc.setFontSize(20);
      doc.setTextColor(44, 62, 80); // Color oscuro para el texto
      
      // Título
      doc.text('RECETA MÉDICA', 105, 20, { align: 'center' });
      
      // Línea decorativa
      doc.setDrawColor(52, 152, 219); // Color azul para la línea
      doc.setLineWidth(0.5);
      doc.line(20, 25, 190, 25);
      
      // Información del paciente
      doc.setFont("helvetica", "normal");
      doc.setFontSize(12);
      doc.setTextColor(44, 62, 80);
      doc.text(`Paciente: ${receta.paciente}`, 20, 40);
      doc.text(`Fecha: ${new Date(receta.fecha).toLocaleDateString()}`, 20, 50);
      
      // Medicamentos
      doc.setFont("helvetica", "bold");
      doc.setFontSize(14);
      doc.text('Medicamentos:', 20, 70);
      
      let yPos = 85;
      receta.medicamentos.forEach((med, index) => {
        // Si no hay espacio suficiente en la página actual, crear una nueva
        if (yPos > 250) {
          doc.addPage();
          yPos = 20;
          
          // Agregar encabezado en la nueva página
          doc.setFont("helvetica", "bold");
          doc.setFontSize(14);
          doc.text('Medicamentos (continuación):', 20, yPos);
          yPos += 25;
        }
        
        // Fondo para cada medicamento
        doc.setFillColor(248, 249, 250);
        doc.rect(20, yPos - 5, 170, 30, 'F');
        
        // Borde del medicamento
        doc.setDrawColor(224, 224, 224);
        doc.rect(20, yPos - 5, 170, 30);
        
        // Información del medicamento
        doc.setFont("helvetica", "bold");
        doc.setFontSize(12);
        doc.setTextColor(44, 62, 80);
        doc.text(`${index + 1}. ${med.nombre}`, 25, yPos);
        
        doc.setFont("helvetica", "normal");
        doc.setFontSize(10);
        doc.text(`Dosis: ${med.dosis}`, 30, yPos + 7);
        doc.text(`Frecuencia: ${med.frecuencia}`, 100, yPos + 7);
        doc.text(`Duración: ${med.duracion}`, 30, yPos + 14);
        
        if (med.indicaciones) {
          doc.setTextColor(52, 73, 94);
          doc.setFont("helvetica", "italic");
          doc.text(`Indicaciones: ${med.indicaciones}`, 30, yPos + 21);
        }
        
        yPos += 40; // Espacio para el siguiente medicamento
      });
      
      // Pie de página en todas las páginas
      const pageCount = doc.getNumberOfPages();
      
      for (let i = 1; i <= pageCount; i++) {
        doc.setPage(i);
        
        doc.setFont("helvetica", "normal");
        doc.setFontSize(8);
        doc.setTextColor(127, 140, 141);
        
        // Línea decorativa inferior
        doc.setDrawColor(52, 152, 219);
        doc.setLineWidth(0.5);
        doc.line(20, 280, 190, 280);
        
        // Texto del pie de página
        doc.text(
          'Esta receta ha sido generada digitalmente y está sujeta a verificación médica.',
          105,
          285,
          { align: 'center' }
        );
        doc.text(`Página ${i} de ${pageCount}`, 105, 290, { align: 'center' });
      }
      
      // Guardar el PDF
      const fileName = `receta_${receta.paciente.replace(/\s+/g, '_')}_${receta.id}.pdf`;
      doc.save(fileName);
      
    } catch (error) {
      console.error('Error al generar el PDF:', error);
      setError('Error al generar el PDF de la receta. Por favor, intente nuevamente.');
    }
  };

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1>Gestión de Recetas Médicas</h1>
        <button 
          className={styles.newButton}
          onClick={() => {
            setRecetaEditar(null);
            openModal();
          }}
        >
          <FiPlus /> Nueva Receta
        </button>
      </header>

      <div className={styles.searchBar}>
        <FiSearch className={styles.searchIcon} />
        <input
          type="text"
          placeholder="Buscar por paciente o medicamento..."
          value={filtro}
          onChange={(e) => setFiltro(e.target.value)}
          className={styles.searchInput}
        />
      </div>

      {error && (
        <div className={styles.error}>
          {error}
        </div>
      )}

      <div className={styles.recetasList}>
        {loading ? (
          <div className={styles.loading}>Cargando recetas...</div>
        ) : recetasFiltradas.length === 0 ? (
          <div className={styles.noResults}>No se encontraron recetas</div>
        ) : (
          recetasFiltradas.map((receta) => (
            <div key={receta.id} className={styles.recetaCard}>
              <div className={styles.recetaHeader}>
                <h3>{receta.paciente}</h3>
                <span className={`${styles.estado} ${styles[receta.estado]}`}>
                  {receta.estado}
                </span>
              </div>
              
              <div className={styles.recetaContent}>
                <p className={styles.fecha}>
                  Fecha: {new Date(receta.fecha).toLocaleDateString()}
                </p>
                <div className={styles.medicamentos}>
                  {receta.medicamentos.map((med, index) => (
                    <div key={index} className={styles.medicamento}>
                      <strong>{med.nombre}</strong>
                      <p>{med.dosis} - {med.frecuencia}</p>
                      <p>Duración: {med.duracion}</p>
                      {med.indicaciones && (
                        <p className={styles.indicaciones}>
                          Indicaciones: {med.indicaciones}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              <div className={styles.actions}>
                <button
                  className={styles.actionButton}
                  title="Descargar Receta"
                  onClick={() => handleDescargarReceta(receta)}
                >
                  <FiDownload />
                </button>
                <button
                  className={styles.actionButton}
                  title="Editar Receta"
                  onClick={() => handleEditarReceta(receta)}
                >
                  <FiEdit2 />
                </button>
                <button
                  className={styles.actionButton}
                  title="Eliminar Receta"
                  onClick={() => handleEliminarReceta(receta.id)}
                >
                  <FiTrash2 />
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      <NuevaRecetaModal
        isOpen={isOpen}
        onRequestClose={() => {
          closeModal();
          setRecetaEditar(null);
        }}
        onSave={handleSaveReceta}
        recetaEditar={recetaEditar}
      />
    </div>
  );
};

export default Recetas;
