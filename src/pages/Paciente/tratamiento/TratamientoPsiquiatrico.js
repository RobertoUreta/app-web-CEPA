import React, { Component } from 'react'
import { Form, Col, Button, Row } from 'react-bootstrap'
import { Option } from '../../../components/Option'


const tiposTratamiento = ["Terapia individual", "Taller", "Intervención grupal", "Derivación asistida"]
export class TratamientoPsiquiatrico extends Component {

    constructor(props) {
        super(props);

        this.state = {
            motivoTratamiento: "",
            motivoCoconstruido: "",
            tipoTratamiento: ""
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
            <div className="tratamientoPsiquiatrico">
                <form onSubmit={this.handleSubmit}>
                    <Form.Row>
                        <Form.Group as={Col}>
                            
                            <Form.Group controlId="tipoTratamiento">
                                <Form.Control
                                    as="select"
                                    value={this.state.tipoTratamiento}
                                    onChange={this.handleChange}
                                >
                                    <option hidden>Tipo Tratamiento</option>
                                    <Option options={tiposTratamiento} />
                                </Form.Control>
                            </Form.Group>
                                
                            <Form.Group controlId="motivoTratamiento">
                                <Form.Label>Motivo consulta psiquiatrico</Form.Label>
                                <Form.Control
                                    as="textarea"
                                    rows="3"
                                    value={this.state.motivoTratamiento}
                                    onChange={this.handleChange}
                                    placeholder="Detallar Motivos"
                                />
                            </Form.Group>
                            <Form.Group controlId="motivoCoconstruido">
                                <Form.Label>Motivo consulta Co-construido</Form.Label>
                                <Form.Control
                                    as="textarea"
                                    rows="3"
                                    value={this.state.motivoCoconstruido}
                                    onChange={this.handleChange}
                                    placeholder="Detallar Motivos"
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