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
        if (aux.fecha===null) {
            aux.fecha='1900-01-10'
        }
        let fecha1 = new Date(aux.fecha)
        aux.fecha = fecha1.toJSON().slice(0, 19).replace('T', ' ')
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
            if (data.ok) {
                let epi = data.respuesta[0];
                let aux = new Date(epi.fecha_epicrisis)
                let fecha = aux.toISOString().split('T')
                let bateria = data.bateria;
                this.setState({
                    fecha: fecha[0] === '1900-01-10' ? null : epi.fecha_epicrisis,
                    tipoEpicrisis: epi.tipo_epicrisis === 'default' ? "" : epi.tipo_epicrisis,
                    motivos: epi.motivos === 'default' ? "" : epi.motivos,
                    observacionRemisionSintomas: epi.observacion_remision_sintomas === 'default' ? "" : epi.observacion_remision_sintomas,
                    nivelRemision: epi.nivel_remision === 'default' ? "" : epi.nivel_remision,
                    observacionesFinales: epi.observaciones_finales === 'default' ? "" : epi.observaciones_finales,
                    logroAlcanzado: epi.logro_alcanzado === 'default' ? "" : epi.logro_alcanzado,
                    puntuacionObservacionesCgi: epi.puntuacion_observaciones_cgi === 'default' ? "" : epi.puntuacion_observaciones_cgi,
                    oq452_1: bateria[0].oq_45_2,
                    sclr90_1: bateria[0].sclr_90,
                    des_1: bateria[0].des,
                    lec_1: bateria[0].lec,
                    pcl_1: bateria[0].pcl,
                    oq452_2: bateria[1].oq_45_2,
                    sclr90_2: bateria[1].sclr_90,
                    des_2: bateria[1].des,
                    lec_2: bateria[1].lec,
                    pcl_2: bateria[1].pcl,
                    oq452_3: bateria[2].oq_45_2,
                    sclr90_3: bateria[2].sclr_90,
                    des_3: bateria[2].des,
                    lec_3: bateria[2].lec,
                    pcl_3: bateria[2].pcl,
                });
            }
        })
    }

    render() {
        return (
            <div className="epicrisisPsiquiatrica">
                <form onSubmit={this.handleSubmit} autoComplete="off">
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
                                    <Form.Group as={Col}>
                                        <Form.Label>{tiposBateriaEstandar[0]}</Form.Label>
                                        <Col sm="12">
                                            <Form.Group as={Row}>
                                                <Form.Label column sm="4">OQ-45.2</Form.Label>
                                                <Form.Group as={Col} md="4" controlId="oq452_1">
                                                    <Form.Control
                                                        value={this.state.oq452_1}
                                                        onChange={this.handleChange}
                                                        placeholder="OQ-45.2"
                                                    />
                                                </Form.Group>
                                            </Form.Group>
                                            <Form.Group as={Row}>
                                                <Form.Label column sm="4">SCLR-90</Form.Label>
                                                <Form.Group as={Col}  md="4" controlId="sclr90_1">
                                                    <Form.Control
                                                        value={this.state.sclr90_1}
                                                        onChange={this.handleChange}
                                                        placeholder="SCLR-90"
                                                    />
                                                </Form.Group>
                                            </Form.Group>
                                            <Form.Group as={Row}>
                                                <Form.Label column sm="4">DES</Form.Label>
                                                <Form.Group as={Col} md="4" controlId="des_1">
                                                    <Form.Control
                                                        value={this.state.des_1}
                                                        onChange={this.handleChange}
                                                        placeholder="DES"
                                                    />
                                                </Form.Group>
                                            </Form.Group>
                                            <Form.Group as={Row}>
                                                <Form.Label column sm="4">LEC</Form.Label>
                                                <Form.Group as={Col}  md="4" controlId="lec_1">
                                                    <Form.Control
                                                        value={this.state.lec_1}
                                                        onChange={this.handleChange}
                                                        placeholder="LEC"
                                                    />
                                                </Form.Group>
                                            </Form.Group>
                                            <Form.Group as={Row}>
                                                <Form.Label column sm="4">PCL</Form.Label>
                                                <Form.Group as={Col} md="4" controlId="pcl_1">
                                                    <Form.Control
                                                        value={this.state.pcl_1}
                                                        onChange={this.handleChange}
                                                        placeholder="PCL"
                                                    />
                                                </Form.Group>
                                            </Form.Group>
                                        </Col>
                                    </Form.Group>
                                    <Form.Group as={Col}>
                                        <Form.Label>{tiposBateriaEstandar[1]}</Form.Label>
                                        <Col sm="12">
                                            <Form.Group as={Row}>
                                                <Form.Label column sm="4">OQ-45.2</Form.Label>
                                                <Form.Group as={Col} md="4" controlId="oq452_2">
                                                    <Form.Control
                                                        value={this.state.oq452_2}
                                                        onChange={this.handleChange}
                                                        placeholder="OQ-45.2"
                                                    />
                                                </Form.Group>
                                            </Form.Group>
                                            <Form.Group as={Row}>
                                                <Form.Label column sm="4">SCLR-90</Form.Label>
                                                <Form.Group as={Col}  md="4" controlId="sclr90_2">
                                                    <Form.Control
                                                        value={this.state.sclr90_2}
                                                        onChange={this.handleChange}
                                                        placeholder="SCLR-90"
                                                    />
                                                </Form.Group>
                                            </Form.Group>
                                            <Form.Group as={Row}>
                                                <Form.Label column sm="4">DES</Form.Label>
                                                <Form.Group as={Col} md="4" controlId="des_2">
                                                    <Form.Control
                                                        value={this.state.des_2}
                                                        onChange={this.handleChange}
                                                        placeholder="DES"
                                                    />
                                                </Form.Group>
                                            </Form.Group>
                                            <Form.Group as={Row}>
                                                <Form.Label column sm="4">LEC</Form.Label>
                                                <Form.Group as={Col}  md="4" controlId="lec_2">
                                                    <Form.Control
                                                        value={this.state.lec_2}
                                                        onChange={this.handleChange}
                                                        placeholder="LEC"
                                                    />
                                                </Form.Group>
                                            </Form.Group>
                                            <Form.Group as={Row}>
                                                <Form.Label column sm="4">PCL</Form.Label>
                                                <Form.Group as={Col} md="4" controlId="pcl_2">
                                                    <Form.Control
                                                        value={this.state.pcl_2}
                                                        onChange={this.handleChange}
                                                        placeholder="PCL"
                                                    />
                                                </Form.Group>
                                            </Form.Group>
                                        </Col>
                                    </Form.Group>
                                    <Form.Group as={Col}>
                                        <Form.Label>{tiposBateriaEstandar[2]}</Form.Label>
                                        <Col sm="12">
                                            <Form.Group as={Row}>
                                                <Form.Label column sm="4">OQ-45.2</Form.Label>
                                                <Form.Group as={Col} md="4" controlId="oq452_3">
                                                    <Form.Control
                                                        value={this.state.oq452_3}
                                                        onChange={this.handleChange}
                                                        placeholder="OQ-45.2"
                                                    />
                                                </Form.Group>
                                            </Form.Group>
                                            <Form.Group as={Row}>
                                                <Form.Label column sm="4">SCLR-90</Form.Label>
                                                <Form.Group as={Col}  md="4" controlId="sclr90_3">
                                                    <Form.Control
                                                        value={this.state.sclr90_3}
                                                        onChange={this.handleChange}
                                                        placeholder="SCLR-90"
                                                    />
                                                </Form.Group>
                                            </Form.Group>
                                            <Form.Group as={Row}>
                                                <Form.Label column sm="4">DES</Form.Label>
                                                <Form.Group as={Col} md="4" controlId="des_3">
                                                    <Form.Control
                                                        value={this.state.des_3}
                                                        onChange={this.handleChange}
                                                        placeholder="DES"
                                                    />
                                                </Form.Group>
                                            </Form.Group>
                                            <Form.Group as={Row}>
                                                <Form.Label column sm="4">LEC</Form.Label>
                                                <Form.Group as={Col}  md="4" controlId="lec_3">
                                                    <Form.Control
                                                        value={this.state.lec_3}
                                                        onChange={this.handleChange}
                                                        placeholder="LEC"
                                                    />
                                                </Form.Group>
                                            </Form.Group>
                                            <Form.Group as={Row}>
                                                <Form.Label column sm="4">PCL</Form.Label>
                                                <Form.Group as={Col} md="4" controlId="pcl_3">
                                                    <Form.Control
                                                        value={this.state.pcl_3}
                                                        onChange={this.handleChange}
                                                        placeholder="PCL"
                                                    />
                                                </Form.Group>
                                            </Form.Group>
                                        </Col>
                                    </Form.Group>
                                </Row>
                            </Form.Group>

                            <Form.Group controlId="observacionRemisionSintomas">
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
                                    <Form.Group controlId="observacionesFinales">
                                        <TextoAyuda
                                            nombre="observacionesFinales"
                                            tooltip="Observaciones Finales"
                                            componente={<Form.Control
                                                value={this.state.observacionesFinales}
                                                onChange={this.handleChange}
                                                placeholder="Observaciones Finales"
                                            />}
                                        />
                                    </Form.Group>

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