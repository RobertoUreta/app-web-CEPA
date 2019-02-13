import React, { Component } from 'react'
import { Form, Col, Button } from 'react-bootstrap'

export  class DatosSocioDemograficos extends Component {

    constructor(props) {
        super(props);

        this.state = {
            pais: "",
            region: "",
            provincia: "",
            ciudad: "",
            direccion: "",
            ingresoFamiliar:0,
            tipoFamilia:"",
            estadoCivil:""
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
            <div className="DatosSocioDemograficos">
                <form onSubmit={this.handleSubmit}>
                    <Form.Row>
                        <Form.Group as={Col}>
                            <Form.Group controlId="pais">
                                <Form.Label>Pais</Form.Label>
                                <Form.Control
                                    type="pais"
                                    value={this.state.pais}
                                    onChange={this.handleChange}
                                    placeholder="Ingrese el pais"
                                />
                            </Form.Group>
                            <Form.Group controlId="region">
                                <Form.Label>Región</Form.Label>
                                <Form.Control
                                    type="region"
                                    value={this.state.region}
                                    onChange={this.handleChange}
                                    placeholder="Seleccione la region"
                                />
                            </Form.Group>
                            <Form.Group controlId="provincia">
                                <Form.Label>Provincia</Form.Label>
                                <Form.Control
                                    type="provincia"
                                    value={this.state.provincia}
                                    onChange={this.handleChange}
                                    placeholder="Seleccione la provincia"
                                />
                            </Form.Group>
                            <Form.Group controlId="ciudad">
                                <Form.Label>Ciudad</Form.Label>
                                <Form.Control
                                    type="ciudad"
                                    value={this.state.ciudad}
                                    onChange={this.handleChange}
                                    placeholder="Seleccione la ciudad"
                                />
                            </Form.Group>

                        </Form.Group>

                        <Form.Group as={Col}>
                            <Form.Group controlId="direccion">
                                <Form.Label>Dirección</Form.Label>
                                <Form.Control
                                    type="direccion"
                                    value={this.state.direccion}
                                    onChange={this.handleChange}
                                    placeholder="Inserte la direccion"
                                />
                            </Form.Group>
                            <Form.Group controlId="ingresoFamiliar">
                                <Form.Label>Ingreso Familiar</Form.Label>
                                <Form.Control
                                    type="ingresoFamiliar"
                                    value={this.state.ingresoFamiliar}
                                    onChange={this.handleChange}
                                    placeholder="Inserte el ingreso familiar"
                                />
                            </Form.Group>
                            <Form.Group controlId="tipoFamilia">
                                <Form.Label>Tipo Familia</Form.Label>
                                <Form.Control
                                    type="tipoFamilia"
                                    value={this.state.tipoFamilia}
                                    onChange={this.handleChange}
                                    placeholder="Inserte el tipo de Familia"
                                />
                            </Form.Group>
                            <Form.Group controlId="estadoCivil">
                                <Form.Label>Estado Civil</Form.Label>
                                <Form.Control
                                    type="estadoCivil"
                                    value={this.state.estadoCivil}
                                    onChange={this.handleChange}
                                    placeholder="Inserte el estado civil del paciente"
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

