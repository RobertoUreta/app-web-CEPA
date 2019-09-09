import React, { Component } from 'react'
import {  Modal } from 'react-bootstrap'

import { RegistrarSesion} from '../pages/Paciente/sesion/registrarSesion'

export class ModalSesion extends Component {
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
            <Modal show={this.props.show} onHide={this._handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Agendar Sesion</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <RegistrarSesion 
                    defaultDate = { this.props.selectedDate}
                    onSubmit = {this._handleFormSubmit}
                    />
                </Modal.Body>
            </Modal>
        )
    }
}