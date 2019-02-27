import React, { Component } from 'react'
import { Col, Form, Button, Modal } from 'react-bootstrap'
import { TextoAyuda } from './TextoAyuda'

import DatePicker from 'react-datepicker'
import { addYears } from 'date-fns/esm';

import { registerLocale, setDefaultLocale } from 'react-datepicker'
import es from 'date-fns/locale/es';
registerLocale("es", es)
setDefaultLocale("es")
export class ModalFamiliar extends Component {

    constructor(props) {
        super(props)

        this.state = {
            nombre: "",
            fechaNacimiento: null,
            edad: "",
            relacionPaciente: "",
            ocupacion: "",
        }
    }

    handleChange = event => {
        this.setState({
            [event.target.id]: event.target.value
        });


    }

    getAge(date) {
        var today = new Date();
        var birthDate = new Date(date);
        var age = today.getFullYear() - birthDate.getFullYear();
        var m = today.getMonth() - birthDate.getMonth();
        if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
            age--;
        }
        return age;
    }


    _handleDateChange = (date) => {
        console.log(date.toLocaleDateString());
        
        this.setState({
            fechaNacimiento: date,
            edad: this.getAge(date)
        });
    }

    _handleClose = () => {
        this.props.fnCerrar(false)
        this.setState({
            nombre: "",
            fechaNacimiento: null,
            edad: "",
            relacionPaciente: "",
            ocupacion: "",
        })
    }

    _handleModalSubmit = (evt) => {
        //console.log(this.state)
        evt.preventDefault()
        const aux = JSON.stringify(this.state, null, '  ');
        //console.log(data)
        this.props.onSubmit(aux)

        this._handleClose()
    }
    render() {
        return (
            <Modal show={this.props.show} onHide={this._handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Datos integrante</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form onSubmit={this.handleSubmit}>
                        <Col>
                            <Form.Group>
                                <Form.Group controlId="nombre">
                                    <TextoAyuda
                                        nombre="nombre"
                                        tooltip="Nombre"
                                        componente={
                                            <Form.Control
                                                value={this.state.nombre}
                                                onChange={this.handleChange}
                                                placeholder="Nombre"
                                            />
                                        }
                                    />
                                </Form.Group>
                            </Form.Group>
                            <Form.Group>
                                <Form.Group controlId="fechaNacimiento">
                                    <TextoAyuda nombre="fechaNacimiento" tooltip="Fecha de Nacimiento" componente={<DatePicker
                                        customInput={<Form.Control />}
                                        dateFormat="dd/MM/yyyy"
                                        selected={this.state.fechaNacimiento}
                                        onChange={this._handleDateChange}
                                        showMonthDropdown
                                        showYearDropdown
                                        maxDate={addYears(new Date(), 0)}
                                        dropdownMode="select"
                                        placeholderText="Fecha de Nacimiento"
                                    />} />
                                </Form.Group>
                            </Form.Group>
                            <Form.Group>
                                <Form.Group controlId="relacionPaciente">
                                    <TextoAyuda
                                        nombre="relacionPaciente"
                                        tooltip="Relación Paciente"
                                        componente={
                                            <Form.Control
                                                value={this.state.relacionPaciente}
                                                onChange={this.handleChange}
                                                placeholder="Relación Paciente"
                                            />
                                        }
                                    />
                                </Form.Group>
                            </Form.Group>
                            <Form.Group>
                                <Form.Group controlId="ocupacion">
                                    <TextoAyuda
                                        nombre="ocupacion"
                                        tooltip="Ocupación"
                                        componente={
                                            <Form.Control
                                                value={this.state.ocupacion}
                                                onChange={this.handleChange}
                                                placeholder="Ocupación"
                                            />
                                        }
                                    />
                                </Form.Group>
                            </Form.Group>
                        </Col>

                    </form>
                </Modal.Body>
                <Modal.Footer>
                    <Button  className="btn-custom" variant="secondary" onClick={this._handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={this._handleModalSubmit}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
        )
    }

}