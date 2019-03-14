import React, { Component } from 'react'
import { Form, Col, Button, Row } from 'react-bootstrap'
import { Option } from '../../../components/Option'
import DatePicker from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css";
import { TextoAyuda } from '../../../components/TextoAyuda'
import { updateEvaPsiquiatrica, obtenerEvaPsiquiatrica } from '../../../backend/evaluacion/evaluacionPsiquiatrica';
import SweetAlert from 'react-bootstrap-sweetalert'
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
            hta: 0,
            dm: 0,
            tbc: 0,
            epi: 0,
            tec: 0,
            pTiroideos: 0,
            alergias: 0,
            cirugias: 0,
            hospitalizacion: 0,
            accidentes: 0,
            antPsiquiatricos: 0,
            intentosSuicidas: 0,
            observacionesAnamnesisRemota: "",
            menarquia: 0,
            menopausia: 0,
            gpa: 0,
            ets: 0,
            fur: 0,
            tipo: 0,
            observacionesAntGinecoObstetricos: "",
            oh: 0,
            thc: 0,
            tabaco: 0,
            alucinogeno: 0,
            anorexigeno: 0,
            estimulante: 0,
            solvente: 0,
            otro: "",
            observacionesHabitos: "",
            medicos: "",
            psiquiatricos: "",
            depresion: "",
            ohDrogas: "",
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
            alert: null
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
        const aux = JSON.parse(JSON.stringify(this.state, null, '  '));
        let fecha = new Date(aux.fechaEntrevista)
        aux.fechaEntrevista = fecha.toJSON().slice(0, 19).replace('T', ' ')
        console.log(aux);
        let resp = updateEvaPsiquiatrica(aux, this.props.pacienteId, this.props.userId);
        resp
            .then(res => {
                //console.log("agregado", res.data)
                if (res.data.ok) {
                    const getAlert = () => (
                        <SweetAlert success title="Datos agregados" onConfirm={this._hideAlert}>
                            Se agregaron correctamente los datos de la Entrevista Psiquiatrica
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
        let prom = obtenerEvaPsiquiatrica(this.props.pacienteId);
        prom.then(res => {
            let data = res.data;
            console.log(res.data);
            if (data !== undefined) {
                let entrevista = data.respuesta[0];
                this.setState({
                    fechaEntrevista: entrevista.fecha_entrevista === '0000-00-00' ? null : entrevista.fecha_entrevista,
                    motivo: entrevista.motivo === 'default' ? "" : entrevista.motivo,
                    observacion: entrevista.observacion === 'default' ? "" : entrevista.observacion,
                    detalleMotivoPaciente: entrevista.detalle_motivo_paciente === 'default' ? "" : entrevista.detalle_motivo_paciente,
                    anamnesisProxima: entrevista.anamnesis_proxima === 'default' ? "" : entrevista.anamnesis_proxima,
                    hipotesisDiagnosticaDSMV: entrevista.hipotesis_diagnostica_dsm_v === 'default' ? "" : entrevista.hipotesis_diagnostica_dsm_v,
                    impresionesClinicas: entrevista.impresiones_clinicas === 'default' ? "" : entrevista.impresiones_clinicas,
                    hta: entrevista.hta ? 1 : 0,
                    dm: entrevista.dm ? 1 : 0,
                    tbc: entrevista.tbc ? 1 : 0,
                    epi: entrevista.epi ? 1 : 0,
                    tec: entrevista.tec ? 1 : 0,
                    pTiroideos: entrevista.p_tiroideos ? 1 : 0,
                    alergias: entrevista.alergias ? 1 : 0,
                    cirugias: entrevista.cirugias ? 1 : 0,
                    hospitalizacion: entrevista.hospitalizacion ? 1 : 0,
                    accidentes: entrevista.accidentes ? 1 : 0,
                    antPsiquiatricos: entrevista.ant_psiquiatrico ? 1 : 0,
                    intentosSuicidas: entrevista.intento_suicida ? 1 : 0,
                    observacionesAnamnesisRemota: entrevista.observacionesAnamnesisRemota === 'default' ? "" : entrevista.observacionesAnamnesisRemota,//ambiguo
                    menarquia: entrevista.menarquia ? 1 : 0,
                    menopausia: entrevista.menopausia ? 1 : 0,
                    gpa: entrevista.gpa ? 1 : 0,
                    ets: entrevista.ets ? 1 : 0,
                    fur: entrevista.fur ? 1 : 0,
                    tipo: entrevista.tipo ? 1 : 0,
                    observacionesAntGinecoObstetricos: entrevista.observacionesAntGinObs === 'default' ? "" : entrevista.observacionesAntGinObs,//ambiguo
                    oh: entrevista.oh ? 1 : 0,
                    thc: entrevista.thc ? 1 : 0,
                    tabaco: entrevista.tabaco ? 1 : 0,
                    alucinogeno: entrevista.alucinogeno ? 1 : 0,
                    anorexigeno: entrevista.anorexigeno ? 1 : 0,
                    estimulante: entrevista.estimulante ? 1 : 0,
                    solvente: entrevista.solvente ? 1 : 0,
                    otro: entrevista.otro === 'default' ? "" : entrevista.otro,
                    observacionesHabitos: entrevista.observacionesHabitos === 'default' ? "" : entrevista.observacionesHabitos,//ambiguo
                    medicos: entrevista.medicos === 'default' ? "" : entrevista.medicos,
                    psiquiatricos: entrevista.psiquiatricos === 'default' ? "" : entrevista.psiquiatricos,
                    depresion: entrevista.depresion === 'default' ? "" : entrevista.depresion,
                    ohDrogas: entrevista.oh_drogas === 'default' ? "" : entrevista.oh_drogras,
                    suicidios: entrevista.suicidios === 'default' ? "" : entrevista.suicidios,
                    homicidios: entrevista.homicidios === 'default' ? "" : entrevista.homicidios,
                    otrosAntecedesFamiliares: entrevista.otros === 'default' ? "" : entrevista.otros,
                    farmacos: entrevista.farmacos === 'default' ? "" : entrevista.farmacos,
                    entrevistaSignificantesAfectivos: entrevista.entrevista_significantes_afectivos === 'default' ? "" : entrevista.entrevista_significantes_afectivos,
                    examenesLaboratorio: entrevista.examenes_laboratorio === 'default' ? "" : entrevista.examenes_laboratorio,
                    derivacion: entrevista.derivacion === 'default' ? "" : entrevista.derivacion,
                    coordinacionPsicoterapeuta: entrevista.coordinacion_psicoterapeuta === 'default' ? "" : entrevista.coordinacion_psicoterapeuta,
                    coordinacionCentroDerivacion: entrevista.coordinacion_centro_derivacion === 'default' ? "" : entrevista.coordinacion_centro_derivacion,
                    instrumentosAplicar: entrevista.instrumentos_aplicar === 'default' ? "" : entrevista.instrumentos_aplicar,
                    cuidadoFamiliar: entrevista.cuidado_familiar === 'default' ? "" : entrevista.cuidado_familiar,
                    proximoControl: entrevista.proximo_control === 'default' ? "" : entrevista.proximo_control,
                    observacionesIndicacionesPlanTratamiento: entrevista.observacionesPlanTratamiento === 'default' ? "" : entrevista.observacionesPlanTratamiento,//ambiguo
                });
            }
        })
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
                                                {anamnesisRemotaLista.slice(0, 4).map((name) => (
                                                    <Form.Check
                                                        custom
                                                        defaultChecked={this.state[name]}
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
                                        <Form.Group controlId="anamnesisRemotaCheckBox1">
                                            <Col>
                                                {anamnesisRemotaLista.slice(4, 8).map((name) => (
                                                    <Form.Check
                                                        custom
                                                        defaultChecked={this.state[name]}
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
                                        <Form.Group controlId="anamnesisRemotaCheckBox2">
                                            <Col>
                                                {anamnesisRemotaLista.slice(8, 12).map((name) => (
                                                    <Form.Check
                                                        custom
                                                        defaultChecked={this.state[name]}
                                                        value={this.state.name}
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
                                                {antGinecoObstetricosLista.slice(0, 3).map((name) => (
                                                    <Form.Check
                                                        custom
                                                        defaultChecked={this.state[name]}
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
                                                        defaultChecked={this.state[name]}
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
                                                {habitosLista.slice(0, 4).map((name) => (
                                                    <Form.Check
                                                        custom
                                                        defaultChecked={this.state[name]}
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
                                        <Form.Group controlId="habitosCheckBox1">
                                            <Col>
                                                {habitosLista.slice(4, 7).map((name) => (
                                                    <Form.Check
                                                        custom
                                                        defaultChecked={this.state[name]}
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
                                            value={this.state.ohDrogas}
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

                    {this.state.alert}
                </form>
            </div>
        );
    }
}