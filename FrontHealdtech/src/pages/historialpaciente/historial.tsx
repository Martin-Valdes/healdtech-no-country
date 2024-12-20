import jsPDF from "jspdf";
import html2canvas from "html2canvas";

export const HistiorialPaciente = () => {
    const idsToExport = ["pdf-content"]; // Lista de IDs a capturar

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
        <div id="pdf-content"
            className=" text-center rounded-3"
            style={{ 
            margin: '20px 10px 10px 10px', 
            padding: '20px', 
            background: 'rgb(255,255,255)', 
            boxShadow: '0px 0px 10px 0px rgba(0,0,0,0.25)', 
            flexWrap: 'wrap' 
            }}
        >
            <div 
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
            {/** Empieza container de observaciones hechas antes*/}
        <div 
            className="d-flex align-items-center justify-content-center text-center"
            style={{ 
            margin: '20px 10px 10px 10px', 
            padding: '20px', 
            background: 'rgb(255,255,255)', 
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
            
        </div>
        {/**Termina container de la traida de datos */}
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
