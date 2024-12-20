import jsPDF from "jspdf";
import html2canvas from "html2canvas";

export const Histiorialcom = () => {
    const idsToExport = ["pdf-content-1", "pdf-content-2"]; // Lista de IDs a capturar

  const downloadPDF = async () => {
    const pdf = new jsPDF("p", "mm", "a4");
    let currentY = 0; // Posición Y inicial en el PDF

    for (const id of idsToExport) {
      const input = document.getElementById(id);

      if (!input) {
        console.error(`No se encontró el elemento con id '${id}'.`);
        continue;
      }

      // Captura el contenido como canvas
      const canvas = await html2canvas(input, { scale: 2 });
      const imgData = canvas.toDataURL("image/png");
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

      // Agrega una nueva página si el contenido no cabe en la actual
      if (currentY + pdfHeight > pdf.internal.pageSize.getHeight()) {
        pdf.addPage();
        currentY = 0;
      }

      // Agrega la imagen al PDF
      pdf.addImage(imgData, "PNG", 0, currentY, pdfWidth, pdfHeight);
      currentY += pdfHeight;
    }

    // Descarga el PDF final
    pdf.save("historial.pdf");
  };
  return (
    <div>
        <div 
            className=" text-center rounded-3"
            style={{ 
            margin: '20px 10px 10px 10px', 
            padding: '20px', 
            background: 'rgb(255,255,255)', 
            boxShadow: '0px 0px 10px 0px rgba(0,0,0,0.25)', 
            flexWrap: 'wrap' 
            }}
        >
            <div id="pdf-content-1"
            className='d-flex align-items-center justify-content-center'
            style={{flexWrap: 'wrap'}}
            >
                <div 
                    className="flex-grow-1 rounded-3" 
                    style={{
                    boxShadow:'0px 0px 10px 0px rgba(0,0,0,0.25)',
                    borderRadius:'5px',
                    background: '#e3f2fd',
                    margin: '10px', 
                    minWidth: '20%',
                    maxWidth:'25%',
                    minHeight:'200px',
                    flex: '1 1 calc(20% - 20px)', 
                    textAlign: 'center', 
                    color:'#004C79'
                    }}
                >
                    <h4>Datos Personales</h4>
                    <p></p>
                    
                </div>
                <div 
                    style={{
                    minHeight:'200px',
                    boxShadow:'0px 0px 10px 0px rgba(0,0,0,0.25)',
                    borderRadius:'5px',
                    background: '#e3f2fd', 
                    margin: '10px', 
                    minWidth: '20%',
                    maxWidth:'25%',
                    flex: '1 1 calc(20% - 20px)', 
                    textAlign: 'center',
                    color:'#004C79'
                    }}
                >
                    <h4>Antecedentes</h4>
                    <p></p>
                    
                </div>
                <div 
                    style={{
                    minHeight:'200px',
                    boxShadow:'0px 0px 10px 0px rgba(0,0,0,0.25)',
                    borderRadius:'5px',
                    background: '#e3f2fd', 
                    margin: '10px', 
                    minWidth: '20%',
                    maxWidth:'25%',
                    flex: '1 1 calc(20% - 20px)', 
                    textAlign: 'center',
                    color:'#004C79'
                    }}
                >
                    <h4>Epidemiologico</h4>
                    <p></p>
                </div>
                <div 
                    style={{
                    minHeight:'200px',
                    boxShadow:'0px 0px 10px 0px rgba(0,0,0,0.25)',
                    borderRadius:'5px',
                    background: '#e3f2fd', 
                    margin: '10px', 
                    minWidth: '20%',
                    maxWidth:'25%',
                    flex: '1 1 calc(20% - 20px)', 
                    textAlign: 'center',
                    color:'#004C79'
                    }}
                >
                    <h4>Habitos Toxicos</h4>
                    <p></p>
                </div>
                <div 
                    style={{
                    minHeight:'200px',
                    boxShadow:'0px 0px 10px 0px rgba(0,0,0,0.25)',
                    borderRadius:'5px',
                    background: '#e3f2fd', 
                    margin: '10px', 
                    minWidth: '20%',
                    maxWidth:'25%',
                    flex: '1 1 calc(20% - 20px)', 
                    textAlign: 'center',
                    color:'#004C79'
                    }}
                >
                    <h4>Actos médicos</h4>
                    <p></p>
                </div>
                <div 
                    style={{
                    minHeight:'200px',
                    boxShadow:'0px 0px 10px 0px rgba(0,0,0,0.25)',
                    borderRadius:'5px',
                    background: '#e3f2fd',
                    margin: '10px', 
                    minWidth: '20%',
                    maxWidth:'25%',
                    flex: '1 1 calc(20% - 20px)', 
                    textAlign: 'center',
                    color:'#004C79'
                    }}
                >
                    <h4>Enfermedades</h4>
                    <p></p>
                </div>
                <div 
                    style={{
                    minHeight:'200px',
                    boxShadow:'0px 0px 10px 0px rgba(0,0,0,0.25)',
                    borderRadius:'5px',
                    background: '#e3f2fd',
                    margin: '10px', 
                    minWidth: '20%',
                    maxWidth:'25%',
                    flex: '1 1 calc(20% - 20px)', 
                    textAlign: 'center',
                    color:'#004C79'
                    }}
                >
                    <h4>Medicamentos</h4>
                    <p></p>
                </div>
                <div 
                    style={{
                    minHeight:'200px',
                    boxShadow:'0px 0px 10px 0px rgba(0,0,0,0.25)',
                    borderRadius:'5px',
                    background: '#e3f2fd',
                    margin: '10px', 
                    minWidth: '20%',
                    maxWidth:'25%',
                    flex: '1 1 calc(20% - 20px)', 
                    textAlign: 'center',
                    color:'#004C79'
                    }}
                >
                    <h4>Heredo Familiar</h4>
                    <p></p>
                </div>
                <div 
                    style={{
                    minHeight:'200px',
                    boxShadow:'0px 0px 10px 0px rgba(0,0,0,0.25)',
                    borderRadius:'5px',
                    background: '#e3f2fd',
                    margin: '10px', 
                    minWidth: '20%',
                    maxWidth:'25%',
                    flex: '1 1 calc(20% - 20px)', 
                    textAlign: 'center',
                    color:'#004C79'
                    }}
                >
                    <h4>Epicrisis</h4>
                    <p></p>
                </div>
            </div>
            

            {/* Botones de acción */}
            <div
            className="d-flex align-items-center justify-content-center text-center"
            style={{ margin: '20px 0', gap: '15px' }}
            >
                <button
                    style={{
                    padding: '6px',
                    minWidth: '120px',
                    borderRadius: '25px',
                    background: '#004C79',
                    color: '#fff',
                    border: 'none',
                    cursor: 'pointer',
                    transition: 'background 0.3s ease',
                    boxShadow: '0px 4px 6px rgba(0,0,0,0.25)',
                    }}
                >
                    Eliminar
                </button>
                <button
                    style={{
                    padding: '6px',
                    minWidth: '120px',
                    borderRadius: '25px',
                    background: '#004C79',
                    color: '#fff',
                    border: 'none',
                    cursor: 'pointer',
                    transition: 'background 0.3s ease',
                    boxShadow: '0px 4px 6px rgba(0,0,0,0.2)5',
                    }}
                >
                    Modificar
                </button>
            </div>
        </div>
        {/**Termina container de la traida de datos */}
        {/** Empieza container de observaciones hechas antes*/}
        <div id="pdf-content-2"
            className="d-flex align-items-center justify-content-center text-center rounded-3"
            style={{ 
            margin: '20px 10px 10px 10px', 
            padding: '20px', 
            background: 'rgb(255,255,255)', 
            boxShadow: '0px 0px 10px 0px rgba(0,0,0,0.25)', 
            flexWrap: 'wrap' 
            }}
        >
            <div style={{
            margin:'10px',
            background: '#e3f2fd',
            boxShadow: '0px 0px 10px 0px rgba(0,0,0,0.25)',
            maxWidth:'250px',
            color:'#004C79'
            }}>
                <h5>OBSERVACIÓN</h5>
                <p>fecha: 22/10/2022</p>
                <p>Se notaron ampollas en la garganta</p>
                </div>
                <div style={{
                margin:'10px',
                background: '#e3f2fd',
                boxShadow: '0px 0px 10px 0px rgba(0,0,0,0.25)',
                maxWidth:'250px',
                color:'#004C79'
                }}>
                <h5>OBSERVACIÓN</h5>
                <p>fecha: 22/10/2022</p>
                <p>Se notaron ampollas en la garganta</p>
                </div>
                <div style={{
                margin:'10px',
                background: '#e3f2fd',
                boxShadow: '0px 0px 10px 0px rgba(0,0,0,0.25)',
                maxWidth:'250px',
                color:'#004C79'
                }}>
                <h5>OBSERVACIÓN</h5>
                <p>fecha: 22/10/2022</p>
                <p>Se notaron ampollas en la garganta</p>
            </div>
        </div>
        {/**Termina observaciones */}
        {/**Empieza formulario de observaciones */}
        <div 
            className=" rounded-3"
            style={{ 
            margin: '20px 10px 10px 10px', 
            padding: '20px', 
            background: 'rgb(255,255,255)', 
            boxShadow: '0px 0px 10px 0px rgba(0,0,0,0.25)', 
            flexWrap: 'wrap',
            color:'#004C79'
            }}
        >
            <div
            className="d-flex align-items-center justify-content-center text-center"
            style={{ 
                margin: '20px 10px 10px 10px', 
                padding: '20px', 
                flexWrap: 'wrap' 
            }}
            >
                <div className="mb-3" style={{paddingRight:'30px'}}>
                    <label htmlFor="title" className="form-label">
                        TITULO
                    </label>
                    <input
                        type="text"
                        className="form-control"
                        id="title"
                        placeholder="Ingresa el título"
                    />
                    </div>
                    <div className="mb-3">
                    <label htmlFor="date" className="form-label">
                        FECHA
                    </label>
                    <input
                        type="date"
                        className="form-control"
                        id="date"
                    />
                </div>
            </div>
            
            <div className="mb-3">
                <label htmlFor="observation" className="form-label">
                    OBSERVACIÓN
                </label>
                <textarea
                    className="form-control"
                    id="observation"
                    placeholder="Ingresa tu observación"
                    style={{ minHeight: '150px' }}
                />
            </div>
            <button
                    style={{
                    padding: '6px',
                    minWidth: '120px',
                    borderRadius: '25px',
                    background: '#004C79',
                    color: '#fff',
                    border: 'none',
                    cursor: 'pointer',
                    transition: 'background 0.3s ease',
                    boxShadow: '0px 4px 6px rgba(0,0,0,0.2)5',
                    }}
                >
                    Guardar
                </button>
        </div>
        {/** Termina formulario de observaciones */}
        {/* Botones de acción */}
        <div
            className="d-flex align-items-center justify-content-center text-center"
            style={{ margin: '20px 0', gap: '15px' }}
            >
                <button
                    style={{
                        padding: "6px",
                        minWidth: "120px",
                        borderRadius: "25px",
                        background: "#004C79",
                        color: "#fff",
                        border: "none",
                        cursor: "pointer",
                        transition: "background 0.3s ease",
                        boxShadow: "0px 4px 6px rgba(0,0,0,0.25)",
                    }}
                    onClick={downloadPDF}
                >
                    Descargar PDF
                </button>
            </div>
    </div>
  )
}
