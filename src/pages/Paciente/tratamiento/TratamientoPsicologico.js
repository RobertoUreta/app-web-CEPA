import React, { Component } from 'react'
import { Form, Col, Button, Row } from 'react-bootstrap'
import { Option } from '../../../components/Option'


const tiposTratamiento = ["Terapia individual", "Taller", "Intervención grupal", "Derivación asistida"]
export class TratamientoPsicologico extends Component {

    constructor(props) {
        super(props);

        this.state = {
            motivoTratamiento: "",
            motivoCoconstruido: "",
            tipoTratamiento: "",
            esInterconsulta: false
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
            <div className="tratamientoPsicologico">
                <form onSubmit={this.handleSubmit}>
                    <Form.Row>
                        <Form.Group as={Col}>
                            <Row>
                                <Col>
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
                                </Col>
                                <Col>
                                    <Form.Check
                                        custom
                                        value={this.state.esInterconsulta}
                                        onChange={this.handleChange}
                                        label="Interconsulta"
                                        type="checkbox"
                                        id="checkbox-interconsulta"
                                    />
                                </Col>
                            </Row>
                            <Form.Group controlId="motivoTratamiento">
                                <Form.Label>Motivo tratamiento psicologico</Form.Label>
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