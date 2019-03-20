import React, { Component } from 'react'
import "../styles/styles.css"
import { AdultoContacto } from './Paciente/General/AdultoContacto'
import { DatosPersonales } from './Paciente/General/DatosPersonales'
import { DatosSocioDemograficos } from './Paciente/General/DatosSocioDemograficos'
import { DatosAdicionales } from './Paciente/General/DatosAdicionales'
import Accordion from '../components/Accordion';

import  SweetAlert  from 'react-bootstrap-sweetalert'

import { insertarIngreso, updateAdultoContacto, updateDatosSocioDemo, updateDatosAdicionales, updateDatosPersonales } from '../backend/ingreso/ingreso'
import { obtenerDatosPaciente } from '../backend/paciente/paciente';

export class General extends Component {
    constructor(props) {

        super(props)

        this.state = {
            id: this.props.userId,
            paciente: {},
            datosGenerales: {},
            adultoContacto: {},
            datosSocioDemograficos: {},
            datosAdicionales: {},
            alert: null
        }
    }



    async componentDidMount() {

        let fecha = new Date()
        let ingreso = fecha.toJSON().slice(0, 19).replace('T', ' ')
        let data = { fechaIngreso: ingreso }
        let insertar = insertarIngreso(data, this.state.id,this.props.loggedUser)

        insertar
            .then(res => {
                let promise = obtenerDatosPaciente(this.state.id)
                promise
                    .then(res => {
                        this.setState({ paciente: res.data.paciente[0] })
                        console.log("stateGeneral", this.state.paciente)
                    }).catch(err => {
                        console.log(err)
                    });

            })
            .catch(err => {
                console.log(err)
            })
    }

    _hideAlert = () => {
        this.setState({ alert: null })
    }

    



    _handleDatosGenerales = (infoPaciente) => {
        console.log("_handleModalSubmit")
        var info = JSON.parse(infoPaciente)

        let fecha = new Date(info.fechaNacimiento)
        let ingreso = new Date(info.fechaIngreso)

        info.fechaIngreso = ingreso.toJSON().slice(0, 19).replace('T', ' ')
        info.nacimiento = fecha.toJSON().slice(0, 19).replace('T', ' ')
        console.log(this.state.id)
        this.setState({ datosGenerales: info })
        let value = updateDatosPersonales(info, this.state.id)
        value
            .then(res => {
                console.log(" holaa ", res.data)
                if (res.data.ok) {
                    console.log("asdfasdfasdfasdfasd")
                    const getAlert = () => (
                        <SweetAlert success title="Datos agregados" onConfirm={this._hideAlert}>
                            Se agregaron correctamente los datos del paciente
                        </SweetAlert>
                    )
                    this.setState({alert: getAlert()})
                }

            })
        //insertarIngreso(info, this.state.id)

        //this.props.history.push(enlace)
    }

    _handleDatosAdicionales = (data) => {

        var info = JSON.parse(data)
        this.setState({ datosAdicionales: info })
        updateDatosAdicionales(info, this.state.id)
    }

    _handleDatosSocio = (data) => {
        var info = JSON.parse(data)
        this.setState({ datosSocioDemograficos: info })
        updateDatosSocioDemo(info, this.state.id)
    }

    _handleAdulto = (data) => {

        var info = JSON.parse(data)
        this.setState({ adultoContacto: info })
        updateAdultoContacto(info, this.state.id)

    }

    render() {
        console.log("stateGeneral!!!",this.state)
        let { verificador } = false;
        if (this.state.datosGenerales.nombre !== undefined) {
            verificador = true
        }
        return (
            <div>
                <h2>{verificador ? this.state.datosGenerales.nombre + " " + this.state.datosGenerales.apellidoPaterno + " "
                    + this.state.datosGenerales.apellidoMaterno : ""}</h2>
                <Accordion>
                    <div label="Datos Personales">
                        <DatosPersonales
                            paciente={this.state.paciente}
                            id={this.state.id}
                            handlePaciente={this._handleDatosGenerales} />
                            {this.state.alert}
                    </div>
                    <div label="Adulto Contacto">
                        <AdultoContacto
                            paciente={this.state.paciente}
                            pacienteId={this.state.id}
                            handleAdultoContacto={this._handleAdulto} />
                    </div>

                    <div label="Datos Socio-demográficos">
                        <DatosSocioDemograficos
                            paciente={this.state.paciente}
                            pacienteId={this.state.id}
                            handleDatosSocio={this._handleDatosSocio} />
                    </div>

                    <div label="Datos Adicionales">
                        <DatosAdicionales
                            paciente={this.state.paciente}
                            pacienteId={this.state.id}
                            handleDatosAdicionales={this._handleDatosAdicionales} />
                    </div>
                </Accordion>

                

            </div>
        )
    }
}