import React, { Component } from 'react';
import { Form, Button, Row, Col } from "react-bootstrap";
import { Option } from '../components/Option'
import {TextoAyuda} from '../components/TextoAyuda'
const generos = ["Masculino", "Femenino", "Otro"]

export default class CrearUsuario extends Component {

    constructor(props) {
        super(props);

        this.state = {
            nombre: "",
            apellidoPaterno: "",
            apellidoMaterno: "",
            rut: "",
            digitoVerificador: "",
            genero: "",
            usuario: "",
            password: "",
            telefonoMovil: "",
            telefonoTrabajo: "",
            correo: "",
            horasSemanales: "",
            nombreContactoEmergencia: "",
            telefonoContactoEmergencia: "",
            rol: "",
            supervisor: ""
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
            <div className="CrearUsuario">
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
                            <Row>
                                <Col>
                                    <Form.Group controlId="apellidoPaterno">
                                        <Form.Control
                                            value={this.state.apellidoPaterno}
                                            onChange={this.handleChange}
                                            placeholder="Apellido Paterno"
                                        />
                                    </Form.Group>
                                </Col>
                                <Col>
                                    <Form.Group controlId="apellidoMaterno">
                                        <Form.Control
                                            value={this.state.apellidoMaterno}
                                            onChange={this.handleChange}
                                            placeholder="Apellido Materno"
                                        />
                                    </Form.Group>
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <Row>
                                    <Form.Group as={Col} md="8" controlId="rut">
                                            <TextoAyuda nombre="rut"
                                                tooltip="Rut sin puntos ni digito verificador"
                                                componente={<Form.Control
                                                    value={this.state.rut}
                                                    onChange={this.handleChange}
                                                    placeholder="Rut"
                                                />} />
                                        </Form.Group>
                                        <strong>_</strong>
                                        <Form.Group as={Col} md="3" controlId="digitoVerificador">
                                            <TextoAyuda
                                                nombre="digitoVerificador"
                                                tooltip="Digito Verificador"
                                                componente={<Form.Control
                                                    value={this.state.digitoVerificador}
                                                    onChange={this.handleChange}
                                                />}
                                            />
                                        </Form.Group>

                                    </Row>

                                </Col>
                                <Col>
                                    <Form.Group controlId="genero">
                                        <Form.Control
                                            as="select"
                                            value={this.state.genero}
                                            onChange={this.handleChange}>
                                            <option hidden>Genero</option>
                                            <Option options={generos}></Option>
                                        </Form.Control>
                                    </Form.Group>
                                </Col>
                            </Row>

                            <Row>
                                <Col>
                                    <Form.Group controlId="usuario">
                                        <Form.Control
                                            type="usuario"
                                            value={this.state.usuario}
                                            onChange={this.handleChange}
                                            placeholder="Nombre de usuario"
                                        />
                                    </Form.Group>
                                </Col>
                                <Col>
                                    <Form.Group controlId="password">
                                        <Form.Control
                                            value={this.state.password}
                                            onChange={this.handleChange}
                                            type="password"
                                            inputRef={inputElement => this.inputPwd = inputElement}
                                            placeholder="Contraseña"
                                        />
                                    </Form.Group>
                                </Col>
                            </Row>
                        </Form.Group>

                        <Form.Group as={Col}>
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
                                            placeholder="Teléfono de Trabajo"
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
                            <Form.Group controlId="horasSemanales">
                                <Form.Control
                                    value={this.state.horasSemanales}
                                    onChange={this.handleChange}
                                    placeholder="Horas Semanales"
                                />
                            </Form.Group>
                            <Row>

                                <Col>
                                    <Form.Group controlId="nombreContactoEmergencia">
                                        <Form.Control
                                            value={this.state.nombreContactoEmergencia}
                                            onChange={this.handleChange}
                                            placeholder="Nombre contacto de emergencia"
                                        />
                                    </Form.Group>
                                </Col>
                                <Col>
                                    <Form.Group controlId="telefonoContactoEmergencia">
                                        <Form.Control
                                            value={this.state.telefonoContactoEmergencia}
                                            onChange={this.handleChange}
                                            placeholder="Teléfono contacto de emergencia"
                                        />
                                    </Form.Group>
                                </Col>
                            </Row>

                            <Row>
                                <Col>
                                    <Form.Group controlId="rol">
                                        <Form.Control
                                            as="select"
                                            value={this.state.rol}
                                            onChange={this.handleChange}>
                                            <option hidden>Rol</option>
                                        </Form.Control>
                                    </Form.Group>
                                </Col>
                                <Col>
                                    <Form.Group controlId="supervisor">
                                        <Form.Control
                                            as="select"
                                            value={this.state.supervisor}
                                            onChange={this.handleChange}>
                                            <option hidden>Supervisor</option>
                                        </Form.Control>

                                    </Form.Group>
                                </Col>
                            </Row>
                            <Form.Group>
                                <Row>
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

