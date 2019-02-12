import React, {Component} from 'react'
import {Form,Col,Button} from 'react-bootstrap'
import {Option} from '../../../components/Option'

const valoresSesion = [0,3000,8000,15000]
const relacionesContractuales = ["Sin contrato","Honorarios","Pension de vejez"]

export class DatosPersonales extends Component {

    constructor(props) {
        super(props);

        this.state = {
            nombre: "",
            apellidoPaterno: "",
            apellidoMaterno: "",
            rut: "",
            fechaNacimiento: "",
            telefonoMovil: "",
            telefonoFijo: "",
            correo: "",
            nivelInstruccion:"",
            establecimientoEducacional:"",
            tipoEstablecimiento:"",
            prevision:"",
            ocupacion:"",
            relacionContractual:"",
            tipoPaciente:"",
            valorSesion:0,
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
                            <Form.Group controlId="fechaNacimiento">
                                <Form.Label>Fecha de nacimiento</Form.Label>
                                <Form.Control
                                    type="fechaNacimiento"
                                    value={this.state.fechaNacimiento}
                                    onChange={this.handleChange}
                                    placeholder="Seleccione la fechaNacimiento del usuario">
                                </Form.Control>
                                
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
                        
                        </Form.Group>

                        <Form.Group as={Col}>
                            <Form.Group controlId="nivelInstruccion">
                                <Form.Label>Nivel Instruccion</Form.Label>
                                <Form.Control
                                    type="nivelInstruccion"
                                    value={this.state.nivelInstruccion}
                                    onChange={this.handleChange}
                                    placeholder="Ingrese el nivel de Instruccion"
                                />
                            </Form.Group>
                            <Form.Group controlId="establecimientoEducacional">
                                <Form.Label>Establecimiento Educacional</Form.Label>
                                <Form.Control
                                    type="establecimientoEducacional"
                                    value={this.state.establecimientoEducacional}
                                    onChange={this.handleChange}
                                    placeholder="Ingrese el establecimiento educacional"
                                />
                            </Form.Group>
                            <Form.Group controlId="tipoEstablecimiento">
                                <Form.Label>tipo de Establecimiento</Form.Label>
                                <Form.Control
                                    type="tipoEstablecimiento"
                                    value={this.state.tipoEstablecimiento}
                                    onChange={this.handleChange}
                                    placeholder="Ingrese el tipo de establecimiento"
                                />
                            </Form.Group>
                            <Form.Group controlId="prevision">
                                <Form.Label>Prevision</Form.Label>
                                <Form.Control
                                    type="prevision"
                                    value={this.state.prevision}
                                    onChange={this.handleChange}
                                    placeholder="Ingrese la prevision"
                                />
                            </Form.Group>
                            <Form.Group controlId="ocupacion">
                                <Form.Label>Ocupacion</Form.Label>
                                <Form.Control
                                    type="ocupacion"
                                    value={this.state.ocupacion}
                                    onChange={this.handleChange}
                                    placeholder="Ingrese la ocupacion"
                                />
                            </Form.Group>
                            <Form.Group controlId="relacionContractual">
                                <Form.Label>Relacion contractual</Form.Label>
                                <Form.Control
                                    as="select"
                                    type="relacionContractual"
                                    value={this.state.relacionContractual}
                                    onChange={this.handleChange}
                                    placeholder="Ingrese la relacion contractual"
                                >
                                    <Option options={relacionesContractuales}/>
                                </Form.Control>
                            </Form.Group>
                            <Form.Group controlId="tipoPaciente">
                                <Form.Label>Tipo paciente</Form.Label>
                                <Form.Control
                                    type="tipoPaciente"
                                    value={this.state.tipoPaciente}
                                    onChange={this.handleChange}
                                    placeholder="Ingrese el tipo de paciente"
                                />
                            </Form.Group>
                            <Form.Group controlId="valorSesion">
                                <Form.Label>Valor de sesion</Form.Label>
                                <Form.Control
                                    as="select"
                                    type="valorSesion"
                                    value={this.state.valorSesion}
                                    onChange={this.handleChange}
                                    placeholder="Ingrese el valor de la sesion"
                                >
                                    <Option options={valoresSesion}/>
                                </Form.Control>
                            </Form.Group>
                            <Button
                                size="lg"
                                type="submit"
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

