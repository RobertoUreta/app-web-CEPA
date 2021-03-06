import React, { Component } from 'react'
import { Form, Col, Button } from 'react-bootstrap'
import { Option } from '../../../components/Option'
import DatePicker from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css";
import { TextoAyuda } from '../../../components/TextoAyuda'
import { ModalFamiliar } from '../../../components/ModalFamiliar'
import { TablaFamiliar } from '../../../components/TablaFamiliar'
import { updateEvaIngreso, obtenerEvaIngreso } from '../../../backend/evaluacion/evaluacionIngreso'
import SweetAlert from 'react-bootstrap-sweetalert'
import { imgDataUtal, imgDataFooter } from '../../../images/imagenes/imagenes';
import * as jsPDF from 'jspdf';
import html2pdf from 'html2pdf.js'
//--Para cambiar el calendario a español--
import { registerLocale, setDefaultLocale } from 'react-datepicker'
import es from 'date-fns/locale/es';
registerLocale("es", es)
setDefaultLocale("es")
//---------------------------------------



const tiposFamilias = ["Familia nuclear", "Familia extensa", "Familia monoparental",
    "Familia ensamblada", "Familia homoparental", "Familia de padres separados"]


export class EntrevistaIngreso extends Component {


    constructor(props) {
        super(props);

        this._handleShow = this._handleShow.bind(this);

        this.state = {
            fechaEntrevista: null,
            grupoFamiliar: "",
            observaciones: "",
            solicitante: "",
            motivoConsultaPaciente: "",
            motivoConsultaInstitucion: "",
            motivoConsultaFamilia: "",
            solucionesIntensadas: "",
            principalSintomatologia: "",
            tratamientoPrevio: "",
            consumoSustancias: "",
            impresionesClinicas: "",
            observacionesFinales: "",
            show: false,
            familia: [],
            alert: null,
            editable: false,
            minRows: 5,
            maxRows: 30,
            rows: 5,
        };
    }


    _handleClose = (modalEvt) => {
        this.setState({ show: modalEvt });
    }

    _handleModalSubmit = (modalInfo) => {

        console.log("_handleModalSubmit")
        var info = JSON.parse(modalInfo)
        this.state.familia.push(info)
        this.setState(this.state)
        console.log(this.state.familia)
        console.log(modalInfo)
    }

    _handleShow() {
        this.setState({ show: true })
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
            filename: 'ENTREVISTA_INGRESO.pdf',
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
                        pdf.text(2.7, 1.6, `Entrevista Ingreso`)
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
        let resp = updateEvaIngreso(aux, this.props.pacienteId, this.props.userId);
        resp
            .then(res => {
                //console.log("agregado", res.data)
                if (res.data.ok) {
                    const getAlert = () => (
                        <SweetAlert success title="Datos agregados" onConfirm={this._hideAlert}>
                            Se agregaron correctamente los datos de la Entrevista de Ingreso
                    </SweetAlert>
                    )
                    this.setState({ alert: getAlert() })
                }

            })
    }

    componentDidMount() {
        let prom = obtenerEvaIngreso(this.props.pacienteId);
        prom.then(res => {
            let data = res.data;
         
            console.log(res.data);
            if (data.ok) {
                let entrevista = data.respuesta[0];
                let aux = new Date(entrevista.fecha_entrevista)
                let fecha = aux.toISOString().split('T')
                console.log("fechaaa", entrevista.fecha_entrevista);
                this.setState({
                    fechaEntrevista: fecha[0] === '1900-01-10' ? null : entrevista.fecha_entrevista,
                    grupoFamiliar: entrevista.grupo_familiar === 'default' ? "" : entrevista.grupo_familiar,
                    observaciones: entrevista.observaciones === 'default' ? "" : entrevista.observaciones,
                    solicitante: entrevista.solicitante === 'default' ? "" : entrevista.solicitante,
                    motivoConsultaPaciente: entrevista.motivo_consulta_paciente === 'default' ? "" : entrevista.motivo_consulta_paciente,
                    motivoConsultaInstitucion: entrevista.motivo_consulta_institucion === 'default' ? "" : entrevista.motivo_consulta_institucion,
                    motivoConsultaFamilia: entrevista.motivo_consulta_familia === 'default' ? "" : entrevista.motivo_consulta_familia,
                    solucionesIntensadas: entrevista.soluciones_intensadas_resultados === 'default' ? "" : entrevista.soluciones_intensadas_resultados,
                    principalSintomatologia: entrevista.principal_sintomatologia === 'default' ? "" : entrevista.principal_sintomatologia,
                    tratamientoPrevio: entrevista.tratamiento_previo === 'default' ? "" : entrevista.tratamiento_previo,
                    consumoSustancias: entrevista.consumo_sustancias === 'default' ? "" : entrevista.consumo_sustancias,
                    impresionesClinicas: entrevista.impresiones_clinicas === 'default' ? "" : entrevista.impresiones_clinicas,
                    observacionesFinales: entrevista.observaciones_finales === 'default' ? "" : entrevista.observaciones_finales,
                });
                let familiares = data.familiares
                for (let index = 0; index < familiares.length; index++) {
                    const element = familiares[index];
                    this.state.familia.push({
                        nombre: element.nombre,
                        edad: element.edad,
                        relacionPaciente: element.relacion_paciente,
                        ocupacion: element.ocupacion
                    })
                    this.setState(this.state)
                }

            }
        })
    }

    render() {
        return (
            <div><div id="divToPrint" className="EntrevistaIngreso">
                <form onSubmit={this.handleSubmit}>
                    <Form.Row>
                        <Form.Group as={Col}>
                            <Form.Group controlId="fechaEntrevista">
                                <div>
                                    <TextoAyuda
                                        nombre="fechaEntrevista"
                                        tooltip="Fecha de Entrevista"
                                        componente={<DatePicker
                                            customInput={<Form.Control />}
                                            readOnly={!this.state.editable}
                                            dateFormat="dd/MM/yyyy"
                                            selected={this.state.fechaEntrevista}
                                            onChange={this._handleChange}
                                            placeholderText="Fecha de entrevista"
                                        />}
                                    />

                                </div>
                            </Form.Group>
                            <Form.Group controlId="grupoFamiliar">
                                <TextoAyuda
                                    nombre="grupoFamiliar"
                                    tooltip="Grupo familiar"
                                    componente={<Form.Control
                                        as="select"
                                        disabled={!this.state.editable}
                                        value={this.state.grupoFamiliar}
                                        onChange={this.handleChange}
                                    >
                                        <option hidden>Grupo Familiar</option>
                                        <Option options={tiposFamilias} />
                                    </Form.Control>}
                                />
                            </Form.Group>

                            <Form.Group controlId="observaciones">
                                <Form.Control
                                    as="textarea"
                                    rows={this.state.rows}
                                    readOnly={!this.state.editable}
                                    value={this.state.observaciones}
                                    onChange={this.handleChange}
                                    placeholder="Observaciones"
                                />
                            </Form.Group>

                            <Form.Group controlId="modalGrupoFamiliar">
                                <TablaFamiliar
                                    elements={this.state.familia} />
                                <div id="element-to-hide" data-html2canvas-ignore="true">
                                    <Button className="btn-custom" onClick={this._handleShow}> Agregar integrante familia</Button>
                                </div>
                                <ModalFamiliar
                                    show={this.state.show}
                                    fnCerrar={this._handleClose}
                                    onSubmit={this._handleModalSubmit} />
                            </Form.Group>

                            <Form.Group controlId="solicitante">
                                <Form.Label>¿Quién solicita la consulta? (iniciativa propia, médico, instituciones, otros)</Form.Label>
                                <Form.Control
                                    as="textarea"
                                    rows={this.state.rows}
                                    readOnly={!this.state.editable}
                                    value={this.state.solicitante}
                                    onChange={this.handleChange}
                                    placeholder="solicitante"
                                />
                            </Form.Group>
                            <Form.Group controlId="motivoConsultaPaciente">
                                <Form.Label>Motivo de consulta del paciente (textual)</Form.Label>
                                <Form.Control
                                    as="textarea"
                                    rows={this.state.rows}
                                    readOnly={!this.state.editable}
                                    value={this.state.motivoConsultaPaciente}
                                    onChange={this.handleChange}
                                    placeholder="motivo consulta paciente"
                                />
                            </Form.Group>
                            <Form.Group controlId="motivoConsultaInstitucion">
                                <Form.Label>De la institución (si corresponde)</Form.Label>
                                <Form.Control
                                    as="textarea"
                                    rows={this.state.rows}
                                    readOnly={!this.state.editable}
                                    value={this.state.motivoConsultaInstitucion}
                                    onChange={this.handleChange}
                                    placeholder="motivo consulta institución"
                                />
                            </Form.Group>
                            <Form.Group controlId="motivoConsultaFamilia">
                                <Form.Label>De la familia</Form.Label>
                                <Form.Control
                                    as="textarea"
                                    rows={this.state.rows}
                                    readOnly={!this.state.editable}
                                    value={this.state.motivoConsultaFamilia}
                                    onChange={this.handleChange}
                                    placeholder="motivo consulta familia"
                                />
                            </Form.Group>
                            <Form.Group controlId="solucionesIntensadas">
                                <Form.Label>Soluciones intentadas y resultados</Form.Label>
                                <Form.Control
                                    as="textarea"
                                    rows={this.state.rows}
                                    readOnly={!this.state.editable}
                                    value={this.state.solucionesIntensadas}
                                    onChange={this.handleChange}
                                    placeholder="soluciones intensadas"
                                />
                            </Form.Group>
                            <Form.Group controlId="principalSintomatologia">
                                <Form.Label>Principal sintomatología</Form.Label>
                                <Form.Control
                                    as="textarea"
                                    rows={this.state.rows}
                                    readOnly={!this.state.editable}
                                    value={this.state.principalSintomatologia}
                                    onChange={this.handleChange}
                                    placeholder="principal sintomatologia"
                                />
                            </Form.Group>
                            <Form.Group controlId="tratamientoPrevio">
                                <Form.Label>Tratamiento o evaluaciones previas (salud mental)</Form.Label>
                                <Form.Control
                                    as="textarea"
                                    rows={this.state.rows}
                                    readOnly={!this.state.editable}
                                    value={this.state.tratamientoPrevio}
                                    onChange={this.handleChange}
                                    placeholder="tratamiento previo"
                                />
                            </Form.Group>
                            <Form.Group controlId="consumoSustancias">
                                <Form.Label>Consumo de sustancias(Alcohol, tabaco y otras drogas)</Form.Label>
                                <Form.Control
                                    as="textarea"
                                    rows={this.state.rows}
                                    readOnly={!this.state.editable}
                                    value={this.state.consumoSustancias}
                                    onChange={this.handleChange}
                                    placeholder="Consumo de sustancias"
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
                            <Form.Group controlId="observacionesFinales">
                                <Form.Label>Observaciones (incluir percepción de apoyo social)</Form.Label>
                                <Form.Control
                                    as="textarea"
                                    rows={this.state.rows}
                                    readOnly={!this.state.editable}
                                    value={this.state.observacionesFinales}
                                    onChange={this.handleChange}
                                    placeholder="Observaciones (incluir percepción de apoyo social)"
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