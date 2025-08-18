import './Modal.css'
import './AlunoCard.css'
import { IoMdClose } from "react-icons/io";

interface ModalProps {
    isOpen: boolean
    onClose: () => void
    aluno: Record<string, any>
}

export function Modal({ isOpen, onClose, aluno }: ModalProps) {
    if (!isOpen) return null;

    return(
        <div className='background' onClick={onClose}>
            <div className='modalContainer' onClick={e => e.stopPropagation()}>
                <IoMdClose className='closeButton' size={28} onClick={onClose} />
                <span className='titleModal'>{aluno.primeiro_nome} {aluno.ultimo_nome}</span>
                <div className='studentStatus'>
                    {(aluno.nota_1 + aluno.nota_2 + aluno.nota_3 + aluno.nota_4)/4 < 7 && aluno.faltas < 7
                    && <span className='failed'>Reprovado por média insuficiente</span>}
                    {aluno.faltas >= 7 && <span className='failed'>Reprovado por excesso de faltas</span>}
                    {(aluno.nota_1 + aluno.nota_2 + aluno.nota_3 + aluno.nota_4)/4 >= 7 && aluno.faltas < 7
                    && <span className='approved'>Aprovado</span>}
                    <div>
                        <span className='infoTitle'>Média: </span>
                        <span className='value'>{((aluno.nota_1 + aluno.nota_2 + aluno.nota_3 + aluno.nota_4)/4).toFixed(2)}</span>
                    </div>
                </div>
                <div className='col'>
                    <div className='line' />
                    <div className='studentStatus'>
                        <div>
                            <span className='infoTitle'>Faltas: </span>
                            <span className='value'>{aluno.faltas}</span>
                        </div>
                        <div>
                            <span className='infoTitle'>Nota 1: </span>
                            {aluno.nota_1 !== null
                                ? <span className='value'>{aluno.nota_1}</span>
                                : <span className='value'>0</span>
                            }
                        </div>
                        <div>
                            <span className='infoTitle'>Nota 2: </span>
                            {aluno.nota_2 !== null
                                ? <span className='value'>{aluno.nota_2}</span>
                                : <span className='value'>0</span>
                            }
                        </div>
                        <div>
                            <span className='infoTitle'>Nota 3: </span>
                            {aluno.nota_3 !== null
                                ? <span className='value'>{aluno.nota_3}</span>
                                : <span className='value'>0</span>
                            }
                        </div>
                        <div>
                            <span className='infoTitle'>Nota 4: </span>
                            {aluno.nota_4 !== null
                                ? <span className='value'>{aluno.nota_4}</span>
                                : <span className='value'>0</span>
                            }
                        </div>
                    </div>
                    </div>
            </div>
        </div>
    )
}