import React, { Component } from 'react'
import { Form, Row,Col, Button } from 'react-bootstrap'
import {Option} from '../../../components/Option'
import { TextoAyuda } from '../../../components/TextoAyuda'

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
            <div className="DatosAdicionales">
                <form onSubmit={this.handleSubmit}>
                    <Form.Row>
                        <Form.Group as={Col}>
                            <Form.Group controlId="estado">
                            <TextoAyuda 
                                    nombre="estado"
                                    tooltip="Estado"
                                    componente={ <Form.Control
                                    as="select"
                                    value={this.state.estado}
                                    onChange={this.handleChange}
                                >
                                    <option hidden>Estado</option>
                                    <Option options={estados}/>
                                </Form.Control>}
                                />
                               
                            </Form.Group>
                            <Form.Group controlId="etapa">
                            <TextoAyuda 
                                    nombre="etapa"
                                    tooltip="Etapa"
                                    componente={<Form.Control
                                    value={this.state.etapa}
                                    onChange={this.handleChange}
                                    placeholder="Etapa"
                                />}
                                />
                                
                            </Form.Group>
                        </Form.Group>

                        <Form.Group as={Col}>
                            <Form.Group controlId="tipoIngreso">
                            <TextoAyuda 
                                    nombre="tipoIngreso"
                                    tooltip="Tipo de Ingreso"
                                    componente={<Form.Control
                                    value={this.state.tipoIngreso}
                                    onChange={this.handleChange}
                                    placeholder="Tipo de Ingreso"
                                />}
                                />
                                
                            </Form.Group>
                            <Form.Group controlId="institucion">
                            <TextoAyuda 
                                    nombre="institucion"
                                    tooltip="Institución"
                                    componente={<Form.Control
                                    value={this.state.institucion}
                                    onChange={this.handleChange}
                                    placeholder="Institución"
                                />}
                                />
                                
                            </Form.Group>
                            <Form.Group>
                                <Row>
                                    <Col/>
                                    <Col/>
                                    <Col/>
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