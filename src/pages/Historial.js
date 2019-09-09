import React, { Component } from 'react'
import { HistorialPacientePsicologico } from './Paciente/historial/HistorialPacientePsicologico'
import { HistorialPacientePsiquiatrico } from './Paciente/historial/HistorialPacientePsiquiatrico'

import Accordion from '../components/Accordion'
import { obtenerHistorialPsicologico, obtenerHistorialPsiquiatrico, obtenerDatosPaciente } from '../backend/paciente/paciente';
import { Archivo } from './Paciente/General/Archivo'


export class Historial extends Component {
    constructor(props) {
        super(props)

        this.state = {
            usuario: this.props.userId,
            paciente: this.props.pacienteId,
            loadingInfo: 'initial',
            apellidoPaterno: "",
            nombre: "",
            apellidoMaterno: "",
            sesionesPsicologicas: [],
            sesionesPsiquiatricas: [],
        }
    }

    componentDidMount() {
        const self = this
        this.setState({ loadingInfo: 'true' })

        let promise = obtenerHistorialPsicologico(this.state)

        promise
            .then(res => {
                let aux = []
                res.data.response.forEach(element => {
                    element.fecha_sesion = new Date(element.fecha_sesion)
                    aux.push(element)

                })
                aux.sort(function (date1, date2) {
                    return date2.fecha_sesion - date1.fecha_sesion
                })
                self.setState({ sesionesPsicologicas: aux })
            }).catch(err => {
                this.setState({ loadingInfo: 'false ' })
            })

        promise = obtenerHistorialPsiquiatrico(this.state)

        promise
            .then(res => {
                let aux = []
                res.data.response.forEach(element => {
                    element.fecha_sesion = new Date(element.fecha_sesion)
                    aux.push(element)

                })
                aux.sort(function (date1, date2) {
                    return date2.fecha_sesion - date1.fecha_sesion
                })
                self.setState({ sesionesPsiquiatricas: aux, loadingInfo: 'false' })
            }).catch(err => {
                this.setState({ loadingInfo: 'false ' })
            })
        promise = obtenerDatosPaciente(this.state.paciente)
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
        if (this.state.loadingInfo === 'initial') {
            return <h2>Intializing...</h2>;

        }


        if (this.state.loadingInfo === 'true') {
            console.log("sesiones", this.state.sesiones)

            return <h2>Cargando...</h2>;

        }
        console.log("sesiones", this.state.sesiones)
        return (
            <div>
                <h2>{this.state.nombre + " " + this.state.apellidoPaterno + " "
                    + this.state.apellidoMaterno}</h2>
                <Accordion>
                    <div label="Psicológico">
                        <HistorialPacientePsicologico
                            sesiones={this.state.sesionesPsicologicas}
                            usuario={this.state.usuario} />
                    </div>
                    <div label="Psiquiátrico">
                        <HistorialPacientePsiquiatrico
                            sesiones={this.state.sesionesPsiquiatricas}
                            usuario={this.state.usuario} />
                    </div>
                    <div label="Archivos">
                        <Archivo />

                    </div>
                </Accordion>

            </div>
        )
    }
}