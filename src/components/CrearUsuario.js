import React, { Component } from 'react';
import { Form, Button, Row, Col } from "react-bootstrap";
import { Option } from './Option'
import { TextoAyuda } from './TextoAyuda'
import {obtenerSupervisores,obtenerRoles} from '../backend/usuario/usuario'
const generos = ["Masculino", "Femenino", "Otro"]

export class CrearUsuario extends Component {
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
            supervisor: "",
            supervisores:[],
            roles:[]
        };
    }

    handleChange = event => {
        this.setState({
            [event.target.id]: event.target.value
        });
    }

    _handleSubmit = (event) => {
        event.preventDefault();
        console.log(event)
        
        const aux = JSON.stringify(this.state, null, '  ');
        console.log(aux)
        console.log(this.state);
        this.props.onSubmit(aux)
    }

    cambiarDigitoVerificador = event => {
        var M = 0, S = 1;
        var T = event.target.value
        for (; T; T = Math.floor(T / 10))
            S = (S + T % 10 * (9 - M++ % 6)) % 11;
        this.setState(
            {
                digitoVerificador: S ? S - 1 : 'k',
                rut: event.target.value
            }
        )
    }
    
    componentWillMount(){
        this.setState({
            supervisores: obtenerSupervisores(),
            roles: obtenerRoles()
        });
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
                                                    onChange={this.cambiarDigitoVerificador}
                                                    placeholder="Rut"
                                                />} />
                                        </Form.Group>
                                        <strong>_</strong>
                                        <Form.Group as={Col} md="3" controlId="digitoVerificador">
                                            <Form.Control
                                                plaintext readOnly
                                                value={this.state.digitoVerificador}
                                                onChange={this.handleChange}
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
                                            <Option options={this.state.roles}/>
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
                                            <Option options={this.state.supervisores}/>
                                        </Form.Control>
                                    </Form.Group>
                                </Col>
                            </Row>
                            <Form.Group>
                                <div className="btn-container">
                                    <Button
                                        onClick={this._handleSubmit}
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

