import React, { Component } from 'react'
import { Form, Col, Button, Row } from 'react-bootstrap'
import { Option } from '../../../components/Option'
import DatePicker from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css";
import { TextoAyuda } from '../../../components/TextoAyuda'
import {updateTamizaje,obtenerTamizaje} from '../../../backend/evaluacion/tamizaje'
import  SweetAlert  from 'react-bootstrap-sweetalert'

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
            preguntaObservaciones: "",
            alert:null
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

    _hideAlert = () => {
        this.setState({ alert: null })
    }

    handleSubmit = event => {
        event.preventDefault();
        const aux = JSON.parse(JSON.stringify(this.state, null, '  '));
        let fecha = new Date(aux.fechaSolicitud)
        aux.fechaSolicitud = fecha.toJSON().slice(0, 19).replace('T', ' ')
        console.log(aux)
        console.log(this.state);
        let resp = updateTamizaje(aux, this.props.pacienteId, this.props.userId);
        resp
        .then(res => {
            console.log("agregado", res.data)
            if (res.data.ok) {
                console.log("TAMIZAJEEEEEE")
                const getAlert = () => (
                    <SweetAlert success title="Datos agregados" onConfirm={this._hideAlert}>
                        Se agregaron correctamente los datos del tamizaje
                    </SweetAlert>
                )
                this.setState({alert: getAlert()})
            }

        })

    }
    componentDidMount(){
        let prom = obtenerTamizaje(this.props.pacienteId)
        prom.then(res => {
            let tami = res.data.respuesta[0];
            console.log('tamizaje cambiandooooooo: ', tami)
            if (tami.ok) {
                console.log("no es undefined", tami)
                this.setState({
                    nombreSolicitante: tami.nombre_solicitante === 'default' ? "" : tami.nombre_solicitante,
                    fechaSolicitud: tami.fecha_solicitud ===  '0000-00-00' ? "" : tami.fecha_solicitud,
                    horarioDisponible: tami.horario_disponible === 'default' ? "" :tami.horario_disponible,
                    nivelUrgencia: tami.nivel_urgencia === 'default' ? "" : tami.nivel_urgencia,
                    preguntaSintomatologia:tami.pregunta_sintomatologia === 'default' ? "": tami.pregunta_sintomatologia,
                    preguntaMalestar: tami.pregunta_malestar === 'default' ? "" : tami.pregunta_malestar,
                    preguntaObservaciones: tami.pregunta_observaciones === 'default' ? "": tami.pregunta_observaciones
                })
            }
        }).catch(err => {
            console.log(err)
        })
    }
    render() {
        return (
            <div className="Tamizaje">
                <form onSubmit={this.handleSubmit}>
                    <Form.Row>
                        <Form.Group as={Col}>
                            <Form.Group controlId="nombreSolicitante">
                            <TextoAyuda 
                                    nombre="nombre"
                                    tooltip="Nombre Solicitante"
                                    componente={<Form.Control
                                    value={this.state.nombreSolicitante}
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
                            <Form.Group controlId="preguntaObservaciones">
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
                    {this.state.alert}
                </form>
            </div>
        );
    }
}