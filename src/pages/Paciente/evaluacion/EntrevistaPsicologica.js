import React, { Component } from 'react'
import { Form, Col, Button } from 'react-bootstrap'
import DatePicker from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css";
import { TextoAyuda } from '../../../components/TextoAyuda'
import { ImagePicker, FilePicker } from 'react-file-picker'
import SweetAlert from 'react-bootstrap-sweetalert'
import { imgDataUtal, imgDataFooter } from '../../../images/imagenes/imagenes';
import * as jsPDF from 'jspdf';
import html2pdf from 'html2pdf.js'
//--Para cambiar el calendario a español--
import { registerLocale, setDefaultLocale } from 'react-datepicker'
import es from 'date-fns/locale/es';
import { updateEvaPsicologica, obtenerEvaPsicologica } from '../../../backend/evaluacion/evaluacionPsicologica';
import { insertarArchivo } from '../../../backend/paciente/archivo';
registerLocale("es", es)
setDefaultLocale("es")




export class EntrevistaPsicologica extends Component {


    constructor(props) {
        super(props);
        this.state = {
            fechaEntrevista: null,
            genograma: "",//imagen
            ecomapa: "",//imagen
            recursosIndividualesFamiliares: "",
            impresionesClinicas: "",
            relacionesInterpersonales: "",
            relacionTerapeuta: "",
            diagnosticoNosologico: "",
            diagnosticoDescriptivo: "",
            motivoConsultaCoconstruido: "",
            observaciones: "",
            srcGenograma: '',
            srcEcomapa: '',
            alert: null,
            editable: false,
            minRows: 5,
            maxRows: 30,
            rows: 5,
        };
    }

    _handleImageGenograma = (image) => {
        console.log("_handleImage")
        //console.log(this.state.srcGenograma)
        this.setState({ srcGenograma: image })
        console.log(this.state.srcGenograma)
    }

    _handleImageEcomapa = (image) => {
        console.log("_handleImage")
        //console.log(this.state.srcEcomapa)
        this.setState({ srcEcomapa: image })
        console.log(this.state.srcEcomapa)
    }


    _handleChange = (date) => {
        this.setState({
            fechaEntrevista: date
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
            filename: 'ENTREVISTA_PSICOLÓGICA.pdf',
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
                        pdf.text(2.65, 1.6, `Entrevista Psicológica`)
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
        if (aux.fechaEntrevista === null) {
            aux.fechaEntrevista = '1900-01-10'
        }
        let fecha = new Date(aux.fechaEntrevista)
        aux.fechaEntrevista = fecha.toJSON().slice(0, 19).replace('T', ' ')
        console.log(aux);
        let resp = updateEvaPsicologica(aux, this.props.pacienteId, this.props.userId);
        resp
            .then(res => {
                //console.log("agregado", res.data)
                if (res.data.ok) {
                    const getAlert = () => (
                        <SweetAlert success title="Datos agregados" onConfirm={this._hideAlert}>
                            Se agregaron correctamente los datos de la Entrevista Psicologica
                    </SweetAlert>
                    )
                    this.setState({ alert: getAlert() })
                }

            })
    }
    componentDidMount() {
        let prom = obtenerEvaPsicologica(this.props.pacienteId);
        prom.then(res => {
            let data = res.data;
            console.log(res.data);
            if (data.ok) {
                let entrevista = data.respuesta[0];
                let aux = new Date(entrevista.fecha_entrevista)
                let fecha = aux.toISOString().split('T')
                this.setState({
                    fechaEntrevista: fecha[0] === '1900-01-10' ? null : entrevista.fecha_entrevista,
                    recursosIndividualesFamiliares: entrevista.recursos_individuales_familiares === 'default' ? "" : entrevista.recursos_individuales_familiares,
                    impresionesClinicas: entrevista.impresiones_clinicas === 'default' ? "" : entrevista.impresiones_clinicas,
                    relacionesInterpersonales: entrevista.relaciones_interpersonales === 'default' ? "" : entrevista.relaciones_interpersonales,
                    relacionTerapeuta: entrevista.relacion_terapeuta === 'default' ? "" : entrevista.relacion_paciente,
                    diagnosticoNosologico: entrevista.diagnostico_nosologico === 'default' ? "" : entrevista.diagnostico_nosologico,
                    diagnosticoDescriptivo: entrevista.diagnostico_descriptivo === 'default' ? "" : entrevista.diagnostico_descriptivo,
                    motivoConsultaCoconstruido: entrevista.motivo_consulta_coconstruido === 'default' ? "" : entrevista.motivo_consulta_coconstruido,
                    observaciones: entrevista.observaciones === 'default' ? "" : entrevista.observaciones,
                    srcGenograma: entrevista.genograma === 'default' ? '' : entrevista.genograma,
                    srcEcomapa: entrevista.ecomapa === 'default' ? '' : entrevista.ecomapa
                });
            }
        })
    }
    render() {
        return (
            <div><div id="divToPrint" className="EntrevistaPsicologica">
                <form onSubmit={this.handleSubmit}>
                    <Form.Row>
                        <Form.Group as={Col}>
                            <Form.Group controlId="fechaEntrevista">
                                <div>
                                    <TextoAyuda
                                        nombre="fechaEntrevista"
                                        tooltip="Fecha de Entrevista"
                                        componente={<DatePicker
                                            readOnly={!this.state.editable}
                                            customInput={<Form.Control />}
                                            dateFormat="dd/MM/yyyy"
                                            selected={this.state.fechaEntrevista}
                                            onChange={this._handleChange}
                                            placeholderText="Fecha de entrevista"
                                        />}
                                    />

                                </div>
                            </Form.Group>
                            <Form.Group controlId="Genograma">
                                <Form.Label>Genograma</Form.Label>
                                <div>
                                    <img src={this.state.srcGenograma} alt="Imagen de genograma" />
                                </div>

                                <ImagePicker
                                    extensions={['jpg', 'jpeg', 'png']}
                                    dims={{ minWidth: 50, maxWidth: 1000, minHeight: 50, maxHeight: 1000 }}
                                    onChange={this._handleImageGenograma}
                                    onError={errMsg => { alert(errMsg) }}
                                >
                                    <div id="element-to-hide" data-html2canvas-ignore="true">

                                        <Button className="btn-custom">
                                            <i className="fa fa-image"></i>
                                        </Button>
                                    </div>
                                </ImagePicker>
                            </Form.Group>
                            <Form.Group controlId="ecomapa">
                                <FilePicker
                                    extensions={['pdf']}
                                    onChange={FileObject => {
                                        console.log(FileObject);
                                        const data = new FormData()
                                        data.append('file', FileObject)
                                        insertarArchivo(data)
                                    }}
                                    onError={errMsg => console.log(errMsg)}
                                >
                                    <div id="element-to-hide" data-html2canvas-ignore="true">

                                        <Button className="btn-custom">
                                            <i className="fa fa-image"></i>
                                        </Button>
                                    </div>
                                </FilePicker>
                                <Form.Label>Ecomapa</Form.Label>
                                <div>
                                    <img src={this.state.srcEcomapa} alt="Imagen de Ecomapa" />
                                </div>
                                <ImagePicker
                                    extensions={['jpg', 'jpeg', 'png']}
                                    dims={{ minWidth: 50, maxWidth: 1000, minHeight: 50, maxHeight: 1000 }}
                                    onChange={this._handleImageEcomapa}
                                    onError={errMsg => { alert(errMsg) }}
                                >
                                    <div id="element-to-hide" data-html2canvas-ignore="true">

                                        <Button className="btn-custom">
                                            <i className="fa fa-image"></i>
                                        </Button>
                                    </div>
                                </ImagePicker>
                            </Form.Group>
                            <Form.Group controlId="recursosIndividualesFamiliares">
                                <Form.Label>Recursos individuales y familiares</Form.Label>
                                <Form.Control
                                    as="textarea"
                                    rows={this.state.rows}
                                    readOnly={!this.state.editable}
                                    value={this.state.recursosIndividualesFamiliares}
                                    onChange={this.handleChange}
                                    placeholder="recursos individuales y familiares"
                                />
                            </Form.Group>
                            <Form.Group controlId="impresionesClinicas">
                                <Form.Label>Impresiones clínicas</Form.Label>
                                <Form.Control
                                    as="textarea"
                                    rows={this.state.rows}
                                    readOnly={!this.state.editable}
                                    value={this.state.impresionesClinicas}
                                    onChange={this.handleChange}
                                    placeholder="impresiones clinicas"
                                />
                            </Form.Group>
                            <Form.Group controlId="relacionesInterpersonales">
                                <Form.Label>Relaciones interpersonales (descripción de la relación materno filial, paterno filial, fraterna, grupo de pares y/o pareja)</Form.Label>
                                <Form.Control
                                    as="textarea"
                                    rows={this.state.rows}
                                    readOnly={!this.state.editable}
                                    value={this.state.relacionesInterpersonales}
                                    onChange={this.handleChange}
                                    placeholder="relaciones interpersonales"
                                />
                            </Form.Group>
                            <Form.Group controlId="relacionTerapeuta">
                                <Form.Label>Descripción de la relación con el terapeuta</Form.Label>
                                <Form.Control
                                    as="textarea"
                                    rows={this.state.rows}
                                    readOnly={!this.state.editable}
                                    value={this.state.relacionTerapeuta}
                                    onChange={this.handleChange}
                                    placeholder="relación con el terapeuta"
                                />
                            </Form.Group>
                            <Form.Group controlId="diagnosticoNosologico">
                                <Form.Label>Diagnóstico nosológico</Form.Label>
                                <Form.Control
                                    as="textarea"
                                    rows={this.state.rows}
                                    readOnly={!this.state.editable}
                                    value={this.state.diagnosticoNosologico}
                                    onChange={this.handleChange}
                                    placeholder="Diagnóstico nosológico"
                                />
                            </Form.Group>
                            <Form.Group controlId="diagnosticoDescriptivo">
                                <Form.Label>Diagnóstico descriptivo</Form.Label>
                                <Form.Control
                                    as="textarea"
                                    rows={this.state.rows}
                                    readOnly={!this.state.editable}
                                    value={this.state.diagnosticoDescriptivo}
                                    onChange={this.handleChange}
                                    placeholder="Diagnóstico descriptivo"
                                />
                            </Form.Group>
                            <Form.Group controlId="motivoConsultaCoconstruido">
                                <Form.Label>Motivo de consulta co-construido</Form.Label>
                                <Form.Control
                                    as="textarea"
                                    rows={this.state.rows}
                                    readOnly={!this.state.editable}
                                    value={this.state.motivoConsultaCoconstruido}
                                    onChange={this.handleChange}
                                    placeholder="motivo consulta co-construido"
                                />
                            </Form.Group>
                            <Form.Group controlId="observaciones">
                                <Form.Label>Observaciones</Form.Label>
                                <Form.Control
                                    as="textarea"
                                    rows={this.state.rows}
                                    readOnly={!this.state.editable}
                                    value={this.state.observaciones}
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