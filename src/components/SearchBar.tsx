import { useState } from 'react'
import './SearchBar.css'
import { FaSearch } from "react-icons/fa"
import { FaFilter } from "react-icons/fa";

interface SearchBarProps {
    onSearchChange: (value: string) => void
}

export function SearchBar({ onSearchChange }: SearchBarProps) {

    const [search, setSearch] = useState('')

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
                <button className="filterButton">
                    <FaFilter size={16} />
                </button>
            </div>
      </div>
    )
}