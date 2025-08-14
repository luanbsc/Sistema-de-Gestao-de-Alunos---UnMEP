import { useState } from 'react'

interface SearchBarProps {
    onSearchChange: (value: string) => void
  }

export function SearchBar({ onSearchChange }: SearchBarProps) {

    const [search, setSearch] = useState('')

    return (
        <div className='searchBar'>
            <input
            type='text'
            placeholder='Nome do aluno'
            value={search}
            onChange={(text) => {
                setSearch(text.target.value)
                onSearchChange(search)}}
            />
      </div>
    )
}