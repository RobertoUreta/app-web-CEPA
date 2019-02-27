import React, { Component } from 'react'
import "../styles/styles.css"
import { AdultoContacto } from './Paciente/General/AdultoContacto'
import { DatosPersonales } from './Paciente/General/DatosPersonales'
import { DatosSocioDemograficos } from './Paciente/General/DatosSocioDemograficos'
import { DatosAdicionales } from './Paciente/General/DatosAdicionales'
import Accordion from '../components/Accordion';

export class General extends Component {
    constructor(props){

        super(props)

        this.state = {
            nombrePaciente: "",
        }
    }
    _getNombrePaciente = (infoPaciente) => {
        console.log("_handleModalSubmit")
        var info = JSON.parse(infoPaciente)
        var name = info.nombre
        var apellidoP = info.apellidoPaterno
        var apellidoM = info.apellidoMaterno

        var nombreCompleto = name + " " + apellidoP + " " + apellidoM

        this.setState( { nombrePaciente: nombreCompleto})
    }

    render() {


        console.log(this.state)

        return (
            <div>
                <h2>{this.state.nombrePaciente}</h2>
                <Accordion>
                    <div label="Datos Personales">
                        <DatosPersonales 
                            paciente = { this.state.nombrePaciente }
                            handlePaciente = {this._getNombrePaciente} />
                    </div>
                    <div label="Adulto Contacto">
                        <AdultoContacto />
                    </div>

                    <div label="Datos Socio-demográficos">
                        <DatosSocioDemograficos />
                    </div>

                    <div label="Datos Adicionales">
                        <DatosAdicionales />
                    </div>
                </Accordion>
                

                

            </div>
        )
    }
}