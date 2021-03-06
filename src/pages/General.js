import React, { Component } from 'react'
import "../styles/styles.css"
import { AdultoContacto } from './Paciente/General/AdultoContacto'
import { DatosPersonales } from './Paciente/General/DatosPersonales'
import { DatosSocioDemograficos } from './Paciente/General/DatosSocioDemograficos'
import { DatosAdicionales } from './Paciente/General/DatosAdicionales'
import Accordion from '../components/Accordion';

import SweetAlert from 'react-bootstrap-sweetalert'

import { insertarIngreso, updateAdultoContacto, updateDatosSocioDemo, updateDatosAdicionales, updateDatosPersonales } from '../backend/ingreso/ingreso'
import { obtenerDatosPaciente } from '../backend/paciente/paciente';

export class General extends Component {
    constructor(props) {

        super(props)

        this.state = {
            id: this.props.userId,
            nombre: "",
            apellidoPaterno: "",
            apellidoMaterno: "",
            paciente: {},
            datosGenerales: {},
            adultoContacto: {},
            datosSocioDemograficos: {},
            datosAdicionales: {},
            alert: null,
            verificador: false,
        }
    }



    componentDidMount() {

        let fecha = new Date()
        let ingreso = fecha.toJSON().slice(0, 19).replace('T', ' ')
        let data = { fechaIngreso: ingreso }
        let insertar = insertarIngreso(data, this.state.id, this.props.loggedUser)

        insertar
            .then(res => {
                let promise = obtenerDatosPaciente(this.state.id)
                promise
                    .then(res => {
                        let data = res.data.paciente[0]
                        this.setState({
                            paciente: data,
                            nombre: data.nombre === "default" ? "" : data.nombre,
                            apellidoPaterno: data.apellido_paterno === "default" ? "" : data.apellido_paterno,
                            apellidoMaterno: data.apellido_materno === "default" ? "" : data.apellido_materno,
                        })
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
                    this.setState({ alert: getAlert() })
                }

            })
    }

    _handleDatosAdicionales = (data) => {

        var info = JSON.parse(data)
        this.setState({ datosAdicionales: info })
        let resp = updateDatosAdicionales(info, this.state.id)
        resp
            .then(res => {
                console.log("agregado", res.data)
                if (res.data.ok) {
                    console.log("llego");
                    const getAlert = () => (
                        <SweetAlert success title="Datos agregados" onConfirm={this._hideAlert}>
                            Se agregaron correctamente los datos adicionales
                    </SweetAlert>
                    )
                    this.setState({ alert: getAlert() })
                }

            })
    }

    _handleDatosSocio = (data) => {
        var info = JSON.parse(data)
        this.setState({ datosSocioDemograficos: info })
        let resp = updateDatosSocioDemo(info, this.state.id)
        resp
            .then(res => {
                console.log("agregado", res.data)
                if (res.data.ok) {
                    console.log("llego");
                    const getAlert = () => (
                        <SweetAlert success title="Datos agregados" onConfirm={this._hideAlert}>
                            Se agregaron correctamente los datos socio-demográficos
                    </SweetAlert>
                    )
                    this.setState({ alert: getAlert() })
                }

            })
    }

    _handleAdulto = (data) => {

        var info = JSON.parse(data)
        this.setState({ adultoContacto: info })
        let resp = updateAdultoContacto(info, this.state.id)
        resp
            .then(res => {
                console.log("agregado", res.data)
                if (res.data.ok) {
                    console.log("llego");
                    const getAlert = () => (
                        <SweetAlert success title="Datos agregados" onConfirm={this._hideAlert}>
                            Se agregaron correctamente los datos del adulto de contacto
                    </SweetAlert>
                    )
                    this.setState({ alert: getAlert() })
                }

            })

    }

    render() {
        console.log("stateGeneral!!!", this.state)

        return (
            <div>
                <h2>{this.state.nombre + " " + this.state.apellidoPaterno + " "
                    + this.state.apellidoMaterno}</h2>
                <Accordion>
                    <div label="Datos Personales">
                        <DatosPersonales
                            paciente={this.state.paciente}
                            pacienteId={this.state.id}
                            handlePaciente={this._handleDatosGenerales} />
                        {this.state.alert}
                    </div>
                    <div label="Adulto Contacto">
                        <AdultoContacto
                            paciente={this.state.paciente}
                            pacienteId={this.state.id}
                            handleAdultoContacto={this._handleAdulto} />
                        {this.state.alert}
                    </div>

                    <div label="Datos Socio-demográficos">
                        <DatosSocioDemograficos
                            paciente={this.state.paciente}
                            pacienteId={this.state.id}
                            handleDatosSocio={this._handleDatosSocio} />
                        {this.state.alert}
                    </div>

                    <div label="Datos Adicionales">
                        <DatosAdicionales
                            paciente={this.state.paciente}
                            pacienteId={this.state.id}
                            handleDatosAdicionales={this._handleDatosAdicionales} />
                        {this.state.alert}
                    </div>
                </Accordion>



            </div>
        )
    }
}