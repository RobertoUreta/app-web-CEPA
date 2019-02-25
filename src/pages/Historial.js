import React, { Component } from 'react'
import { Card, Collapse } from 'react-bootstrap'
import { HistorialPaciente} from '../pages/Paciente/historial/HistorialPaciente'

export class Historial extends Component {

    constructor(props) {
        super(props)

        this.state = {
            openHistorialPsico: false,
            openHistorialPsiquiatra: false
        }

    }


    _onClickAction = (evt) => {
        // eslint-disable-next-line default-case
        switch (evt.currentTarget.id) {
            case ('1'):
                this.setState(() => ({
                    openHistorialPsico: !this.state.openHistorialPsico,
                    openHistorialPsiquiatra: false
                }))
                break;
            case ('2'):
                this.setState(() => ({
                    openHistorialPsico: false,
                    openHistorialPsiquiatra: !this.state.openHistorialPsiquiatra
                }))
        }
    }

    render() {
        return (
            <div>
                <Card.Header
                    id="1"
                    onClick={this._onClickAction} >
                    <span className="linkspan">
                        <strong>Psicológico</strong>
                    </span>
                </Card.Header>

                <Collapse in={this.state.openHistorialPsico}>
                    <Card.Body>
                        <HistorialPaciente />
                    </Card.Body>
                </Collapse>

                <br></br>
                <Card.Header
                    id="2"
                    onClick={this._onClickAction} >
                    <span className="linkspan">
                        <strong>Psiquiátrico</strong>
                    </span></Card.Header>
                <Collapse in={this.state.openHistorialPsiquiatra}>
                    <Card.Body>
                        <HistorialPaciente />
                    </Card.Body>
                </Collapse>

                <br></br>
            </div>
        )
    }
}