import React, { Component } from 'react'
import { Form, Col, Button, Row } from 'react-bootstrap'
import { Option } from '../../../../components/Option'
import { TextoAyuda } from '../../../../components/TextoAyuda'

import { TablaFamiliar } from '../../../../components/TablaFamiliar'
import { ModalFamiliar } from '../../../../components/ModalFamiliar'

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
            menarquia: false,
            menopausia: false,
            gpa: false,
            ets: false,
            fur: false,
            tipo: false,
            observacionesAntGinecoObstetricos: "",
            eje1: "",
            eje2: "",
            eje3: "",
            eje4: "",
            eeg: "",
            impresionesClinicas: "",
            conclusionesEvaluacion: "",//agregar a tabla,
            show: false,
            familia: []

        };
    }

    handleChange = event => {
        this.setState({
            [event.target.id]: event.target.value
        });
    }

    _handleClose = (modalEvt) => {
        this.setState({ show: modalEvt });
    }

    _handleModalSubmit = (modalInfo ) => {

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

    handleSubmit = event => {
        event.preventDefault();
        const email = this.inputEmail.value
        const pwd = this.inputPwd.value
        console.log({ email, pwd });

    }

    render() {
        return (
            <div className="entrevistaPsiquiatra">
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
                                    <Form.Group controlId="actividad">
                                        <TextoAyuda
                                            nombre="actividad"
                                            tooltip="Actividad"
                                            componente={<Form.Control
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
                                <Button className= "btn-custom" onClick={this._handleShow}> Agregar integrante familia</Button>
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
                                        rows="8"
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
                                        rows="3"
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
                                        rows="3"
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
                                        rows="3"
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
                                        rows="3"
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
                                        rows="3"
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
                                        rows="3"
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
                                        rows="3"
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
                                        rows="3"
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
                                        rows="3"
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
                                        rows="3"
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
                                        rows="3"
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
                                        rows="8"
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
                                        rows="8"
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
                                        rows="8"
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
                                        rows="8"
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
                                        rows="8"
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
                                                {antGinecoObstetricosLista.slice(0, 3).map((name, i) => (
                                                    <Form.Check
                                                        custom
                                                        value={this.state.name}
                                                        onChange={this.handleChange}
                                                        label={name}
                                                        type="checkbox"
                                                        id={`antGinecoObstetricos${i}`}
                                                    />
                                                ))}
                                            </Col>
                                        </Form.Group>
                                    </Col>
                                    <Col>
                                        <Form.Group controlId="antGinecoObstetricosCheckBox1">
                                            <Col>
                                                {antGinecoObstetricosLista.slice(3, 6).map((name, i) => (
                                                    <Form.Check
                                                        custom
                                                        value={this.state.name}
                                                        onChange={this.handleChange}
                                                        label={name}
                                                        type="checkbox"
                                                        id={`antGinecoObstetricos1${i}`}
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
                                            rows="3"
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
                                        rows="6"
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
                                        rows="2"
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
                                        rows="2"
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
                                        rows="2"
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
                                        rows="2"
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
                                        rows="4"
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
                                        rows="8"
                                        value={this.state.conclusionesEvaluacion}
                                        onChange={this.handleChange}
                                        placeholder="Conclusiones"
                                    />}
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

                </form>
            </div>
        );
    }
}