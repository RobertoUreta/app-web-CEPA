import React, { Component } from 'react'
import {  Modal } from 'react-bootstrap'

import { RegistrarSesion} from '../pages/Paciente/sesion/registrarSesion'
import { SesionPsicologica } from '../pages/Paciente/sesion/sesionPsicologica';

export class ModalRegistroSesion extends Component {
    constructor(props) {

        super(props)

        this.state = {
            salas: null,
            
        }
    }

    _handleClose = () => {
        this.props.onClose(false)
        
    }

    
    _handleFormSubmit = (evt) => {
       
        
        
        //console.log(data)
        this.props.onSubmit(evt)

        this._handleClose()
    }

   

    render() {

        return (
            <Modal size="lg" show={this.props.show} onHide={this._handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Sesión Psicologica</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <SesionPsicologica
                    onSubmit = {this._handleFormSubmit}
                    />
                </Modal.Body>
            </Modal>
        )
    }
}