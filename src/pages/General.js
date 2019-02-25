import React, { Component } from 'react'
import "../styles/styles.css"
import { AdultoContacto } from './Paciente/General/AdultoContacto'
import { DatosPersonales } from './Paciente/General/DatosPersonales'
import { DatosSocioDemograficos } from './Paciente/General/DatosSocioDemograficos'
import { DatosAdicionales } from './Paciente/General/DatosAdicionales'
import Accordion from '../components/Accordion';

export class General extends Component {
  
    render() {


        console.log(this.state)

        return (
            <div>
                <h2>Paciente</h2>
                <Accordion>
                    <div label="Datos Personales">
                        <DatosPersonales />
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