import React, { Component } from 'react'
import { Form, Col, Button, Row } from 'react-bootstrap'
import { Option } from '../../../components/Option'
import DatePicker from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css";
import { TextoAyuda } from '../../../components/TextoAyuda'

const motivos = ["Derivación", "Consulta espontanea"]
const anamnesisRemotaLista = ["hta",
    "dm",
    "tbc",
    "epi",
    "tec",
    "pTiroideos",
    "alergias",
    "cirugias",
    "hospitalizacion",
    "accidentes",
    "antPsiquiatricos",
    "intentosSuicidas"]
const antGinecoObstetricosLista = ["menarquia",
    "menopausia",
    "gpa",
    "ets",
    "fur",
    "tipo"]
const habitosLista = ["oh",
    "thc",
    "tabaco",
    "alucinogeno",
    "anorexigeno",
    "estimulante",
    "solvente",]

export class EntrevistaPsiquiatrica extends Component {


    constructor(props) {
        super(props);

        this.state = {
            fechaEntrevista: null,
            motivo: "",
            observacion: "",
            detalleMotivoPaciente: "",
            anamnesisProxima: "",
            hipotesisDiagnosticaDSMV: "",
            impresionesClinicas: "",
            hta: false,
            dm: false,
            tbc: false,
            epi: false,
            tec: false,
            pTiroideos: false,
            alergias: false,
            cirugias: false,
            hospitalizacion: false,
            accidentes: false,
            antPsiquiatricos: false,
            intentosSuicidas: false,
            observacionesAnamnesisRemota: "",
            menarquia: false,
            menopausia: false,
            gpa: false,
            ets: false,
            fur: false,
            tipo: false,
            observacionesAntGinecoObstetricos: "",
            oh: false,
            thc: false,
            tabaco: false,
            alucinogeno: false,
            anorexigeno: false,
            estimulante: false,
            solvente: false,
            otro: "",
            observacionesHabitos: "",
            medicos: "",
            psiquiatricos: "",
            depresion: "",
            ohDrigas: "",
            suicidios: "",
            homicidios: "",
            otrosAntecedesFamiliares: "",
            farmacos: "",
            entrevistaSignificantesAfectivos: "",
            examenesLaboratorio: "",
            derivacion: "",
            coordinacionPsicoterapeuta: "",
            coordinacionCentroDerivacion: "",
            instrumentosAplicar: "",
            cuidadoFamiliar: "",
            proximoControl: "",
            observacionesIndicacionesPlanTratamiento: "",

        };
    }


    _handleChange = (date) => {
        this.setState({
            fechaEntrevista: date
        });
    }

    handleChange = event => {
        this.setState({
            [event.target.id]: event.target.value
        });
    }

    handleSubmit = event => {
        event.preventDefault();
        const email = this.inputEmail.value
        const pwd = this.inputPwd.value
        console.log({ email, pwd });

    }

    render() {
        return (
            <div className="EntrevistaPsiquiatrica">
                <form onSubmit={this.handleSubmit}>
                    <Form.Row>
                        <Form.Group as={Col}>
                            <Form.Group controlId="fechaEntrevista">

                                <div>
                                    <TextoAyuda
                                        nombre="fecha de entrevista"
                                        tooltip="Fecha de entrevista"
                                        componente={<DatePicker
                                            customInput={<Form.Control />}
                                            dateFormat="dd/MM/yyyy"
                                            selected={this.state.fechaEntrevista}
                                            onChange={this._handleChange}
                                            placeholderText="Fecha de entrevista"
                                        />}
                                    />

                                </div>
                            </Form.Group>
                            <Form.Group controlId="motivo">
                                <Form.Label>Motivo de derivación o consulta</Form.Label>
                                <Form.Control
                                    as="select"
                                    value={this.state.motivo}
                                    onChange={this.handleChange}
                                >
                                    <Option options={motivos} />
                                </Form.Control>
                            </Form.Group>
                            <Form.Group controlId="observacion">
                                <TextoAyuda
                                    nombre="observacion"
                                    tooltip="Observación"
                                    componente={<Form.Control
                                        as="textarea"
                                        rows="3"
                                        value={this.state.observacion}
                                        onChange={this.handleChange}
                                        placeholder="Observación"
                                    />}
                                />

                            </Form.Group>
                            <Form.Group controlId="detalleMotivoPaciente">
                                <Form.Label>Detallar motivo de consulta del paciente</Form.Label>
                                <Form.Control
                                    as="textarea"
                                    rows="5"
                                    value={this.state.detalleMotivoPaciente}
                                    onChange={this.handleChange}
                                    placeholder="Detalle motivo de consulta del paciente"
                                />
                            </Form.Group>
                            <Form.Group controlId="anamnesisProxima">
                                <Form.Label>Anamnesis próxima</Form.Label>
                                <Form.Control
                                    as="textarea"
                                    rows="5"
                                    value={this.state.anamnesisProxima}
                                    onChange={this.handleChange}
                                    placeholder="Anamnesis próxima"
                                />
                            </Form.Group>
                            <Form.Group controlId="AnamnesisRemota">
                                <Form.Label>Anamnesis remota</Form.Label>
                                <Row>
                                    <Col>
                                        <Form.Group controlId="anamnesisRemotaCheckBox">
                                            <Col>
                                                {anamnesisRemotaLista.slice(0, 4).map((name, i) => (
                                                    <Form.Check
                                                        custom
                                                        value={this.state.name}
                                                        onChange={this.handleChange}
                                                        label={name}
                                                        type="checkbox"
                                                        id={`custom-inline-checkbox-${i}`}
                                                    />
                                                ))}
                                            </Col>
                                        </Form.Group>
                                    </Col>
                                    <Col>
                                        <Form.Group controlId="anamnesisRemotaCheckBox1">
                                            <Col>
                                                {anamnesisRemotaLista.slice(4, 8).map((name, i) => (
                                                    <Form.Check
                                                        custom
                                                        value={this.state.name}
                                                        onChange={this.handleChange}
                                                        label={name}
                                                        type="checkbox"
                                                        id={`custom-inline-checkbox1-${i}`}
                                                    />
                                                ))}
                                            </Col>
                                        </Form.Group>
                                    </Col>
                                    <Col>
                                        <Form.Group controlId="anamnesisRemotaCheckBox2">
                                            <Col>
                                                {anamnesisRemotaLista.slice(8, 12).map((name, i) => (
                                                    <Form.Check
                                                        custom
                                                        value={this.state.name}
                                                        onChange={this.handleChange}
                                                        label={name}
                                                        type="checkbox"
                                                        id={`custom-inline-checkbox2-${i}`}
                                                    />
                                                ))}
                                            </Col>
                                        </Form.Group>
                                    </Col>



                                </Row>
                                <Form.Group controlId="observacionesAnamnesisRemota">
                                    <TextoAyuda
                                        nombre="observacionesAnamnesisRemota"
                                        tooltip="Observación"
                                        componente={<Form.Control
                                            as="textarea"
                                            rows="3"
                                            value={this.state.observacionesAnamnesisRemota}
                                            onChange={this.handleChange}
                                            placeholder="Observación"
                                        />}
                                    />

                                </Form.Group>
                            </Form.Group>

                            <Form.Group controlId="antGinecoObstetricos">
                                <Form.Label>Antecedentes gineco-Obstétricos</Form.Label>
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

                            <Form.Group controlId="habitos">
                                <Form.Label>Habitos</Form.Label>
                                <Row>
                                    <Col>
                                        <Form.Group controlId="habitosCheckBox">
                                            <Col>
                                                {habitosLista.slice(0, 4).map((name, i) => (
                                                    <Form.Check
                                                        custom
                                                        value={this.state.name}
                                                        onChange={this.handleChange}
                                                        label={name}
                                                        type="checkbox"
                                                        id={`habitos${i}`}
                                                    />
                                                ))}
                                            </Col>
                                        </Form.Group>
                                    </Col>
                                    <Col>
                                        <Form.Group controlId="habitosCheckBox1">
                                            <Col>
                                                {habitosLista.slice(4, 7).map((name, i) => (
                                                    <Form.Check
                                                        custom
                                                        value={this.state.name}
                                                        onChange={this.handleChange}
                                                        label={name}
                                                        type="checkbox"
                                                        id={`habitos1${i}`}
                                                    />
                                                ))}
                                            </Col>
                                        </Form.Group>
                                        <Form.Group controlId="otro">
                                            <TextoAyuda
                                                nombre="otro"
                                                tooltip="Otros"
                                                componente={<Form.Control
                                                    value={this.state.otro}
                                                    onChange={this.handleChange}
                                                    placeholder="Otros (indicar)"
                                                />}
                                            />

                                        </Form.Group>
                                    </Col>
                                </Row>
                                <Form.Group controlId="observacionesHabitos">
                                    <TextoAyuda
                                        nombre="observacionesHabitos"
                                        tooltip="Observación"
                                        componente={<Form.Control
                                            as="textarea"
                                            rows="3"
                                            value={this.state.observacionesHabitos}
                                            onChange={this.handleChange}
                                            placeholder="Observación"
                                        />}
                                    />

                                </Form.Group>
                            </Form.Group>
                            <Form.Group controlId="antecedentesFamiliares">
                                <Form.Label>Antecedentes familiares</Form.Label>
                                <Form.Group controlId="medicos">
                                    <TextoAyuda
                                        nombre="medicos"
                                        tooltip="Médicos"
                                        componente={<Form.Control
                                            as="textarea"
                                            rows="3"
                                            value={this.state.medicos}
                                            onChange={this.handleChange}
                                            placeholder="Médicos"
                                        />}
                                    />

                                </Form.Group>
                                <Form.Group controlId="psiquiatricos">
                                    <TextoAyuda
                                        nombre="psiquiatricos"
                                        tooltip="Psiquiátricos"
                                        componente={<Form.Control
                                            as="textarea"
                                            rows="3"
                                            value={this.state.psiquiatricos}
                                            onChange={this.handleChange}
                                            placeholder="Psiquiátricos"
                                        />}
                                    />

                                </Form.Group>
                                <Form.Group controlId="depresion">
                                    <TextoAyuda
                                        nombre="depresion"
                                        tooltip="Depresión"
                                        componente={<Form.Control
                                            value={this.state.depresion}
                                            onChange={this.handleChange}
                                            placeholder="Depresión"
                                        />}
                                    />

                                </Form.Group>
                                <Form.Group controlId="ohDrogas">
                                    <TextoAyuda
                                        nombre="ohDrogas"
                                        tooltip="OH/Drogas"
                                        componente={<Form.Control
                                            value={this.state.ohDrigas}
                                            onChange={this.handleChange}
                                            placeholder="OH/Drogas"
                                        />}
                                    />

                                </Form.Group>
                                <Form.Group controlId="suicidios">
                                    <TextoAyuda
                                        nombre="suicidios"
                                        tooltip="Suicidios"
                                        componente={<Form.Control
                                            value={this.state.suicidios}
                                            onChange={this.handleChange}
                                            placeholder="Suicidios"
                                        />}
                                    />

                                </Form.Group>
                                <Form.Group controlId="homicidios">
                                    <TextoAyuda
                                        nombre="homicidios"
                                        tooltip="Homicidios"
                                        componente={<Form.Control
                                            value={this.state.homicidios}
                                            onChange={this.handleChange}
                                            placeholder="Homicidios"
                                        />}
                                    />

                                </Form.Group>
                                <Form.Group controlId="otrosAntecedentesFamiliares">
                                    <TextoAyuda
                                        nombre="otrosAntecedentesFamiliares"
                                        tooltip="Otros"
                                        componente={<Form.Control
                                            value={this.state.otrosAntecedesFamiliares}
                                            onChange={this.handleChange}
                                            placeholder="Otros"
                                        />}
                                    />

                                </Form.Group>
                            </Form.Group>

                            <Form.Group controlId="hipotesisDSMV">
                                <Form.Label>Hipotesis diagnosticas según DSM V</Form.Label>
                                <Form.Group controlId="hipotesisDiagnosticaDSMV">
                                    <Form.Control
                                        as="textarea"
                                        rows="5"
                                        value={this.state.hipotesisDiagnosticaDSMV}
                                        onChange={this.handleChange}
                                        placeholder="Hipotesis diagnostica según DSM V"
                                    />
                                </Form.Group>
                                <Form.Group controlId="impresionesClinicas">
                                    <TextoAyuda
                                        nombre="impresionesClinicas"
                                        tooltip="Impresiones Clínicas"
                                        componente={<Form.Control
                                            as="textarea"
                                            rows="3"
                                            value={this.state.impresionesClinicas}
                                            onChange={this.handleChange}
                                            placeholder="Impresiones Clínicas"
                                        />}
                                    />

                                </Form.Group>
                            </Form.Group>
                            <Form.Group controlId="indicacionesPlanTratamiento">
                                <Form.Label>Indicaciones y plan de tratamiento</Form.Label>
                                <Form.Group controlId="farmacos">
                                    <TextoAyuda
                                        nombre="farmacos"
                                        tooltip="Fármacos"
                                        componente={<Form.Control
                                            as="textarea"
                                            rows="3"
                                            value={this.state.farmacos}
                                            onChange={this.handleChange}
                                            placeholder="Fármacos"
                                        />}
                                    />

                                </Form.Group>
                                <Form.Group controlId="entrevistaSignificantesAfectivos">
                                    <TextoAyuda
                                        nombre="entrevistaSignificantesAfectivos"
                                        tooltip="Entrevista a significantes afectivos"
                                        componente={<Form.Control
                                            as="textarea"
                                            rows="3"
                                            value={this.state.entrevistaSignificantesAfectivos}
                                            onChange={this.handleChange}
                                            placeholder="Entrevista a significantes afectivos"
                                        />}
                                    />

                                </Form.Group>
                                <Form.Group controlId="examenesLaboratorio">
                                    <TextoAyuda
                                        nombre="examenesLaboratorio"
                                        tooltip="Exámenes laboratorio"
                                        componente={<Form.Control
                                            as="textarea"
                                            rows="3"
                                            value={this.state.examenesLaboratorio}
                                            onChange={this.handleChange}
                                            placeholder="Exámenes laboratorio"
                                        />}
                                    />

                                </Form.Group>
                                <Form.Group controlId="derivacion">
                                    <TextoAyuda
                                        nombre="derivacion"
                                        tooltip="Derivación"
                                        componente={<Form.Control
                                            as="textarea"
                                            rows="3"
                                            value={this.state.derivacion}
                                            onChange={this.handleChange}
                                            placeholder="Derivación"
                                        />}
                                    />

                                </Form.Group>
                                <Form.Group controlId="coordinacionPsicoterapeuta">
                                    <TextoAyuda
                                        nombre="coordinacionPsicoterapeuta"
                                        tooltip="Coordinación con psicoterapeuta"
                                        componente={<Form.Control
                                            as="textarea"
                                            rows="3"
                                            value={this.state.coordinacionPsicoterapeuta}
                                            onChange={this.handleChange}
                                            placeholder="Coordinación con psicoterapeuta"
                                        />}
                                    />

                                </Form.Group>
                                <Form.Group controlId="coordinacionCentroDerivacion">
                                    <TextoAyuda
                                        nombre="coordinacionCentroDerivacion"
                                        tooltip="Coordinación con centro de derivación"
                                        componente={<Form.Control
                                            as="textarea"
                                            rows="3"
                                            value={this.state.coordinacionCentroDerivacion}
                                            onChange={this.handleChange}
                                            placeholder="Coordinación con Centro de Derivación"
                                        />}
                                    />

                                </Form.Group>
                                <Form.Group controlId="instrumentosAplicar">
                                    <TextoAyuda
                                        nombre="instrumentosAplicar"
                                        tooltip="Instrumentos a aplicar"
                                        componente={<Form.Control
                                            as="textarea"
                                            rows="3"
                                            value={this.state.instrumentosAplicar}
                                            onChange={this.handleChange}
                                            placeholder="Instrumentos a aplicar"
                                        />}
                                    />

                                </Form.Group>
                                <Form.Group controlId="cuidadoFamiliar">
                                    <TextoAyuda
                                        nombre="cuidadoFamiliar"
                                        tooltip="Cuidado familiar"
                                        componente={<Form.Control
                                            as="textarea"
                                            rows="3"
                                            value={this.state.cuidadoFamiliar}
                                            onChange={this.handleChange}
                                            placeholder="Cuidado familiar"
                                        />}
                                    />

                                </Form.Group>
                                <Form.Group controlId="proximoControl">
                                    <TextoAyuda
                                        nombre="proximoControl"
                                        tooltip="Próximo control"
                                        componente={<Form.Control
                                            as="textarea"
                                            rows="3"
                                            value={this.state.proximoControl}
                                            onChange={this.handleChange}
                                            placeholder="Próximo control"
                                        />}
                                    />

                                </Form.Group>
                                <Form.Group controlId="observacionesIndicacionesPlanTratamiento">
                                    <TextoAyuda
                                        nombre="observacionesIndicacionesPlanTratamiento"
                                        tooltip="Observaciones"
                                        componente={<Form.Control
                                            as="textarea"
                                            rows="3"
                                            value={this.state.observacionesIndicacionesPlanTratamiento}
                                            onChange={this.handleChange}
                                            placeholder="Observaciones"
                                        />}
                                    />

                                </Form.Group>
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