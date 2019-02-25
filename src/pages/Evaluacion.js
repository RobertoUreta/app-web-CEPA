import React, { Component } from 'react'
import Accordion from '../components/Accordion'

import "../styles/styles.css"
import './Paciente/evaluacion/Tamizaje'
import { Tamizaje } from './Paciente/evaluacion/Tamizaje';
import { EntrevistaIngreso } from './Paciente/evaluacion/EntrevistaIngreso';
import { EntrevistaPsiquiatrica } from './Paciente/evaluacion/EntrevistaPsiquiatrica';

export class Evaluacion extends Component {



    render() {
        return (
            <div>
                <Accordion>
                    <div label="Tamizaje">
                        <Tamizaje />
                    </div>
                    <div label="Evaluación de Ingreso">
                        <EntrevistaIngreso />
                    </div>
                    <div label="Evaluación Social">

                    </div>
                    <div label="Evaluación Psicológica">
                    </div>

                    <div label="Evaluación Psiquiatrica">
                        <EntrevistaPsiquiatrica />
                    </div>

                    <div label="Entrevista Médica (ISL)">
                    </div>

                    <div label="Entrevista Psicólogo (ISL)">
                    </div>

                    <div label="Entrevista Psiquiatra (ISL)">

                    </div>

                    <div label="Evaluación Puesto de Trabajo (ISL)">

                    </div>
                </Accordion>

            </div>
        )
    }
}