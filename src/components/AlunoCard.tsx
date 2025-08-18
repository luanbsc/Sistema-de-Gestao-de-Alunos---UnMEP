import { type Aluno } from "../App"
import './AlunoCard.css'
import { memo, useState } from "react"
import { Modal } from './Modal'

interface AlunoCardProps {
    aluno: Aluno
}

function AlunoCardBase ({ aluno }: AlunoCardProps) {

  const [isModalOpen, setIsModalOpen] = useState(false)

    return (
        <div className='containerCard'>
          <Modal
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            aluno={aluno}
          />
          <div className='cardsShape' onClick={() => setIsModalOpen(true)}>
            <div className='titleCard'>
              <span className='studentName'>{aluno.primeiro_nome} {aluno.ultimo_nome}</span>
              {(aluno.nota_1 + aluno.nota_2 + aluno.nota_3 + aluno.nota_4)/4 >= 7 && aluno.faltas < 7
                ? <span className='approved'>Aprovado</span>
                : <span className='failed'>Reprovado</span>
              }
            </div>
            <div className='infos'>
              <div className='setInfo'>
                <span className='infoTitle'>Faltas: </span>
                <span className='value'>{aluno.faltas}</span>
              </div>
              <div className='setInfo'>
                <span className='infoTitle'>Nota 1: </span>
                {aluno.nota_1 !== null
                  ? <span className='value'>{aluno.nota_1}</span>
                  : <span className='value'>0</span>
                }
              </div>
              <div className='setInfo'>
                <span className='infoTitle'>Nota 2: </span>
                {aluno.nota_2 !== null
                  ? <span className='value'>{aluno.nota_2}</span>
                  : <span className='value'>0</span>
                }
              </div>
              <div className='setInfo'>
                <span className='infoTitle'>Nota 3: </span>
                {aluno.nota_3 !== null
                  ? <span className='value'>{aluno.nota_3}</span>
                  : <span className='value'>0</span>
                }
              </div>
              <div className='setInfo'>
                <span className='infoTitle'>Nota 4: </span>
                {aluno.nota_4 !== null
                  ? <span className='value'>{aluno.nota_4}</span>
                  : <span className='value'>0</span>
                }
              </div>
            </div>
          </div>
        </div>
    )
}

/**
 * AlunoCard
 *
 * Componente que exibe as informações de um aluno em formato de cartão.
 * Permite visualizar nome, notas, faltas e situação (aprovado/reprovado).
 *
 * Props:
 * @param aluno - Objeto do tipo Aluno com as informações do aluno
 *   - id: número único do aluno
 *   - primeiro_nome: string
 *   - ultimo_nome: string
 *   - nota_1 a nota_4: number
 *   - faltas: number
 *
 * Exemplo de uso:
 * ```
 * <AlunoCard aluno={meuAluno} />
 * ```
 */
export const AlunoCard = memo(AlunoCardBase)