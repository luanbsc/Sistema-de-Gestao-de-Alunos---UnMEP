import { useState, useEffect, useRef } from 'react'
import './App.css'
import { SearchBar } from './components/SearchBar'
import { AlunoCard } from './components/AlunoCard'
import { HiMiniUserGroup } from "react-icons/hi2";
import { Filter } from './components/Filter'

export interface Aluno{
  id: number
  primeiro_nome: string
  ultimo_nome: string
  nota_1: number
  nota_2: number
  nota_3: number
  nota_4: number
  faltas: number
}

export function App() {

  const [search, setSearch] = useState('')
  const [alunos, setAlunos] = useState<Aluno[]>([])
  const [alunosFiltrados, setAlunosFiltrados] = useState<Aluno[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const cardsContainerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const fetchAlunos = async () => {
      try {
        const resposta = await fetch("/alunos.json")
        if (!resposta.ok) throw new Error("Falha ao carregar JSON")

        const data: Aluno[] = await resposta.json()
        setAlunos(data)
        setAlunosFiltrados(data)
      } catch (err: any) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchAlunos()
    }, [])

  useEffect(() => {
    const filtrarAlunos = () => {
      const alunosfiltrados = alunos.filter((aluno) => {
        // Se o campo de pesquisa estiver vazio, retorna todos
        if (!search || search.trim() === ""){
          return true
        }
        return `${aluno.primeiro_nome} ${aluno.ultimo_nome}`.toLowerCase().includes(search.toLowerCase())
      })

      setAlunosFiltrados(alunosfiltrados)
    }

    filtrarAlunos()
    }, [search])

  useEffect(() => {
    if (cardsContainerRef.current) {
      cardsContainerRef.current.scrollTop = 0
    }
  }, [alunosFiltrados])

  return (
    <div className='container'>
      <div className='title'>
        Sistema de Gestão de Alunos
      </div>
      <div className='panel'>
        <div className='filter'>
          <Filter />
        </div>
        <div className='centralizado'>
          <SearchBar onSearchChange={setSearch} />
          <div className='containerCards'>
            <div className='titleContainerCards'>
              <HiMiniUserGroup />
              <span>Alunos</span>
            </div>
            <span className='results'>{alunosFiltrados.length} alunos encontrados</span>
            <div className='cards' ref={cardsContainerRef}>
              {alunosFiltrados.map((aluno) => (
                <AlunoCard key={aluno.id} aluno={aluno} />
              ))}
            </div>
          </div>
        </div>
      </div>
      
      
    </div>
  )
}

