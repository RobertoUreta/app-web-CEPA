import React, { Component } from 'react';
import { Form, Button, Row, Col } from "react-bootstrap";
import { Option } from './Option'
import { TextoAyuda } from './TextoAyuda'
import { obtenerSupervisores, obtenerRoles, insertarUsuario, obtenerUsuario, updateUsuario } from '../backend/usuario/usuario'
import { ChromePicker } from 'react-color'
import { ModalPassword } from './ModalPassword';
const generos = ["Masculino", "Femenino", "Otro"]
export class CrearUsuario extends Component {
    constructor(props) {
        super(props);

        this._handleShow = this._handleShow.bind(this);
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
            rolID: "",
            supervisorID: "",
            supervisores: new Map(),
            roles: new Map(),
            color: "#438C83",//color CEPA
            show: false,
        };
    }

    handleChange = event => {
        this.setState({
            [event.target.id]: event.target.value
        });
    }
    handleSubmitPass = (event) => {
        this._handleClose()
    }
    _handleSubmit = (event) => {
        event.preventDefault();

        this.state.rolID = this.state.roles.get(this.state.rol)
        if (this.state.supervisor !== "") this.state.supervisorID = this.state.supervisores.get(this.state.supervisor)
        const aux = JSON.stringify(this.state, null, '  ');
        //console.log(aux)
        //console.log(this.state);
        this.props.onSubmit(aux)
        if (this.props.usuarioID !== undefined) {
            updateUsuario(JSON.parse(aux), this.props.usuarioID);
        } else {
            //this.props.onSubmit(aux)
            insertarUsuario(JSON.parse(aux));
        }
    }
    _cambiarDigitoVerificador = (rut) => {
        var M = 0, S = 1;
        var T = rut
        for (; T; T = Math.floor(T / 10))
            S = (S + T % 10 * (9 - M++ % 6)) % 11;
        this.setState(
            {
                digitoVerificador: S ? S - 1 : 'k'
            }
        )
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
    _handleClose = (modalEvt) => {
        this.setState({ show: modalEvt });
    }
    _handleShow() {
        this.setState({ show: true })
    }

    handleChangeColor = (cl) => {
        this.setState({ color: cl.hex });
    };

    componentDidMount() {
        this.setState({
            supervisores: obtenerSupervisores(),
            roles: obtenerRoles()
        });
        if (this.props.usuarioID !== undefined) {
            let prom = obtenerUsuario(this.props.usuarioID);
            prom.then(res => {
                let data = res.data;
                console.log(res.data);
                if (data !== undefined) {
                    let usuario = data.respuesta[0];
                    let nombreRol = data.nombreRol;
                    let nombreSupervisor = data.supervisor !== undefined ? data.supervisor.nombre + ' ' + data.supervisor.apellido_paterno : "";
                    this.setState({
                        nombre: usuario.nombre,
                        apellidoPaterno: usuario.apellido_paterno,
                        apellidoMaterno: usuario.apellido_materno,
                        rut: usuario.rut,
                        genero: usuario.genero,
                        usuario: usuario.username,
                        password: usuario.password,
                        telefonoMovil: usuario.telefono_movil,
                        telefonoTrabajo: usuario.telefono_trabajo,
                        correo: usuario.correo,
                        horasSemanales: usuario.horas_semanales,
                        nombreContactoEmergencia: usuario.nombre_contacto_emergencia,
                        telefonoContactoEmergencia: usuario.telefono_contacto_emergencia,
                        rol: nombreRol,
                        supervisor: nombreSupervisor,
                        color: usuario.color,
                    });
                    this._cambiarDigitoVerificador(this.state.rut);
                }
            })
        }

        console.log(this.state.supervisores, this.state.roles)
    }


    render() {
        return (
            <div className="CrearUsuario">
                <form onSubmit={this._handleSubmit} autoComplete="off">
                    <Form.Row>
                        <Form.Group as={Col}>
                            <Form.Group controlId="nombre">
                                <Form.Control
                                    value={this.state.nombre}
                                    onChange={this.handleChange}
                                    placeholder="Nombre"
                                    required
                                />
                            </Form.Group>
                            <Row>
                                <Col>
                                    <Form.Group controlId="apellidoPaterno">
                                        <Form.Control
                                            value={this.state.apellidoPaterno}
                                            onChange={this.handleChange}
                                            placeholder="Apellido Paterno"
                                            required
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
                                                tooltip="RUT sin puntos ni digito verificador"
                                                componente={<Form.Control
                                                    value={this.state.rut}
                                                    onChange={this.cambiarDigitoVerificador}
                                                    placeholder="Rut"
                                                    pattern="[0-9]+"
                                                    title="RUT sin puntos, sin guión y sin digito verificador"
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
                                            onChange={this.handleChange}
                                            required
                                        >
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
                                            required
                                        />
                                    </Form.Group>
                                </Col>
                                {this.props.usuarioID !== undefined ?
                                    <Col>
                                        <Button
                                            className="btn-custom"
                                            onClick={this._handleShow}
                                        >
                                            Cambiar contraseña
                                        </Button>
                                        <ModalPassword

                                            usuarioID={this.props.usuarioID}
                                            onClose={this._handleClose}
                                            show={this.state.show}
                                            usuarioID={this.props.usuarioID}
                                            onSubmit={this.handleSubmitPass}
                                        ></ModalPassword>
                                    </Col>
                                    :
                                    <Col>
                                        <Form.Group controlId="password">
                                            <Form.Control
                                                value={this.state.password}
                                                onChange={this.handleChange}
                                                type="password"
                                                inputRef={inputElement => this.inputPwd = inputElement}
                                                placeholder="Contraseña"
                                                required
                                            />
                                        </Form.Group>
                                    </Col>
                                }

                            </Row>
                            <Row>
                                <Col>
                                    <Form.Group controlId="telefonoMovil">
                                        <Form.Control
                                            pattern="(\+?56)?(\s?)(0?9)(\s?)[98765]\d{7}"
                                            value={this.state.telefonoMovil}
                                            onChange={this.handleChange}
                                            placeholder="Teléfono Móvil"
                                            required
                                            title="Ingrese un numero de teléfono móvil valido"
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
                        </Form.Group>
                        <Form.Group as={Col}>

                            <Row>

                                <Form.Group as={Col}>
                                    <Form.Group controlId="horasSemanales">
                                        <Form.Control
                                            value={this.state.horasSemanales}
                                            onChange={this.handleChange}
                                            placeholder="Horas Semanales"
                                        />
                                    </Form.Group>
                                    <Form.Group controlId="nombreContactoEmergencia">
                                        <Form.Control
                                            value={this.state.nombreContactoEmergencia}
                                            onChange={this.handleChange}
                                            placeholder="Nombre contacto de emergencia"
                                        />
                                    </Form.Group>

                                    <Form.Group controlId="telefonoContactoEmergencia">
                                        <Form.Control
                                            value={this.state.telefonoContactoEmergencia}
                                            onChange={this.handleChange}
                                            placeholder="Teléfono contacto de emergencia"
                                        />
                                    </Form.Group>
                                    <Form.Group controlId="rol">
                                        <Form.Control
                                            as="select"
                                            value={this.state.rol}
                                            onChange={event => {
                                                this.setState({
                                                    [event.target.id]: event.target.value,
                                                    rolID: this.state.roles.get(event.target.value)
                                                });
                                            }}
                                            required>
                                            <option hidden>{this.state.rol === '' ? "Rol" : this.state.rol}</option>
                                            <Option options={Array.from(this.state.roles.keys())} />
                                        </Form.Control>
                                    </Form.Group>

                                    <Form.Group controlId="supervisor">
                                        <Form.Control
                                            as="select"
                                            value={this.state.supervisor}
                                            onChange={event => {
                                                this.setState({
                                                    [event.target.id]: event.target.value,
                                                    supervisorID: this.state.supervisores.get(event.target.value)
                                                });
                                            }}>
                                            <option hidden>{this.state.supervisor === '' ? "Supervisor" : this.state.supervisor}</option>
                                            <Option options={Array.from(this.state.supervisores.keys())} />
                                        </Form.Control>
                                    </Form.Group>
                                </Form.Group>
                                <Form.Group as={Col}>
                                    <Row>
                                        <Col>
                                            <Form.Group controlId="color">
                                                <ChromePicker
                                                    color={this.state.color}
                                                    onChangeComplete={this.handleChangeColor}
                                                />
                                            </Form.Group>
                                        </Col>
                                    </Row>
                                </Form.Group>
                            </Row>

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

