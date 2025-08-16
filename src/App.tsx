import { useState, useEffect, useRef } from 'react'
import './App.css'
import { SearchBar } from './components/SearchBar'
import { AlunoCard } from './components/AlunoCard'

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
        const resposta = await fetch("/api/alunos.json")
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
      <SearchBar onSearchChange={setSearch} />
      <div className='cardsPadding' ref={cardsContainerRef}>
        <div className='cards'>
          {alunosFiltrados.length > 0 ? (
              alunosFiltrados.map((aluno) => (
                  <AlunoCard key={aluno.id} aluno={aluno} />
              ))
            ) : (
              <p>Nenhum aluno encontrado.</p>
            )}
        </div>
      </div>
    </div>
  )
}

