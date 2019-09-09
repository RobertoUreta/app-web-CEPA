import React, { Component } from 'react'
import { Form, Col, Button, Row } from 'react-bootstrap'
import { Option } from '../../../../components/Option'
import { TextoAyuda } from '../../../../components/TextoAyuda'

import { TablaFamiliar } from '../../../../components/TablaFamiliar'
import { ModalFamiliar } from '../../../../components/ModalFamiliar'
import { updatePsiquiatraISL, obtenerPsiquiatraISL } from '../../../../backend/isl/psiquiatraISL';
import SweetAlert from 'react-bootstrap-sweetalert'
import { imgDataUtal, imgDataFooter } from '../../../../images/imagenes/imagenes';
import * as jsPDF from 'jspdf';
import html2pdf from 'html2pdf.js'

const estadosCiviles = ["Soltero/a", "Casado/a", "Viudo/a", "Divorciado/a", "Separado/a", "Conviviente"]
const nivelesEducacion = ["Enseñanza Basica", "Enseñanza Media", "Educación Superior"]
const antGinecoObstetricosLista = ["menarquia",
    "menopausia",
    "gpa",
    "ets",
    "fur",
    "tipo"]
export class EntrevistaPsiquiatra extends Component {


    constructor(props) {
        super(props);
        this._handleShow = this._handleShow.bind(this);

        this.state = {
            estadoCivil: "",
            escolaridad: "",
            actividad: "",
            historiaFamiliar: "",
            patologiasComunes: "",
            patologiasLaborales: "",
            atencionesPatologiaMental: "",
            antecendentesFamiliaresSaludMental: "",
            enfermedadesActualesConsumo: "",
            motivoConsulta: "",
            factoresRiesgoLaboral: "",
            sintomas: "",
            desarrolloSintomas: "",
            tratamientosPrevios: "",
            examenMental: "",
            edadInicio: "",//agregar a tabla
            tiposTrabajos: "",
            tiempoPermanencia: "",
            razonesCambio: "",
            empleoActual: "",
            funcionesPorContrato: "",
            menarquia: 0,
            menopausia: 0,
            gpa: 0,
            ets: 0,
            fur: 0,
            tipo: 0,
            observacionesAntGinecoObstetricos: "",
            eje1: "",
            eje2: "",
            eje3: "",
            eje4: "",
            eeg: "",
            impresionesClinicas: "",
            conclusionesEvaluacion: "",//agregar a tabla,
            show: false,
            familia: [],
            editable: false,
            minRows: 5,
            maxRows: 30,
            rows: 5,

        };
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
            filename: 'EVALUACIÓN_PSUIQUIÁTRA_ISL.pdf',
            image: { type: 'jpeg', quality: 0.98 },
            html2canvas: { scale: 2 },
            jsPDF: { unit: 'in', format: 'a4', orientation: 'portrait' },
            pagebreak: { mode: 'avoid-all' }
        };
        html2pdf().set(opt).from(input).toPdf().get('pdf')
            .then(function (pdf) {
                console.log("el pdf", opt.filename)
                var number_of_pages = pdf.internal.getNumberOfPages()
                var pdf_pages = pdf.internal.pages
                for (var i = 1; i < pdf_pages.length; i++) {
                    // We are telling our pdfObject that we are now working on this page
                    pdf.setPage(i)

                    if (i === 1) {
                        pdf.setFontSize(20)
                        pdf.text(2.65, 1.6, `Evaluación Psiquiátra ISL`)
                    }

                    pdf.addImage(imgDataUtal, 'png', 0, 0)
                    pdf.addImage(imgDataFooter, 'png', 0, 10.1)

                }
            }).save()
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
    _hideAlert = () => {
        this.setState({ alert: null })
    }
    handleSubmit = event => {
        event.preventDefault();
        const aux = JSON.parse(JSON.stringify(this.state, null, '  '));
        console.log(aux);
        let resp = updatePsiquiatraISL(aux, this.props.pacienteId);
        resp
            .then(res => {
                //console.log("agregado", res.data)
                if (res.data.ok) {
                    const getAlert = () => (
                        <SweetAlert success title="Datos agregados" onConfirm={this._hideAlert}>
                            Se agregaron correctamente los datos de la Entrevista Psiquiatrica del ISL.
                    </SweetAlert>
                    )
                    this.setState({ alert: getAlert() })
                }

            })
    }

    componentDidMount() {
        let prom = obtenerPsiquiatraISL(this.props.pacienteId);
        prom.then(res => {
            let data = res.data;
            console.log(res.data);
            if (data.ok) {
                let isl = data.respuesta[0];
                this.setState({
                    estadoCivil: isl.estado_civil === 'default' ? "" : isl.estado_civil,
                    escolaridad: isl.escolaridad === 'default' ? "" : isl.escolaridad,
                    actividad: isl.actividad === 'default' ? "" : isl.actividad,
                    historiaFamiliar: isl.historia_familiar === 'default' ? "" : isl.historia_familiar,
                    patologiasComunes: isl.patologias_comunes === 'default' ? "" : isl.patologias_comunes,
                    patologiasLaborales: isl.patologias_laborales === 'default' ? "" : isl.patologias_laborales,
                    atencionesPatologiaMental: isl.atenciones_patologia_mental === 'default' ? "" : isl.atenciones_patologia_mental,
                    antecendentesFamiliaresSaludMental: isl.antecedentes_familiares_salud_mental === 'default' ? "" : isl.antecedentes_familiares_salud_mental,
                    enfermedadesActualesConsumo: isl.enfermedades_actuales_consumo === 'default' ? "" : isl.enfermedades_actuales_consumo,
                    motivoConsulta: isl.motivo_consulta === 'default' ? "" : isl.motivo_consulta,
                    factoresRiesgoLaboral: isl.factores_riesgo_laboral === 'default' ? "" : isl.factores_riesgo_laboral,
                    sintomas: isl.sintomas === 'default' ? "" : isl.sintomas,
                    desarrolloSintomas: isl.desarrollo_sintomas === 'default' ? "" : isl.desarrollo_sintomas,
                    tratamientosPrevios: isl.tratamientos_previos === 'default' ? "" : isl.tratamientos_previos,
                    examenMental: isl.examen_mental === 'default' ? "" : isl.examen_mental,
                    edadInicio: isl.edad_inicio === 'default' ? "" : isl.edad_inicio,//agregar a tabla
                    tiposTrabajos: isl.tipos_trabajos === 'default' ? "" : isl.tipos_trabajos,
                    tiempoPermanencia: isl.tiempo_permanencia === 'default' ? "" : isl.tiempo_permanencia,
                    razonesCambio: isl.razones_cambio === 'default' ? "" : isl.razones_cambio,
                    empleoActual: isl.empleo_actual === 'default' ? "" : isl.empleo_actual,
                    funcionesPorContrato: isl.funciones_por_contrato === 'default' ? "" : isl.funciones_por_contrato,
                    menarquia: isl.menarquia ? 1 : 0,
                    menopausia: isl.menopausia ? 1 : 0,
                    gpa: isl.gpa ? 1 : 0,
                    ets: isl.ets ? 1 : 0,
                    fur: isl.fur ? 1 : 0,
                    tipo: isl.tipo ? 1 : 0,
                    observacionesAntGinecoObstetricos: isl.observaciones === 'default' ? "" : isl.observaciones,
                    eje1: isl.eje_1 === 'default' ? "" : isl.eje_1,
                    eje2: isl.eje_2 === 'default' ? "" : isl.eje_2,
                    eje3: isl.eje_3 === 'default' ? "" : isl.eje_3,
                    eje4: isl.eje_4 === 'default' ? "" : isl.eje_4,
                    eeg: isl.eeg === 'default' ? "" : isl.eeg,
                    impresionesClinicas: isl.impresiones_clinicas === 'default' ? "" : isl.impresiones_clinicas,
                    conclusionesEvaluacion: isl.conclusiones_evaluacion === 'default' ? "" : isl.conclusiones_evaluacion,//agregar a tabla,
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
            <div><div id="divToPrint" className="entrevistaPsiquiatra">
                <form onSubmit={this.handleSubmit}>
                    <Form.Row>
                        <Form.Group as={Col}>
                            <Form.Label><strong>1. Anamnesis del paciente</strong></Form.Label>
                            <Row>
                                <Col>
                                    <Form.Group controlId="estadoCivil">
                                        <TextoAyuda
                                            nombre="estadoCivil"
                                            tooltip="Estado Civil"
                                            componente={<Form.Control
                                                readOnly={!this.state.editable}
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
                                                readOnly={!this.state.editable}
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
                                    <Form.Group controlId="actividad">
                                        <TextoAyuda
                                            nombre="actividad"
                                            tooltip="Actividad"
                                            componente={<Form.Control
                                                readOnly={!this.state.editable}
                                                value={this.state.actividad}
                                                onChange={this.handleChange}
                                                placeholder="Actividad"
                                            />}
                                        />
                                    </Form.Group>
                                </Col>
                            </Row>

                            <Form.Label><strong>2. Datos del grupo de convivencia</strong></Form.Label>

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
                            <Form.Group controlId="historiaFamiliar">
                                <TextoAyuda
                                    nombre="historiaFamiliar"
                                    tooltip="Breve historia familiar (incluir parejas) y eventos estresantes en el último tiempo."
                                    componente={<Form.Control
                                        as="textarea"
                                        rows={this.state.rows}
                                        readOnly={!this.state.editable}
                                        value={this.state.historiaFamiliar}
                                        onChange={this.handleChange}
                                        placeholder="Breve historia familiar (incluir parejas) y eventos estresantes en el último tiempo."
                                    />}
                                />
                            </Form.Group>

                            <Form.Label><strong>3. Historia Laboral</strong></Form.Label>
                            <Form.Group controlId="edadInicio">
                                <TextoAyuda
                                    nombre="edadInicio"
                                    tooltip="Edad de inicio"
                                    componente={<Form.Control
                                        as="textarea"
                                        rows={this.state.rows}
                                        readOnly={!this.state.editable}
                                        value={this.state.edadInicio}
                                        onChange={this.handleChange}
                                        placeholder="Edad de inicio"
                                    />}
                                />
                            </Form.Group>
                            <Form.Group controlId="tiposTrabajos">
                                <TextoAyuda
                                    nombre="tiposTrabajos"
                                    tooltip="Tipos de trabajo realizados"
                                    componente={<Form.Control
                                        as="textarea"
                                        rows={this.state.rows}
                                        readOnly={!this.state.editable}
                                        value={this.state.tiposTrabajos}
                                        onChange={this.handleChange}
                                        placeholder="Tipos de trabajo realizados"
                                    />}
                                />
                            </Form.Group>
                            <Form.Group controlId="tiempoPermanencia">
                                <TextoAyuda
                                    nombre="tiempoPermanencia"
                                    tooltip="Tiempo de permanencia en cada empresa"
                                    componente={<Form.Control
                                        as="textarea"
                                        rows={this.state.rows}
                                        readOnly={!this.state.editable}
                                        value={this.state.tiempoPermanencia}
                                        onChange={this.handleChange}
                                        placeholder="Tiempo de permanencia en cada empresa"
                                    />}
                                />
                            </Form.Group>
                            <Form.Group controlId="razonesCambio">
                                <TextoAyuda
                                    nombre="razonesCambio"
                                    tooltip="Razones por las cuales se ha cambiado de trabajo"
                                    componente={<Form.Control
                                        as="textarea"
                                        rows={this.state.rows}
                                        readOnly={!this.state.editable}
                                        value={this.state.razonesCambio}
                                        onChange={this.handleChange}
                                        placeholder="Razones por las cuales se ha cambiado de trabajo"
                                    />}
                                />
                            </Form.Group>
                            <Form.Group controlId="empleoActual">
                                <TextoAyuda
                                    nombre="empleoActual"
                                    tooltip="Empleo actual (indicar empresa)"
                                    componente={<Form.Control
                                        as="textarea"
                                        rows={this.state.rows}
                                        readOnly={!this.state.editable}
                                        value={this.state.empleoActual}
                                        onChange={this.handleChange}
                                        placeholder="Empleo actual (indicar empresa)"
                                    />}
                                />
                            </Form.Group>
                            <Form.Group controlId="funcionesPorContrato">
                                <TextoAyuda
                                    nombre="funcionesPorContrato"
                                    tooltip="Funciones por contrato"
                                    componente={<Form.Control
                                        as="textarea"
                                        rows={this.state.rows}
                                        readOnly={!this.state.editable}
                                        value={this.state.funcionesPorContrato}
                                        onChange={this.handleChange}
                                        placeholder="Funciones por contrato"
                                    />}
                                />
                            </Form.Group>

                            <Form.Label><strong>4. Antecedentes Mórbidos</strong></Form.Label>
                            <Form.Group controlId="patologiasComunes">
                                <TextoAyuda
                                    nombre="patologiasComunes"
                                    tooltip="Patologías comunes relevantes"
                                    componente={<Form.Control
                                        as="textarea"
                                        rows={this.state.rows}
                                        readOnly={!this.state.editable}
                                        value={this.state.patologiasComunes}
                                        onChange={this.handleChange}
                                        placeholder="Patologías comunes relevantes"
                                    />}
                                />
                            </Form.Group>
                            <Form.Group controlId="patologiasLaborales">
                                <TextoAyuda
                                    nombre="patologiasLaborales"
                                    tooltip="Patologías laborales (accidentes y enfermedades)"
                                    componente={<Form.Control
                                        as="textarea"
                                        rows={this.state.rows}
                                        readOnly={!this.state.editable}
                                        value={this.state.patologiasLaborales}
                                        onChange={this.handleChange}
                                        placeholder="Patologías laborales (accidentes y enfermedades)"
                                    />}
                                />
                            </Form.Group>
                            <Form.Group controlId="atencionesPatologiaMental">
                                <TextoAyuda
                                    nombre="atencionesPatologiaMental"
                                    tooltip="Atenciones patología mental (edad, diagnósticos, tipo de tratamiento, licencias médicas y evolución)"
                                    componente={<Form.Control
                                        as="textarea"
                                        rows={this.state.rows}
                                        readOnly={!this.state.editable}
                                        value={this.state.atencionesPatologiaMental}
                                        onChange={this.handleChange}
                                        placeholder="Atenciones patología mental (edad, diagnósticos, tipo de tratamiento, licencias médicas y evolución)"
                                    />}
                                />
                            </Form.Group>
                            <Form.Group controlId="antecendentesFamiliaresSaludMental">
                                <TextoAyuda
                                    nombre="antecendentesFamiliaresSaludMental"
                                    tooltip="Antecendentes familiares de patología de salud mental"
                                    componente={<Form.Control
                                        as="textarea"
                                        rows={this.state.rows}
                                        readOnly={!this.state.editable}
                                        value={this.state.antecendentesFamiliaresSaludMental}
                                        onChange={this.handleChange}
                                        placeholder="Antecendentes familiares de patología de salud mental"
                                    />}
                                />
                            </Form.Group>
                            <Form.Group controlId="enfermedadesActualesConsumo">
                                <TextoAyuda
                                    nombre="enfermedadesActualesConsumo"
                                    tooltip="enfermedadesActualesConsumo"
                                    componente={<Form.Control
                                        as="textarea"
                                        rows={this.state.rows}
                                        readOnly={!this.state.editable}
                                        value={this.state.enfermedadesActualesConsumo}
                                        onChange={this.handleChange}
                                        placeholder="Enfermedades actuales y patron de consumo de drogas o alcohol"
                                    />}
                                />
                            </Form.Group>
                            <Form.Label><strong>5. Motivo de consulta</strong></Form.Label>
                            <Form.Group controlId="motivoConsulta">
                                <TextoAyuda
                                    nombre="motivoConsulta"
                                    tooltip="Indicar motivo de consulta según palabras del paciente"
                                    componente={<Form.Control
                                        as="textarea"
                                        rows={this.state.rows}
                                        readOnly={!this.state.editable}
                                        value={this.state.motivoConsulta}
                                        onChange={this.handleChange}
                                        placeholder="Indicar motivo de consulta según palabras del paciente"
                                    />}
                                />
                            </Form.Group>
                            <Form.Group controlId="factoresRiesgoLaboral">
                                <TextoAyuda
                                    nombre="factoresRiesgoLaboral"
                                    tooltip="Indicar posibles factores de riesgo laboral involucrados"
                                    componente={<Form.Control
                                        as="textarea"
                                        rows={this.state.rows}
                                        readOnly={!this.state.editable}
                                        value={this.state.factoresRiesgoLaboral}
                                        onChange={this.handleChange}
                                        placeholder="Indicar posibles factores de riesgo laboral involucrados"
                                    />}
                                />
                            </Form.Group>
                            <Form.Group controlId="sintomas">
                                <TextoAyuda
                                    nombre="sintomas"
                                    tooltip="Sintomas (características, intensidad, cambios, duración, asociación con factores externos, ciclo del sueño, evolución de los síntomas previo a la evaluación)"
                                    componente={<Form.Control
                                        as="textarea"
                                        rows={this.state.rows}
                                        readOnly={!this.state.editable}
                                        value={this.state.sintomas}
                                        onChange={this.handleChange}
                                        placeholder="Sintomas (características, intensidad, cambios, duración, asociación con factores externos, ciclo del sueño, evolución de los síntomas previo a la evaluación)"
                                    />}
                                />
                            </Form.Group>
                            <Form.Group controlId="desarrolloSintomas">
                                <TextoAyuda
                                    nombre="desarrolloSintomas"
                                    tooltip="Factores asociados al desarrollo, inicio y mantención de los sintomas"
                                    componente={<Form.Control
                                        as="textarea"
                                        rows={this.state.rows}
                                        readOnly={!this.state.editable}
                                        value={this.state.desarrolloSintomas}
                                        onChange={this.handleChange}
                                        placeholder="Factores asociados al desarrollo, inicio y mantención de los sintomas"
                                    />}
                                />
                            </Form.Group>
                            <Form.Group controlId="tratamientosPrevios">
                                <TextoAyuda
                                    nombre="tratamientosPrevios"
                                    tooltip="Tratamientos previos (tiempo de tratamiento, licencia médica recibidas por esta causa, tipo de tratamiento recibido, fármacos)"
                                    componente={<Form.Control
                                        as="textarea"
                                        rows={this.state.rows}
                                        readOnly={!this.state.editable}
                                        value={this.state.tratamientosPrevios}
                                        onChange={this.handleChange}
                                        placeholder="Tratamientos previos (tiempo de tratamiento, licencia médica recibidas por esta causa, tipo de tratamiento recibido, fármacos)"
                                    />}
                                />
                            </Form.Group>
                            <Form.Group controlId="antGinecoObstetricos">
                                <Form.Label><strong>6. Antecedentes gineco-Obstétricos</strong></Form.Label>
                                <Row>
                                    <Col>
                                        <Form.Group controlId="antGinecoObstetricosCheckBox">
                                            <Col>
                                                {antGinecoObstetricosLista.slice(0, 3).map((name) => (
                                                    <Form.Check
                                                        custom
                                                        disabled={!this.state.editable}
                                                        checked={this.state[name]}
                                                        value={this.state[name]}
                                                        onChange={event => this.setState({
                                                            [event.target.id]: event.target.checked ? 1 : 0
                                                        })}
                                                        label={name}
                                                        type="checkbox"
                                                        id={`${name}`}
                                                    />
                                                ))}
                                            </Col>
                                        </Form.Group>
                                    </Col>
                                    <Col>
                                        <Form.Group controlId="antGinecoObstetricosCheckBox1">
                                            <Col>
                                                {antGinecoObstetricosLista.slice(3, 6).map((name) => (
                                                    <Form.Check
                                                        custom
                                                        disabled={!this.state.editable}
                                                        checked={this.state[name]}
                                                        value={this.state[name]}
                                                        onChange={event => this.setState({
                                                            [event.target.id]: event.target.checked ? 1 : 0
                                                        })}
                                                        label={name}
                                                        type="checkbox"
                                                        id={`${name}`}
                                                    />
                                                ))}
                                            </Col>
                                        </Form.Group>
                                    </Col>
                                </Row>
                                <Form.Group controlId="observacionesAntGinecoObstetricos">
                                    <TextoAyuda
                                        nombre="observacionesAntGinecoObstetricos"
                                        tooltip="Observación"
                                        componente={<Form.Control
                                            as="textarea"
                                            rows={this.state.rows}
                                            readOnly={!this.state.editable}
                                            value={this.state.observacionesAntGinecoObstetricos}
                                            onChange={this.handleChange}
                                            placeholder="Observación"
                                        />}
                                    />

                                </Form.Group>
                            </Form.Group>
                            <Form.Label><strong>7. Examen Mental</strong></Form.Label>
                            <Form.Group controlId="examenMental">
                                <TextoAyuda
                                    nombre="examenMental"
                                    tooltip="Examen Mental"
                                    componente={<Form.Control
                                        as="textarea"
                                        rows={this.state.rows}
                                        readOnly={!this.state.editable}
                                        value={this.state.examenMental}
                                        onChange={this.handleChange}
                                        placeholder="Examen Mental"
                                    />}
                                />
                            </Form.Group>

                            <Form.Label><strong>8. Hipotesis diagnosticas según DSM</strong></Form.Label>
                            <Form.Group controlId="eje1">
                                <TextoAyuda
                                    nombre="eje1"
                                    tooltip="Eje I"
                                    componente={<Form.Control
                                        as="textarea"
                                        rows={this.state.rows}
                                        readOnly={!this.state.editable}
                                        value={this.state.eje1}
                                        onChange={this.handleChange}
                                        placeholder="Eje I"
                                    />}
                                />
                            </Form.Group>
                            <Form.Group controlId="eje2">
                                <TextoAyuda
                                    nombre="eje2"
                                    tooltip="Eje II"
                                    componente={<Form.Control
                                        as="textarea"
                                        rows={this.state.rows}
                                        readOnly={!this.state.editable}
                                        value={this.state.eje2}
                                        onChange={this.handleChange}
                                        placeholder="Eje II"
                                    />}
                                />
                            </Form.Group>
                            <Form.Group controlId="eje3">
                                <TextoAyuda
                                    nombre="eje3"
                                    tooltip="Eje III"
                                    componente={<Form.Control
                                        as="textarea"
                                        rows={this.state.rows}
                                        readOnly={!this.state.editable}
                                        value={this.state.eje3}
                                        onChange={this.handleChange}
                                        placeholder="Eje III"
                                    />}
                                />
                            </Form.Group>
                            <Form.Group controlId="eje4">
                                <TextoAyuda
                                    nombre="eje4"
                                    tooltip="Eje IV"
                                    componente={<Form.Control
                                        as="textarea"
                                        rows={this.state.rows}
                                        readOnly={!this.state.editable}
                                        value={this.state.eje4}
                                        onChange={this.handleChange}
                                        placeholder="Eje IV"
                                    />}
                                />
                            </Form.Group>
                            <Form.Group controlId="impresionesClinicas">
                                <TextoAyuda
                                    nombre="impresionesClinicas"
                                    tooltip="Impresiones clínicas"
                                    componente={<Form.Control
                                        as="textarea"
                                        rows={this.state.rows}
                                        readOnly={!this.state.editable}
                                        value={this.state.impresionesClinicas}
                                        onChange={this.handleChange}
                                        placeholder="Impresiones clínicas"
                                    />}
                                />
                            </Form.Group>

                            <Form.Label><strong>9. Conclusiones evaluación</strong></Form.Label>
                            <Form.Group controlId="conclusionesEvaluacion">
                                <TextoAyuda
                                    nombre="conclusionesEvaluacion"
                                    tooltip="Conclusiones"
                                    componente={<Form.Control
                                        as="textarea"
                                        rows={this.state.rows}
                                        readOnly={!this.state.editable}
                                        value={this.state.conclusionesEvaluacion}
                                        onChange={this.handleChange}
                                        placeholder="Conclusiones"
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