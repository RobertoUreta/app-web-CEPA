import React, { Component } from 'react'
import Accordion from '../components/Accordion'

import "../styles/styles.css"
import './Paciente/evaluacion/Tamizaje'
import { Tamizaje } from './Paciente/evaluacion/Tamizaje';
import { EntrevistaIngreso } from './Paciente/evaluacion/EntrevistaIngreso';
import { EntrevistaPsiquiatrica } from './Paciente/evaluacion/EntrevistaPsiquiatrica';
import { EntrevistaMedica } from './Paciente/evaluacion/isl/EntrevistaMedica'
import { EntrevistaPsicologo } from './Paciente/evaluacion/isl/EntrevistaPsicologo'
import { EntrevistaPsiquiatra } from './Paciente/evaluacion/isl/EntrevistaPsiquiatra'
import { EvaluacionPuestoTrabajo } from './Paciente/evaluacion/isl/EvaluacionPuestoTrabajo'
import { EntrevistaPsicologica } from './Paciente/evaluacion/EntrevistaPsicologica'
import { obtenerDatosPaciente } from '../backend/paciente/paciente';

export class Evaluacion extends Component {
    constructor(props) {
        super(props)

        this.state = {
            nombre: "",
            apellidoPaterno: "",
            apellidoMaterno: "",
            paciente: this.props.pacienteId
        }
    }

    componentDidMount() {
        let promise = obtenerDatosPaciente(this.state.paciente)
        promise
            .then(res => {
                let data = res.data.paciente[0]
                this.setState({

                    nombre: data.nombre === "default" ? "" : data.nombre,
                    apellidoPaterno: data.apellido_paterno === "default" ? "" : data.apellido_paterno,
                    apellidoMaterno: data.apellido_materno === "default" ? "" : data.apellido_materno,
                })
            }).catch(err => {
                console.log(err)
            });
    }


    render() {
        return (
            <div>
                <h2>{this.state.nombre + " " + this.state.apellidoPaterno + " "
                    + this.state.apellidoMaterno}</h2>
                <Accordion>
                    <div label="Tamizaje">
                        <Tamizaje userId={this.props.userId} pacienteId={this.props.pacienteId} />
                    </div>
                    <div label="Evaluación de Ingreso">
                        <EntrevistaIngreso userId={this.props.userId} pacienteId={this.props.pacienteId} />
                    </div>
                    <div label="Evaluación Social">
                    </div>
                    <div label="Evaluación Psicológica">
                        <EntrevistaPsicologica userId={this.props.userId} pacienteId={this.props.pacienteId} />
                    </div>

                    <div label="Evaluación Psiquiatrica">
                        <EntrevistaPsiquiatrica userId={this.props.userId} pacienteId={this.props.pacienteId} />
                    </div>

                    <div label="Entrevista Médica (ISL)">
                        <EntrevistaMedica userId={this.props.userId} pacienteId={this.props.pacienteId} />
                    </div>

                    <div label="Entrevista Psicólogo (ISL)">
                        <EntrevistaPsicologo userId={this.props.userId} pacienteId={this.props.pacienteId} />
                    </div>

                    <div label="Entrevista Psiquiatra (ISL)">
                        <EntrevistaPsiquiatra userId={this.props.userId} pacienteId={this.props.pacienteId} />
                    </div>

                    <div label="Evaluación Puesto de Trabajo (ISL)">
                        <EvaluacionPuestoTrabajo userId={this.props.userId} pacienteId={this.props.pacienteId} />
                    </div>
                </Accordion>

            </div>
        )
    }
}