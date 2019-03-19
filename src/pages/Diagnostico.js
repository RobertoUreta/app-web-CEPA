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
                        <DiagnosticoPsicologico userId={this.props.userId} pacienteId={this.props.pacienteId}/>
                    </div>

                    <div label="Diagnostico Psiquiatrico">
                        <DiagnosticoPsiquiatrico userId={this.props.userId} pacienteId={this.props.pacienteId}/>
                    </div>
                </Accordion>
            </div>
        )
    }
}