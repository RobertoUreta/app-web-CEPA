import React, { Component } from 'react'
import { Modal } from 'react-bootstrap'

import { RegistrarSesion } from '../pages/Paciente/sesion/registrarSesion'
import { SesionPsicologica } from '../pages/Paciente/sesion/sesionPsicologica';
import { SesionPsiquiatrica } from '../pages/Paciente/sesion/sesionPsiquiatrica';

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
        console.log("Modal IdSEsion", this.props.idSesion)
        console.log("Modal refRegistro", this.props.refRegistro)
        return (
            <Modal size="lg" show={this.props.show} onHide={this._handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>{this.props.title}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    { this.props.renderPsi ? <SesionPsicologica
                        onSubmit={this._handleFormSubmit}
                        idSesion = {this.props.idSesion}
                        numSesion = {this.props.numSesion}
                    /> : <SesionPsiquiatrica 
                            onSubmit={this._handleFormSubmit}
                            idSesion = {this.props.idSesion}
                            refRegistro = {this.props.refRegistro}
                            numSesion = {this.props.numSesion}/>}
                </Modal.Body>
            </Modal>
        )
    }
}