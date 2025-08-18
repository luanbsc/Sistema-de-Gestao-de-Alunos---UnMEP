import { useState, useEffect, useRef } from 'react'
import './App.css'
import { SearchBar } from './components/SearchBar'
import { SearchBarMinMedia } from './components/SearchBarMinMedia'
import { SearchBarMaxAbsent } from './components/SearchBarMaxAbsent'
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

  const [search, setSearch] = useState("")
  const [searchMedia, setSearchMedia] = useState<number | null>(null);
  const [searchAbsent, setSearchAbsent] = useState("");
  const [alunos, setAlunos] = useState<Aluno[]>([])
  const [alunosFiltrados, setAlunosFiltrados] = useState<Aluno[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const cardsContainerRef = useRef<HTMLDivElement>(null)
  const [panelFilter, setPanelFilter] = useState(false)
  const [filtros, setFiltros] = useState({
    aprovados: false,
    reprovados: false,
    minMedia: false,
    maxFaltas: false
  })

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
    if (filtros.minMedia === false) {
      setSearchMedia(null)
    }

    if (filtros.maxFaltas === false) {
      setSearchAbsent("")
    }

  }, [filtros.minMedia, filtros.maxFaltas]);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      const alunosfiltrados = alunos.filter((aluno) => {
        const media = (aluno.nota_1 + aluno.nota_2 + aluno.nota_3 + aluno.nota_4) / 4;
        const maxFaltas = searchAbsent === "" ? null : Number(searchAbsent)

        // 1) Filtro por nome
        if (search && search.trim() !== "") {
          const nomeCompleto = `${aluno.primeiro_nome} ${aluno.ultimo_nome}`.toLowerCase();
          if (!nomeCompleto.includes(search.toLowerCase())) {
            return false;
          }
        }
  
        // 2) Filtro "apenas aprovados"
        if (filtros.aprovados) {
          if (!(media >= 7 && aluno.faltas < 7)) {
            return false;
          }
        }

        // 3) Filtro "apenas reprovados"
        if (filtros.reprovados) {
          if (!(media < 7 || aluno.faltas >= 7)) {
            return false;
          }
        }
  
        // 4) Filtro por máximo de faltas
        if (maxFaltas !== null && aluno.faltas > maxFaltas) {
          return false;
        }
  
        // 5) Filtro por média mínima
        if (searchMedia !== null && media < searchMedia) {
          return false;
        }
  
        return true;
      });
  
      setAlunosFiltrados(alunosfiltrados);
    }, )
  
    return () => clearTimeout(timeoutId);
  }, [search, alunos, filtros.aprovados, filtros.reprovados, searchAbsent, searchMedia]);

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
        <div className={'centralizado'}>
          <SearchBar onSearchChange={setSearch} onPanelFilterClick={setPanelFilter} filterActivated={Object.values(filtros).some(valor => valor === true)} />
          <div className='othersSearchBars'>
            {filtros.minMedia && <SearchBarMinMedia onSearchChange={setSearchMedia} />}
            {filtros.maxFaltas && <SearchBarMaxAbsent onSearchChange={setSearchAbsent} />}
          </div>
          <div className='containerCards'>
            <div className='titleContainerCards'>
              <HiMiniUserGroup />
              <span>Alunos</span>
            </div>
            {alunosFiltrados.length !== 1
            ? <span className='results'>{alunosFiltrados.length} alunos encontrados</span>
            : <span className='results'>{alunosFiltrados.length} aluno encontrado</span>}
            <div className='cards' ref={cardsContainerRef}>
              {alunosFiltrados.map((aluno) => (
                <AlunoCard key={aluno.id} aluno={aluno} />
              ))}
            </div>
          </div>
        </div>
        <div className={panelFilter ? 'filter' : 'filterHidden'}>
          <Filter onChange={(novoEstado) => setFiltros(novoEstado)} />
        </div>
      </div>
    </div>
  )
}
