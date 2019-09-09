import React, { Component } from 'react'
import { Form, Col, Button, Row } from 'react-bootstrap'
import DatePicker from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css";
import { TextoAyuda } from '../../../../components/TextoAyuda'
import SweetAlert from 'react-bootstrap-sweetalert'
import { updatePuestoTrabajoISL, obtenerPuestoTrabajoISL } from '../../../../backend/isl/puestoTrabajoISL';
import { imgDataUtal, imgDataFooter } from '../../../../images/imagenes/imagenes';
import * as jsPDF from 'jspdf';
import html2pdf from 'html2pdf.js'


export class EvaluacionPuestoTrabajo extends Component {


    constructor(props) {
        super(props);

        this.state = {
            fechaRealizacion: null,
            razonSocial: "",
            rut: "",
            codigoCiiu: "",
            nombreCentroTrabajo: "",
            direccion: "",
            descripcion: "",
            antiguedadEmpresa: "",
            antiguedadPuesto: "",//falta en la tabla de db
            evalDesempeno: "",
            cambiosPt: "",
            ausentismoEnfermedad: "",
            jornadaSemanal: "",
            sistemaTurnos: "",
            obligacionControlHorarios: "",
            colacion: "",
            horasExtraordinarias: "",
            tipoRemuneracion: "",
            vacaciones: "",
            medicoSolicitante: "",
            motivoConsulta: "",
            fuente: "",
            coordinacionEpt: "",
            riesgoIndagar: "",
            motivoFaltaTestigos: "",
            metodoSeleccion: "",
            registroConfidencialidad: "",
            nombreInf1: "",
            cargoInf1: "",
            relacionJerarquicaInf1: "",
            tiempoConoceInf1: "",
            fechaEntrevistaInf1: "",
            aporteContactoInf1: "",
            nombreInf2: "",
            cargoInf2: "",
            relacionJerarquicaInf2: "",
            tiempoConoceInf2: "",
            fechaEntrevistaInf2: "",
            aporteContactoInf2: "",
            nombreInf3: "",
            cargoInf3: "",
            relacionJerarquicaInf3: "",
            tiempoConoceInf3: "",
            fechaEntrevistaInf3: "",
            aporteContactoInf3: "",
            cargo: "",
            descansos: "",
            controlTiempo: "",
            capacitacion: "",
            variedadTarea: "",
            demandasPsicologicas: "",
            autonomiaControl: "",
            ambiguedad: "",
            apoyoSocial: "",
            incorporacionTec: "",
            conflictosInterpersonales: "",
            condicionesHostiles: "",
            condicionesDeficientes: "",
            condicionesAgravantes: "",
            relacionTrabajadorCompaneros: "",
            relacionSuperiorJerarquico: "",
            relacionTrabajadorSuboordinados: "",
            relacionTrabajadorUsuarios: "",
            climaLaboralGeneral: "",
            liderazgo: "",
            conductasAcosoLaboral: "",
            conductasAcosoSexual: "",
            opinionEmpresaTrabajador: "",
            factoresRiesgoEmpresa: "",
            accionesMitigacion: "",
            observaciones: "",
            conclusion: "",
            editable: false,
            minRows: 5,
            maxRows: 30,
            rows: 5,
        };
    }


    _handleChange = (date) => {
        this.setState({
            fechaRealizacion: date
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
            filename: 'EVALUACIÓN_PUESTO_TRABAJO_ISL.pdf',
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
                        pdf.text(2.45, 1.6, `Evaluación Puesto Tabajo ISL`)
                    }

                    pdf.addImage(imgDataUtal, 'png', 0, 0)
                    pdf.addImage(imgDataFooter, 'png', 0, 10.1)

                }
            }).save()
    }


    handleSubmit = event => {
        event.preventDefault();
        const aux = JSON.parse(JSON.stringify(this.state, null, '  '));
        if (aux.fechaRealizacion === null) {
            aux.fechaRealizacion = '1900-01-10'
        }
        let fecha1 = new Date(aux.fechaRealizacion)
        aux.fechaRealizacion = fecha1.toJSON().slice(0, 19).replace('T', ' ')
        console.log(aux);
        let resp = updatePuestoTrabajoISL(aux, this.props.pacienteId);
        resp
            .then(res => {
                //console.log("agregado", res.data)
                if (res.data.ok) {
                    const getAlert = () => (
                        <SweetAlert success title="Datos agregados" onConfirm={this._hideAlert}>
                            Se agregaron correctamente los datos de la evaluación de puesto de trabajo ISl.
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
        let prom = obtenerPuestoTrabajoISL(this.props.pacienteId);
        prom.then(res => {
            let data = res.data;
            console.log(res.data);
            if (data.ok) {
                let isl = data.respuesta[0];
                let aux = new Date(isl.fecha_realizacion)
                let fecha = aux.toISOString().split('T')
                console.log(fecha);
                let inf = data.informantes;
                this.setState({
                    fechaRealizacion: fecha[0] === '1900-01-10' ? null : isl.fecha_realizacion,
                    razonSocial: isl.razon_social === 'default' ? "" : isl.razon_social,
                    rut: isl.rut === 'default' ? "" : isl.rut,
                    codigoCiiu: isl.codigo_ciiu === 'default' ? "" : isl.codigo_ciiu,
                    nombreCentroTrabajo: isl.nombre_centro_trabajo === 'default' ? "" : isl.nombre_centro_trabajo,
                    direccion: isl.direccion === 'default' ? "" : isl.direccion,
                    descripcion: isl.descripcion === 'default' ? "" : isl.descripcion,
                    antiguedadEmpresa: isl.antiguedad === 'default' ? "" : isl.antiguedad,
                    antiguedadPuesto: isl.antiguedad_puesto === 'default' ? "" : isl.antiguedad_puesto,//falta en la tabla de db
                    evalDesempeno: isl.eval_desempeno === 'default' ? "" : isl.eval_desempeno,
                    cambiosPt: isl.cambios_pt === 'default' ? "" : isl.cambios_pt,
                    ausentismoEnfermedad: isl.ausentismo_enfermedad === 'default' ? "" : isl.ausentismo_enfermedad,
                    jornadaSemanal: isl.jornada_semanal === 'default' ? "" : isl.jornada_semanal,
                    sistemaTurnos: isl.sistema_turnos === 'default' ? "" : isl.sistema_turnos,
                    obligacionControlHorarios: isl.obligacion_control_horarios === 'default' ? "" : isl.obligacion_control_horarios,
                    colacion: isl.colacion === 'default' ? "" : isl.colacion,
                    horasExtraordinarias: isl.horas_extraordinarias === 'default' ? "" : isl.horas_extraordinarias,
                    tipoRemuneracion: isl.tipo_remuneracion === 'default' ? "" : isl.tipo_remuneracion,
                    vacaciones: isl.vacaciones === 'default' ? "" : isl.vacaciones,
                    medicoSolicitante: isl.medico_solicitante === 'default' ? "" : isl.medico_solicitante,
                    motivoConsulta: isl.motivo_consulta === 'default' ? "" : isl.motivo_consulta,
                    fuente: isl.fuente === 'default' ? "" : isl.fuente,
                    coordinacionEpt: isl.coordinacion_ept === 'default' ? "" : isl.coordinacion_ept,
                    riesgoIndagar: isl.riesgo_indagar === 'default' ? "" : isl.riesgo_indagar,
                    motivoFaltaTestigos: isl.motivo_falta_testigos === 'default' ? "" : isl.motivo_falta_testigos,
                    metodoSeleccion: isl.metodo_seleccion === 'default' ? "" : isl.metodo_seleccion,
                    registroConfidencialidad: isl.registro_confidencialidad === 'default' ? "" : isl.registro_confidencialidad,
                    nombreInf1: inf[0].nombre === 'default' ? "" : inf[0].nombre,
                    cargoInf1: inf[0].cargo === 'default' ? "" : inf[0].cargo,
                    relacionJerarquicaInf1: inf[0].relacion_jerarquica === 'default' ? "" : inf[0].relacion_jerarquica,
                    tiempoConoceInf1: inf[0].tiempo_conoce === 'default' ? "" : inf[0].tiempo_conoce,
                    fechaEntrevistaInf1: inf[0].fechas_entrevistas === 'default' ? "" : inf[0].fechas_entrevistas,
                    aporteContactoInf1: inf[0].aporte_contacto === 'default' ? "" : inf[0].aporte_contacto,
                    nombreInf2: inf[1].nombre === 'default' ? "" : inf[1].nombre,
                    cargoInf2: inf[1].cargo === 'default' ? "" : inf[1].cargo,
                    relacionJerarquicaInf2: inf[1].relacion_jerarquica === 'default' ? "" : inf[1].relacion_jerarquica,
                    tiempoConoceInf2: inf[1].tiempo_conoce === 'default' ? "" : inf[1].tiempo_conoce,
                    fechaEntrevistaInf2: inf[1].fechas_entrevistas === 'default' ? "" : inf[1].fechas_entrevistas,
                    aporteContactoInf2: inf[1].aporte_contacto === 'default' ? "" : inf[1].aporte_contacto,
                    nombreInf3: inf[2].nombre === 'default' ? "" : inf[2].nombre,
                    cargoInf3: inf[2].cargo === 'default' ? "" : inf[2].cargo,
                    relacionJerarquicaInf3: inf[2].relacion_jerarquica === 'default' ? "" : inf[2].relacion_jerarquica,
                    tiempoConoceInf3: inf[2].tiempo_conoce === 'default' ? "" : inf[2].tiempo_conoce,
                    fechaEntrevistaInf3: inf[2].fechas_entrevistas === 'default' ? "" : inf[2].fechas_entrevistas,
                    aporteContactoInf3: inf[2].aporte_contacto === 'default' ? "" : inf[2].aporte_contacto,
                    cargo: isl.cargo === 'default' ? "" : isl.cargo,
                    descansos: isl.descansos === 'default' ? "" : isl.descansos,
                    controlTiempo: isl.control_tiempo === 'default' ? "" : isl.control_tiempo,
                    capacitacion: isl.capacitacion === 'default' ? "" : isl.capacitacion,
                    variedadTarea: isl.variedad_tarea === 'default' ? "" : isl.variedad_tarea,
                    demandasPsicologicas: isl.demandas_psicologicas === 'default' ? "" : isl.demandas_psicologicas,
                    autonomiaControl: isl.autonomia_control === 'default' ? "" : isl.autonomia_control,
                    ambiguedad: isl.ambiguedad === 'default' ? "" : isl.ambiguedad,
                    apoyoSocial: isl.apoyo_social === 'default' ? "" : isl.apoyo_social,
                    incorporacionTec: isl.incorporacion_tec === 'default' ? "" : isl.incorporacion_tec,
                    conflictosInterpersonales: isl.conflictos_interpersonales === 'default' ? "" : isl.conflictos_interpersonales,
                    condicionesHostiles: isl.condiciones_hostiles === 'default' ? "" : isl.condiciones_hostiles,
                    condicionesDeficientes: isl.condiciones_deficientes === 'default' ? "" : isl.condiciones_deficientes,
                    condicionesAgravantes: isl.condiciones_agravantes === 'default' ? "" : isl.condiciones_agravantes,
                    relacionTrabajadorCompaneros: isl.relacion_trabajador_companeros === 'default' ? "" : isl.relacion_trabajador_companeros,
                    relacionSuperiorJerarquico: isl.relacion_superior_jerarquico === 'default' ? "" : isl.relacion_superior_jerarquico,
                    relacionTrabajadorSuboordinados: isl.relacion_trabajador_suboordinados === 'default' ? "" : isl.relacion_trabajador_suboordinados,
                    relacionTrabajadorUsuarios: isl.relacion_trabajador_usuarios === 'default' ? "" : isl.relacion_trabajador_usuarios,
                    climaLaboralGeneral: isl.clima_laboral_general === 'default' ? "" : isl.clima_laboral_general,
                    liderazgo: isl.liderazgo === 'default' ? "" : isl.liderazgo,
                    conductasAcosoLaboral: isl.conductas_acoso_laboral === 'default' ? "" : isl.conductas_acoso_laboral,
                    conductasAcosoSexual: isl.conductas_acoso_sexual === 'default' ? "" : isl.conductas_acoso_sexual,
                    opinionEmpresaTrabajador: isl.opinion_empresa_trabajador === 'default' ? "" : isl.opinion_empresa_trabajador,
                    factoresRiesgoEmpresa: isl.factores_riesgo_empresa === 'default' ? "" : isl.factores_riesgo_empresa,
                    accionesMitigacion: isl.acciones_mitigacion === 'default' ? "" : isl.acciones_mitigacion,
                    observaciones: isl.observaciones === 'default' ? "" : isl.observaciones,
                    conclusion: isl.conclusion === 'default' ? "" : isl.conclusion,
                });
            }
        })
    }


    render() {
        return (
            <div><div id="divToPrint" className="evaluacionPuestoTrabajo">
                <form onSubmit={this.handleSubmit}>
                    <Form.Row>
                        <Form.Group as={Col}>

                            <Form.Label><strong>1. Fecha de realización del estudio</strong></Form.Label>
                            <Form.Group controlId="fechaRealizacion">
                                <div>
                                    <TextoAyuda
                                        nombre="fechaRealizacion"
                                        tooltip="Fecha de Realización"
                                        componente={<DatePicker
                                            customInput={<Form.Control />}
                                            readOnly={!this.state.editable}
                                            dateFormat="dd/MM/yyyy"
                                            selected={this.state.fechaRealizacion}
                                            onChange={this._handleChange}
                                            placeholderText="Fecha de Realización"
                                        />}
                                    />
                                </div>
                            </Form.Group>

                            <Form.Label><strong>2. Datos de identificación de la empresa</strong></Form.Label>
                            <Form.Group controlId="razonSocial">
                                <TextoAyuda
                                    nombre="razonSocial"
                                    tooltip="Razón social"
                                    componente={<Form.Control
                                        readOnly={!this.state.editable}
                                        value={this.state.razonSocial}
                                        onChange={this.handleChange}
                                        placeholder="Razón social"
                                    />}
                                />
                            </Form.Group>

                            <Row>
                                <Col>
                                    <Form.Group controlId="rut">
                                        <TextoAyuda
                                            nombre="rut"
                                            tooltip="Rut"
                                            componente={<Form.Control
                                                readOnly={!this.state.editable}
                                                value={this.state.rut}
                                                onChange={this.handleChange}
                                                placeholder="Rut"
                                            />}
                                        />
                                    </Form.Group>
                                </Col>
                                <Col>
                                    <Form.Group controlId="codigoCiiu">
                                        <TextoAyuda
                                            nombre="codigoCiiu"
                                            tooltip="Código CIIU (Info. del empleador)"
                                            componente={<Form.Control
                                                readOnly={!this.state.editable}
                                                value={this.state.codigoCiiu}
                                                onChange={this.handleChange}
                                                placeholder="Código CIIU (Info. del empleador)"
                                            />}
                                        />
                                    </Form.Group>
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <Form.Group controlId="nombreCentroTrabajo">
                                        <TextoAyuda
                                            nombre="nombreCentroTrabajo"
                                            tooltip="Nombre del centro de trabajo"
                                            componente={<Form.Control
                                                readOnly={!this.state.editable}
                                                value={this.state.nombreCentroTrabajo}
                                                onChange={this.handleChange}
                                                placeholder="Nombre del centro de trabajo"
                                            />}
                                        />
                                    </Form.Group>
                                </Col>
                                <Col>
                                    <Form.Group controlId="direccion">
                                        <TextoAyuda
                                            nombre="direccion"
                                            tooltip="Dirección del centro de trabajo"
                                            componente={<Form.Control
                                                readOnly={!this.state.editable}
                                                value={this.state.direccion}
                                                onChange={this.handleChange}
                                                placeholder="Dirección del centro de trabajo"
                                            />}
                                        />
                                    </Form.Group>
                                </Col>
                            </Row>

                            <Form.Label><strong>3. Antecedentes del cargo</strong></Form.Label>
                            <Form.Group controlId="descripcion">
                                <TextoAyuda
                                    nombre="descripcion"
                                    tooltip="Descripción general del cargo, funciones y tareas"
                                    componente={<Form.Control
                                        as="textarea"
                                        rows={this.state.rows}
                                        readOnly={!this.state.editable}
                                        value={this.state.descripcion}
                                        onChange={this.handleChange}
                                        placeholder="Descripción general del cargo, funciones y tareas"
                                    />}
                                />
                            </Form.Group>
                            <Form.Group controlId="antiguedadEmpresa">
                                <TextoAyuda
                                    nombre="antiguedadEmpresa"
                                    tooltip="Antigüedad en la empresa (del afectado)"
                                    componente={<Form.Control
                                        as="textarea"
                                        rows={this.state.rows}
                                        readOnly={!this.state.editable}
                                        value={this.state.antiguedadEmpresa}
                                        onChange={this.handleChange}
                                        placeholder="Antigüedad en la empresa (del afectado)"
                                    />}
                                />
                            </Form.Group>
                            <Form.Group controlId="antiguedadPuesto">
                                <TextoAyuda
                                    nombre="antiguedadPuesto"
                                    tooltip="Antigüedad en el puesto"
                                    componente={<Form.Control
                                        as="textarea"
                                        rows={this.state.rows}
                                        readOnly={!this.state.editable}
                                        value={this.state.antiguedadPuesto}
                                        onChange={this.handleChange}
                                        placeholder="Antigüedad en el puesto"
                                    />}
                                />
                            </Form.Group>
                            <Form.Group controlId="evalDesempeno">
                                <TextoAyuda
                                    nombre="evalDesempeno"
                                    tooltip="Evaluación de desempeño en los últimos 6 meses (Mencionar que medios de evaluación de desempeño existe en la empresa y si no existe)"
                                    componente={<Form.Control
                                        as="textarea"
                                        rows={this.state.rows}
                                        readOnly={!this.state.editable}
                                        value={this.state.evalDesempeno}
                                        onChange={this.handleChange}
                                        placeholder="Evaluación de desempeño en los últimos 6 meses (Mencionar que medios de evaluación de desempeño existe en la empresa y si no exite)"
                                    />}
                                />
                            </Form.Group>
                            <Form.Group controlId="cambiosPt">
                                <TextoAyuda
                                    nombre="cambiosPt"
                                    tooltip="Cambios en el puesto de trabajo en los últimos 6 meses"
                                    componente={<Form.Control
                                        as="textarea"
                                        rows={this.state.rows}
                                        readOnly={!this.state.editable}
                                        value={this.state.cambiosPt}
                                        onChange={this.handleChange}
                                        placeholder="Cambios en el puesto de trabajo en los últimos 6 meses"
                                    />}
                                />
                            </Form.Group>
                            <Form.Group controlId="ausentismoEnfermedad">
                                <TextoAyuda
                                    nombre="ausentismoEnfermedad"
                                    tooltip="Ausentismo por enfermedad (en los últimos 12 meses)"
                                    componente={<Form.Control
                                        as="textarea"
                                        rows={this.state.rows}
                                        readOnly={!this.state.editable}
                                        value={this.state.ausentismoEnfermedad}
                                        onChange={this.handleChange}
                                        placeholder="Ausentismo por enfermedad (en los últimos 12 meses)"
                                    />}
                                />
                            </Form.Group>

                            <Form.Label><strong>4. Aspectos administrativos</strong></Form.Label>
                            <Form.Group controlId="jornadaSemanal">
                                <TextoAyuda
                                    nombre="jornadaSemanal"
                                    tooltip="Jornada semanal de Trabajo (Indicar si tiene control de horario y jornada de turnos)"
                                    componente={<Form.Control
                                        as="textarea"
                                        rows={this.state.rows}
                                        readOnly={!this.state.editable}
                                        value={this.state.jornadaSemanal}
                                        onChange={this.handleChange}
                                        placeholder="Jornada semanal de trabajo ( indicar si tiene control de horario y jornada de turnos)"
                                    />}
                                />
                            </Form.Group>
                            <Form.Group controlId="sistemaTurnos">
                                <TextoAyuda
                                    nombre="sistemaTurnos"
                                    tooltip="Sistema de Turnos"
                                    componente={<Form.Control
                                        as="textarea"
                                        rows={this.state.rows}
                                        readOnly={!this.state.editable}
                                        value={this.state.sistemaTurnos}
                                        onChange={this.handleChange}
                                        placeholder="Sistema de turnos"
                                    />}
                                />
                            </Form.Group>
                            <Form.Group controlId="obligacionControlHorarios">
                                <TextoAyuda
                                    nombre="obligacionControlHorarios"
                                    tooltip="Obligación de control horario (si aplica o no el artículo 22° del código del trabajo)"
                                    componente={<Form.Control
                                        as="textarea"
                                        rows={this.state.rows}
                                        readOnly={!this.state.editable}
                                        value={this.state.obligacionControlHorarios}
                                        onChange={this.handleChange}
                                        placeholder="Obligación de control horario (si aplica o no el artículo 22° del código del trabajo)"
                                    />}
                                />
                            </Form.Group>
                            <Form.Group controlId="colacion">
                                <TextoAyuda
                                    nombre="colacion"
                                    tooltip="Colación (tiempo que tiene asignado, tiempo que se toma para almorzar, consignar si sale a almorzar o almuerza en el lugar de trabajo u oficina)"
                                    componente={<Form.Control
                                        as="textarea"
                                        rows={this.state.rows}
                                        readOnly={!this.state.editable}
                                        value={this.state.colacion}
                                        onChange={this.handleChange}
                                        placeholder="Colación (tiempo que asignado, tiempo que se toma para almorzar, consignar si sale a almorzar o almuerza en el lugar de trabajo u oficina)"
                                    />}
                                />
                            </Form.Group>
                            <Form.Group controlId="horasExtraordinarias">
                                <TextoAyuda
                                    nombre="horasExtraordinarias"
                                    tooltip="Horas extraordinarias (remuneradas y no remuneradas)"
                                    componente={<Form.Control
                                        as="textarea"
                                        rows={this.state.rows}
                                        readOnly={!this.state.editable}
                                        value={this.state.horasExtraordinarias}
                                        onChange={this.handleChange}
                                        placeholder="Horas extraordinarias (remuneradas y no remuneradas)"
                                    />}
                                />
                            </Form.Group>
                            <Form.Group controlId="tipoRemuneracion">
                                <TextoAyuda
                                    nombre="tipoRemuneracion"
                                    tooltip="Tipo de remuneración"
                                    componente={<Form.Control
                                        as="textarea"
                                        rows={this.state.rows}
                                        readOnly={!this.state.editable}
                                        value={this.state.tipoRemuneracion}
                                        onChange={this.handleChange}
                                        placeholder="Tipo de remuneración"
                                    />}
                                />
                            </Form.Group>
                            <Form.Group controlId="vacaciones">
                                <TextoAyuda
                                    nombre="vacaciones"
                                    tooltip="Vacaciones (días formal y cuánto se toma)"
                                    componente={<Form.Control
                                        as="textarea"
                                        rows={this.state.rows}
                                        readOnly={!this.state.editable}
                                        value={this.state.vacaciones}
                                        onChange={this.handleChange}
                                        placeholder="Vacaciones (días formal y cuánto se toma)"
                                    />}
                                />
                            </Form.Group>
                            <Form.Label><strong>5. Metodología de la evaluación</strong></Form.Label>

                            <Form.Group controlId="medicoSolicitante">
                                <Form.Label>a. Antecedentes Entrevista</Form.Label>
                                <TextoAyuda
                                    nombre="medicoSolicitante"
                                    tooltip="Médico evaluador o solicitante"
                                    componente={<Form.Control
                                        readOnly={!this.state.editable}
                                        value={this.state.medicoSolicitante}
                                        onChange={this.handleChange}
                                        placeholder="Médico evaluador o solicitante"
                                    />}
                                />
                            </Form.Group>
                            <Form.Group controlId="motivoConsulta">
                                <TextoAyuda
                                    nombre="motivoConsulta"
                                    tooltip="Queja y/o motivo de consulta (Escribir explícitamente lo que indica la DIEP u ODA. De acuerdo a lo referido por la paciente/médica)"
                                    componente={<Form.Control
                                        as="textarea"
                                        rows={this.state.rows}
                                        readOnly={!this.state.editable}
                                        value={this.state.motivoConsulta}
                                        onChange={this.handleChange}
                                        placeholder="Queja y/o motivo de consulta (Escribir explícitamente lo que indica la DIEP u ODA. De acuerdo a lo referido por la paciente/médico...)"
                                    />}
                                />
                            </Form.Group>
                            <Row>
                                <Col>
                                    <Form.Group controlId="fuente">
                                        <TextoAyuda
                                            nombre="fuente"
                                            tooltip="Fuente (DIEP, ODA, u otro medio de información)"
                                            componente={<Form.Control
                                                readOnly={!this.state.editable}
                                                value={this.state.fuente}
                                                onChange={this.handleChange}
                                                placeholder="Fuente (DIEP, ODA, u otro medio de información)"
                                            />}
                                        />
                                    </Form.Group>
                                </Col>
                                <Col>
                                    <Form.Group controlId="coordinacionEpt">
                                        <TextoAyuda
                                            nombre="coordinacionEpt"
                                            tooltip="Coordinación EPT (Con quién se coordinó internamente)"
                                            componente={<Form.Control
                                                readOnly={!this.state.editable}
                                                value={this.state.coordinacionEpt}
                                                onChange={this.handleChange}
                                                placeholder="Coordinación EPT (con quién se coordinó internamente)"
                                            />}
                                        />
                                    </Form.Group>
                                </Col>
                            </Row>
                            <Form.Label>b. Individualización del o los informantes clave aportado por la empresa (al menos 1 distinto al de/la trabajador/a). Consignar el nombre es obligatorio </Form.Label>

                            <Form.Group controlId="nombreInf1">
                                <Form.Label><strong><i>Informante 1</i></strong></Form.Label>
                                <TextoAyuda
                                    nombre="nombreInf1"
                                    tooltip="Nombre"
                                    componente={<Form.Control
                                        readOnly={!this.state.editable}
                                        value={this.state.nombreInf1}
                                        onChange={this.handleChange}
                                        placeholder="Nombre"
                                    />}
                                />
                            </Form.Group>
                            <Row>
                                <Col>
                                    <Form.Group controlId="cargoInf1">
                                        <TextoAyuda
                                            nombre="cargoInf1"
                                            tooltip="Cargo"
                                            componente={<Form.Control
                                                readOnly={!this.state.editable}
                                                value={this.state.cargoInf1}
                                                onChange={this.handleChange}
                                                placeholder="Cargo"
                                            />}
                                        />
                                    </Form.Group>
                                </Col>
                                <Col>
                                    <Form.Group controlId="relacionJerarquicaInf1">
                                        <TextoAyuda
                                            nombre="relacionJerarquicaInf1"
                                            tooltip="Relación jerarquica"
                                            componente={<Form.Control
                                                readOnly={!this.state.editable}
                                                value={this.state.relacionJerarquicaInf1}
                                                onChange={this.handleChange}
                                                placeholder="Relación jerarquica"
                                            />}
                                        />
                                    </Form.Group>
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <Form.Group controlId="tiempoConoceInf1">
                                        <TextoAyuda
                                            nombre="tiempoConoceInf1"
                                            tooltip="Hace cuánto tiempo lo conoce"
                                            componente={<Form.Control
                                                readOnly={!this.state.editable}
                                                value={this.state.tiempoConoceInf1}
                                                onChange={this.handleChange}
                                                placeholder="Hace cuánto tiempo lo conoce"
                                            />}
                                        />
                                    </Form.Group>
                                </Col>
                                <Col>
                                    <Form.Group controlId="aporteContactoInf1">
                                        <TextoAyuda
                                            nombre="aporteContactoInf1"
                                            tooltip="Por quien fue aportado este contacto (trabajador, jefatura, pares, otro)"
                                            componente={<Form.Control
                                                readOnly={!this.state.editable}
                                                value={this.state.aporteContactoInf1}
                                                onChange={this.handleChange}
                                                placeholder="Por quien fue aportado este contacto (trabajador, jefatura, pares, otros)"
                                            />}
                                        />
                                    </Form.Group>
                                </Col>
                            </Row>
                            <Form.Group controlId="fechaEntrevistaInf1">
                                <TextoAyuda
                                    nombre="fechaEntrevistaInf1"
                                    tooltip="Fecha, hora entrevista y duración entrevista"
                                    componente={<Form.Control
                                        as="textarea"
                                        rows={this.state.rows}
                                        readOnly={!this.state.editable}
                                        value={this.state.fechaEntrevistaInf1}
                                        onChange={this.handleChange}
                                        placeholder="Fecha, hora entrevista y duración entrevista"
                                    />}
                                />
                            </Form.Group>
                            <Form.Label>c. Individualización del o los informantes clave aportado por el trabajador (al menos 1 distinto al referido por empleador). Consignar el nombre es obligatorio </Form.Label>
                            <Form.Group controlId="nombreInf2">
                                <Form.Label><strong><i>Informante 2</i></strong></Form.Label>
                                <TextoAyuda
                                    nombre="nombreInf2"
                                    tooltip="Nombre"
                                    componente={<Form.Control
                                        readOnly={!this.state.editable}
                                        value={this.state.nombreInf2}
                                        onChange={this.handleChange}
                                        placeholder="Nombre"
                                    />}
                                />
                            </Form.Group>
                            <Row>
                                <Col>
                                    <Form.Group controlId="cargoInf2">
                                        <TextoAyuda
                                            nombre="cargoInf2"
                                            tooltip="Cargo"
                                            componente={<Form.Control
                                                readOnly={!this.state.editable}
                                                value={this.state.cargoInf2}
                                                onChange={this.handleChange}
                                                placeholder="Cargo"
                                            />}
                                        />
                                    </Form.Group>
                                </Col>
                                <Col>
                                    <Form.Group controlId="relacionJerarquicaInf2">
                                        <TextoAyuda
                                            nombre="relacionJerarquicaInf2"
                                            tooltip="Relación jerarquica"
                                            componente={<Form.Control
                                                value={this.state.relacionJerarquicaInf2}
                                                onChange={this.handleChange}
                                                placeholder="Relación jerarquica"
                                            />}
                                        />
                                    </Form.Group>
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <Form.Group controlId="tiempoConoceInf2">
                                        <TextoAyuda
                                            nombre="tiempoConoceInf2"
                                            tooltip="Hace cuánto tiempo lo conoce"
                                            componente={<Form.Control
                                                readOnly={!this.state.editable}
                                                value={this.state.tiempoConoceInf2}
                                                onChange={this.handleChange}
                                                placeholder="Hace cuánto tiempo lo conoce"
                                            />}
                                        />
                                    </Form.Group>
                                </Col>
                                <Col>
                                    <Form.Group controlId="aporteContactoInf2">
                                        <TextoAyuda
                                            nombre="aporteContactoInf2"
                                            tooltip="Por quien fue aportado este contacto (trabajador, jefatura, pares, otro)"
                                            componente={<Form.Control
                                                readOnly={!this.state.editable}
                                                value={this.state.aporteContactoInf2}
                                                onChange={this.handleChange}
                                                placeholder="Por quien fue aportado este contacto (trabajador, jefatura, pares, otros)"
                                            />}
                                        />
                                    </Form.Group>
                                </Col>
                            </Row>
                            <Form.Group controlId="fechaEntrevistaInf2">
                                <TextoAyuda
                                    nombre="fechaEntrevistaInf2"
                                    tooltip="Fecha, hora entrevista y duración entrevista"
                                    componente={<Form.Control
                                        as="textarea"
                                        rows={this.state.rows}
                                        readOnly={!this.state.editable}
                                        value={this.state.fechaEntrevistaInf2}
                                        onChange={this.handleChange}
                                        placeholder="Fecha, hora entrevista y duración entrevista"
                                    />}
                                />
                            </Form.Group>
                            <Form.Group controlId="nombreInf3">
                                <Form.Label><strong><i>Informante 3</i></strong></Form.Label>
                                <TextoAyuda
                                    nombre="nombreInf3"
                                    tooltip="Nombre"
                                    componente={<Form.Control
                                        readOnly={!this.state.editable}
                                        value={this.state.nombreInf3}
                                        onChange={this.handleChange}
                                        placeholder="Nombre"
                                    />}
                                />
                            </Form.Group>
                            <Row>
                                <Col>
                                    <Form.Group controlId="cargoInf3">
                                        <TextoAyuda
                                            nombre="cargoInf3"
                                            tooltip="Cargo"
                                            componente={<Form.Control
                                                readOnly={!this.state.editable}
                                                value={this.state.cargoInf3}
                                                onChange={this.handleChange}
                                                placeholder="Cargo"
                                            />}
                                        />
                                    </Form.Group>
                                </Col>
                                <Col>
                                    <Form.Group controlId="relacionJerarquicaInf3">
                                        <TextoAyuda
                                            nombre="relacionJerarquicaInf3"
                                            tooltip="Relación jerarquica"
                                            componente={<Form.Control
                                                readOnly={!this.state.editable}
                                                value={this.state.relacionJerarquicaInf3}
                                                onChange={this.handleChange}
                                                placeholder="Relación jerarquica"
                                            />}
                                        />
                                    </Form.Group>
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <Form.Group controlId="tiempoConoceInf3">
                                        <TextoAyuda
                                            nombre="tiempoConoceInf3"
                                            tooltip="Hace cuánto tiempo lo conoce"
                                            componente={<Form.Control
                                                readOnly={!this.state.editable}
                                                value={this.state.tiempoConoceInf3}
                                                onChange={this.handleChange}
                                                placeholder="Hace cuánto tiempo lo conoce"
                                            />}
                                        />
                                    </Form.Group>
                                </Col>
                                <Col>
                                    <Form.Group controlId="aporteContactoInf3">
                                        <TextoAyuda
                                            nombre="aporteContactoInf3"
                                            tooltip="Por quien fue aportado este contacto (trabajador, jefatura, pares, otro)"
                                            componente={<Form.Control
                                                readOnly={!this.state.editable}
                                                value={this.state.aporteContactoInf3}
                                                onChange={this.handleChange}
                                                placeholder="Por quien fue aportado este contacto (trabajador, jefatura, pares, otros)"
                                            />}
                                        />
                                    </Form.Group>
                                </Col>
                            </Row>
                            <Form.Group controlId="fechaEntrevistaInf3">
                                <TextoAyuda
                                    nombre="fechaEntrevistaInf3"
                                    tooltip="Fecha, hora entrevista y duración entrevista"
                                    componente={<Form.Control
                                        as="textarea"
                                        rows={this.state.rows}
                                        readOnly={!this.state.editable}
                                        value={this.state.fechaEntrevistaInf3}
                                        onChange={this.handleChange}
                                        placeholder="Fecha, hora entrevista y duración entrevista"
                                    />}
                                />
                            </Form.Group>
                            <Form.Group controlId="riesgoIndagar">
                                <TextoAyuda
                                    nombre="riesgoIndagar"
                                    tooltip="Riesgo (s) a indagar"
                                    componente={<Form.Control
                                        as="textarea"
                                        rows={this.state.rows}
                                        readOnly={!this.state.editable}
                                        value={this.state.riesgoIndagar}
                                        onChange={this.handleChange}
                                        placeholder="Riesgo(s) a indagar"
                                    />}
                                />
                            </Form.Group>
                            <Form.Label>d. En caso de falta de testigos </Form.Label>
                            <Form.Group controlId="motivoFaltaTestigos">
                                <TextoAyuda
                                    nombre="motivoFaltaTestigos"
                                    tooltip="Motivo de falta de testigos"
                                    componente={<Form.Control
                                        as="textarea"
                                        rows={this.state.rows}
                                        readOnly={!this.state.editable}
                                        value={this.state.motivoFaltaTestigos}
                                        onChange={this.handleChange}
                                        placeholder="Motivo de falta de testigos"
                                    />}
                                />
                            </Form.Group>
                            <Form.Group controlId="metodoSeleccion">
                                <TextoAyuda
                                    nombre="metodoSeleccion"
                                    tooltip="Método de selección de nuevos testigos"
                                    componente={<Form.Control
                                        as="textarea"
                                        rows={this.state.rows}
                                        readOnly={!this.state.editable}
                                        value={this.state.metodoSeleccion}
                                        onChange={this.handleChange}
                                        placeholder="Método de selección de nuevos testigos"
                                    />}
                                />
                            </Form.Group>
                            <Form.Label>e. Registro de las condiciones de confidencialidad</Form.Label>
                            <Form.Group controlId="registroConfidencialidad">
                                <TextoAyuda
                                    nombre="registroConfidencialidad"
                                    tooltip="Registro de las condiciones de confidencialidad"
                                    componente={<Form.Control
                                        as="textarea"
                                        rows={this.state.rows}
                                        readOnly={!this.state.editable}
                                        value={this.state.registroConfidencialidad}
                                        onChange={this.handleChange}
                                        placeholder="Registro de las condiciones de confidencialidad"
                                    />}
                                />
                            </Form.Group>
                            <Form.Label><strong>6. Áreas de exploración en EPT-SM</strong></Form.Label>

                            <Form.Group controlId="cargo">
                                <Form.Label><strong><i>Área: Dinámica de trabajo</i></strong></Form.Label>
                                <Form.Group><Form.Label><i>Agente de riesgo: Diseño de la tarea y/o puesto de trabajo</i></Form.Label></Form.Group>

                                <TextoAyuda
                                    nombre="cargo"
                                    tooltip="Cargo de trabajo"
                                    componente={<Form.Control
                                        as="textarea"
                                        rows={this.state.rows}
                                        readOnly={!this.state.editable}
                                        value={this.state.cargo}
                                        onChange={this.handleChange}
                                        placeholder="Carga de trabajo"
                                    />}
                                />
                            </Form.Group>
                            <Form.Group controlId="descansos">
                                <TextoAyuda
                                    nombre="descansos"
                                    tooltip="Descansos"
                                    componente={<Form.Control
                                        as="textarea"
                                        rows={this.state.rows}
                                        readOnly={!this.state.editable}
                                        value={this.state.descansos}
                                        onChange={this.handleChange}
                                        placeholder="Descansos"
                                    />}
                                />
                            </Form.Group>
                            <Form.Group controlId="controlTiempo">
                                <TextoAyuda
                                    nombre="controlTiempo"
                                    tooltip="Control sobre el tiempo de trabajo"
                                    componente={<Form.Control
                                        as="textarea"
                                        rows={this.state.rows}
                                        readOnly={!this.state.editable}
                                        value={this.state.controlTiempo}
                                        onChange={this.handleChange}
                                        placeholder="Control sobre el tiempo de trabajo"
                                    />}
                                />
                            </Form.Group>
                            <Form.Group controlId="capacitacion">
                                <TextoAyuda
                                    nombre="capacitacion"
                                    tooltip="Capacitación/habilitación para la tarea"
                                    componente={<Form.Control
                                        as="textarea"
                                        rows={this.state.rows}
                                        readOnly={!this.state.editable}
                                        value={this.state.capacitacion}
                                        onChange={this.handleChange}
                                        placeholder="Capacitación/habilitación para la tarea"
                                    />}
                                />
                            </Form.Group>
                            <Form.Group controlId="variedadTarea">
                                <TextoAyuda
                                    nombre="variedadTarea"
                                    tooltip="Variedad de la tarea"
                                    componente={<Form.Control
                                        as="textarea"
                                        rows={this.state.rows}
                                        readOnly={!this.state.editable}
                                        value={this.state.variedadTarea}
                                        onChange={this.handleChange}
                                        placeholder="Variedad de la tarea"
                                    />}
                                />
                            </Form.Group>
                            <Form.Group controlId="demandasPsicologicas">
                                <TextoAyuda
                                    nombre="demandasPsicologicas"
                                    tooltip="Demandas psicológicas"
                                    componente={<Form.Control
                                        as="textarea"
                                        rows={this.state.rows}
                                        readOnly={!this.state.editable}
                                        value={this.state.demandasPsicologicas}
                                        onChange={this.handleChange}
                                        placeholder="Demandas psicológicas"
                                    />}
                                />
                            </Form.Group>


                            <Form.Group controlId="autonomiaControl">
                                <Form.Label><strong><i>Área: contexto del trabajo</i></strong></Form.Label>
                                <Form.Group><Form.Label><i>Agente de riesgo: Características organizacionales</i></Form.Label></Form.Group>
                                <TextoAyuda
                                    nombre="autonomiaControl"
                                    tooltip="Autonomía y control"
                                    componente={<Form.Control
                                        as="textarea"
                                        rows={this.state.rows}
                                        readOnly={!this.state.editable}
                                        value={this.state.autonomiaControl}
                                        onChange={this.handleChange}
                                        placeholder="Autonomía y control"
                                    />}
                                />
                            </Form.Group>
                            <Form.Group controlId="ambiguedad">
                                <TextoAyuda
                                    nombre="ambiguedad"
                                    tooltip="Ambigüedad o conflicto de rol"
                                    componente={<Form.Control
                                        as="textarea"
                                        rows={this.state.rows}
                                        readOnly={!this.state.editable}
                                        value={this.state.ambiguedad}
                                        onChange={this.handleChange}
                                        placeholder="Ambigüedad o conflicto de rol"
                                    />}
                                />
                            </Form.Group>
                            <Form.Group controlId="apoyoSocial">
                                <TextoAyuda
                                    nombre="apoyoSocial"
                                    tooltip="Apoyo social de la empresa"
                                    componente={<Form.Control
                                        as="textarea"
                                        rows={this.state.rows}
                                        readOnly={!this.state.editable}
                                        value={this.state.apoyoSocial}
                                        onChange={this.handleChange}
                                        placeholder="Apoyo social de la empresa"
                                    />}
                                />
                            </Form.Group>
                            <Form.Group controlId="incorporacionTec">
                                <TextoAyuda
                                    nombre="incorporacionTec"
                                    tooltip="Incorporación de nuevas tecnologías"
                                    componente={<Form.Control
                                        as="textarea"
                                        rows={this.state.rows}
                                        readOnly={!this.state.editable}
                                        value={this.state.incorporacionTec}
                                        onChange={this.handleChange}
                                        placeholder="Incorporación de nuevas tecnologías"
                                    />}
                                />
                            </Form.Group>
                            <Form.Group controlId="conflictosInterpersonales">
                                <TextoAyuda
                                    nombre="conflictosInterpersonales"
                                    tooltip="Conflictos interpersonales recurrentes"
                                    componente={<Form.Control
                                        as="textarea"
                                        rows={this.state.rows}
                                        readOnly={!this.state.editable}
                                        value={this.state.conflictosInterpersonales}
                                        onChange={this.handleChange}
                                        placeholder="Conflictos interpersonales recurrentes"
                                    />}
                                />
                            </Form.Group>
                            <Form.Group controlId="condicionesHostiles">
                                <TextoAyuda
                                    nombre="condicionesHostiles"
                                    tooltip="Condiciones organizacionales hostiles"
                                    componente={<Form.Control
                                        as="textarea"
                                        rows={this.state.rows}
                                        readOnly={!this.state.editable}
                                        value={this.state.condicionesHostiles}
                                        onChange={this.handleChange}
                                        placeholder="Condiciones organizacionales hostiles"
                                    />}
                                />
                            </Form.Group>
                            <Form.Group controlId="condicionesDeficientes">
                                <TextoAyuda
                                    nombre="condicionesDeficientes"
                                    tooltip="Condiciones Físicas o ergonómicas deficientes"
                                    componente={<Form.Control
                                        as="textarea"
                                        rows={this.state.rows}
                                        readOnly={!this.state.editable}
                                        value={this.state.condicionesDeficientes}
                                        onChange={this.handleChange}
                                        placeholder="Condiciones Físicas o ergonómicas deficientes"
                                    />}
                                />
                            </Form.Group>
                            <Form.Group controlId="condicionesAgravantes">
                                <TextoAyuda
                                    nombre="condicionesAgravantes"
                                    tooltip="Condiciones del ambiente agravantes"
                                    componente={<Form.Control
                                        as="textarea"
                                        rows={this.state.rows}
                                        readOnly={!this.state.editable}
                                        value={this.state.condicionesAgravantes}
                                        onChange={this.handleChange}
                                        placeholder="Condiciones del ambiente agravantes"
                                    />}
                                />
                            </Form.Group>
                            <Form.Label><i>Agente de riesgo: Relaciones Interpersonales</i></Form.Label>
                            <Form.Group controlId="relacionTrabajadorCompaneros">
                                <TextoAyuda
                                    nombre="relacionTrabajadorCompaneros"
                                    tooltip="Relación trabajador - compañeros"
                                    componente={<Form.Control
                                        as="textarea"
                                        rows={this.state.rows}
                                        readOnly={!this.state.editable}
                                        value={this.state.relacionTrabajadorCompaneros}
                                        onChange={this.handleChange}
                                        placeholder="Relación trabajador - compañeros"
                                    />}
                                />
                            </Form.Group>
                            <Form.Group controlId="relacionSuperiorJerarquico">
                                <TextoAyuda
                                    nombre="relacionSuperiorJerarquico"
                                    tooltip="Relación trabajador - superior jerárquico"
                                    componente={<Form.Control
                                        as="textarea"
                                        rows={this.state.rows}
                                        readOnly={!this.state.editable}
                                        value={this.state.relacionSuperiorJerarquico}
                                        onChange={this.handleChange}
                                        placeholder="Relación trabajador - supervisor jerárquico"
                                    />}
                                />
                            </Form.Group>
                            <Form.Group controlId="relacionTrabajadorSuboordinados">
                                <TextoAyuda
                                    nombre="relacionTrabajadorSuboordinados"
                                    tooltip="Relación trabajador - subordinados"
                                    componente={<Form.Control
                                        as="textarea"
                                        rows={this.state.rows}
                                        readOnly={!this.state.editable}
                                        value={this.state.relacionTrabajadorSuboordinados}
                                        onChange={this.handleChange}
                                        placeholder="Relación trabajador - subordinados"
                                    />}
                                />
                            </Form.Group>
                            <Form.Group controlId="relacionTrabajadorUsuarios">
                                <TextoAyuda
                                    nombre="relacionTrabajadorUsuarios"
                                    tooltip="Relación trabajador - usuarios, clientes, proveedores, alumnos, apoderados."
                                    componente={<Form.Control
                                        as="textarea"
                                        rows={this.state.rows}
                                        readOnly={!this.state.editable}
                                        value={this.state.relacionTrabajadorUsuarios}
                                        onChange={this.handleChange}
                                        placeholder="Relación trabajador - usuarios, clientes, proveedores, alumnos, apoderados."
                                    />}
                                />
                            </Form.Group>
                            <Form.Group controlId="climaLaboralGeneral">
                                <TextoAyuda
                                    nombre="climaLaboralGeneral"
                                    tooltip="Clima laboral general"
                                    componente={<Form.Control
                                        as="textarea"
                                        rows={this.state.rows}
                                        readOnly={!this.state.editable}
                                        value={this.state.climaLaboralGeneral}
                                        onChange={this.handleChange}
                                        placeholder="Clima laboral general"
                                    />}
                                />
                            </Form.Group>
                            <Form.Label><i>Agente de riesgo: Liderazgo y acoso</i></Form.Label>
                            <Form.Group controlId="liderazgo">
                                <TextoAyuda
                                    nombre="liderazgo"
                                    tooltip="Liderazgo"
                                    componente={<Form.Control
                                        as="textarea"
                                        rows={this.state.rows}
                                        readOnly={!this.state.editable}
                                        value={this.state.liderazgo}
                                        onChange={this.handleChange}
                                        placeholder="Liderazgo"
                                    />}
                                />
                            </Form.Group>
                            <Form.Group controlId="conductasAcosoLaboral">
                                <TextoAyuda
                                    nombre="conductasAcosoLaboral"
                                    tooltip="Conductas de acoso laboral"
                                    componente={<Form.Control
                                        as="textarea"
                                        rows={this.state.rows}
                                        readOnly={!this.state.editable}
                                        value={this.state.conductasAcosoLaboral}
                                        onChange={this.handleChange}
                                        placeholder="Conductas de acoso laboral"
                                    />}
                                />
                            </Form.Group>
                            <Form.Group controlId="conductasAcosoSexual">
                                <TextoAyuda
                                    nombre="conductasAcosoSexual"
                                    tooltip="Conductas de acoso sexual"
                                    componente={<Form.Control
                                        as="textarea"
                                        rows={this.state.rows}
                                        readOnly={!this.state.editable}
                                        value={this.state.conductasAcosoSexual}
                                        onChange={this.handleChange}
                                        placeholder="Conductas de acoso sexual"
                                    />}
                                />
                            </Form.Group>
                            <Form.Label><strong>7. Levantamiento de riesgos</strong></Form.Label>
                            <Form.Group controlId="opinionEmpresaTrabajador">
                                <TextoAyuda
                                    nombre="opinionEmpresaTrabajador"
                                    tooltip="Opinión de la empresa respecto al trabajador"
                                    componente={<Form.Control
                                        as="textarea"
                                        rows={this.state.rows}
                                        readOnly={!this.state.editable}
                                        value={this.state.opinionEmpresaTrabajador}
                                        onChange={this.handleChange}
                                        placeholder="Opinión de la empresa respecto al trabajador"
                                    />}
                                />
                            </Form.Group>
                            <Form.Group controlId="factoresRiesgoEmpresa">
                                <TextoAyuda
                                    nombre="factoresRiesgoEmpresa"
                                    tooltip="Identificación de factores de riesgo por la empresa"
                                    componente={<Form.Control
                                        as="textarea"
                                        rows={this.state.rows}
                                        readOnly={!this.state.editable}
                                        value={this.state.factoresRiesgoEmpresa}
                                        onChange={this.handleChange}
                                        placeholder="Identificación de factores de riesgo por la empresa"
                                    />}
                                />
                            </Form.Group>
                            <Form.Group controlId="accionesMitigacion">
                                <TextoAyuda
                                    nombre="accionesMitigacion"
                                    tooltip="Acciones de mitigación"
                                    componente={<Form.Control
                                        as="textarea"
                                        rows={this.state.rows}
                                        readOnly={!this.state.editable}
                                        value={this.state.accionesMitigacion}
                                        onChange={this.handleChange}
                                        placeholder="Acciones de mitigación"
                                    />}
                                />
                            </Form.Group>
                            <Form.Label><strong>8. Otros antecedentes y observaciones</strong></Form.Label>
                            <Form.Group controlId="observaciones">
                                <TextoAyuda
                                    nombre="observaciones"
                                    tooltip="Observaciones"
                                    componente={<Form.Control
                                        as="textarea"
                                        rows={this.state.rows}
                                        readOnly={!this.state.editable}
                                        value={this.state.observaciones}
                                        onChange={this.handleChange}
                                        placeholder="Observaciones"
                                    />}
                                />
                            </Form.Group>
                            <Form.Label><strong>9. Conclusión</strong></Form.Label>
                            <Form.Group controlId="conclusion">
                                <TextoAyuda
                                    nombre="conclusion"
                                    tooltip="Conclusión"
                                    componente={<Form.Control
                                        as="textarea"
                                        rows={this.state.rows}
                                        readOnly={!this.state.editable}
                                        value={this.state.conclusion}
                                        onChange={this.handleChange}
                                        placeholder="Conclusión"
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
                </div></div>
        );
    }
}