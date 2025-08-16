import { type Aluno } from "../App";
import './AlunoCard.css'

interface AlunoCardProps {
    aluno: Aluno;
}

export function AlunoCard ({ aluno }: AlunoCardProps) {

    return (
        <div className="containerCard">
            <div className='name'>
                <span>{aluno.primeiro_nome} {aluno.ultimo_nome}</span>
            </div>
            <div className='result'>
                {(aluno.nota_1 + aluno.nota_2 + aluno.nota_3 + aluno.nota_4)/4 >= 7 && aluno.faltas < 7
                ? <span className='aprovado'>Aprovado</span>
                : <span className='reprovado'>Reprovado</span>
                }
            </div>
        </div>
    )

}