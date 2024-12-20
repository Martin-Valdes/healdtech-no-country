import styles from './consultasFilter.module.css'
import { Dispatch, SetStateAction } from 'react'

export type FilterType = 'todo' | 'urgente' | 'hoy'

interface ConsultasFiltersProps {
  searchTerm: string
  selectedFilter: FilterType
  onSearchChange: (value: string) => void
  onFilterChange: Dispatch<SetStateAction<FilterType>>
}

const ConsultasFilter = ({
  searchTerm,
  selectedFilter,
  onSearchChange,
  onFilterChange,
}: ConsultasFiltersProps) => {
  return (
    <div className={styles.listHeader}>
      <input
        value={searchTerm}
        onChange={(e) => onSearchChange(e.target.value)}
        placeholder="Buscar paciente..."
        className={styles.searchInput}
      />
      <div className={styles.filterContainer}>
        {['todo', 'Primera Consulta', 'Seguimiento'].map((filter) => (
          <button
            key={filter}
            onClick={() => onFilterChange(filter as FilterType)}
            className={`${styles.filterBtn} ${
              selectedFilter === filter ? styles.active : ''
            }`}
          >
            {filter}
          </button>
        ))}
      </div>
    </div>
  )
}

export default ConsultasFilter
