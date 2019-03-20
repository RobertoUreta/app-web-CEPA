import React, { Component } from 'react'
import Accordion from '../components/Accordion'

import "../styles/styles.css"
import './Paciente/evaluacion/Tamizaje'
import { Tamizaje } from './Paciente/evaluacion/Tamizaje';
import { EntrevistaIngreso } from './Paciente/evaluacion/EntrevistaIngreso';
import { EntrevistaPsiquiatrica } from './Paciente/evaluacion/EntrevistaPsiquiatrica';
import {EntrevistaMedica} from './Paciente/evaluacion/isl/EntrevistaMedica'
import {EntrevistaPsicologo} from './Paciente/evaluacion/isl/EntrevistaPsicologo'
import {EntrevistaPsiquiatra} from './Paciente/evaluacion/isl/EntrevistaPsiquiatra'
import {EvaluacionPuestoTrabajo} from './Paciente/evaluacion/isl/EvaluacionPuestoTrabajo'
import {EntrevistaPsicologica} from './Paciente/evaluacion/EntrevistaPsicologica'

export class Evaluacion extends Component {



    render() {
        return (
            <div>
                <Accordion>
                    <div label="Tamizaje">
                        <Tamizaje userId={this.props.userId} pacienteId={this.props.pacienteId}/>
                    </div>
                    <div label="Evaluación de Ingreso">
                        <EntrevistaIngreso  userId={this.props.userId} pacienteId={this.props.pacienteId}/>
                    </div>
                    <div label="Evaluación Social">

                    </div>
                    <div label="Evaluación Psicológica">
                        <EntrevistaPsicologica userId={this.props.userId} pacienteId={this.props.pacienteId}/>
                    </div>

                    <div label="Evaluación Psiquiatrica">
                        <EntrevistaPsiquiatrica userId={this.props.userId} pacienteId={this.props.pacienteId}/>
                    </div>

                    <div label="Entrevista Médica (ISL)">
                        <EntrevistaMedica />
                    </div>

                    <div label="Entrevista Psicólogo (ISL)">
                        <EntrevistaPsicologo />
                    </div>

                    <div label="Entrevista Psiquiatra (ISL)">
                        <EntrevistaPsiquiatra />
                    </div>

                    <div label="Evaluación Puesto de Trabajo (ISL)">
                        <EvaluacionPuestoTrabajo />
                    </div>
                </Accordion>

            </div>
        )
    }
}