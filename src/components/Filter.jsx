import './Filter.css'
import './AlunoCard.css'
import { FaToggleOff } from "react-icons/fa";
import { FaToggleOn } from "react-icons/fa";

export function Filter () {

    return (
        <div className='filterContainer'>
            <div className='presets'>
                <FaToggleOff size={32} />
                <span className='approved'>Aprovados</span>
            </div>
            <div className='presets'>
                <FaToggleOff size={32} />
                <span className='failed'>Reprovados</span>
            </div>
            <div className='presets'>
                <FaToggleOff size={32} />
                <span className='filterTitle'>Média mínima</span>
            </div>
            <div className='presets'>
                <FaToggleOff size={32} />
                <span className='filterTitle'>Máximo de faltas</span>
            </div>
        </div>
    )
}