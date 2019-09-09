import React, { Component } from 'react'
import { Form, Col, Button, Row } from 'react-bootstrap'
import { Option } from '../../../components/Option'
import DatePicker from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css";
import { TextoAyuda } from '../../../components/TextoAyuda'
import { updateTamizaje, obtenerTamizaje } from '../../../backend/evaluacion/tamizaje'
import SweetAlert from 'react-bootstrap-sweetalert'
import { imgDataUtal, imgDataFooter } from '../../../images/imagenes/imagenes';
import * as jsPDF from 'jspdf';
import html2pdf from 'html2pdf.js'
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
            alert: null,
            editable: false,
            minRows: 5,
            maxRows: 30,
            rows: 5,
        };
    }


    _handleChange = (date) => {
        this.setState({
            fechaSolicitud: date
        });
    }

    handleChange = event => {
        console.log("handleChange", event.target.rows)
        const textareaLineHeight = 16;
        const { minRows, maxRows } = this.state;

        const previousRows = event.target.rows;
        event.target.rows = minRows;
        const currentRows = ~~(event.target.scrollHeight / textareaLineHeight);

        if (currentRows === previousRows) {
            event.target.rows = currentRows;
        }

        if (currentRows >= maxRows) {
            event.target.rows = maxRows;
            event.target.scrollTop = event.target.scrollHeight;
        }
        event.target.rows = currentRows < maxRows ? currentRows + 10 : maxRows
        this.setState({
            [event.target.id]: event.target.value,

        });
    }

    _handleClick = () => {
        this.setState({ editable: !this.state.editable })
    }

    printDocument() {

        const input = document.getElementById('divToPrint');
        var opt = {
            margin: [1.8, 1, 1.5, 1],
            filename: 'TAMIZAJE.pdf',
            image: { type: 'jpeg', quality: 0.98 },
            html2canvas: { scale: 2 },
            jsPDF: { unit: 'in', format: 'a4', orientation: 'portrait' },
            pagebreak: { mode: 'avoid-all' }
        };
        html2pdf().set(opt).from(input).toPdf().get('pdf')
            .then(function (pdf) {
                var number_of_pages = pdf.internal.getNumberOfPages()
                var pdf_pages = pdf.internal.pages
                for (var i = 1; i < pdf_pages.length; i++) {
                    // We are telling our pdfObject that we are now working on this page
                    pdf.setPage(i)

                    if (i === 1) {
                        pdf.setFontSize(20)
                        pdf.text(2.75, 1.6, `Tamizaje`)
                    }

                    pdf.addImage(imgDataUtal, 'png', 0, 0)
                    pdf.addImage(imgDataFooter, 'png', 0, 10.1)

                }
            }).save()
    }

    _hideAlert = () => {
        this.setState({ alert: null })
    }

    handleSubmit = event => {
        event.preventDefault();
        const aux = JSON.parse(JSON.stringify(this.state, null, '  '));
        if (aux.fechaSolicitud === null) {
            aux.fechaSolicitud = '1900-01-10'
        }
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
                    this.setState({ alert: getAlert() })
                }

            })

    }
    componentDidMount() {
        let prom = obtenerTamizaje(this.props.pacienteId)
        prom.then(res => {
            let tami = res.data.respuesta[0];
            let aux = new Date(tami.fecha_solicitud)
            let fecha = aux.toISOString().split('T')
            console.log('tamizaje cambiandooooooo: ', tami)
            if (tami.ok) {
                console.log("no es undefined", tami)
                this.setState({
                    nombreSolicitante: tami.nombre_solicitante === 'default' ? "" : tami.nombre_solicitante,
                    fechaSolicitud: fecha === '1900-01-10' ? "" : tami.fecha_solicitud,
                    horarioDisponible: tami.horario_disponible === 'default' ? "" : tami.horario_disponible,
                    nivelUrgencia: tami.nivel_urgencia === 'default' ? "" : tami.nivel_urgencia,
                    preguntaSintomatologia: tami.pregunta_sintomatologia === 'default' ? "" : tami.pregunta_sintomatologia,
                    preguntaMalestar: tami.pregunta_malestar === 'default' ? "" : tami.pregunta_malestar,
                    preguntaObservaciones: tami.pregunta_observaciones === 'default' ? "" : tami.pregunta_observaciones
                })
            }
        }).catch(err => {
            console.log(err)
        })
    }
    render() {
        return (
            <div><div id="divToPrint" className="Tamizaje">
                <form onSubmit={this.handleSubmit}>
                    <Form.Row>
                        <Form.Group as={Col}>
                            <Form.Group controlId="nombreSolicitante">
                                <TextoAyuda
                                    nombre="nombre"
                                    tooltip="Nombre Solicitante"
                                    componente={<Form.Control
                                        readOnly={!this.state.editable}
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

                                                    customInput={<Form.Control disabled={!this.state.editable}

                                                    />}
                                                    readOnly={!this.state.editable}
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
                                                readOnly={!this.state.editable}

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
                                            readOnly={!this.state.editable}

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
                                    rows={this.state.rows}
                                    readOnly={!this.state.editable}
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
                                    readOnly={!this.state.editable}
                                    onChange={this.handleChange}
                                >
                                    <Option options={tiempoMalestar} />
                                </Form.Control>
                            </Form.Group>
                            <Form.Group controlId="preguntaObservaciones">
                                <Form.Label>Observaciones</Form.Label>
                                <Form.Control
                                    as="textarea"
                                    rows={this.state.rows}
                                    readOnly={!this.state.editable}
                                    value={this.state.preguntaObservaciones}
                                    onChange={this.handleChange}
                                    placeholder="Observaciones"
                                />
                            </Form.Group>


                            <Form.Group>

                            </Form.Group>
                        </Form.Group>
                    </Form.Row>
                    {this.state.alert}
                </form>
            </div>
                <div className="btn-container">
                    <Button
                        className="btn-custom"
                        onClick={() => this.printDocument()}>
                        Imprimir</Button>

                    <div className="divider"></div>

                    <Button
                        className="btn-submit"
                        onClick={this._handleClick}
                    >
                        Editar
                    </Button>
                    <div className="divider"></div>
                    <Button
                        className="btn-submit"
                        type="submit"
                        onClick={this.handleSubmit}
                    >
                        Guardar
                    </Button>
                </div>
            </div>
        );
    }
}