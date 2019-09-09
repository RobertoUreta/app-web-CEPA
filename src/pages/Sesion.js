import React, { Component } from 'react'
import { SesionPsicologica } from './Paciente/sesion/sesionPsicologica'
import { SesionPsiquiatrica } from './Paciente/sesion/sesionPsiquiatrica'
import Accordion from '../components/Accordion';

export class Sesion extends Component { 

    render() {
        return (
            <div>
                <Accordion>
                    <div label="Sesión Psicológica">
                        <SesionPsicologica />
                    </div>

                    <div label="Sesion Psiquiátrica">
                        <SesionPsiquiatrica />
                    </div>
                </Accordion>
            </div>
        )
    }
}