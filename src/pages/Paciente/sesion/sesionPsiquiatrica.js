import React, { Component } from 'react'
import { Form, Col, Button, Row } from 'react-bootstrap'
import { Option } from '../../../components/Option'
import { TextoAyuda } from '../../../components/TextoAyuda'

const tiposTratamiento = ["Terapia individual", "Taller", "Intervención grupal", "Derivación asistida"];
export class SesionPsiquiatrica extends Component {

    constructor(props) {
        super(props);

        this.state = {
            numSesion: "",
            tipoTratamiento:"",
            notasSesion:""
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
            <div className="sesionPsiquiatrica">
                <form onSubmit={this.handleSubmit}>
                    <Form.Row>
                        <Form.Group as={Col}>
                            <Row>
                                    <Col>
                                    <Form.Group controlId="numSesion">
                                    <TextoAyuda
                                            nombre="numSesion"
                                            tooltip="N° de sesión"
                                            componente={<Form.Control
                                            value={this.state.numSesion}
                                            onChange={this.handleChange}
                                            placeholder="N° de Sesión"
                                        />}
                                        />
                                        
                                    </Form.Group> 
                                    </Col>
                                    <Col>
                                        <Form.Group controlId="tipoTratamiento">
                                        <TextoAyuda
                                            nombre="tipoTratamiento"
                                            tooltip="Tipo Tratamiento"
                                            componente={<Form.Control
                                                as="select"
                                                value={this.state.tipoTratamiento}
                                                onChange={this.handleChange}
                                            >
                                                <option hidden>Tipo Tratamiento</option>
                                                <Option options={tiposTratamiento} />
                                            </Form.Control>}
                                        />
                                            
                                        </Form.Group>
                                    </Col>
                            </Row>
                            <Form.Group controlId="notasSesion">
                                <Form.Label>Notas de la sesión</Form.Label>
                                <Form.Control
                                    as="textarea"
                                    rows="10"
                                    value={this.state.notasSesion}
                                    onChange={this.handleChange}
                                    placeholder="Notas de la sesión"
                                />
                            </Form.Group>
                            <Form.Group>
                                <Row>
                                    <Col />
                                    <Col />
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