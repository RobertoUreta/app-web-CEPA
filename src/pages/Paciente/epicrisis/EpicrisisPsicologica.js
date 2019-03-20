import React, { Component } from 'react'
import { Form, Col, Button, Row } from 'react-bootstrap'
import { Option } from '../../../components/Option'
import DatePicker from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css";
import { TextoAyuda } from '../../../components/TextoAyuda'
import SweetAlert from 'react-bootstrap-sweetalert'
import { updateEpicrisisPsicologica, obtenerEpicrisisPsicologica } from '../../../backend/epicrisis/epicrisisPsicologica';
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
            oq452_1: 0,
            sclr90_1: 0,
            des_1: 0,
            lec_1: 0,
            pcl_1: 0,
            oq452_2: 0,
            sclr90_2: 0,
            des_2: 0,
            lec_2: 0,
            pcl_2: 0,
            oq452_3: 0,
            sclr90_3: 0,
            des_3: 0,
            lec_3: 0,
            pcl_3: 0,
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
        const aux = JSON.parse(JSON.stringify(this.state, null, '  '));
        console.log(aux);
        let resp = updateEpicrisisPsicologica(aux, this.props.pacienteId);
        resp
            .then(res => {
                //console.log("agregado", res.data)
                if (res.data.ok) {
                    const getAlert = () => (
                    <SweetAlert success title="Datos agregados" onConfirm={this._hideAlert}>
                            Se agregaron correctamente los datos de la epicrisis psicologica.
                    </SweetAlert>
                    )
                    this.setState({ alert: getAlert() })
                }

            })
    }
    _hideAlert = () => {
        this.setState({ alert: null })
    }

    componentDidMount() {
        let prom = obtenerEpicrisisPsicologica(this.props.pacienteId);
        prom.then(res => {
            let data = res.data;
            console.log(res.data);
            /*if (data.ok) {
                let tratamiento = data.respuesta[0];
                this.setState({
                    motivoTratamiento: tratamiento.motivo_tratamiento_psicologico==='default'?"":tratamiento.motivo_tratamiento_psicologico,
                    motivoCoconstruido: tratamiento.motivo_consulta_coconstruido==='default'?"":tratamiento.motivo_consulta_coconstruido,
                    tipoTratamiento: tratamiento.tipo_tratamiento==='default'?"":tratamiento.tipo_tratamiento,
                    esInterconsulta: tratamiento.es_interconsulta ? 1:0
                });
            }*/
        })
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
                                    <Form.Group>
                                        <Form.Label>{tiposBateriaEstandar[0]}</Form.Label>
                                        <Col>
                                            <Form.Group controlId="oq452_1">
                                                <Form.Control
                                                    value={this.state.oq452_1}
                                                    onChange={this.handleChange}
                                                    placeholder="OQ-45.2"
                                                />
                                            </Form.Group>
                                            <Form.Group controlId="sclr90_1">
                                                <Form.Control
                                                    value={this.state.sclr90_1}
                                                    onChange={this.handleChange}
                                                    placeholder="SCLR-90"
                                                />
                                            </Form.Group>
                                            <Form.Group controlId="des_1">
                                                <Form.Control
                                                    value={this.state.des_1}
                                                    onChange={this.handleChange}
                                                    placeholder="DES"
                                                />
                                            </Form.Group>
                                            <Form.Group controlId="lec_1">
                                                <Form.Control
                                                    value={this.state.lec_1}
                                                    onChange={this.handleChange}
                                                    placeholder="LEC"
                                                />
                                            </Form.Group>
                                            <Form.Group controlId="pcl_1">
                                                <Form.Control
                                                    value={this.state.pcl_1}
                                                    onChange={this.handleChange}
                                                    placeholder="PCL"
                                                />
                                            </Form.Group>
                                        </Col>
                                    </Form.Group>
                                    <Form.Group>
                                            <Form.Label>{tiposBateriaEstandar[1]}</Form.Label>
                                            <Col>
                                                <Form.Group controlId="oq452_2">
                                                    <Form.Control
                                                        value={this.state.oq452_2}
                                                        onChange={this.handleChange}
                                                        placeholder="OQ-45.2"
                                                    />
                                                </Form.Group>
                                                <Form.Group controlId="sclr90_2">
                                                    <Form.Control
                                                        value={this.state.sclr90_2}
                                                        onChange={this.handleChange}
                                                        placeholder="SCLR-90"
                                                    />
                                                </Form.Group>
                                                <Form.Group controlId="des_2">
                                                    <Form.Control
                                                        value={this.state.des_2}
                                                        onChange={this.handleChange}
                                                        placeholder="DES"
                                                    />
                                                </Form.Group>
                                                <Form.Group controlId="lec_2">
                                                    <Form.Control
                                                        value={this.state.lec_2}
                                                        onChange={this.handleChange}
                                                        placeholder="LEC"
                                                    />
                                                </Form.Group>
                                                <Form.Group controlId="pcl_2">
                                                    <Form.Control
                                                        value={this.state.pcl_2}
                                                        onChange={this.handleChange}
                                                        placeholder="PCL"
                                                    />
                                                </Form.Group>
                                            </Col>
                                        </Form.Group>
                                        <Form.Group>
                                            <Form.Label>{tiposBateriaEstandar[2]}</Form.Label>
                                            <Col>
                                                <Form.Group controlId="oq452_3">
                                                    <Form.Control
                                                        value={this.state.oq452_3}
                                                        onChange={this.handleChange}
                                                        placeholder="OQ-45.2"
                                                    />
                                                </Form.Group>
                                                <Form.Group controlId="sclr90_3">
                                                    <Form.Control
                                                        value={this.state.sclr90_3}
                                                        onChange={this.handleChange}
                                                        placeholder="SCLR-90"
                                                    />
                                                </Form.Group>
                                                <Form.Group controlId="des_3">
                                                    <Form.Control
                                                        value={this.state.des_3}
                                                        onChange={this.handleChange}
                                                        placeholder="DES"
                                                    />
                                                </Form.Group>
                                                <Form.Group controlId="lec_3">
                                                    <Form.Control
                                                        value={this.state.lec_3}
                                                        onChange={this.handleChange}
                                                        placeholder="LEC"
                                                    />
                                                </Form.Group>
                                                <Form.Group controlId="pcl_3">
                                                    <Form.Control
                                                        value={this.state.pcl_3}
                                                        onChange={this.handleChange}
                                                        placeholder="PCL"
                                                    />
                                                </Form.Group>
                                            </Col>
                                        </Form.Group>
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

                    {this.state.alert}
                </form>
            </div>
        );
    }
}