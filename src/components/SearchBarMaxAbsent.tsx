import { useState } from 'react'
import { FaSearch } from "react-icons/fa"
import './SearchBar.css'

interface SearchBarMaxAbsentProps {
    onSearchChange: (value: string) => void
}

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