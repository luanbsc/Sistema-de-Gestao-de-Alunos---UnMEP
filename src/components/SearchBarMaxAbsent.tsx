import { useState } from 'react'
import { FaSearch } from "react-icons/fa"
import './SearchBar.css'

interface SearchBarMaxAbsentProps {
    onSearchChange: (value: string) => void
}


/**
 * SearchBarMaxAbsent
 *
 * Componente de pesquisa por máximo de faltas dos alunos.
 *
 * Props:
 * @param onSearchChange - String atual da caixa de pesquisa
 *
 * Exemplo de uso:
 * ```
 * <SearchBarMaxAbsent onSearchChange={setSearchAbsent} />
 * ```
 */
export function SearchBarMaxAbsent({ onSearchChange }: SearchBarMaxAbsentProps) {

    const [search, setSearch] = useState('')

    return (
        <div className='searchBarRelativeSize'>
            <div>
                <div className='titleSearch'>
                    <FaSearch className='searchIcon' size={20} color="black" />
                    <span>Máximo de Faltas</span>
                </div>
                <span className='info'>Pesquise pelo valor máximo de faltas</span>
            </div>
            <div className='row'>
                <input
                className='inputSearchBar'
                type='text'
                placeholder='Digite um número...'
                value={search}
                onChange={(event) => {
                    setSearch(event.target.value)
                    onSearchChange(event.target.value)}}
                />
            </div>
      </div>
    )
}