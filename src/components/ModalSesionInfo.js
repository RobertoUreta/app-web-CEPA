import React, { Component } from 'react'
import { Modal } from 'react-bootstrap'
import { InfoSesion} from './InfoSesion'

export class ModalSesionInfo extends Component {
    constructor(props) {

        super(props)

        this.state = {
            
            id: this.props.clickedInfo
        }
    }

   
    


    render() {
        

        return (
            <Modal show={this.props.show} onHide={this.props.onHide}>
                <Modal.Header closeButton>
                    <Modal.Title>Información Sesión</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <InfoSesion 
                        clickedInfo = {this.state.id} />


                </Modal.Body>
            </Modal>
        )
    }
}