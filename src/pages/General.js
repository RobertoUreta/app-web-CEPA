import React, { Component } from 'react'
import "../styles/styles.css"
import { AdultoContacto } from './Paciente/General/AdultoContacto'
import { DatosPersonales } from './Paciente/General/DatosPersonales'
import { DatosSocioDemograficos } from './Paciente/General/DatosSocioDemograficos'
import { DatosAdicionales } from './Paciente/General/DatosAdicionales'
import Accordion from '../components/Accordion';

import { insertarIngreso } from '../backend/ingreso/ingreso'

export class General extends Component {
    constructor(props){

        super(props)

        this.state = {
            datosGenerales: {},
            adultoContacto: {},
            datosSocioDemograficos: {},
            datosAdicionales: {}
        }
    }
    _handleDatosGenerales = (infoPaciente) => {
        console.log("_handleModalSubmit")
        var info = JSON.parse(infoPaciente)
        
        this.setState( { datosGenerales: info})
        insertarIngreso(info)
    }

    _handleDatosAdicionales = (data) => {

        var info = JSON.parse(data)
        this.setState ({ datosAdicionales: info })
    }

    _handleDatosSocio = (data) => {
        var info = JSON.parse(data)
        this.setState ({ datosSocioDemograficos: info })
    }

    _handleAdulto = (data) => {
        
        var info = JSON.parse(data)
        this.setState({adultoContacto: info})
    }

    render() {


        console.log(this.state)

        return (
            <div>
                <h2>{this.state.datosGenerales.nombre + " " + this.state.datosGenerales.apellidoPaterno +" " 
            + this.state.datosGenerales.apellidoMaterno }</h2>
                <Accordion>
                    <div label="Datos Personales">
                        <DatosPersonales 
                            paciente = { this.state.nombrePaciente }
                            handlePaciente = {this._handleDatosGenerales} />
                    </div>
                    <div label="Adulto Contacto">
                        <AdultoContacto
                        handleAdultoContacto = {this._handleAdulto} />
                    </div>

                    <div label="Datos Socio-demográficos">
                        <DatosSocioDemograficos 
                        handleDatosSocio = {this._handleDatosSocio} />
                    </div>

                    <div label="Datos Adicionales">
                        <DatosAdicionales 
                        handleDatosAdicionales = {this._handleDatosAdicionales}/>
                    </div>
                </Accordion>
                

                

            </div>
        )
    }
}