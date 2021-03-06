import React, { Component, useRef } from 'react'
import { Form, Col, Button, Row } from 'react-bootstrap'
import { Option } from '../../../components/Option'
import { TextoAyuda } from '../../../components/TextoAyuda'
import { obtenerRegistroPsicologico } from '../../../backend/paciente/registros';
import * as jsPDF from 'jspdf';
import html2canvas from 'html2canvas'
import { imgDataFooter, imgDataUtal } from '../../../images/imagenes/imagenes';
import html2pdf from 'html2pdf.js'

const asistentes = ["PI", "Adulto responsable", "Familia", "Otro significativo"];
const tiposTratamiento = ["Terapia individual", "Taller", "Intervención grupal", "Derivación asistida"];


window.html2canvas = html2canvas

export class SesionPsicologica extends Component {

    constructor(props) {
        super(props);

        this.state = {
            diagnostico: 0,
            tratamiento: 0,
            seguimiento: 0,
            tipoTratamiento: "",
            quienAsiste: "",
            descripcionLlegada: "",
            objetivoSesion: "",
            intervencionResultado: "",
            conductaObservada: "",
            descripcionRetiro: "",
            indicaciones: "",
            notasSesion: "",
            editable: false,
            loadingInfo: 'initial',
            id: this.props.idSesion,
            num:this.props.numSesion,
            minRows: 5,
            maxRows: 30,
            rows: 5,
        };
    }

    componentDidMount() {
        const self = this
        this.setState({ loadingInfo: 'true' })
        console.log("idsesionasdfa", this.props.idSesion)
        let promise = obtenerRegistroPsicologico(this.props.idSesion)
        promise
            .then(res => {
                let data = res.data;
                console.log("data", data)
                if (data !== undefined) {
                    let reg = data.response[0]
                    self.setState({
                        diagnostico: reg.diagnostico ? 1 : 0,
                        tratamiento: reg.tratamiento ? 1 : 0,
                        seguimiento: reg.tratamiento ? 1 : 0,
                        tipoTratamiento: reg.tipo_tratamiento === "default" ? "" : reg.tipo_tratamiento,
                        quienAsiste: reg.quien_asiste === "default" ? "" : reg.quien_asiste,
                        descripcionLlegada: reg.descripcion_llegada === "default" ? "" : reg.descripcion_llegada,
                        objetivoSesion: reg.objetivo_sesion === "default" ? "" : reg.objetivo_sesion,
                        intervencionResultado: reg.intervencion_resultado === "default" ? "" : reg.intervencion_resultado,
                        conductaObservada: reg.conducta_observada === "default" ? "" : reg.conducta_observada,
                        descripcionRetiro: reg.descripcion_retiro === "default" ? "" : reg.descripcion_retiro,
                        indicaciones: reg.indicaciones === "default" ? "" : reg.indicaciones,
                        notasSesion: reg.notas_sesion === "default" ? "" : reg.notas_sesion,
                        loadingInfo: 'false'
                    })
                }
            })
    }


    printDocument(num) {

        
        const input = document.getElementById('divToPrint');
        var opt = {
            margin: [1.8, 1, 1.5, 1],
            filename: `REGISTRO_SESIÓN_PSICOLÓGICA_N°${num}.pdf`,
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
                        pdf.text(2.55, 1.6, `Registro Sesión Psicológica N°${num}`)
                    }

                    pdf.addImage(imgDataUtal, 'png', 0, 0)
                    pdf.addImage(imgDataFooter, 'png', 0, 10.1)

                }
            }).save()

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

    handleSubmit = (event) => {
        event.preventDefault();

        let info = JSON.stringify(this.state, null, '  ');

        this.props.onSubmit(info)

    }

    render() {
        if (this.state.loadingInfo === 'initial') {
            return <h2>Intializing...</h2>;

        }


        if (this.state.loadingInfo === 'true') {
            console.log("sesiones", this.state.sesiones)

            return <h2>Cargando...</h2>;

        }


        return (
            <div><div id="divToPrint" className="sesionPsicologica" styles={{
                backgroundColor: '#f5f5f5',
                width: '210mm',
                minHeight: '297mm',
                marginLeft: 'auto',
                marginRight: 'auto'
            }} >
                <form onSubmit={this.handleSubmit}>
                    <Form.Row>
                        <Form.Group as={Col}>
                            <Row>
                                
                                <Col>
                                    <Form.Check
                                        custom
                                        checked={this.state.diagnostico}
                                        disabled={!this.state.editable}
                                        value={this.state.diagnostico}
                                        onChange={event => this.setState({
                                            [event.target.id]: event.target.checked ? 1 : 0
                                        })}
                                        label="Diagnóstico"
                                        type="checkbox"
                                        id="diagnostico"
                                    />
                                </Col>
                                <Col>
                                    <Form.Check
                                        custom
                                        checked={this.state.tratamiento}
                                        disabled={!this.state.editable}
                                        value={this.state.tratamiento}
                                        onChange={event => this.setState({
                                            [event.target.id]: event.target.checked ? 1 : 0
                                        })}
                                        label="Tratamiento"
                                        type="checkbox"
                                        id="tratamiento"
                                    />
                                </Col>
                                <Col>
                                    <Form.Check
                                        custom
                                        checked={this.state.seguimiento}
                                        disabled={!this.state.editable}
                                        value={this.state.seguimiento}
                                        onChange={event => this.setState({
                                            [event.target.id]: event.target.checked ? 1 : 0
                                        })}
                                        label="Seguimiento"
                                        type="checkbox"
                                        id="seguimiento"
                                    />
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <Form.Group controlId="tipoTratamiento">
                                        <TextoAyuda
                                            nombre="tipoTratamiento"
                                            tooltip="Tipo Tratamiento"
                                            componente={<Form.Control
                                                as="select"
                                                value={this.state.tipoTratamiento}
                                                onChange={this.handleChange}
                                            >
                                                <option hidden>Tipo Tratamiento</option>
                                                <Option options={tiposTratamiento} />
                                            </Form.Control>}
                                        />

                                    </Form.Group>
                                </Col>

                                <Col>
                                    <Form.Group controlId="quienAsiste">
                                        <TextoAyuda
                                            nombre="quienAsiste"
                                            tooltip="Asiste"
                                            componente={<Form.Control
                                                as="select"
                                                value={this.state.quienAsiste}
                                                onChange={this.handleChange}
                                            >
                                                <option hidden>Asiste</option>
                                                <Option options={asistentes} />
                                            </Form.Control>}
                                        />

                                    </Form.Group>
                                </Col>
                            </Row>

                            <Form.Group controlId="descripcionLlegada">
                                <Form.Label>Descripción del usuario a su llegada</Form.Label>
                                <Form.Control
                                    
                                    readOnly={!this.state.editable}
                                    as="textarea"
                                    rows="3"
                                    value={this.state.descripcionLlegada}
                                    onChange={this.handleChange}
                                    placeholder="Descripción"
                                />
                            </Form.Group>
                            <Form.Group controlId="objetivoSesion">
                                <Form.Label>Objetivo de la sesión</Form.Label>
                                <Form.Control
                                    readOnly={!this.state.editable}
                                    as="textarea"
                                    rows="3"
                                    value={this.state.objetivoSesion}
                                    onChange={this.handleChange}
                                    placeholder="Objetivo"
                                />
                            </Form.Group>
                            <Form.Group controlId="intervencionResultado">
                                <Form.Label>Intervenciones realizadas y resultado obtenido</Form.Label>
                                <Form.Control
                                    readOnly={!this.state.editable}
                                    as="textarea"
                                    rows="3"
                                    value={this.state.intervencionResultado}
                                    onChange={this.handleChange}
                                    placeholder="Intervencion realizada y resultado obtenido"
                                />
                            </Form.Group>
                            <Form.Group controlId="conductaObservada">
                                <Form.Label>Conducta observada durante la sesión</Form.Label>
                                <Form.Control
                                    readOnly={!this.state.editable}
                                    as="textarea"
                                    rows="3"
                                    value={this.state.conductaObservada}
                                    onChange={this.handleChange}
                                    placeholder="Conducta observada"
                                />
                            </Form.Group>
                            <Form.Group controlId="descripcionRetiro">
                                <Form.Label>Descripción del usuario a su retiro</Form.Label>
                                <Form.Control
                                    readOnly={!this.state.editable}
                                    as="textarea"
                                    rows="3"
                                    value={this.state.descripcionRetiro}
                                    onChange={this.handleChange}
                                    placeholder="Descripción"
                                />
                            </Form.Group>
                            <Form.Group controlId="indicaciones">
                                <Form.Label>Indicaciones (en el caso de proceder)</Form.Label>
                                <Form.Control
                                    readOnly={!this.state.editable}
                                    as="textarea"
                                    rows="3"
                                    value={this.state.indicaciones}
                                    onChange={this.handleChange}
                                    placeholder="Indicaciones"
                                />
                            </Form.Group>
                            <Form.Group controlId="notasSesion">
                                <Form.Label>Notas de la sesión</Form.Label>
                                <Form.Control
                                    readOnly={!this.state.editable}
                                    as="textarea"
                                    rows="8"
                                    value={this.state.notasSesion}
                                    onChange={this.handleChange}
                                    placeholder="Notas de la sesión"
                                />
                            </Form.Group>

                            <Form.Group>

                            </Form.Group>
                        </Form.Group>
                    </Form.Row>

                </form>
            </div>
                <div className="btn-container">
                    <Button
                        className="btn-custom"
                        onClick={() => this.printDocument(this.state.num)}>
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
                </div></div>

        );
    }
}