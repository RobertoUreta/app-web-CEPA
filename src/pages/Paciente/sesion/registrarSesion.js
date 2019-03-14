import React, { Component } from 'react';
import { Form, Button, Row, Col } from "react-bootstrap";
import { Option } from '../../../components/Option'
import { TextoAyuda } from '../../../components/TextoAyuda'
import DatePicker from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css";
import { setHours } from 'date-fns/esm';
import { setMinutes } from 'date-fns';
import { obtenerSalas, obtenerLastIdSesion } from '../../../backend/agenda/agenda';
import { obtenerPacientes } from '../../../backend/paciente/paciente';

export class RegistrarSesion extends Component {

    constructor(props) {
        super(props);

        this.state = {
            fechaSesion: this.props.defaultDate,
            horaInicio: null,
            horaTermino: null,
            descripcion: "",
            valorSesion: "",//setear segun el valor de sesion agregado en la general
            paciente :"",
            idPaciente: "",
            pacientes: new Map(),
            sala: "",
            tipoSesion: "",
            estadoSesion: "No empezado",
            idSala: "",
            salas: new Map(),
            id: 0
        };
    }

    componentDidMount() {
        let aux = new Map()
        let promise = obtenerSalas()
        promise
            .then(res => {
                let data = res.data;
                let arr = data.salas;
                arr.forEach(element => {
                    aux.set(element.nombre, element.id_sala)
                });
                this.setState({ salas: aux })

            }).catch(err => {
                aux.push("default");
                console.log(err);
            });
        let listado = new Map()
        promise = obtenerPacientes()
        promise
            .then(res => {
                let data = res.data;
                let arr = data.pacientes;
                arr.forEach(element => {
                    let nombre = element.nombre + " " + element.apellido_paterno + " " + element.apellido_materno

                    listado.set(nombre, element.id_paciente)
                });
                this.setState({ pacientes: listado })
            })
        promise = obtenerLastIdSesion()
        promise
        .then(res => {
            let data = res.data.response[0].id +1
            console.log("datita",data)

            this.setState({id: data})
        })
    }

    _handleChange = (date) => {
        this.setState({
            fechaSesion: date,

        });
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
        //console.log(data)
        this.props.onSubmit(aux)

    }



    render() {

        return (
            <div className="registrarSesion">
                <form onSubmit={this.handleSubmit} autoComplete="off">
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
                                            minTime={setHours(setMinutes(new Date(), 0), 9)}
                                            maxTime={setHours(setMinutes(new Date(), 0), 18)}
                                            timeIntervals={30}
                                            dateFormat="HH:mm"
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
                                            minTime={setHours(setMinutes(new Date(), 0), 9)}
                                            maxTime={setHours(setMinutes(new Date(), 0), 18)}
                                            dateFormat="HH:mm"
                                            timeCaption="Time"
                                            placeholderText="Hora de Termino"
                                        />} />
                                </Form.Group>
                            </Row>
                            <Form.Group controlId="paciente">
                                <TextoAyuda
                                    nombre="paciente"
                                    tooltip="Seleccionar paciente"
                                    componente={<Form.Control
                                        as="select"
                                        value={this.state.paciente}
                                        onChange={event => {
                                            this.setState({
                                                [event.target.id]: event.target.value,
                                                idPaciente: this.state.pacientes.get(event.target.value)
                                            });
                                        }}
                                    >
                                        <option hidden>Seleccionar Paciente</option>
                                        <Option options={Array.from(this.state.pacientes.keys())} />
                                    </Form.Control>}
                                />
                            </Form.Group>
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
                                            onChange={event => {
                                                this.setState({
                                                    [event.target.id]: event.target.value,
                                                    idSala: this.state.salas.get(event.target.value)
                                                });
                                            }}
                                        >
                                            <option hidden>Elegir Sala</option>
                                            <Option options={Array.from(this.state.salas.keys())} />
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
                                <div className="btn-container">
                                    <Button
                                        onClick={this._handleSubmit}
                                        className="btn-submit"
                                        variant="primary"
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

