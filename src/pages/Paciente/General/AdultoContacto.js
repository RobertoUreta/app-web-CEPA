import React, { Component } from 'react'
import { Form, Col, Row, Button } from 'react-bootstrap'
import { TextoAyuda } from '../../../components/TextoAyuda'
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
        let info = JSON.stringify(this.state, null, '  ');

        this.props.handleAdultoContacto(info)

        console.log(this.state)

    }

    render() {
        return (
            <div className="AdultoContacto">
                <form onSubmit={this.handleSubmit}>
                    <Form.Row>
                        <Form.Group as={Col}>
                            <Form.Group controlId="nombre">
                                <TextoAyuda
                                    nombre="nombre"
                                    tooltip="Nombre"
                                    componente={<Form.Control
                                        value={this.state.nombre}
                                        onChange={this.handleChange}
                                        placeholder="Nombre"
                                    />}
                                />

                            </Form.Group>
                            <Form.Group controlId="apellidoPaterno">
                            <TextoAyuda 
                                    nombre="apellidoPaterno"
                                    tooltip="Apellido Paterno"
                                    componente={<Form.Control
                                    value={this.state.apellidoPaterno}
                                    onChange={this.handleChange}
                                    placeholder="Apellido Paterno"
                                />}
                                />
                                
                            </Form.Group>
                        </Form.Group>

                        <Form.Group as={Col}>

                            <Form.Group controlId="apellidoMaterno">
                            <TextoAyuda 
                                    nombre="apellidoMaterno"
                                    tooltip="Apellido Materno"
                                    componente={<Form.Control
                                    value={this.state.apellidoMaterno}
                                    onChange={this.handleChange}
                                    placeholder="Apellido Materno"
                                />}
                                />
                                
                            </Form.Group>
                            <Row>
                                <Col>
                                    <Form.Group controlId="parentezco">
                                    <TextoAyuda 
                                    nombre="parentesco"
                                    tooltip="Parentesco"
                                    componente={<Form.Control
                                            value={this.state.parentezco}
                                            onChange={this.handleChange}
                                            placeholder="Parentesco"
                                        />}
                                />
                                        
                                    </Form.Group>
                                </Col>
                                <Col>
                                    <Form.Group controlId="telefonoMovil">
                                    <TextoAyuda 
                                    nombre="telefonoMovil"
                                    tooltip="Teléfono Móvil"
                                    componente={<Form.Control
                                            value={this.state.telefonoMovil}
                                            onChange={this.handleChange}
                                            placeholder="Teléfono Móvil"
                                        />}
                                />
                                        
                                    </Form.Group>
                                </Col>
                            </Row>
                            <Form.Group>
                            <div className="btn-container">
                                    <Button
                                        className="btn-submit"
                                        type="submit"
                                    >
                                        Guardar
                                        </Button>
                                </div>
                            </Form.Group>
                        </Form.Group>
                    </Form.Row>

                </form>
            </div>
        );
    }
}

