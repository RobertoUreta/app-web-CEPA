import React, { Component } from 'react'
import { Form, Col, Button, Row } from 'react-bootstrap'
import { Option } from '../../../components/Option'
import DatePicker from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css";
import { addYears } from 'date-fns/esm';
import { TextoAyuda } from '../../../components/TextoAyuda'

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
            digitoVerificador: "",
            fechaNacimiento: null,//Esto para mostrar el placeholder del datepicker
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
            nacimiento: "",
            fechaIngreso: new Date(),
            alert: null
        };
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
    componentWillMount() {
        let paciente = this.props.paciente
        if (paciente !== undefined) {
            console.log("no es undefined", paciente)
            this.setState({
                nombre: paciente.nombre === "default" ? "" : paciente.nombre,
                apellidoPaterno: paciente.apellido_paterno === "default" ? "" : paciente.apellido_paterno,
                apellidoMaterno: paciente.apellido_materno === "default" ? "" : paciente.apellido_materno,
                rut: paciente.rut === "12345678" ? "" : paciente.rut,
                fechaNacimiento: paciente.fecha_nacimiento,
                telefonoMovil: paciente.telefono_movil === "default" ? "" : paciente.telefono_movil,
                telefonoFijo: paciente.telefono_fijo === "default" ? "" : paciente.telefono_fijo,
                correo: paciente.correo === "default@default.com" ? "" : paciente.correo,

                establecimientoEducacional: paciente.establecimiento_educacional === "default" ? "" : paciente.establecimiento_educacional,
                tipoEstablecimiento: paciente.tipo_establecimiento === "default" ? "" : paciente.tipo_establecimiento,
                prevision: paciente.prevision === "default" ? "" : paciente.prevision,
                ocupacion: paciente.ocupacion === "default" ? "" : paciente.ocupacion,
                relacionContractual: paciente.relacion_contractual === "default" ? "" : paciente.relacion_contractual,
                tipoPaciente: paciente.tipo_paciente === "default" ? "" : paciente.tipo_paciente,
                valorSesion: paciente.valor_sesion === "default" ? "" : paciente.valor_sesion,
            })
            this._cambiarDigitoVerificador(this.state.rut);
        }
    }
    _handleChange = (date) => {
        this.setState({
            fechaNacimiento: date
        });
    }
    handleChange = event => {
        this.setState({
            [event.target.id]: event.target.value
        });
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

    

    
    handleSubmit = (event) => {
        event.preventDefault();

        let info = JSON.stringify(this.state, null, '  ');
   
        this.props.handlePaciente(info)


    }

    render() {

        return (
            <div className="DatosPersonales">
                <form onSubmit={this.handleSubmit} autoComplete="off">
                    <Form.Row>
                        <Form.Group as={Col}>
                            <Form.Group controlId="nombre">
                                <TextoAyuda nombre="nombre"
                                    tooltip="Nombre"
                                    componente={
                                        <Form.Control
                                            value={this.state.nombre}
                                            onChange={this.handleChange}
                                            placeholder="Nombre"
                                            required
                                        />
                                    }
                                />
                            </Form.Group>
                            <Form.Group controlId="apellidoPaterno">
                                <TextoAyuda nombre="apellidoPaterno" tooltip="Apellido Paterno" componente={<Form.Control
                                    value={this.state.apellidoPaterno}
                                    onChange={this.handleChange}
                                    placeholder="Apellido Paterno"
                                    required
                                />} />

                            </Form.Group>
                            <Form.Group controlId="apellidoMaterno">
                                <TextoAyuda nombre="apellidoMaterno" tooltip="Apellido Materno" componente={<Form.Control
                                    value={this.state.apellidoMaterno}
                                    onChange={this.handleChange}
                                    placeholder="Apellido Materno"
                                />} />
                            </Form.Group>
                            <Row>

                                <Form.Group as={Col} controlId="fechaNacimiento">
                                    <div>
                                        <TextoAyuda nombre="fechaNacimiento" tooltip="Fecha de Nacimiento" componente={<DatePicker
                                            customInput={<Form.Control />}
                                            dateFormat="dd/MM/yyyy"
                                            selected={this.state.fechaNacimiento}
                                            onChange={this._handleChange}
                                            showMonthDropdown
                                            showYearDropdown
                                            maxDate={addYears(new Date(), 0)}
                                            dropdownMode="select"
                                            placeholderText="Fecha de Nacimiento"
                                            required
                                        />} />

                                    </div>
                                </Form.Group>

                                <Col>
                                    <Row>
                                        <Form.Group as={Col} md="8" controlId="rut">
                                            <TextoAyuda nombre="rut"
                                                tooltip="RUT sin puntos ni digito verificador"
                                                componente={<Form.Control
                                                    value={this.state.rut}
                                                    onChange={this.cambiarDigitoVerificador}
                                                    placeholder="RUT"
                                                    pattern="[0-9]+"
                                                    required
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

                            </Row>
                            <Row>
                                <Form.Group as={Col} controlId="telefonoMovil">
                                    <TextoAyuda nombre="telefonoMovil" tooltip="Teléfono Móvil" componente={<Form.Control
                                        value={this.state.telefonoMovil}
                                        onChange={this.handleChange}
                                        placeholder="Teléfono Móvil"
                                        pattern="(\+?56)?(\s?)(0?9)(\s?)[98765]\d{7}"
                                        required
                                        title="Ingrese un numero de teléfono móvil valido"
                                    />} />
                                </Form.Group>
                                <Form.Group as={Col} controlId="telefonoFijo">
                                    <TextoAyuda nombre="telefonoFijo" tooltip="Teléfono Fijo" componente={<Form.Control
                                        value={this.state.telefonoFijo}
                                        onChange={this.handleChange}
                                        placeholder="Teléfono Fijo"
                                    />} />
                                </Form.Group>
                            </Row>
                            <Form.Group controlId="correo">
                                <TextoAyuda nombre="correo" tooltip="Correo" componente={<Form.Control
                                    type="email"
                                    value={this.state.correo}
                                    onChange={this.handleChange}
                                    placeholder="Correo"
                                />} />

                            </Form.Group>
                        </Form.Group>
                        <Form.Group as={Col}>
                            <Form.Group controlId="nivelInstruccion">
                                <TextoAyuda nombre="nivelInstruccion" tooltip="Nivel de Instrucción" componente={<Form.Control
                                    value={this.state.nivelInstruccion}
                                    onChange={this.handleChange}
                                    placeholder="Nivel de Instrucción"
                                />} />
                            </Form.Group>
                            <Form.Group controlId="establecimientoEducacional">
                                <TextoAyuda nombre="establecimientoEducacional" tooltip="Establecimiento educacional" componente={<Form.Control
                                    value={this.state.establecimientoEducacional}
                                    onChange={this.handleChange}
                                    placeholder="Establecimiento educacional"
                                />} />
                            </Form.Group>
                            <Row>
                                <Form.Group as={Col} controlId="tipoEstablecimiento">
                                    <TextoAyuda nombre="tipoEstablecimiento" tooltip="Tipo de establecimiento" componente={<Form.Control
                                        as="select"
                                        value={this.state.tipoEstablecimiento}
                                        onChange={this.handleChange}
                                    >
                                        <option hidden>Tipo de Establecimiento</option>
                                        <Option options={tiposEstablecimientos} />
                                    </Form.Control>} />
                                </Form.Group>
                                <Form.Group as={Col} controlId="prevision">
                                    <TextoAyuda nombre="prevision" tooltip="Previsión" componente={<Form.Control
                                        as="select"
                                        value={this.state.prevision}
                                        onChange={this.handleChange}
                                    >
                                        <option hidden>Previsión</option>
                                        <Option options={previsiones} />
                                    </Form.Control>} />
                                </Form.Group>
                            </Row>


                            <Form.Group controlId="ocupacion">
                                <TextoAyuda nombre="ocupacion" tooltip="Ocupación" componente={<Form.Control
                                    value={this.state.ocupacion}
                                    onChange={this.handleChange}
                                    placeholder="Ocupación"
                                />} />

                            </Form.Group>
                            <Row>
                                <Form.Group as={Col} controlId="relacionContractual">
                                    <TextoAyuda nombre="relacionContractual" tooltip="Relación Contractual" componente={<Form.Control
                                        as="select"
                                        value={this.state.relacionContractual}
                                        onChange={this.handleChange}
                                    >
                                        <option hidden>Relación Contractual</option>
                                        <Option options={relacionesContractuales} />
                                    </Form.Control>} />
                                </Form.Group>
                                <Form.Group as={Col} controlId="valorSesion">
                                    <TextoAyuda nombre="valorSesion" tooltip="Valor de Sesión" componente={<Form.Control
                                        as="select"
                                        value={this.state.valorSesion}
                                        onChange={this.handleChange}
                                    >
                                        <option hidden>Valor de Sesión</option>
                                        <Option options={valoresSesion} />
                                    </Form.Control>} />

                                </Form.Group>
                            </Row>

                            <Form.Group controlId="tipoPaciente">
                                <TextoAyuda nombre="tipoPaciente" tooltip="Tipo de paciente" componente={<Form.Control
                                    value={this.state.tipoPaciente}
                                    onChange={this.handleChange}
                                    placeholder="Tipo de paciente"
                                />} />

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
                    {this.state.alert}
                </form>
            </div>
        );
    }
}

