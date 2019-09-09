import React, { Component } from 'react'
import Accordion from '../components/Accordion'
import { EpicrisisPsicologica } from './Paciente/epicrisis/EpicrisisPsicologica'
import { EpicrisisPsiquiatrica } from './Paciente/epicrisis/EpicrisisPsiquiatrica'
import { obtenerDatosPaciente } from '../backend/paciente/paciente';
export class Epicrisis extends Component {
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
                    <div label="Epicrisis Psicológica">
                        <EpicrisisPsicologica userId={this.props.userId} pacienteId={this.props.pacienteId} />
                    </div>
                    <div label="Epicrisis Psiquiátrica">
                        <EpicrisisPsiquiatrica userId={this.props.userId} pacienteId={this.props.pacienteId} />
                    </div>
                </Accordion>
            </div>
        )
    }
}