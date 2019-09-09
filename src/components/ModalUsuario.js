import React, { Component } from 'react'
import { Modal } from 'react-bootstrap'

import { CrearUsuario } from './CrearUsuario'

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
        if (this.props.usuarioID === undefined) {
            this.props.onSubmit(evt)
        }
        this._handleClose()
    }



    render() {


        return (
            <Modal size="lg" show={this.props.show} onHide={this._handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>{this.props.name === undefined ? "Crear Usuario" : this.props.name}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <CrearUsuario
                        usuarioID={this.props.usuarioID}
                        onSubmit={this._handleFormSubmit} />
                </Modal.Body>
            </Modal>
        )
    }
}