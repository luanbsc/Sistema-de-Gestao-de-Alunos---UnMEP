import { useState } from 'react'
import { FaSearch } from "react-icons/fa"
import './SearchBar.css'

interface SearchBarMinMediaProps {
    onSearchChange: (value: string) => void
}

/**
 * SearchBarMinMedia
 *
 * Componente de pesquisa por mínimo de média dos alunos.
 *
 * Props:
 * @param onSearchChange - String atual da caixa de pesquisa
 *
 * Exemplo de uso:
 * ```
 * <SearchBarMinMedia onSearchChange={setSearchMedia} />
 * ```
 */
export function SearchBarMinMedia({ onSearchChange }: SearchBarMinMediaProps) {

    const [search, setSearch] = useState('')

    return (
        <div className='searchBarRelativeSize'>
            <div>
                <div className='titleSearch'>
                    <FaSearch className='searchIcon' size={20} color="black" />
                    <span>Média Mínima</span>
                </div>
                <span className='info'>Pesquise pelo valor mínimo de média</span>
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