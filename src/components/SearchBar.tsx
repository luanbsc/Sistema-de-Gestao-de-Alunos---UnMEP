import { useState } from 'react'
import './SearchBar.css'
import { FaSearch } from "react-icons/fa"
import { FaFilter } from "react-icons/fa"

interface SearchBarProps {
    onSearchChange: (value: string) => void
    onPanelFilterClick: (value: boolean) => void
    filterActivated: boolean
}

/**
 * SearchBar
 *
 * Componente de pesquisa por nome de aluno.
 * Permite pesquisar aluno por nome e abrir o painel de filtros.
 *
 * Props:
 * @param onSearchChange - String atual da caixa de pesquisa
 * @param onPanelFilterClick - Estado de abertura do painel de filtros
 * @param filterActivated - Estado de filtro ativo (pelo menos um)
 *
 * Exemplo de uso:
 * ```
 * <SearchBar onSearchChange={setSearch} onPanelFilterClick={setPanelFilter} filterActivated={false} />
 * ```
 */
export function SearchBar({ onSearchChange, onPanelFilterClick, filterActivated }: SearchBarProps) {

    const [search, setSearch] = useState('')
    const [openPanelFilter, setOpenPanelFilter] = useState(false)

    const handlePanelFilter = () => {
        const novoEstado = !openPanelFilter
        setOpenPanelFilter(novoEstado)
        onPanelFilterClick(novoEstado)
    }

    console.log(filterActivated)

    return (
        <div className='searchBar'>
            <div>
                <div className='titleSearch'>
                    <FaSearch className='searchIcon' size={20} color="black" />
                    <span>Buscar Alunos</span>
                </div>
                <span className='info'>Pesquise pelo nome do aluno</span>
            </div>
            <div className='row'>
                <input
                className='inputSearchBar'
                type='text'
                placeholder='Digite o nome do aluno...'
                value={search}
                onChange={(event) => {
                    setSearch(event.target.value)
                    onSearchChange(event.target.value)}}
                />
                <button className="filterButton" onClick={handlePanelFilter}>
                    {!filterActivated
                    ? <FaFilter size={16} />
                    : <FaFilter size={16} color='green' />
                    }
                </button>
            </div>
      </div>
    )
}