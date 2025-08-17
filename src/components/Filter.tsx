import './Filter.css'
import './AlunoCard.css'
import { FaToggleOff, FaToggleOn } from "react-icons/fa";
import { useState } from 'react';

interface FilterProps {
  onChange: (filtros: {
    aprovados: boolean;
    reprovados: boolean;
    minMedia: boolean;
    maxFaltas: boolean;
  }) => void
}

export function Filter({ onChange }: FilterProps) {
  const [filterAprovados, setFilterAprovados] = useState(false)
  const [filterReprovados, setFilterReprovados] = useState(false)
  const [filterMinMedia, setFilterMinMedia] = useState(false)
  const [filterMaxFaltas, setFilterMaxFaltas] = useState(false)

  const atualizarFiltros = (novoEstado: {
    aprovados?: boolean
    reprovados?: boolean
    minMedia?: boolean
    maxFaltas?: boolean
  }) => {
    const filtrosAtuais = {
      aprovados: filterAprovados,
      reprovados: filterReprovados,
      minMedia: filterMinMedia,
      maxFaltas: filterMaxFaltas,
      ...novoEstado
    }

    if (novoEstado.aprovados !== undefined) setFilterAprovados(novoEstado.aprovados)
    if (novoEstado.reprovados !== undefined) setFilterReprovados(novoEstado.reprovados)
    if (novoEstado.minMedia !== undefined) setFilterMinMedia(novoEstado.minMedia)
    if (novoEstado.maxFaltas !== undefined) setFilterMaxFaltas(novoEstado.maxFaltas)

    onChange(filtrosAtuais)
  }

  return (
    <div className='filterContainer'>
      <div className='presets'>
        {filterAprovados
          ? <FaToggleOn className='toggle' size={32} onClick={() => atualizarFiltros({ aprovados: !filterAprovados })} />
          : <FaToggleOff className='toggle' size={32} onClick={() => atualizarFiltros({ aprovados: !filterAprovados, reprovados: false })} />
        }
        <span className='approved'>Aprovados</span>
      </div>

      <div className='presets'>
        {filterReprovados
          ? <FaToggleOn className='toggle' size={32} onClick={() => atualizarFiltros({ reprovados: !filterReprovados })} />
          : <FaToggleOff className='toggle' size={32} onClick={() => atualizarFiltros({ reprovados: !filterReprovados, aprovados: false })} />
        }
        <span className='failed'>Reprovados</span>
      </div>

      <div className='presets'>
        {filterMinMedia
          ? <FaToggleOn className='toggle' size={32} onClick={() => atualizarFiltros({ minMedia: !filterMinMedia })} />
          : <FaToggleOff className='toggle' size={32} onClick={() => atualizarFiltros({ minMedia: !filterMinMedia })} />
        }
        <span className='filterTitle'>Média mínima</span>
      </div>

      <div className='presets'>
        {filterMaxFaltas
          ? <FaToggleOn className='toggle' size={32} onClick={() => atualizarFiltros({ maxFaltas: !filterMaxFaltas })} />
          : <FaToggleOff className='toggle' size={32} onClick={() => atualizarFiltros({ maxFaltas: !filterMaxFaltas })} />
        }
        <span className='filterTitle'>Máximo de faltas</span>
      </div>
    </div>
  )
}
