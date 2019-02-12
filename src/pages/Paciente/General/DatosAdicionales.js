import React, { Component } from 'react'
import { Form, Col, Button } from 'react-bootstrap'
import {Option} from '../../../components/Option'


const estados = ["Abierto","Cerrado","En proceso de alta"]
export  class DatosAdicionales extends Component {
    constructor(props) {
        super(props);

        this.state = {
            estado: "",
            etapa: "",
            tipoIngreso: "",
            institucion: "",
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
                            <Form.Group controlId="estado">
                                <Form.Label>Estado</Form.Label>
                                <Form.Control
                                    as="select"
                                    type="estado"
                                    value={this.state.estado}
                                    onChange={this.handleChange}
                                    placeholder="Ingrese el estado"
                                >
                                    <Option options={estados}/>
                                </Form.Control>
                            </Form.Group>
                            <Form.Group controlId="etapa">
                                <Form.Label>Etapa</Form.Label>
                                <Form.Control
                                    type="etapa"
                                    value={this.state.etapa}
                                    onChange={this.handleChange}
                                    placeholder="Ingrese la etapa"
                                />
                            </Form.Group>

                        </Form.Group>

                        <Form.Group as={Col}>

                            <Form.Group controlId="tipoIngreso">
                                <Form.Label>Tipo de Ingreso</Form.Label>
                                <Form.Control
                                    type="tipoIngreso"
                                    value={this.state.tipoIngreso}
                                    onChange={this.handleChange}
                                    placeholder="Ingrese el tipo de Ingreso del paciente"
                                />
                            </Form.Group>
                            <Form.Group controlId="institucion">
                                <Form.Label>Institucion</Form.Label>
                                <Form.Control
                                    type="institucion"
                                    value={this.state.institucion}
                                    onChange={this.handleChange}
                                    placeholder="Ingrese la institucion de procedencia"
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