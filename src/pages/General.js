import React, { Component } from 'react'
import "../styles/styles.css"
import { AdultoContacto } from './Paciente/General/AdultoContacto'
import { DatosPersonales } from './Paciente/General/DatosPersonales'
import { DatosSocioDemograficos } from './Paciente/General/DatosSocioDemograficos'
import { DatosAdicionales } from './Paciente/General/DatosAdicionales'
import Accordion from '../components/Accordion';

import { insertarIngreso, obtenerIdIngreso, updateAdultoContacto, updateDatosSocioDemo, updateDatosAdicionales } from '../backend/ingreso/ingreso'

export class General extends Component {
    constructor(props){

        super(props)

        this.state = {
            id: this.props.userId,
            datosGenerales: {},
            adultoContacto: {},
            datosSocioDemograficos: {},
            datosAdicionales: {}
        }
    }
    _handleDatosGenerales = (infoPaciente) => {
        console.log("_handleModalSubmit")
        var info = JSON.parse(infoPaciente)
        let fecha = new Date(info.fechaNacimiento)
        let ingreso = new Date(info.fechaIngreso)
        info.fechaIngreso = ingreso.toJSON().slice(0, 19).replace('T', ' ')  
        info.nacimiento = fecha.toJSON().slice(0, 19).replace('T', ' ')  
        console.log(info.nacimiento)
        console.log(info.fechaIngreso)
        this.setState( { datosGenerales: info})
        insertarIngreso(info,this.state.id)
    }

    _handleDatosAdicionales = (data) => {

        var info = JSON.parse(data)
        this.setState ({ datosAdicionales: info })
        updateDatosAdicionales(info,this.state.id)
    }

    _handleDatosSocio = (data) => {
        var info = JSON.parse(data)
        this.setState ({ datosSocioDemograficos: info })
        updateDatosSocioDemo(info,this.state.id)
    }

    _handleAdulto = (data) => {
        
        var info = JSON.parse(data)
        this.setState({adultoContacto: info})
        updateAdultoContacto(info,this.state.id)

    }

    render() {


        console.log(this.state)
        const {nombre} = this.state.datosGenerales
        let {verificador} = false;
        if(this.state.datosGenerales.nombre === undefined) {
            console.log("no definido")
        } else{
            verificador = true;
        }
        return (
            <div>
                <h2>{verificador ? this.state.datosGenerales.nombre + " " + this.state.datosGenerales.apellidoPaterno +" " 
            + this.state.datosGenerales.apellidoMaterno : "" }</h2>
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