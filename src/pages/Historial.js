import React, { Component } from 'react'
import { HistorialPaciente} from '../pages/Paciente/historial/HistorialPaciente'
import Accordion from '../components/Accordion'

export class Historial extends Component {

    

    render() {
        return (
            <div>
                <Accordion>
                    <div label="Psicológico">
                        <HistorialPaciente />
                    </div>
                    <div label="Psiquiátrico">
                        <HistorialPaciente />
                    </div>
                </Accordion>
                
            </div>
        )
    }
}