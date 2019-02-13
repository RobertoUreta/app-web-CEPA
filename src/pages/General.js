import React, { Component } from 'react'
import { Card, Collapse } from 'react-bootstrap'
import "../styles/styles.css"
import { AdultoContacto } from './Paciente/General/AdultoContacto'
import { DatosPersonales } from './Paciente/General/DatosPersonales'
import { DatosSocioDemograficos } from './Paciente/General/DatosSocioDemograficos'
import { DatosAdicionales } from './Paciente/General/DatosAdicionales'

export class General extends Component {
    constructor(props) {
        super(props);

        this.state = {
            openPersonales: false,
            openAdultoContacto: false,
            openSocioDemo: false,
            openAdicionales: false
        };
    }

    _onClickAction = (evt) => {
        // eslint-disable-next-line default-case
        switch (evt.currentTarget.id) {
            case ('1'):
                this.setState(() => ({
                    openPersonales: !this.state.openPersonales,
                    openAdultoContacto: false,
                    openSocioDemo: false,
                    openAdicionales: false
                }));
                break;

            case('2'):
                this.setState(() => ({
                    openPersonales: false,
                    openAdultoContacto: !this.state.openAdultoContacto,
                    openSocioDemo: false,
                    openAdicionales: false
                }));
                break;
            case('3'):
                this.setState(() => ({
                    openPersonales: false,
                    openAdultoContacto: false,
                    openSocioDemo: !this.state.openSocioDemo,
                    openAdicionales: false
                }));
                break;
            case('4'):
                this.setState(() => ({
                    openPersonales: false,
                    openAdultoContacto: false,
                    openSocioDemo: false,
                    openAdicionales: !this.state.openAdicionales
                }));
                break;


            
        }

    }
    render() {


        console.log(this.state)

        return (
            <div>
                <h2>Paciente</h2>

                <Card.Header
                    id="1"
                    onClick={this._onClickAction} >
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
                    id="2"
                    onClick={this._onClickAction}/*() => {
                        this.setState(() => ({
                            openPersonales: false,
                            openAdultoContacto: !this.state.openAdultoContacto,
                            openSocioDemo: false,
                            openAdicionales: false
                        }))
                    }*/>
                    <span className="linkspan">
                        <strong>Adulto Contacto</strong>
                    </span></Card.Header>

                <Collapse in={this.state.openAdultoContacto}>
                    <Card.Body >
                        <AdultoContacto />
                    </Card.Body>
                </Collapse>

                <br></br>

                <Card.Header
                    id="3"
                    onClick={this._onClickAction} >
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
                    id="4"
                    onClick={this._onClickAction} >
                    <span className="linkspan">
                        <strong>Datos Adicionales</strong>
                    </span></Card.Header>
                <Collapse in={this.state.openAdicionales}>
                    <Card.Body >
                        <DatosAdicionales />
                    </Card.Body>
                </Collapse>

            </div>
        )
    }
}