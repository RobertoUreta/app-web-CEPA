import React, { Component } from 'react'
import { Form, Col, Row, Button } from 'react-bootstrap'

export class AdultoContacto extends Component {

    constructor(props) {
        super(props);

        this.state = {
            nombre: "",
            apellidoPaterno: "",
            apellidoMaterno: "",
            parentezco: "",
            telefonoMovil: "",
        };
    }



    handleChange = event => {
        this.setState({
            [event.target.id]: event.target.value
        });
    }

    handleSubmit = event => {
        event.preventDefault();
        const email = this.inputEmail.value
        const pwd = this.inputPwd.value
        console.log({ email, pwd });

    }

    render() {
        return (
            <div className="AdultoContacto">
                <form onSubmit={this.handleSubmit}>
                    <Form.Row>
                        <Form.Group as={Col}>
                            <Form.Group controlId="nombre">
                                <Form.Control
                                    value={this.state.nombre}
                                    onChange={this.handleChange}
                                    placeholder="Nombre"
                                />
                            </Form.Group>
                            <Form.Group controlId="apellidoPaterno">
                                <Form.Control
                                    value={this.state.apellidoPaterno}
                                    onChange={this.handleChange}
                                    placeholder="Apellido Paterno"
                                />
                            </Form.Group>
                        </Form.Group>

                        <Form.Group as={Col}>

                            <Form.Group controlId="apellidoMaterno">
                                <Form.Control
                                    value={this.state.apellidoMaterno}
                                    onChange={this.handleChange}
                                    placeholder="Apellido Materno"
                                />
                            </Form.Group>
                            <Row>
                                <Col>
                                    <Form.Group controlId="parentezco">
                                        <Form.Control
                                            value={this.state.parentezco}
                                            onChange={this.handleChange}
                                            placeholder="Parentesco"
                                        />
                                    </Form.Group>
                                </Col>
                                <Col>
                                    <Form.Group controlId="telefonoMovil">
                                        <Form.Control
                                            value={this.state.telefonoMovil}
                                            onChange={this.handleChange}
                                            placeholder="Teléfono Móvil"
                                        />
                                    </Form.Group>
                                </Col>
                            </Row>
                            <Form.Group>
                                <Row>
                                    <Col />
                                    <Col />
                                    <Col />
                                    <Col>
                                        <Button
                                            type="submit"
                                        >
                                            Guardar
                                        </Button>
                                    </Col>
                                </Row>
                            </Form.Group>
                        </Form.Group>
                    </Form.Row>

                </form>
            </div>
        );
    }
}

