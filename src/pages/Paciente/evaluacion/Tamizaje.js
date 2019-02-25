import React, { Component } from 'react'
import { Form, Col, Button, Row } from 'react-bootstrap'
import { Option } from '../../../components/Option'
import DatePicker from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css";
import { TextoAyuda } from '../../../components/TextoAyuda'



const tiempoMalestar = ["2 semanas", "3 semanas", "1 mes", "2 meses", "o más"]

export class Tamizaje extends Component {


    constructor(props) {
        super(props);

        this.state = {
            nombreSolicitante: "",
            fechaSolicitud: null,
            horarioDisponible: "",
            nivelUrgencia: 0,
            preguntaSintomatologia: "",
            preguntaMalestar: "",
            preguntaObservaciones: ""
        };
    }


    _handleChange = (date) => {
        this.setState({
            fechaSolicitud: date
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
            <div className="Tamizaje">
                <form onSubmit={this.handleSubmit}>
                    <Form.Row>
                        <Form.Group as={Col}>
                            <Form.Group controlId="nombre">
                            <TextoAyuda 
                                    nombre="nombre"
                                    tooltip="Nombre Solicitante"
                                    componente={<Form.Control
                                    value={this.state.nombre}
                                    onChange={this.handleChange}
                                    placeholder="Nombre Solicitante"
                                />}
                                />
                                
                            </Form.Group>
                            <Row>
                                <Col>
                                    <Form.Group controlId="fechaSolicitud">
                                        <div>
                                        <TextoAyuda 
                                    nombre="fechaSolicitud"
                                    tooltip="Fecha de solicitud"
                                    componente={<DatePicker
                                                
                                                customInput={<Form.Control />}
                                                dateFormat="dd/MM/yyyy"
                                                selected={this.state.fechaSolicitud}
                                                onChange={this._handleChange}
                                                placeholderText="Fecha de solicitud"
                                            />}
                                />
                                            
                                        </div>
                                    </Form.Group>
                                    <Form.Group controlId="horarioDisponible">
                                    <TextoAyuda 
                                    nombre="horarioDisponible"
                                    tooltip="Horario Disponible"
                                    componente={<Form.Control
                                            value={this.state.horarioDisponible}
                                            onChange={this.handleChange}
                                            placeholder="Horario Disponible"
                                        />}
                                />
                                        
                                    </Form.Group>
                                </Col>
                              
                                <Col>
                                    <Form.Group controlId="nivelUrgencia">
                                    <Form.Label>¿Qué tan urgente es su necesidad de atención psicológica?</Form.Label>
                                    <Form.Control
                                        as="select"
                                        value={this.state.nivelUrgencia}
                                        onChange={this.handleChange}
                                    >
                                        <Option options={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10]} />
                                    </Form.Control>
                            </Form.Group>
                                </Col>
                            </Row>
                            <Form.Group controlId="preguntaSintomatologia">
                                <Form.Label>Brevemente, ¿Cuál es la principal sintomatología que presenta?
                                    Y, estos síntomas ¿Han afectado su desempeño cotidiano
                                        (trabajo, colegio, relaciones interpersonales)?</Form.Label>
                                <Form.Control
                                    as="textarea"
                                    rows="5"
                                    value={this.state.preguntaSintomatologia}
                                    onChange={this.handleChange}
                                    placeholder="Principal Sintomatología"
                                />
                            </Form.Group>
                            <Form.Group controlId="preguntaMalestar">
                                <Form.Label>¿Desde cuándo se presenta este malestar?</Form.Label>
                                <Form.Control
                                    as="select"
                                    value={this.state.preguntaMalestar}
                                    onChange={this.handleChange}
                                >
                                    <Option options={tiempoMalestar} />
                                </Form.Control>
                            </Form.Group>
                            <Form.Group controlId="preguntaOnservaciones">
                                <Form.Label>Observaciones</Form.Label>
                                <Form.Control
                                    as="textarea"
                                    rows="5"
                                    value={this.state.preguntaObservaciones}
                                    onChange={this.handleChange}
                                    placeholder="Observaciones"
                                />
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

                </form>
            </div>
        );
    }
}