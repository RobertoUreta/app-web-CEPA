import React, { Component } from 'react'
import { Form, Col, Button, Row } from 'react-bootstrap'
import DatePicker from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css";
import { TextoAyuda } from '../../../components/TextoAyuda'

export class DiagnosticoPsicologico extends Component {


    constructor(props) {
        super(props);

        this.state = {
            diagnostico: "",
            subtrastorno: "",
            tipoEpisodio: "",
            otroTipoEspecificacion: "",
            modalidadTratamiento: "",
            modeloTerapeutico: "",
            otroModeloTerapeutico: "",
            traspasoModalidadTratamiento: false,
            fechaTraspasoModTratamiento: null,
            fechaCierrePsicologico: null
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
            <div className="DiagnosticoPsicologico">
                <form onSubmit={this.handleSubmit}>
                    <Form.Row>
                        <Form.Group as={Col}>
                            <Form.Group controlId="diagnostico">
                                <Form.Label>Diagnostico</Form.Label>
                                <Form.Control
                                    as="textarea"
                                    rows="3"
                                    value={this.state.diagnostico}
                                    onChange={this.handleChange}
                                    placeholder="Diagnostico"
                                />
                            </Form.Group>
                            <Form.Group controlId="subtrastorno">
                                <Form.Label>Subtrastorno</Form.Label>
                                <Form.Control
                                    as="textarea"
                                    rows="3"
                                    value={this.state.subtrastorno}
                                    onChange={this.handleChange}
                                    placeholder="Subtrastorno"
                                />
                            </Form.Group>
                            <Form.Group controlId="tipoEpisodio">
                                <Form.Label>Tipo de episodio</Form.Label>
                                <Form.Control
                                    as="textarea"
                                    rows="3"
                                    value={this.state.tipoEpisodio}
                                    onChange={this.handleChange}
                                    placeholder="Tipo de Episodio"
                                />
                            </Form.Group>
                            <Form.Group controlId="otroTipoEspecificacion">
                                <Form.Label>Otro tipo de especificacion</Form.Label>
                                <Form.Control
                                    as="textarea"
                                    rows="3"
                                    value={this.state.otroTipoEspecificacion}
                                    onChange={this.handleChange}
                                    placeholder="Otro tipo de especificacion"
                                />
                            </Form.Group>
                            <Form.Group controlId="modalidadTratamiento">
                                <Form.Label>Modalidad de Tratamiento</Form.Label>
                                <Form.Control
                                    as="textarea"
                                    rows="3"
                                    value={this.state.modalidadTratamiento}
                                    onChange={this.handleChange}
                                    placeholder="Modalidad de Tratamiento"
                                />
                            </Form.Group>
                            <Form.Group controlId="modeloTerapeutico">
                                <Form.Label>Modelo Terapeutico</Form.Label>
                                <Form.Control
                                    as="textarea"
                                    rows="3"
                                    value={this.state.modeloTerapeutico}
                                    onChange={this.handleChange}
                                    placeholder="Modelo Terapeutico"
                                />
                            </Form.Group>
                            <Form.Group controlId="otroModeloTerapeutico">
                                <Form.Label>Especificar otro modelo terapeutico</Form.Label>
                                <Form.Control
                                    as="textarea"
                                    rows="3"
                                    value={this.state.otroModeloTerapeutico}
                                    onChange={this.handleChange}
                                    placeholder="Especificar otro modelo terapeutico"
                                />
                            </Form.Group>
                            <Row>
                                <Col>
                                    <Form.Check
                                        custom
                                        value={this.state.traspasoModalidadTratamiento}
                                        onChange={this.handleChange}
                                        label="Traspaso de modalidad de tratamiento(grupal a individual)"
                                        type="checkbox"
                                        id="checkbox-modalidadTratamiento"
                                    />
                                </Col>
                                <Col>
                                <Form.Group controlId="fechaTraspasoModTratamiento">
                                        <div>
                                            <TextoAyuda
                                                nombre="fechaTraspasoModTratamiento"
                                                tooltip="Fecha Traspaso Modalidad de Tratamiento"
                                                componente={<DatePicker
                                                    customInput={<Form.Control />}
                                                    dateFormat="dd/MM/yyyy"
                                                    selected={this.state.fecha}
                                                    onChange={this._handleChange}
                                                    placeholderText="Fecha Traspaso Modalidad de tratamiento"
                                                />}
                                            />

                                        </div>
                                    </Form.Group>
                                </Col>
                                <Col>
                                <Form.Group controlId="fechaCierrePsicologico">
                                        <div>
                                            <TextoAyuda
                                                nombre="fechaCierrePsicologico"
                                                tooltip="Fecha Cierre Psicologico"
                                                componente={<DatePicker
                                                    customInput={<Form.Control />}
                                                    dateFormat="dd/MM/yyyy"
                                                    selected={this.state.fecha}
                                                    onChange={this._handleChange}
                                                    placeholderText="Fecha cierre psicologico"
                                                />}
                                            />
                                        </div>
                                    </Form.Group>
                                </Col>
                            </Row>

                            

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