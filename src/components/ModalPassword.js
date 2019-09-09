import React, { Component } from 'react'
import { Modal } from 'react-bootstrap'
import {CambiarContrasena} from '../pages/CambiarContrasena'

export class ModalPassword extends Component {

    constructor(props) {

        super(props)

        this.state = {

        }
    }

    _handleClose = () => {
        this.props.onClose(false)

    }

    _handleFormSubmit = (evt) => {
        this._handleClose()
    }



    render() {


        return (
            <Modal show={this.props.show} onHide={this._handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Cambiar Contraseña</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <CambiarContrasena
                        usuarioID={this.props.usuarioID}
                        onSubmit={this._handleFormSubmit} />
                </Modal.Body>
            </Modal>
        )
    }
}