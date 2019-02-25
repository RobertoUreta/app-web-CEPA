import React, { Component } from 'react'
import { Form, Col, Button, Row } from 'react-bootstrap'
import { Option } from '../../../components/Option'
import DatePicker from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css";
import { TextoAyuda } from '../../../components/TextoAyuda'

const tiposEpicrisis = ["Alta terapéutica", "Alta administrativa", "Renuncia voluntaria", "Alta por abandono", "Derivación", "Otra"]
const nivelesRemision = ["Menos del 50%", "Más del 50%", "Más del 75%"]
const tiposBateriaEstandar = ["Proceso Diagnóstico", "Durante proceso interventivo", "Finalización proceso terapéutico"]
export class EpicrisisPsicologica extends Component {


    constructor(props) {
        super(props);

        this.state = {
            fecha: null,
            tipoEpicrisis: "",
            motivos: "",
            observacionRemisionSintomas: "",
            nivelRemision: "",
            observacionesFinales: "",
            logroAlcanzado: "",
            puntuacionObservacionesCgi: "",
            oq452: "",
            sclr90: "",
            des: "",
            lec: "",
            pcl: "",
        };
    }


    _handleChange = (date) => {
        this.setState({
            fecha: date
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
            <div className="epicrisisPsiquiatrica">
                <form onSubmit={this.handleSubmit}>
                    <Form.Row>
                        <Form.Group as={Col}>
                            <Row>
                                <Col>
                                    <Form.Group controlId="fecha">
                                        <div>
                                            <TextoAyuda
                                                nombre="fecha"
                                                tooltip="Fecha"
                                                componente={<DatePicker
                                                    customInput={<Form.Control />}
                                                    dateFormat="dd/MM/yyyy"
                                                    selected={this.state.fecha}
                                                    onChange={this._handleChange}
                                                    placeholderText="Fecha"
                                                />}
                                            />

                                        </div>
                                    </Form.Group>
                                </Col>
                                <Col>
                                    <Form.Group controlId="tipoEpicrisis">
                                        <TextoAyuda
                                            nombre="tipoEpicrisis"
                                            tooltip="Tipo epicrisis"
                                            componente={<Form.Control
                                                as="select"
                                                value={this.state.tipoEpicrisis}
                                                onChange={this.handleChange}
                                            >
                                                <option hidden>Tipo epicrisis</option>
                                                <Option options={tiposEpicrisis} />
                                            </Form.Control>}
                                        />

                                    </Form.Group>
                                </Col>
                            </Row>

                            <Form.Group controlId="motivos">
                                <Form.Label>Detallar motivos</Form.Label>
                                <Form.Control
                                    as="textarea"
                                    rows="3"
                                    value={this.state.motivos}
                                    onChange={this.handleChange}
                                    placeholder="Detallar Motivos"
                                />
                            </Form.Group>
                            <Form.Group controlId="resultadosTestBateriaEstandar">
                                <Form.Label>Resultados aplicación de test Batería Estándar</Form.Label>
                                <Row>
                                    {tiposBateriaEstandar.map((name) => (
                                        <Form.Group>
                                            <Form.Label>{name}</Form.Label>
                                            <Col>
                                                <Form.Group>
                                                    <Form.Control
                                                        value={this.state.oq452}
                                                        onChange={this.handleChange}
                                                        placeholder="OQ-45.2"
                                                    />
                                                </Form.Group>
                                                <Form.Group>
                                                    <Form.Control
                                                        value={this.state.sclr90}
                                                        onChange={this.handleChange}
                                                        placeholder="SCLR-90"
                                                    />
                                                </Form.Group>
                                                <Form.Group>
                                                    <Form.Control
                                                        value={this.state.des}
                                                        onChange={this.handleChange}
                                                        placeholder="DES"
                                                    />
                                                </Form.Group>
                                                <Form.Group>
                                                    <Form.Control
                                                        value={this.state.lec}
                                                        onChange={this.handleChange}
                                                        placeholder="LEC"
                                                    />
                                                </Form.Group>
                                                <Form.Group>
                                                    <Form.Control
                                                        value={this.state.pcl}
                                                        onChange={this.handleChange}
                                                        placeholder="PCL"
                                                    />
                                                </Form.Group>




                                            </Col>
                                        </Form.Group>
                                    ))}
                                </Row>
                            </Form.Group>

                            <Form.Group controlId="remisionSintomas">
                                <Form.Label>Remisión de síntomas</Form.Label>
                                <Form.Control
                                    as="textarea"
                                    rows="3"
                                    value={this.state.observacionRemisionSintomas}
                                    onChange={this.handleChange}
                                    placeholder="Indicar si hubo o no remisión de síntomas"
                                />
                            </Form.Group>
                            <Row>
                                <Col>
                                    <Form.Group controlId="nivelRemision">
                                        <TextoAyuda
                                            nombre="nivelRemision"
                                            tooltip="Nivel Remisión"
                                            componente={<Form.Control
                                                as="select"
                                                value={this.state.nivelRemision}
                                                onChange={this.handleChange}
                                            >
                                                <option hidden>Nivel Remisión</option>
                                                <Option options={nivelesRemision} />
                                            </Form.Control>}
                                        />

                                    </Form.Group>
                                </Col>
                                <Col>
                                    <TextoAyuda
                                        nombre="observacionesFinales"
                                        tooltip="Observaciones Finales"
                                        componente={<Form.Control
                                            value={this.state.observacionesFinales}
                                            onChange={this.handleChange}
                                            placeholder="Observaciones Finales"
                                        />}
                                    />

                                </Col>
                            </Row>
                            <Form.Group controlId="logroAlcanzado">
                                <Form.Label>Nivel de logro alcazado (de acuerdo a los objetivos e indicador de logro)</Form.Label>
                                <Form.Control
                                    as="textarea"
                                    rows="3"
                                    value={this.state.logroAlcanzado}
                                    onChange={this.handleChange}
                                    placeholder="Nivel de logro alcanzado"
                                />
                            </Form.Group>
                            <Form.Group controlId="puntuacionObservacionesCgi">
                                <Form.Label>Puntuación y observaciones Escala CGI</Form.Label>
                                <Form.Control
                                    as="textarea"
                                    rows="3"
                                    value={this.state.puntuacionObservacionesCgi}
                                    onChange={this.handleChange}
                                    placeholder="Puntuación y observaciones escala CGI"
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