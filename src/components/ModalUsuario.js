import React, { Component } from 'react'
import {  Modal } from 'react-bootstrap'

import { CrearUsuario} from './CrearUsuario'

export class ModalUsuario extends Component {
    
    constructor(props) {

        super(props)

        this.state = {

        }
    }

    _handleClose = () => {
        this.props.onClose(false)
        
    }

    _handleFormSubmit = (evt) => {
  
        this.props.onSubmit(evt)

        this._handleClose()
    }

   

    render() {


        return (
            <Modal size="lg" show={this.props.show} onHide={this._handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Crear Usuario</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <CrearUsuario
                        onSubmit = {this._handleFormSubmit}/>
                </Modal.Body>
            </Modal>
        )
    }
}