import React, { Component } from 'react';
import { Form, Button, Col } from "react-bootstrap";



export default class CrearUsuario extends Component {

    constructor(props) {
        super(props);

        this.state = {
            nombre: "",
            apellidoPaterno: "",
            apellidoMaterno: "",
            rut: "",
            genero: "",
            usuario: "",
            password: "",
            telefonoMovil: "",
            telefonoTrabajo: "",
            correo: "",
            horasSemanales: 0,
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
                                <Form.Label>Nombre</Form.Label>
                                <Form.Control
                                    type="nombre"
                                    value={this.state.nombre}
                                    onChange={this.handleChange}
                                    placeholder="Ingrese el nombre del usuario"
                                />
                            </Form.Group>
                            <Form.Group controlId="apellidoPaterno">
                                <Form.Label>Apellido Paterno</Form.Label>
                                <Form.Control
                                    type="apellidoPaterno"
                                    value={this.state.apellidoPaterno}
                                    onChange={this.handleChange}
                                    placeholder="Ingrese el apellido paterno del usuario"
                                />
                            </Form.Group>
                            <Form.Group controlId="apellidoMaterno">
                                <Form.Label>Apellido Materno</Form.Label>
                                <Form.Control
                                    type="apellidoMaterno"
                                    value={this.state.apellidoMaterno}
                                    onChange={this.handleChange}
                                    placeholder="Ingrese el apellido materno del usuario"
                                />
                            </Form.Group>
                            <Form.Group controlId="rut">
                                <Form.Label>Rut</Form.Label>
                                <Form.Control
                                    type="rut"
                                    value={this.state.rut}
                                    onChange={this.handleChange}
                                    placeholder="19275731-2"
                                />
                            </Form.Group>
                            <Form.Group controlId="genero">
                                <Form.Label>Genero</Form.Label>
                                <Form.Control
                                    as="select"
                                    type="genero"
                                    value={this.state.genero}
                                    onChange={this.handleChange}
                                    placeholder="Seleccione el genero del usuario">
                                    <option>Masculino</option>
                                    <option>Femenino</option>
                                    <option>Otro</option>
                                </Form.Control>
                            </Form.Group>
                            <Form.Group controlId="usuario">
                                <Form.Label>Usuario</Form.Label>
                                <Form.Control
                                    type="usuario"
                                    value={this.state.usuario}
                                    onChange={this.handleChange}
                                    placeholder="Ingrese el username/alias del usuario"
                                />
                            </Form.Group>
                            <Form.Group controlId="password">
                                <Form.Label>Contraseña</Form.Label>
                                <Form.Control
                                    value={this.state.password}
                                    onChange={this.handleChange}
                                    type="password"
                                    inputRef={inputElement => this.inputPwd = inputElement}
                                    placeholder="Ingrese la contraseña del usuario"
                                />
                            </Form.Group>
                            <Form.Group controlId="telefonoMovil">
                                <Form.Label>Telefono Movil</Form.Label>
                                <Form.Control
                                    type="telefonoMovil"
                                    value={this.state.telefonoMovil}
                                    onChange={this.handleChange}
                                    placeholder="Ingrese el telefono movil del usuario"
                                />
                            </Form.Group>
                        </Form.Group>

                        <Form.Group as={Col}>
                            <Form.Group controlId="telefonoTrabajo">
                                <Form.Label>Telefono Trabajo</Form.Label>
                                <Form.Control
                                    type="telefonoTrabajo"
                                    value={this.state.telefonoTrabajo}
                                    onChange={this.handleChange}
                                    placeholder="Ingrese el telefono de trabajo del usuario"
                                />
                            </Form.Group>
                            <Form.Group controlId="correo">
                                <Form.Label>Correo</Form.Label>
                                <Form.Control
                                    type="Correo"
                                    value={this.state.correo}
                                    onChange={this.handleChange}
                                    placeholder="Ingrese el correo del usuario"
                                />
                            </Form.Group>
                            <Form.Group controlId="horasSemanales">
                                <Form.Label>Horas Semanales</Form.Label>
                                <Form.Control
                                    type="HorasSemanales"
                                    value={this.state.horasSemanales}
                                    onChange={this.handleChange}
                                    placeholder="Ingrese las horas semanales del usuario"
                                />
                            </Form.Group>
                            <Form.Group controlId="nombreContactoEmergencia">
                                <Form.Label>Nombre Contacto Emergencia</Form.Label>
                                <Form.Control
                                    type="nombreContactoEmergencia"
                                    value={this.state.nombreContactoEmergencia}
                                    onChange={this.handleChange}
                                    placeholder="Ingrese el nombre de contacto de emergencia del usuario"
                                />
                            </Form.Group>
                            <Form.Group controlId="telefonoContactoEmergencia">
                                <Form.Label>Telefono Contacto Emergencia</Form.Label>
                                <Form.Control
                                    type="telefonoContactoEmergencia"
                                    value={this.state.telefonoContactoEmergencia}
                                    onChange={this.handleChange}
                                    placeholder="Ingrese el telefono de contacto de emergencia"
                                />
                            </Form.Group>
                            <Form.Group controlId="rol">
                                <Form.Label>Rol</Form.Label>
                                <Form.Control
                                    as="select"
                                    type="rol"
                                    value={this.state.rol}
                                    onChange={this.handleChange}
                                    placeholder="Seleccione un rol">
                                    <option>...</option>
                                </Form.Control>
                            </Form.Group>
                            <Form.Group controlId="supervisor">
                                <Form.Label>Supervisor</Form.Label>
                                <Form.Control
                                    as="select"
                                    type="supervisor"
                                    value={this.state.rol}
                                    onChange={this.handleChange}
                                    placeholder="Seleccion un supervisor">
                                    <option>...</option>
                                </Form.Control>
                            </Form.Group>
                            
                            
                    
                            <Button
                                size="lg"
                                type="submit"
                                block
                            >
                                Guardar
                            </Button>
                        </Form.Group>
                    </Form.Row>

                </form>
            </div>
        );
    }
}

