import { type Aluno } from "../App";
import './AlunoCard.css'

interface AlunoCardProps {
    aluno: Aluno;
}

export function AlunoCard ({ aluno }: AlunoCardProps) {

    return (
        <div className='containerCard'>
          <div className='cardsShape'>
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
                <span className='value'>{aluno.nota_1}</span>
              </div>
              <div className='setInfo'>
                <span className='infoTitle'>Nota 2: </span>
                <span className='value'>{aluno.nota_2}</span>
              </div>
              <div className='setInfo'>
                <span className='infoTitle'>Nota 3: </span>
                <span className='value'>{aluno.nota_3}</span>
              </div>
              <div className='setInfo'>
                <span className='infoTitle'>Nota 4: </span>
                <span className='value'>{aluno.nota_4}</span>
              </div>
            </div>
          </div>
        </div>
    )

}