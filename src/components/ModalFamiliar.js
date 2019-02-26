import React, { Component } from 'react'
import { Col, Form, Button, Modal } from 'react-bootstrap'
import { TextoAyuda } from './TextoAyuda'

export class ModalFamiliar extends Component {

    constructor(props) {
        super(props)

        this.state = {
            nombre: "",
            edad: "",
            relacionPaciente: "",
            ocupacion: "",
        }
    }

    handleChange = event => {
        this.setState({
            [event.target.id]: event.target.value
        });

        
    }

    _handleClose = () => {
        this.props.fnCerrar(false)
        this.setState({
            nombre: "",
            edad: "",
            relacionPaciente: "",
            ocupacion: "",
        })
    }

    _handleModalSubmit = (evt) => {
        //console.log(this.state)
        evt.preventDefault()
        const aux = JSON.stringify(this.state, null, '  ');
        //console.log(data)
        this.props.onSubmit(aux)
        
        this._handleClose()
    }
    render() {
        return (
            <Modal show={this.props.show} onHide={this._handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Datos integrante</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form onSubmit={this.handleSubmit}>
                        <Col>
                            <Form.Group>
                                <Form.Group controlId="nombre">
                                    <TextoAyuda
                                        nombre="nombre"
                                        tooltip="Nombre"
                                        componente={
                                            <Form.Control
                                                value={this.state.nombre}
                                                onChange={this.handleChange}
                                                placeholder="Nombre"
                                            />
                                        }
                                    />
                                </Form.Group>
                            </Form.Group>
                            <Form.Group>
                                <Form.Group controlId="edad">
                                    <TextoAyuda
                                        nombre="edad"
                                        tooltip="Edad"
                                        componente={
                                            <Form.Control
                                                value={this.state.edad}
                                                onChange={this.handleChange}
                                                placeholder="Edad"
                                            />
                                        }
                                    />
                                </Form.Group>
                            </Form.Group>
                            <Form.Group>
                                <Form.Group controlId="relacionPaciente">
                                    <TextoAyuda
                                        nombre="relacionPaciente"
                                        tooltip="Relación Paciente"
                                        componente={
                                            <Form.Control
                                                value={this.state.relacionPaciente}
                                                onChange={this.handleChange}
                                                placeholder="Relación Paciente"
                                            />
                                        }
                                    />
                                </Form.Group>
                            </Form.Group>
                            <Form.Group>
                                <Form.Group controlId="ocupacion">
                                    <TextoAyuda
                                        nombre="ocupacion"
                                        tooltip="Ocupación"
                                        componente={
                                            <Form.Control
                                                value={this.state.ocupacion}
                                                onChange={this.handleChange}
                                                placeholder="Ocupación"
                                            />
                                        }
                                    />
                                </Form.Group>
                            </Form.Group>
                        </Col>

                    </form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={this._handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={this._handleModalSubmit}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
        )
    }

}