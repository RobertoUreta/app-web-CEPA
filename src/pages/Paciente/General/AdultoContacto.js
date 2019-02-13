import React, { Component } from 'react'
import { Form, Col, Button } from 'react-bootstrap'

export  class AdultoContacto extends Component {

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
            <div className="DatosPersonales">
                <form onSubmit={this.handleSubmit}>
                    <Form.Row>
                        <Form.Group as={Col}>
                            <Form.Group controlId="nombre">
                                <Form.Label>Nombre</Form.Label>
                                <Form.Control
                                    type="nombre"
                                    value={this.state.nombre}
                                    onChange={this.handleChange}
                                    placeholder="Ingrese el nombre del usuario"
                                />
                            </Form.Group>
                            <Form.Group controlId="apellidoPaterno">
                                <Form.Label>Apellido Paterno</Form.Label>
                                <Form.Control
                                    type="apellidoPaterno"
                                    value={this.state.apellidoPaterno}
                                    onChange={this.handleChange}
                                    placeholder="Ingrese el apellido paterno del usuario"
                                />
                            </Form.Group>

                        </Form.Group>

                        <Form.Group as={Col}>

                            <Form.Group controlId="apellidoMaterno">
                                <Form.Label>Apellido Materno</Form.Label>
                                <Form.Control
                                    type="apellidoMaterno"
                                    value={this.state.apellidoMaterno}
                                    onChange={this.handleChange}
                                    placeholder="Ingrese el apellido materno del usuario"
                                />
                            </Form.Group>
                            <Form.Group controlId="parentezco">
                                <Form.Label>Parentesco</Form.Label>
                                <Form.Control
                                    type="parentezco"
                                    value={this.state.parentezco}
                                    onChange={this.handleChange}
                                    placeholder="Ingrese el parentezco"
                                />
                            </Form.Group>
                            <Form.Group controlId="telefonoMovil">
                                <Form.Label>Telefono Movil</Form.Label>
                                <Form.Control
                                    type="telefonoMovil"
                                    value={this.state.telefonoMovil}
                                    onChange={this.handleChange}
                                    placeholder="Ingrese el telefono movil del usuario"
                                />
                            </Form.Group>
                            <Button
                                size="lg"
                                type="submit"
                            >
                                Guardar
                            </Button>
                        </Form.Group>
                    </Form.Row>

                </form>
            </div>
        );
    }
}

