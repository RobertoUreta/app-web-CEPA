import React, { Component } from 'react'
import { Form, Col, Button, Row } from 'react-bootstrap'
import DatePicker from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css";
import { TextoAyuda } from '../../../components/TextoAyuda'

export class EpicrisisPsicologica extends Component {


    constructor(props) {
        super(props);

        this.state = {
            tratamientoPsiquiatrico: "",
            diagnosticoDSMeje5: "",
            etapaTratamiento: "",
            observacion: "",
            fechaCierrePsiquiatra: null
        };
    }


    _handleChange = (date) => {
        this.setState({
            fecha: date
        });
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
            <div className="DiagnosticoPsiquiatrico">
                <form onSubmit={this.handleSubmit}>
                    <Form.Row>
                        <Form.Group as={Col}>
                            <Form.Group controlId="tratamientoPsiquiatrico">
                                <Form.Label>Tratamiento Psiquiatrico</Form.Label>
                                <Form.Control
                                    as="textarea"
                                    rows="3"
                                    value={this.state.tratamientoPsiquiatrico}
                                    onChange={this.handleChange}
                                    placeholder="Tratamiento psiquiatrico"
                                />
                            </Form.Group>
                            <Form.Group controlId="diagnosticoDSMeje5">
                                <Form.Label>Diagnostico DSM eje V</Form.Label>
                                <Form.Control
                                    as="textarea"
                                    rows="3"
                                    value={this.state.diagnosticoDSMeje5}
                                    onChange={this.handleChange}
                                    placeholder="Diagnostico DSM eje V"
                                />
                            </Form.Group>
                            <Form.Group controlId="etapaTratamiento">
                                <Form.Label>Etapa de Tratamiento</Form.Label>
                                <Form.Control
                                    as="textarea"
                                    rows="3"
                                    value={this.state.etapaTratamiento}
                                    onChange={this.handleChange}
                                    placeholder="Etapa de Tratamiento"
                                />
                            </Form.Group>
                            <Form.Group controlId="observacion">
                                <Form.Label>Observación</Form.Label>
                                <Form.Control
                                    as="textarea"
                                    rows="3"
                                    value={this.state.observacion}
                                    onChange={this.handleChange}
                                    placeholder="Observación"
                                />
                            </Form.Group>
                            <div>
                                <TextoAyuda
                                    nombre="fechaCierrePsiquiatra"
                                    tooltip="Fecha Cierre Psiquiatra"
                                    componente={<DatePicker
                                        customInput={<Form.Control />}
                                        dateFormat="dd/MM/yyyy"
                                        selected={this.state.fecha}
                                        onChange={this._handleChange}
                                        placeholderText="Fecha Cierre Psiquiatra"
                                    />}
                                />
                            </div>

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