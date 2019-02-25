import React , { Component } from 'react'
import Accordion from '../components/Accordion'

import { DiagnosticoPsicologico } from './Paciente/diagnostico/DiagnosticoPsicologico'
import { DiagnosticoPsiquiatrico } from './Paciente/diagnostico/DiagnosticoPsquiatrico'

export class Diagnostico extends Component { 

    render () {
        return (
            <div>
                <Accordion>
                    <div label="Diagnostico Psicológico">
                        <DiagnosticoPsicologico />
                    </div>

                    <div label="Diagnostico Psiquiatrico">
                        <DiagnosticoPsiquiatrico />
                    </div>
                </Accordion>
            </div>
        )
    }
}