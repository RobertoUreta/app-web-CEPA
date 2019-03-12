import React, { Component } from 'react'
import {  Modal } from 'react-bootstrap'
export class ModalSesionInfo extends Component {
    constructor(props) {

        super(props)

        this.state = {

        }
    }

    render() {
        console.log("propseventos",this.props.eventos)
        console.log("propsclickedinfo", this.props.clickedInfo)
        console.log("undfinde?", this.props.eventos[this.props.clickedInfo - 1])

        return (
            <Modal show={this.props.show} onHide={this.props.onHide}>
                <Modal.Header closeButton>
                    <Modal.Title>Agendar Sesion</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {}
                    
                    
                </Modal.Body>
            </Modal>
        )
    }
}