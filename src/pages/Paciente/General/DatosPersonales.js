import React, { Component } from 'react'
import { Form, Col, Button, Row } from 'react-bootstrap'
import { Option } from '../../../components/Option'
import DatePicker from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css";
const valoresSesion = [0, 3000, 8000, 15000]
const relacionesContractuales = ["Sin contrato", "Honorarios", "Pension de vejez"]
const previsiones = ["Ninguna", "Fonasa A", "Fonasa B", "Fonasa C", "Fonasa D",
    "Isapre Banmédica", "Isapre Consalud", "Isapre Colmena",
    "Isapre CruzBlanca", "Isapre Nueva Masvida", "Isapre Vida Tres"]
const tiposEstablecimientos = ["Municipal", "Particular-Subvencionado", "Particular"]

export class DatosPersonales extends Component {

    constructor(props) {
        super(props);

        this.state = {
            nombre: "",
            apellidoPaterno: "",
            apellidoMaterno: "",
            rut: "",
            fechaNacimiento: new Date(),
            telefonoMovil: "",
            telefonoFijo: "",
            correo: "",
            nivelInstruccion: "",
            establecimientoEducacional: "",
            tipoEstablecimiento: "",
            prevision: "",
            ocupacion: "",
            relacionContractual: "",
            tipoPaciente: "",
            valorSesion: 0,
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
                            <Form.Group controlId="nombre">
                                <Form.Control
                                    value={this.state.nombre}
                                    onChange={this.handleChange}
                                    placeholder="Nombre"
                                />
                            </Form.Group>
                            <Form.Group controlId="apellidoPaterno">
                                <Form.Control
                                    value={this.state.apellidoPaterno}
                                    onChange={this.handleChange}
                                    placeholder="Apellido Paterno"
                                />
                            </Form.Group>
                            <Form.Group controlId="apellidoMaterno">
                                <Form.Control
                                    value={this.state.apellidoMaterno}
                                    onChange={this.handleChange}
                                    placeholder="Apellido Materno"
                                />
                            </Form.Group>
                            <Row>

                                <Col>
                                    <Form.Group controlId="fechaNacimiento">
                                        <div>
                                            <DatePicker
                                                customInput={<Form.Control block />}
                                                selected={this.state.fechaNacimiento}
                                                onChange={this.handleChange}
                                                placeholderText="Fecha de Nacimiento"
                                            />
                                        </div>
                                    </Form.Group>
                                </Col>
                                <Col>
                                    <Form.Group controlId="rut">
                                        <Form.Control
                                            value={this.state.rut}
                                            onChange={this.handleChange}
                                            placeholder="Rut"
                                        />
                                    </Form.Group>
                                </Col>

                            </Row>
                            <Row>
                                <Col>
                                    <Form.Group controlId="telefonoMovil">
                                        <Form.Control
                                            value={this.state.telefonoMovil}
                                            onChange={this.handleChange}
                                            placeholder="Teléfono Móvil"
                                        />
                                    </Form.Group>
                                </Col>
                                <Col>
                                    <Form.Group controlId="telefonoTrabajo">
                                        <Form.Control
                                            value={this.state.telefonoTrabajo}
                                            onChange={this.handleChange}
                                            placeholder="Teléfono Fijo"
                                        />
                                    </Form.Group>
                                </Col>
                            </Row>
                            <Form.Group controlId="correo">
                                <Form.Control
                                    type="email"
                                    value={this.state.correo}
                                    onChange={this.handleChange}
                                    placeholder="Correo"
                                />
                            </Form.Group>

                        </Form.Group>

                        <Form.Group as={Col}>
                            <Form.Group controlId="nivelInstruccion">
                                <Form.Control
                                    value={this.state.nivelInstruccion}
                                    onChange={this.handleChange}
                                    placeholder="Nivel de Instrucción"
                                />
                            </Form.Group>
                            <Form.Group controlId="establecimientoEducacional">
                                <Form.Control
                                    value={this.state.establecimientoEducacional}
                                    onChange={this.handleChange}
                                    placeholder="Establecimiento educacional"
                                />
                            </Form.Group>
                            <Row>
                                <Col>
                                    <Form.Group controlId="tipoEstablecimiento">
                                        <Form.Control
                                            as="select"
                                            value={this.state.tipoEstablecimiento}
                                            onChange={this.handleChange}
                                        >
                                            <option hidden>Tipo de Establecimiento</option>
                                            <Option options={tiposEstablecimientos} />
                                        </Form.Control>
                                    </Form.Group>

                                </Col>
                                <Col>
                                    <Form.Group controlId="prevision">
                                        <Form.Control
                                            as="select"
                                            value={this.state.prevision}
                                            onChange={this.handleChange}
                                        >
                                            <option hidden>Previsión</option>
                                            <Option options={previsiones} />
                                        </Form.Control>
                                    </Form.Group>
                                </Col>
                            </Row>


                            <Form.Group controlId="ocupacion">
                                <Form.Control
                                    value={this.state.ocupacion}
                                    onChange={this.handleChange}
                                    placeholder="Ocupación"
                                />
                            </Form.Group>
                            <Row>
                                <Col>
                                    <Form.Group controlId="relacionContractual">
                                        <Form.Control
                                            as="select"
                                            value={this.state.relacionContractual}
                                            onChange={this.handleChange}
                                        >
                                            <option hidden>Relación Contractual</option>
                                            <Option options={relacionesContractuales} />
                                        </Form.Control>
                                    </Form.Group>
                                </Col>
                                <Col>
                                    <Form.Group controlId="valorSesion">
                                        <Form.Control
                                            as="select"
                                            value={this.state.valorSesion}
                                            onChange={this.handleChange}
                                        >
                                            <option hidden>Valor de Sesión</option>
                                            <Option options={valoresSesion} />
                                        </Form.Control>
                                    </Form.Group>
                                </Col>
                            </Row>

                            <Form.Group controlId="tipoPaciente">
                                <Form.Control
                                    value={this.state.tipoPaciente}
                                    onChange={this.handleChange}
                                    placeholder="Tipo de paciente"
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

