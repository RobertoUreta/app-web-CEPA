import React, { Component } from 'react'
import { Card, Collapse } from 'react-bootstrap'
import "../styles/styles.css"
import './Paciente/evaluacion/Tamizaje'
import { Tamizaje } from './Paciente/evaluacion/Tamizaje';


export class Evaluacion extends Component {
    constructor(props) {
        super(props);

        this.state = {
            openTamizaje: false,
            openEvIngreso: false,
            openSocial: false,
            openPsico: false,
            openPsiquiatrica: false,
            openMedIsl: false,
            openPsicoIsl: false,
            openPsiquiatricaisl: false,
            openEpt: false
        };
    }

    _onClickAction = (evt) => {
        // eslint-disable-next-line default-case

        // eslint-disable-next-line default-case
        switch (evt.currentTarget.id) {
            case ('1'):
                this.setState(() => ({
                    openTamizaje: !this.state.openTamizaje,
                    openEvIngreso: false,
                    openSocial: false,
                    openPsico: false,
                    openPsiquiatrica: false,
                    openMedIsl: false,
                    openPsicoIsl: false,
                    openPsiquiatricaisl: false,
                    openEpt: false
                }));
                break;
            case ('2'):

                this.setState(() => ({
                    openTamizaje: false,
                    openEvIngreso: !this.state.openEvIngreso,
                    openSocial: false,
                    openPsico: false,
                    openPsiquiatrica: false,
                    openMedIsl: false,
                    openPsicoIsl: false,
                    openPsiquiatricaisl: false,
                    openEpt: false
                }));
                break;

            case ('3'):
                this.setState(() => ({
                    openTamizaje: false,
                    openEvIngreso: false,
                    openSocial: !this.state.openSocial,
                    openPsico: false,
                    openPsiquiatrica: false,
                    openMedIsl: false,
                    openPsicoIsl: false,
                    openPsiquiatricaisl: false,
                    openEpt: false
                }));
                break;

            case ('4'):
                this.setState(() => ({
                    openTamizaje: false,
                    openEvIngreso: false,
                    openSocial: false,
                    openPsico: !this.state.openPsico,
                    openPsiquiatrica: false,
                    openMedIsl: false,
                    openPsicoIsl: false,
                    openPsiquiatricaisl: false,
                    openEpt: false
                }));
                break;

            case ('5'):
                this.setState(() => ({
                    openTamizaje: false,
                    openEvIngreso: false,
                    openSocial: false,
                    openPsico: false,
                    openPsiquiatrica: !this.state.openPsiquiatrica,
                    openMedIsl: false,
                    openPsicoIsl: false,
                    openPsiquiatricaisl: false,
                    openEpt: false
                }));
                break;

            case ('6'):
                this.setState(() => ({
                    openTamizaje: false,
                    openEvIngreso: false,
                    openSocial: false,
                    openPsico: false,
                    openPsiquiatrica: false,
                    openMedIsl: !this.state.openMedIsl,
                    openPsicoIsl: false,
                    openPsiquiatricaisl: false,
                    openEpt: false
                }));
                break;
            case ('7'):
                this.setState(() => ({
                    openTamizaje: false,
                    openEvIngreso: false,
                    openSocial: false,
                    openPsico: false,
                    openPsiquiatrica: false,
                    openMedIsl: false,
                    openPsicoIsl: !this.state.openPsicoIsl,
                    openPsiquiatricaisl: false,
                    openEpt: false
                }));
                break;
            case ('8'):
                this.setState(() => ({
                    openTamizaje: false,
                    openEvIngreso: false,
                    openSocial: false,
                    openPsico: false,
                    openPsiquiatrica: false,
                    openMedIsl: false,
                    openPsicoIsl: false,
                    openPsiquiatricaisl: !this.state.openPsiquiatricaisl,
                    openEpt: false
                }));
                break;
            case ('9'):
                this.setState(() => ({
                    openTamizaje: false,
                    openEvIngreso: false,
                    openSocial: false,
                    openPsico: false,
                    openPsiquiatrica: false,
                    openMedIsl: false,
                    openPsicoIsl: false,
                    openPsiquiatricaisl: false,
                    openEpt: !this.state.openEpt
                }));
                break;




        }

    }
    render() {
        return (
            <div>
                <Card.Header
                    id="1"
                    onClick={this._onClickAction} >
                    <span className="linkspan">
                        <strong>Tamizaje</strong>
                    </span></Card.Header>
                <Collapse in={this.state.openTamizaje}>
                    <Card.Body>
                        <Tamizaje/>
                    </Card.Body>
                </Collapse>

                <br></br>
                <Card.Header
                    id="2"
                    onClick={this._onClickAction} >
                    <span className="linkspan">
                        <strong>Evaluación de Ingreso</strong>
                    </span></Card.Header>
                <Collapse in={this.state.openEvIngreso}>
                    <Card.Body>
                    </Card.Body>
                </Collapse>

                <br></br>
                <Card.Header
                    id="3"
                    onClick={this._onClickAction} >
                    <span className="linkspan">
                        <strong>Evaluación Social</strong>
                    </span></Card.Header>
                <Collapse in={this.state.openSocial}>
                    <Card.Body>
                    </Card.Body>
                </Collapse>

                <br></br>
                <Card.Header
                    id="4"
                    onClick={this._onClickAction} >
                    <span className="linkspan">
                        <strong>Evaluación Piscológica</strong>
                    </span></Card.Header>
                <Collapse in={this.state.openPsico}>
                    <Card.Body>
                    </Card.Body>
                </Collapse>

                <br></br>
                <Card.Header
                    id="5"
                    onClick={this._onClickAction} >
                    <span className="linkspan">
                        <strong>Evaluación Psiquiatrica</strong>
                    </span></Card.Header>
                <Collapse in={this.state.openPsiquiatrica}>
                    <Card.Body>
                    </Card.Body>
                </Collapse>

                <br></br>
                <Card.Header
                    id="6"
                    onClick={this._onClickAction} >
                    <span className="linkspan">
                        <strong>Entrevista Médica (ISL)</strong>
                    </span></Card.Header>
                <Collapse in={this.state.openMedIsl}>
                    <Card.Body>
                    </Card.Body>
                </Collapse>

                <br></br>
                <Card.Header
                    id="7"
                    onClick={this._onClickAction} >
                    <span className="linkspan">
                        <strong>Entrevista Psicólogo (ISL)</strong>
                    </span></Card.Header>
                <Collapse in={this.state.openPsicoIsl}>
                    <Card.Body>
                    </Card.Body>
                </Collapse>

                <br></br>
                <Card.Header
                    id="8"
                    onClick={this._onClickAction} >
                    <span className="linkspan">
                        <strong>Entrevista Psiquiatra (ISL)</strong>
                    </span></Card.Header>
                <Collapse in={this.state.openPsiquiatricaisl}>
                    <Card.Body>
                    </Card.Body>
                </Collapse>

                <br></br>
                <Card.Header
                    id="9"
                    onClick={this._onClickAction} >
                    <span className="linkspan">
                        <strong>Evaluación Puesto de Trabajo (ISL)</strong>
                    </span></Card.Header>
                <Collapse in={this.state.openEpt}>
                    <Card.Body>

                    </Card.Body>
                </Collapse>

                <br></br>
            </div>
        )
    }
}