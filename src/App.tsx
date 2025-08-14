import { useState, useEffect } from 'react'
import './App.css'
import { SearchBar } from './components/SearchBar'

interface Aluno{
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

    console.log(search)
    filtrarAlunos()
    }, [search])

  return (
    <div className='container'>
      <div className='title'>
        Alunos
      </div>
      <SearchBar onSearchChange={setSearch} />
      {alunosFiltrados.length > 0 ? (
          alunosFiltrados.map((aluno) => (
            <div key={aluno.id} style={{
              padding: 8,
              borderBottom: "1px solid #ddd",
            }}>
              {`${aluno.primeiro_nome} ${aluno.ultimo_nome}`}
            </div>
          ))
        ) : (
          <p>Nenhum aluno encontrado.</p>
        )}
    </div>
  )
}

