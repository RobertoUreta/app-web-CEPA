import React, { Component } from 'react'
import { Form, Col, Button, Row } from 'react-bootstrap'
import { Option } from '../../../components/Option'
import { TextoAyuda } from '../../../components/TextoAyuda'
import * as jsPDF from 'jspdf';
import html2canvas from 'html2canvas'
import { imgDataFooter, imgDataUtal } from '../../../images/imagenes/imagenes';
import html2pdf from 'html2pdf.js'

import { obtenerRegistroPsiquiatrico } from '../../../backend/paciente/registros';
const tiposTratamiento = ["Terapia individual", "Taller", "Intervención grupal", "Derivación asistida"];

window.html2canvas = html2canvas

export class SesionPsiquiatrica extends Component {

    constructor(props) {
        super(props);

        this.state = {
            numSesion: "",
            tipoTratamiento: "",
            notasSesion: "",
            editable: false,
            loadingInfo: 'initial',
            id: this.props.idSesion,
            refRegistro: this.props.refRegistro,
            num: this.props.numSesion,
            minRows: 5,
            maxRows: 30,
            rows: 5,
        };
    }
    componentDidMount() {
        const self = this
        this.setState({ loadingInfo: 'true' })
        console.log("State Id", this.state.id)
        console.log("refRegistro," ,this.state.refRegistro)
        let promise = obtenerRegistroPsiquiatrico(this.state.id,this.state.refRegistro)

        promise
            .then(res => {
                let data = res.data;
                if (data !== undefined) {
                    let reg = data.response[0]
                    console.log("Registro",reg)
                    self.setState({
                        tipoTratamiento: reg.tipo_tratamiento === "default" ? "" : reg.tipo_tratamiento,
                        notasSesion: reg.observaciones === "default" ? "" : reg.observaciones
                    })
                }
            })

    }

    printDocument(num) {
 
        const input = document.getElementById('divToPrint');
        var opt = {
            margin: [1.8, 1, 1.5, 1],
            filename: `REGISTRO_SESIÓN_PSIQUIÁTRICA_N°${num}.pdf`,
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
                        pdf.text(2.55, 1.6, `Registro Sesión Psiquiátrica N°${num}`)
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

    handleSubmit = event => {
        event.preventDefault();

        let info = JSON.stringify(this.state, null, '  ');

        this.props.onSubmit(info)

    }

    _handleClick = () => {
        this.setState({ editable: !this.state.editable })
    }


    render() {
        return (
            <div><div id='divToPrint' className="sesionPsiquiatrica" styles={{
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
                            </Row>
                            <Form.Group controlId="notasSesion">
                                <Form.Label>Notas de la sesión</Form.Label>
                                <Form.Control
                                    readOnly={!this.state.editable}

                                    as="textarea"
                                    rows="10"
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
                </div>
            </div>
        );
    }
}