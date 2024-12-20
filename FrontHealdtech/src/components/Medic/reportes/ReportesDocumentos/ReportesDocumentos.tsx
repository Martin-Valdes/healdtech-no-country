import { FiFileText } from 'react-icons/fi'
import styles from './ReportesDocumentos.module.css'

interface Documento {
  id: number
  title: string
  filename: string
  type?: 'pdf' | 'doc' | 'xls'
  size?: string
  date?: string
}

interface ReportesDocumentosProps {
  documentos: Documento[]
}
const ReportesDocumentos = ({ documentos }: ReportesDocumentosProps) => {
  
  return (
    <div className={styles.reportCard}>
      <h2>Documentos</h2>
      <div className={styles.documentList}>
        {documentos.map((doc) => (
          <a
            key={doc.id}
            href={`/api/documents/${doc.filename}`}
            download={doc.filename}
            className={styles.document}
          >
            <FiFileText className={styles.icon} />
            <div className={styles.documentInfo}>
              <span className={styles.documentTitle}>{doc.title}</span>
              <span className={styles.documentMeta}>
                {doc.type?.toUpperCase()} • {doc.size}
              </span>
            </div>
          </a>
        ))}
      </div>
    </div>
  )
}

export default ReportesDocumentos
