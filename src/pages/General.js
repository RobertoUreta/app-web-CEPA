import React, { Component } from 'react'
import { Card, Collapse } from 'react-bootstrap'
import "../styles/styles.css"
import { AdultoContacto } from './Paciente/General/AdultoContacto'
import { DatosPersonales } from './Paciente/General/DatosPersonales'
import { DatosSocioDemograficos } from './Paciente/General/DatosSocioDemograficos'
import { DatosAdicionales} from './Paciente/General/DatosAdicionales'

export class General extends Component {
    constructor(props, context) {
        super(props, context);

        this.state = {
            openPersonales: false,
            openAdultoContacto: false,
            openSocioDemo: false,
            openAdicionales: false
        };
    }

    render() {

        return (
            <div>
                <h2>Paciente</h2>

                <Card.Header
                    onClick={() => this.setState({ openPersonales: !this.state.openPersonales })} >
                    <span className="linkspan">
                        <strong>Datos Personales</strong>
                    </span></Card.Header>
                <Collapse in={this.state.openPersonales}>
                    <Card.Body>
                        <DatosPersonales />

                    </Card.Body>
                </Collapse>

                <br></br>

                <Card.Header
                    onClick={() => this.setState({ openAdultoContacto: !this.state.openAdultoContacto })} >
                    <span className="linkspan">
                        <strong>Adulto AdultoContacto</strong>
                    </span></Card.Header>

                <Collapse in={this.state.openAdultoContacto}>
                    <Card.Body >
                        <AdultoContacto />
                    </Card.Body>
                </Collapse>

                <br></br>

                <Card.Header
                    onClick={() => this.setState({ openSocioDemo: !this.state.openSocioDemo })} >
                    <span className="linkspan">
                        <strong>Datos Socio-demograficos</strong>
                    </span></Card.Header>
                <Collapse in={this.state.openSocioDemo}>
                    <Card.Body >
                        <DatosSocioDemograficos />

                    </Card.Body>
                </Collapse>

                <br></br>

                <Card.Header
                    onClick={() => this.setState({ openAdicionales: !this.state.openAdicionales })} >
                    <span className="linkspan">
                        <strong>Datos Adicionales</strong>
                    </span></Card.Header>
                <Collapse in={this.state.openAdicionales}>
                    <Card.Body >
                        <DatosAdicionales/>
                    </Card.Body>
                </Collapse>

            </div>
        )
    }
}