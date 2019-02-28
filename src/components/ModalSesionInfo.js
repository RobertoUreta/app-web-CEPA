import React, { Component } from 'react'
import {  Modal } from 'react-bootstrap'

import { RegistrarSesion} from '../pages/Paciente/sesion/registrarSesion'

export class ModalSesionInfo extends Component {
    constructor(props) {

        super(props)

        this.state = {

        }
    }

    render() {


        return (
            <Modal show={this.props.show} onHide={this.props.onHide}>
                <Modal.Header closeButton>
                    <Modal.Title>Agendar Sesion</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {this.props.eventos[this.props.clickeInfo].title}
                    
                    
                </Modal.Body>
            </Modal>
        )
    }
}