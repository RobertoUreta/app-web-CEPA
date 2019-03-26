import React, { Component } from 'react'
import { Form, Col, Button, Row } from 'react-bootstrap'
import { Option } from '../../../../components/Option'
import DatePicker from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css";
import { TextoAyuda } from '../../../../components/TextoAyuda'
import { updateMedicoISL, obtenerMedicoISL } from '../../../../backend/isl/medicoISL';
import SweetAlert from 'react-bootstrap-sweetalert'
import { imgDataUtal, imgDataFooter } from '../../../../images/imagenes/imagenes';
import * as jsPDF from 'jspdf';
import html2pdf from 'html2pdf.js'
import html2canvas from 'html2canvas'
window.html2canvas = html2canvas
window.onePageCanvas = document.createElement("canvas");

const estadosCiviles = ["Soltero/a", "Casado/a", "Viudo/a", "Divorciado/a", "Separado/a", "Conviviente"]
const nivelesEducacion = ["Enseñanza Basica", "Enseñanza Media", "Educación Superior"]
export class EntrevistaMedica extends Component {


    constructor(props) {
        super(props);
        this.state = {
            estadoCivil: "",
            escolaridad: "",
            fechaEvaluacionMedica: null,
            anamnesis: "",
            territorialidadDesplazaFueraLugar: "",
            patologiasMedicasPsiquiatricasPrevias: "",
            consumoSustancias: "",
            laboresRealizadas: "",
            dificultadesReferidas: "",
            apariencia: "",
            actitudInicial: "",
            conductaNoVerbal: "",
            esAcompanado: "",//cambiar a text en la base de datos ya que es un bit
            oposicionamiento: 0,
            sospechaSimulacion: 0,
            sugerenciaTest: 0,
            sugerenciaTestEspecificar: "",
            observaciones: "",
            observacionesGenerales: "",
            editable: false,

        };
    }


    _handleChange = (date) => {
        this.setState({
            fechaEvaluacionMedica: date
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
        if (aux.fechaEvaluacionMedica===null) {
            aux.fechaEvaluacionMedica='1900-01-10'
        }
        //let fecha = new Date(aux.fechaEvaluacionMedica)
        //aux.fechaEvaluacionMedica = fecha.toJSON().slice(0, 19).replace('T', ' ')
        console.log(aux);
        let resp = updateMedicoISL(aux, this.props.pacienteId);
        resp
            .then(res => {
                console.log("agregado", res.data)
                if (res.data.ok) {
                    const getAlert = () => (
                        <SweetAlert success title="Datos agregados" onConfirm={this._hideAlert}>
                            Se agregaron correctamente los datos de la entrevista Medica del ISL.
                    </SweetAlert>
                    )
                    this.setState({ alert: getAlert() })
                }

            })
    }

    _handleClick = () => {
        this.setState({ editable: !this.state.editable })
    }

    _hideAlert = () => {
        this.setState({ alert: null })
    }


    printDocument() {

        const input = document.getElementById('divToPrint');
        var opt = {
            margin: [1.8,1,1.5,1],
            filename: 'EVALUACIÓN_MÉDICA_ISL.pdf',
            image: { type: 'jpeg', quality: 0.98 },
            html2canvas: { scale: 2 },
            jsPDF: { unit: 'in', format: 'a4', orientation: 'portrait' },
        };
        html2pdf().set(opt).from(input).toPdf().get('pdf')
            .then(function (pdf) {
                var number_of_pages = pdf.internal.getNumberOfPages()
                var pdf_pages = pdf.internal.pages
                console.log("hAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAii ", pdf_pages.length)
                var myFooter = "Footer info"
                for (var i = 1; i < pdf_pages.length; i++) {
                    // We are telling our pdfObject that we are now working on this page
                    pdf.setPage(i)

                    if (i === 1) {
                        pdf.setFontSize(20)
                        pdf.text(2.7, 1.6, `Evaluación Médica ISL`)
                    }

                    pdf.addImage(imgDataUtal, 'png', 0, 0)
                    pdf.addImage(imgDataFooter, 'png', 0, 10.1)
                    // The 10,200 value is only for A4 landscape. You need to define your own for other page sizes
                    pdf.text(myFooter, 10, 200)

                }
            }).save()

        /*html2canvas(input)
            .then((canvas) => {
                var pdf = new jsPDF();
                var imgData = canvas.toDataURL('image/png');
                var imgWidth = 210;
                var pageHeight = 295;
                console.log(canvas.height, canvas.width)
                var imgHeight = canvas.height * imgWidth / canvas.width;
                var heightLeft = imgHeight; //801.81
                var position = 45;
                pdf.addImage(imgDataUtal, 'png', 0, 0)
                pdf.addImage(imgData, 'PNG', 22.5, position, imgWidth - 45, imgHeight  );
                pdf.setFontSize(20)
                pdf.text(65, 40, `Evaluación Médica ISL`)
           //     pdf.addImage(imgDataFooter, 'png', 0, 255)
                heightLeft -= pageHeight;
                while (heightLeft >= 0) {
                    position = heightLeft - imgHeight + 45;
                    pdf.addPage();
                    pdf.addImage(imgData, 'PNG', 22.5, position, imgWidth - 45, imgHeight);
                    if(pageHeight > heightLeft){
                        pdf.addImage(imgDataFooter, 'png', 0, 255)
                    }
                    heightLeft -= pageHeight;
                }
                pdf.save(`EVALUACIÓN_MÉDICA_ISL`);



            })
            ;*/

    }

    componentDidMount() {
        let prom = obtenerMedicoISL(this.props.pacienteId);
        prom.then(res => {
            let data = res.data;
            console.log(res.data);
            if (data.ok) {
                let isl = data.respuesta[0];
                let aux = new Date(isl.fecha_evaluacion_medica)
                let fecha = aux.toISOString().split('T')
                this.setState({
                    estadoCivil: isl.estado_civil === 'default' ? "" : isl.estado_civil,
                    escolaridad: isl.escolaridad === 'default' ? "" : isl.escolaridad,
                    fechaEvaluacionMedica: fecha[0] === '1900-01-10' ? null : isl.fecha_evaluacion_medica,
                    anamnesis: isl.anamnesis === 'default' ? "" : isl.anamnesis,
                    territorialidadDesplazaFueraLugar: isl.territorialidad_desplaza_fuera_hogar === 'default' ? "" : isl.territorialidad_desplaza_fuera_hogar,
                    patologiasMedicasPsiquiatricasPrevias: isl.patologias_medicas_psiquiatricas_previas === 'default' ? "" : isl.patologias_medicas_psiquiatricas_previas,
                    consumoSustancias: isl.consumo_sustancias === 'default' ? "" : isl.consumo_sustancias,
                    laboresRealizadas: isl.labores_realizadas === 'default' ? "" : isl.labores_realizadas,
                    dificultadesReferidas: isl.difcultades_referidas === 'default' ? "" : isl.difcultades_referidas,
                    apariencia: isl.apariencia === 'default' ? "" : isl.apariencia,
                    actitudInicial: isl.actitud_inicial === 'default' ? "" : isl.actitud_inicial,
                    conductaNoVerbal: isl.conducta_no_verbal === 'default' ? "" : isl.conducta_no_verbal,
                    esAcompanado: isl.es_acompanado === 'default' ? "" : isl.es_acompanado,//cambiar a text en la base de datos ya que es un bit
                    oposicionamiento: isl.oposicionalismo ? 1 : 0,
                    sospechaSimulacion: isl.sospecha_simulacion ? 1 : 0,
                    sugerenciaTest: isl.sugerencia_test ? 1 : 0,
                    sugerenciaTestEspecificar: isl.sugerencia_test_especificar === 'default' ? "" : isl.sugerencia_test_especificar,
                    observaciones: isl.observaciones === 'default' ? "" : isl.observaciones,
                    observacionesGenerales: isl.observaciones_generales === 'default' ? "" : isl.observaciones_generales
                });
            }
        })
    }

    render() {
        return (
            <div><div id="divToPrint" className="entrevistaMedica">
                <form onSubmit={this.handleSubmit}>
                    <Form.Row>
                        <Form.Group as={Col}>
                            <Row>
                                <Col>
                                    <Form.Group controlId="estadoCivil">
                                        <TextoAyuda
                                            nombre="estadoCivil"
                                            tooltip="Estado Civil"
                                            componente={<Form.Control
                                                as="select"
                                                value={this.state.estadoCivil}
                                                onChange={this.handleChange}
                                            >
                                                <option hidden>Estado Civil</option>
                                                <Option options={estadosCiviles} />
                                            </Form.Control>}
                                        />

                                    </Form.Group>
                                </Col>
                                <Col>
                                    <Form.Group controlId="escolaridad">
                                        <TextoAyuda
                                            nombre="escolaridad"
                                            tooltip="Escolaridad"
                                            componente={<Form.Control
                                                as="select"
                                                value={this.state.escolaridad}
                                                onChange={this.handleChange}
                                            >
                                                <option hidden>Escolaridad</option>
                                                <Option options={nivelesEducacion} />
                                            </Form.Control>}
                                        />

                                    </Form.Group>
                                </Col>
                                <Col>
                                    <Form.Group controlId="fechaEvaluacionMedica">
                                        <div>
                                            <TextoAyuda
                                                nombre="fechaEvaluacionMedica"
                                                tooltip="Fecha Evaluacion Medica"
                                                componente={<DatePicker
                                                    customInput={<Form.Control />}
                                                    dateFormat="dd/MM/yyyy"
                                                    selected={this.state.fechaEvaluacionMedica}
                                                    onChange={this._handleChange}
                                                    placeholderText="Fecha evaluacion Medica"
                                                />}
                                            />

                                        </div>
                                    </Form.Group>
                                </Col>

                            </Row>

                            <Form.Group controlId="anamnesis">
                                <Form.Label><strong>1. Anamnesis</strong></Form.Label>
                                <TextoAyuda
                                    nombre="anamnesis"
                                    tooltip="Breve historia familiar, antecedentes mórbidos, variables del entorno familiar que pudiesen incidir en su estado de salud mental, enfermedades importantes u otros."
                                    componente={<Form.Control
                                        as="textarea"
                                        rows="8"
                                        value={this.state.anamnesis}
                                        onChange={this.handleChange}
                                        placeholder="Breve historia familiar, antecedentes mórbidos, variables del entorno familiar que pudiesen incidir en su estado de salud mental, enfermedades importantes u otros. "
                                    />}
                                />
                            </Form.Group>
                            <Form.Group controlId="territorialidadDesplazaFueraLugar">
                                <Form.Label>Indicar territorialidad y desplazamiento fuera del hogar</Form.Label>
                                <TextoAyuda
                                    nombre="territorialidadDesplazaFueraLugar"
                                    tooltip="Consignar si presenta limitaciones físicas"
                                    componente={<Form.Control
                                        as="textarea"
                                        rows="3"
                                        value={this.state.territorialidadDesplazaFueraLugar}
                                        onChange={this.handleChange}
                                        placeholder="Consignar si presenta limitaciones físicas"
                                    />}
                                />
                            </Form.Group>
                            <Form.Group controlId="patologiasMedicasPsiquiatricasPrevias">
                                <Form.Label>Patologías médicas y psiquiátricas previas</Form.Label>
                                <TextoAyuda
                                    nombre="patologiasMedicasPsiquiatricasPrevias"
                                    tooltip="Considerar si impresiona como cuadro psiquiátrico o no, tratamientos anteriores, historias de cuadros sin remisión, etc."
                                    componente={<Form.Control
                                        as="textarea"
                                        rows="3"
                                        value={this.state.patologiasMedicasPsiquiatricasPrevias}
                                        onChange={this.handleChange}
                                        placeholder="Considerar si impresiona como cuadro psiquiátrico o no, tratamientos anteriores, historias de cuadros sin remisión, etc."
                                    />}
                                />

                            </Form.Group>
                            <Form.Group controlId="consumoSustancias">
                                <Form.Label>Indicar si existe consumo de sustancias</Form.Label>
                                <TextoAyuda
                                    nombre="consumoSustancias"
                                    tooltip="En caso positivo, indicar qué consume y cómo afecta sus actividades de la vida diaria y actividades laborales."
                                    componente={<Form.Control
                                        as="textarea"
                                        rows="3"
                                        value={this.state.consumoSustancias}
                                        onChange={this.handleChange}
                                        placeholder="En caso positivo, indicar qué consume y cómo afecta sus actividades de la vida diaria y actividades laborales."
                                    />}
                                />

                            </Form.Group>
                            <div className="html2pdf__page-break"></div>
                            <Form.Group controlId="laboresRealizadas">
                                <Form.Label><strong>2. Historia Laboral</strong></Form.Label>
                                <TextoAyuda
                                    nombre="laboresRealizadas"
                                    tooltip="Labores realizadas en los ultimos tres puestos de trabajo (con énfasis en el más reciente)."
                                    componente={<Form.Control
                                        as="textarea"
                                        rows="5"
                                        value={this.state.laboresRealizadas}
                                        onChange={this.handleChange}
                                        placeholder="Labores realizadas en los ultimos tres puestos de trabajo (con énfasis en el más reciente)."
                                    />}
                                />
                            </Form.Group>
                            <Form.Group controlId="dificultadesReferidas">
                                <Form.Label>Dificultades referidas</Form.Label>
                                <TextoAyuda
                                    nombre="dificultadesReferidas"
                                    tooltip="Con énfasis en los últimos 10 años."
                                    componente={<Form.Control
                                        as="textarea"
                                        rows="5"
                                        value={this.state.dificultadesReferidas}
                                        onChange={this.handleChange}
                                        placeholder="con énfasis en los últimos 10 años."
                                    />}
                                />
                            </Form.Group>
                            <div className="html2pdf__page-break"></div>
                            <Form.Group controlId="evaluacionGeneralPreliminar">
                                <Form.Label><strong>3. Evaluación General Preliminar</strong></Form.Label>
                                <Form.Group controlId="apariencia">
                                    <Form.Label>Describir cómo se presenta la persona a la entrevista, en términos de: </Form.Label>
                                    <TextoAyuda
                                        nombre="apariencia"
                                        tooltip="Apariencia"
                                        componente={<Form.Control
                                            as="textarea"
                                            rows="2"
                                            value={this.state.apariencia}
                                            onChange={this.handleChange}
                                            placeholder="Apariencia"
                                        />}
                                    />
                                </Form.Group>
                                <Form.Group controlId="actitudInicial">
                                    <TextoAyuda
                                        nombre="actitudInicial"
                                        tooltip="Actitud Inicial"
                                        componente={<Form.Control
                                            as="textarea"
                                            rows="2"
                                            value={this.state.actitudInicial}
                                            onChange={this.handleChange}
                                            placeholder="Actitud Inicial"
                                        />}
                                    />
                                </Form.Group>
                                <Form.Group controlId="conductaNoVerbal">
                                    <TextoAyuda
                                        nombre="conductaNoVerbal"
                                        tooltip="Conducta no verbal"
                                        componente={<Form.Control
                                            as="textarea"
                                            rows="2"
                                            value={this.state.conductaNoVerbal}
                                            onChange={this.handleChange}
                                            placeholder="Conducta no verbal"
                                        />}
                                    />
                                </Form.Group>
                                <Form.Group controlId="esAcompanado">
                                    <TextoAyuda
                                        nombre="esAcompanado"
                                        tooltip="Acude solo o acompañado"
                                        componente={<Form.Control
                                            as="textarea"
                                            rows="2"
                                            value={this.state.esAcompanado}
                                            onChange={this.handleChange}
                                            placeholder="Acude solo o acompañado"
                                        />}
                                    />
                                </Form.Group>
                            </Form.Group>
                            <Form.Group>
                                <div className="html2pdf__page-break"></div>
                                <Form.Label><strong>4. Comportamiento durante la evaluación</strong></Form.Label>
                                <Form.Group controlId="oposicionamiento">
                                    <Form.Check
                                        custom
                                        checked={this.state.oposicionamiento}
                                        value={this.state.oposicionamiento}
                                        onChange={event => this.setState({
                                            [event.target.id]: event.target.checked ? 1 : 0
                                        })}
                                        label="Oposicionismo"
                                        type="checkbox"
                                        id="oposicionamiento"
                                    />
                                </Form.Group>
                                <Form.Group controlId="sospechaSimulacion">
                                    <Form.Check
                                        custom
                                        checked={this.state.sospechaSimulacion}
                                        value={this.state.sospechaSimulacion}
                                        onChange={event => this.setState({
                                            [event.target.id]: event.target.checked ? 1 : 0
                                        })}
                                        label="Sospecha de simulación"
                                        type="checkbox"
                                        id="sospechaSimulacion"
                                    />
                                </Form.Group>
                                <Form.Group controlId="sugerenciaTest">
                                    <Form.Check
                                        custom
                                        checked={this.state.sugerenciaTest}
                                        value={this.state.sugerenciaTest}
                                        onChange={event => this.setState({
                                            [event.target.id]: event.target.checked ? 1 : 0
                                        })}
                                        label="¿Sugiere aplicar algún test?"
                                        type="checkbox"
                                        id="sugerenciaTest"
                                    />
                                </Form.Group>
                                <Form.Group controlId="sugerenciaTestEspecificar">
                                    <TextoAyuda
                                        nombre="sugerenciaTestEspecificar"
                                        tooltip="En caso positivo, especificar."
                                        componente={<Form.Control
                                            value={this.state.sugerenciaTestEspecificar}
                                            onChange={this.handleChange}
                                            placeholder="En caso positivo, especificar."
                                        />}
                                    />
                                </Form.Group>
                                <Form.Group controlId="observaciones">
                                    <TextoAyuda
                                        nombre="observaciones"
                                        tooltip="Observaciones generales"
                                        componente={<Form.Control
                                            as="textarea"
                                            rows="3"
                                            value={this.state.observaciones}
                                            onChange={this.handleChange}
                                            placeholder="Observaciones generales"
                                        />}
                                    />
                                </Form.Group>
                            </Form.Group>
                            <Form.Group controlId="observacionesGenerales">
                                <Form.Label><strong>Hipotesis Diagnósticas</strong></Form.Label>
                                <TextoAyuda
                                    nombre="observacionesGenerales"
                                    tooltip="A partir de los antecedentes recopilados indicar observaciones generales e indicar si debe continuar o no con Psiquiatra."
                                    componente={<Form.Control
                                        as="textarea"
                                        rows="5"
                                        value={this.state.observacionesGenerales}
                                        onChange={this.handleChange}
                                        placeholder="A partir de los antecedentes recopilados indicar observaciones generales e indicar si debe continuar o no con Psiquiatra."
                                    />}
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