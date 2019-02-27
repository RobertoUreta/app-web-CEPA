import React, { Component } from 'react';
import { Form, Button, Row, Col } from "react-bootstrap";
import { Option } from '../../../components/Option'
import { TextoAyuda } from '../../../components/TextoAyuda'
import DatePicker from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css";

export class RegistrarSesion extends Component {

    constructor(props) {
        super(props);

        this.state = {
            fechaSesion: "",
            horaInicio: "",
            horaTermino: "",
            descripcion: "",
            valorSesion: "",//setear segun el valor de sesion agregado en la general
            sala: "",
            tipoSesion: "",
            estadoSesion: "",
        };
    }


    _handleChange = (date) => {
        this.setState({
            fechaSesion: date
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
            <div className="registrarSesion">
                <form onSubmit={this.handleSubmit}>
                    <Form.Row>
                        <Form.Group as={Col}>
                            <Row>
                                <Form.Group as={Col} controlId="fechaSesion">
                                    <TextoAyuda
                                        nombre="fechaSesion"
                                        tooltip="Fecha de Sesion"
                                        componente={<DatePicker
                                            customInput={<Form.Control />}
                                            dateFormat="dd/MM/yyyy"
                                            selected={this.state.fechaSesion}
                                            onChange={this._handleChange}
                                            showMonthDropdown
                                            dropdownMode="select"
                                            placeholderText="Fecha de Sesion"
                                        />} />
                                </Form.Group>
                                <Form.Group as={Col} controlId="horaInicio">
                                    <TextoAyuda
                                        nombre="horaInicio"
                                        tooltip="Hora de Inicio"
                                        componente={<DatePicker
                                            customInput={<Form.Control />}
                                            selected={this.state.horaInicio}
                                            onChange={date => { this.setState({ horaInicio: date }) }}
                                            showTimeSelect
                                            showTimeSelectOnly
                                            timeIntervals={30}
                                            dateFormat="h:mm"
                                            timeCaption="Time"
                                            placeholderText="Hora de Inicio"
                                        />} />
                                </Form.Group>
                                <Form.Group as={Col} controlId="horaTermino">
                                    <TextoAyuda
                                        nombre="horaTermino"
                                        tooltip="Hora de Termino"
                                        componente={<DatePicker
                                            customInput={<Form.Control />}
                                            selected={this.state.horaTermino}
                                            onChange={date => { this.setState({ horaTermino: date }) }}
                                            showTimeSelect
                                            showTimeSelectOnly
                                            timeIntervals={30}
                                            dateFormat="h:mm"
                                            timeCaption="Time"
                                            placeholderText="Hora de Termino"
                                        />} />
                                </Form.Group>
                            </Row>
                            <Form.Group controlId="descripcion">
                                <TextoAyuda
                                    nombre="descripcion"
                                    tooltip="Descripción"
                                    componente={<Form.Control
                                        as="textarea"
                                        rows="2"
                                        value={this.state.descripcion}
                                        onChange={this.handleChange}
                                        placeholder="Descripción"
                                    />}
                                />
                            </Form.Group>
                            <Row>
                                <Form.Group as={Col} controlId="valorSesion">
                                    <TextoAyuda
                                        nombre="valorSesion"
                                        tooltip="Valor Sesión"
                                        componente={<Form.Control
                                            value={this.state.valorSesion}
                                            onChange={this.handleChange}
                                            placeholder="Valor Sesión"
                                        />}
                                    />
                                </Form.Group>
                                <Form.Group as={Col} controlId="sala">
                                    <TextoAyuda
                                        nombre="sala"
                                        tooltip="Sala"
                                        componente={<Form.Control
                                            as="select"
                                            value={this.state.sala}
                                            onChange={this.handleChange}
                                        >
                                            <option hidden>Elegir Sala</option>
                                            <Option options={[]} />
                                        </Form.Control>} />
                                </Form.Group>
                            </Row>
                            <Row>
                                <Form.Group as={Col} controlId="tipoSesion">
                                    <TextoAyuda
                                        nombre="tipoSesion"
                                        tooltip="Tipo Sesión"
                                        componente={<Form.Control
                                            as="select"
                                            value={this.state.tipoSesion}
                                            onChange={this.handleChange}
                                        >
                                            <option hidden>Tipo sesión</option>
                                            <Option options={[]} />
                                        </Form.Control>} />
                                </Form.Group>
                                <Form.Group as={Col} controlId="estadoSesion">
                                    <TextoAyuda
                                        nombre="estadoSesion"
                                        tooltip="Estado Sesión"
                                        componente={<Form.Control
                                            as="select"
                                            value={this.state.estadoSesion}
                                            onChange={this.handleChange}
                                        >
                                            <option hidden>Estado Sesión</option>
                                            <Option options={["Asiste", "No asiste"]} />
                                        </Form.Control>} />
                                </Form.Group>
                            </Row>

                            <Form.Group>
                                <Row>
                                    <Col />
                                    <Col />
                                    <Col />
                                    <Col>
                                        <Button
                                            className="btn-custom"
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

