import React, { Component } from 'react'
import { Form, Col, Button, Row } from 'react-bootstrap'
import { Option } from '../../../../components/Option'
import { TextoAyuda } from '../../../../components/TextoAyuda'
import SweetAlert from 'react-bootstrap-sweetalert'
import { updatepsicologoISL, obtenerpsicologoISL } from '../../../../backend/isl/psicologoISL';
const estadosCiviles = ["Soltero/a", "Casado/a", "Viudo/a", "Divorciado/a", "Separado/a", "Conviviente"]
export class EntrevistaPsicologo extends Component {


    constructor(props) {
        super(props);

        this.state = {
            estadoCivil: "",
            numHijos:"",
            nombreEmpresa:"",
            rolCumpleEmpresa:"",
            tiempoEnProfesion:"",
            tiempoEnCargo:"",
            tiempoEnEmpresa:"",//falta agregar este datos a las tablas
            funcionesRealizadasEnEmpresa:"",
            descripcionCargo:"",
            horarios:"",
            limiteAlcanceCargo:"",
            calidadRelacionesInterpersonales:"",
            liderazgo:"",
            caracteristicasJefatura:"",
            tipoContrato:"",
            estabilidad:"",
            cambioFunciones:"",
            obligacionesExtraContrato:"",
            menoscaboFunciones:"",
            medidasProteccionTrabajadorEfectividad:"",
            motivacionesDiep:"",
            sintomas:"",
            cuandoAparecen:"",
            cuandoIntensifican:"",
            queHaceAlRespecto:"",
            lugaresDeTrabajoActuales:"",
            antiguedadEnTrabajos:"",
            despidosRenunciasCausas:"",
            interesMotivacionesTrabajoActual:"",
            genograma:"",
            expectativaTrabajador:"",
            eje1:"",
            eje2:"",
            eje3:"",
            eje4:"",
            eeg:"",
            impresionesClinicas:""
        };
    }

    handleChange = event => {
        this.setState({
            [event.target.id]: event.target.value
        });
    }

    handleSubmit = event => {
        event.preventDefault();
        const aux = JSON.parse(JSON.stringify(this.state, null, '  '));
        console.log(aux);
        let resp = updatepsicologoISL(aux, this.props.pacienteId);
        resp
            .then(res => { 
                console.log("agregado", res.data)
                if (res.data.ok) {
                    const getAlert = () => (
                        <SweetAlert success title="Datos agregados" onConfirm={this._hideAlert}>
                            Se agregaron correctamente los datos de la entrevista Psicologica del ISL.
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
        let prom = obtenerpsicologoISL(this.props.pacienteId);
        prom.then(res => {
            let data = res.data;
            console.log(res.data);
            if (data.ok) {
                let isl = data.respuesta[0];
                let dsm = data.dsm[0];
                this.setState({
                    estadoCivil: isl.estado_civil === 'default' ? "":isl.estado_civil,
                    numHijos:isl.num_hijos === 0 ? "":isl.num_hijos,
                    nombreEmpresa:isl.nombre_empresa === 'default' ? "":isl.nombre_empresa,
                    rolCumpleEmpresa:isl.rol_cumple_en_empresa === 'default' ? "":isl.rol_cumple_en_empresa,
                    tiempoEnProfesion:isl.tiempo_en_profesion  === 'default' ? "":isl.tiempo_en_profesion,
                    tiempoEnCargo:isl.tiempo_en_cargo === 'default' ? "":isl.tiempo_en_cargo,
                    tiempoEnEmpresa:isl.tiempo_en_profesion === 'default' ? "":isl.tiempo_en_profesion,//falta agregar este datos a las tablas
                    funcionesRealizadasEnEmpresa:isl.funciones_realizadas_en_empresa === 'default' ? "":isl.funciones_realizadas_en_empresa,
                    descripcionCargo:isl.descripcion_cargo === 'default' ? "":isl.descripcion_cargo,
                    horarios:isl.horarios === 'default' ? "":isl.horarios,
                    limiteAlcanceCargo:isl.limite_alcance_cargo === 'default' ? "":isl.limite_alcance_cargo,
                    calidadRelacionesInterpersonales:isl.calidad_relaciones_interpersonales === 'default' ? "":isl.calidad_relaciones_interpersonales,
                    liderazgo:isl.liderazgo === 'default' ? "":isl.liderazgo,
                    caracteristicasJefatura:isl.caracteristicas_jefatura === 'default' ? "":isl.caracteristicas_jefatura,
                    tipoContrato:isl.tipo_contrato === 'default' ? "":isl.tipo_contrato,
                    estabilidad:isl.estabilidad === 'default' ? "":isl.estabilidad,
                    cambioFunciones:isl.cambio_funciones === 'default' ? "":isl.cambio_funciones,
                    obligacionesExtraContrato:isl.obligaciones_extra_contrato === 'default' ? "":isl.obligaciones_extra_contrato,
                    menoscaboFunciones:isl.menoscabo_funciones === 'default' ? "":isl.menoscabo_funciones,
                    medidasProteccionTrabajadorEfectividad:isl.medidas_proteccion_trabajador_efectividad === 'default' ? "":isl.medidas_proteccion_trabajador_efectividad,
                    motivacionesDiep:isl.motivaciones_diep === 'default' ? "":isl.motivaciones_diep,
                    sintomas:isl.sintomas === 'default' ? "":isl.sintomas,
                    cuandoAparecen:isl.cuando_aparecen === 'default' ? "":isl.cuando_aparecen,
                    cuandoIntensifican:isl.cuando_intensifican === 'default' ? "":isl.cuando_intensifican,
                    queHaceAlRespecto:isl.que_hace_al_respecto === 'default' ? "":isl.que_hace_al_respecto,
                    lugaresDeTrabajoActuales:isl.lugares_de_trabajo_actuales === 'default' ? "":isl.lugares_de_trabajo_actuales,
                    antiguedadEnTrabajos:isl.antiguedad_en_trabajos === 'default' ? "":isl.antiguedad_en_trabajos,
                    despidosRenunciasCausas:isl.despidos_renuncias_causas === 'default' ? "":isl.despidos_renuncias_causas,
                    interesMotivacionesTrabajoActual:isl.interes_motivaciones_trabajo_actual === 'default' ? "":isl.interes_motivaciones_trabajo_actual,
                    genograma:isl.genograma === 'default' ? "":isl.genograma,
                    expectativaTrabajador:isl.expectativa_trabajador === 'default' ? "":isl.expectativa_trabajador,
                    eje1:dsm.eje_1 === 'default' ? "":dsm.eje_1,
                    eje2:dsm.eje_2 === 'default' ? "":dsm.eje_2,
                    eje3:dsm.eje_3 === 'default' ? "":dsm.eje_3,
                    eje4:dsm.eje_4 === 'default' ? "":dsm.eje_4,
                    eeg:dsm.eeg === 'default' ? "":dsm.egg,
                    impresionesClinicas:dsm.impresiones_clinicas === 'default' ? "":dsm.impresiones_clinicas,
                });
            }
        })
    }

    render() {
        return (
            <div className="entrevistaPsicologo">
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
                                    <Form.Group controlId="numHijos">
                                        <TextoAyuda
                                            nombre="numHijos"
                                            tooltip="N° de hijos"
                                            componente={<Form.Control
                                                value={this.state.numHijos}
                                                onChange={this.handleChange}
                                                placeholder="N° de hijos"
                                            />}
                                        />
                                    </Form.Group>
                                </Col>
                            </Row>
                            
                            <Row>
                                <Col>
                                    <Form.Group controlId="nombreEmpresa">
                                        <TextoAyuda
                                            nombre="nombreEmpresa"
                                            tooltip="Nombre de la empresa"
                                            componente={<Form.Control
                                                value={this.state.nombreEmpresa}
                                                onChange={this.handleChange}
                                                placeholder="Nombre de la empresa"
                                            />}
                                        />
                                    </Form.Group>
                                </Col>
                                <Col>
                                    <Form.Group controlId="rolCumpleEmpresa">
                                        <TextoAyuda
                                            nombre="rolCumpleEmpresa"
                                            tooltip="Rol que cumple en la empresa"
                                            componente={<Form.Control
                                                value={this.state.rolCumpleEmpresa}
                                                onChange={this.handleChange}
                                                placeholder="Rol que cumple en la empresa"
                                            />}
                                        />
                                    </Form.Group>
                                </Col>
                            </Row>
                            <Form.Group controlId="tiempoEnProfesion">
                                <TextoAyuda
                                    nombre="tiempoEnProfesion"
                                    tooltip="Tiempo que lleva desempañándose en esta profesión"
                                    componente={<Form.Control
                                        as="textarea"
                                        rows="2"
                                        value={this.state.tiempoEnProfesion}
                                        onChange={this.handleChange}
                                        placeholder="Tiempo que lleva desempeñándose en esta profesión"
                                    />}
                                />
                            </Form.Group>
                            <Form.Group controlId="tiempoEnCargo">
                                <TextoAyuda
                                    nombre="tiempoEnCargo"
                                    tooltip="Tiempo que lleva desempeñándose en este cargo"
                                    componente={<Form.Control
                                        as="textarea"
                                        rows="2"
                                        value={this.state.tiempoEnCargo}
                                        onChange={this.handleChange}
                                        placeholder="Tiempo que lleva desempeñándose en este cargo"
                                    />}
                                />
                            </Form.Group>
                            <Form.Group controlId="tiempoEnEmpresa">
                                <TextoAyuda
                                    nombre="tiempoEnEmpresa"
                                    tooltip="Tiempo que lleva desempeñándose en esta empresa"
                                    componente={<Form.Control
                                        as="textarea"
                                        rows="2"
                                        value={this.state.tiempoEnEmpresa}
                                        onChange={this.handleChange}
                                        placeholder="Tiempo que lleva desempeñándose en esta empresa"
                                    />}
                                />
                            </Form.Group>
                            <Form.Group controlId="funcionesRealizadasEnEmpresa">
                                <TextoAyuda
                                    nombre="funcionesRealizadasEnEmpresa"
                                    tooltip="Funciones realizadas al interior de la empresa"
                                    componente={<Form.Control
                                        as="textarea"
                                        rows="2"
                                        value={this.state.funcionesRealizadasEnEmpresa}
                                        onChange={this.handleChange}
                                        placeholder="Funciones que realiza al interior de la empresa"
                                    />}
                                />
                            </Form.Group>
                            <Form.Label><strong>2. Antecedentes del puesto de trabajo</strong></Form.Label>
                            <Form.Group controlId="descripcionCargo">
                                <TextoAyuda
                                    nombre="descripcionCargo"
                                    tooltip="descripción del cargo"
                                    componente={<Form.Control
                                        as="textarea"
                                        rows="2"
                                        value={this.state.descripcionCargo}
                                        onChange={this.handleChange}
                                        placeholder="descripción del cargo"
                                    />}
                                />
                            </Form.Group>
                            <Form.Group controlId="horarios">
                                <TextoAyuda
                                    nombre="horarios"
                                    tooltip="Horarios"
                                    componente={<Form.Control
                                        as="textarea"
                                        rows="2"
                                        value={this.state.horarios}
                                        onChange={this.handleChange}
                                        placeholder="Horarios"
                                    />}
                                />
                            </Form.Group>
                            <Form.Group controlId="limiteAlcanceCargo">
                                <TextoAyuda
                                    nombre="limiteAlcanceCargo"
                                    tooltip="Límites y alcances del cargo"
                                    componente={<Form.Control
                                        as="textarea"
                                        rows="2"
                                        value={this.state.limiteAlcanceCargo}
                                        onChange={this.handleChange}
                                        placeholder="Límites y alcances del cargo"
                                    />}
                                />
                            </Form.Group>
                            <Form.Group controlId="calidadRelacionesInterpersonales">
                                <TextoAyuda
                                    nombre="calidadRelacionesInterpersonales"
                                    tooltip="calidad relaciones interpersonales"
                                    componente={<Form.Control
                                        as="textarea"
                                        rows="2"
                                        value={this.state.calidadRelacionesInterpersonales}
                                        onChange={this.handleChange}
                                        placeholder="calidad relaciones interpersonales"
                                    />}
                                />
                            </Form.Group>
                            <Form.Group controlId="liderazgo">
                                <TextoAyuda
                                    nombre="liderazgo"
                                    tooltip="Liderazgo"
                                    componente={<Form.Control
                                        as="textarea"
                                        rows="2"
                                        value={this.state.liderazgo}
                                        onChange={this.handleChange}
                                        placeholder="Liderazgo"
                                    />}
                                />
                            </Form.Group>
                            <Form.Group controlId="caracteristicasJefatura">
                                <TextoAyuda
                                    nombre="caracteristicasJefatura"
                                    tooltip="Características jefatura"
                                    componente={<Form.Control
                                        as="textarea"
                                        rows="2"
                                        value={this.state.caracteristicasJefatura}
                                        onChange={this.handleChange}
                                        placeholder="Características jefatura"
                                    />}
                                />
                            </Form.Group>
                            <Form.Group controlId="tipoContrato">
                                <TextoAyuda
                                    nombre="tipoContrato"
                                    tooltip="Tipo contrato"
                                    componente={<Form.Control
                                        as="textarea"
                                        rows="2"
                                        value={this.state.tipoContrato}
                                        onChange={this.handleChange}
                                        placeholder="Tipo contrato"
                                    />}
                                />
                            </Form.Group>
                            <Form.Group controlId="estabilidad">
                                <TextoAyuda
                                    nombre="estabilidad"
                                    tooltip="Estabilidad"
                                    componente={<Form.Control
                                        as="textarea"
                                        rows="2"
                                        value={this.state.estabilidad}
                                        onChange={this.handleChange}
                                        placeholder="Estabilidad"
                                    />}
                                />
                            </Form.Group>
                            <Form.Group controlId="cambioFunciones">
                                <TextoAyuda
                                    nombre="cambioFunciones"
                                    tooltip="Cambio de funciones"
                                    componente={<Form.Control
                                        as="textarea"
                                        rows="2"
                                        value={this.state.cambioFunciones}
                                        onChange={this.handleChange}
                                        placeholder="Cambio de funciones"
                                    />}
                                />
                            </Form.Group>
                            <Form.Group controlId="obligacionesExtraContrato">
                                <TextoAyuda
                                    nombre="obligacionesExtraContrato"
                                    tooltip="Obligaciones extra contrato"
                                    componente={<Form.Control
                                        as="textarea"
                                        rows="2"
                                        value={this.state.obligacionesExtraContrato}
                                        onChange={this.handleChange}
                                        placeholder="Obligaciones extra contrato"
                                    />}
                                />
                            </Form.Group>
                            <Form.Group controlId="menoscaboFunciones">
                                <TextoAyuda
                                    nombre="menoscaboFunciones"
                                    tooltip="Menoscabo de funciones (únicamente para casos de hostigamiento laboral)"
                                    componente={<Form.Control
                                        as="textarea"
                                        rows="2"
                                        value={this.state.menoscaboFunciones}
                                        onChange={this.handleChange}
                                        placeholder="Menoscabo de funciones (únicamente para casos de hostigamiento laboral)"
                                    />}
                                />
                            </Form.Group>
                            <Form.Group controlId="medidasProteccionTrabajadorEfectividad">
                                <TextoAyuda
                                    nombre="medidasProteccionTrabajadorEfectividad"
                                    tooltip="Medidas de protección al trabajador y efectividad (únicamente para casos de acoso sexual)"
                                    componente={<Form.Control
                                        as="textarea"
                                        rows="2"
                                        value={this.state.medidasProteccionTrabajadorEfectividad}
                                        onChange={this.handleChange}
                                        placeholder="Medidas de protección al trabajador y efectividad (únicamente para casos de acoso sexual)"
                                    />}
                                />
                            </Form.Group>
                            <Form.Label><strong>3. Indagar en torno a las motivaciones del trabajador para presentar la DIEP</strong><i> (en el caso de que él la haya presentado)</i><strong>o bien, indagar en torno a sus impresiones respecto a la DIEP realizada por un tercero</strong><i> (Indagar en torno al problema, a qué lo atribuye, a quien responsabiliza por ello, dónde cree que está el problema, desde cuando este se inicia, qué cree que lo mantiene). </i></Form.Label>
                            <Form.Group controlId="motivacionesDiep">
                                <TextoAyuda
                                    nombre="motivacionesDiep"
                                    tooltip="Motivaciones DIEP"
                                    componente={<Form.Control
                                        as="textarea"
                                        rows="8"
                                        value={this.state.motivacionesDiep}
                                        onChange={this.handleChange}
                                        placeholder="Motivaciones DIEP"
                                    />}
                                />
                            </Form.Group>
                            <Form.Label><strong>4. Historia Clínica</strong><i> (Indagar en torno a la aparición de los síntomas somáticos, emocionales y relacionales, indagar en la historia de síntomas, aparición de los mismos, cuando estos se ven intensificados, etc.) </i></Form.Label>
                            <Form.Group controlId="sintomas">
                                <TextoAyuda
                                    nombre="sintomas"
                                    tooltip="Cuáles son los síntomas"
                                    componente={<Form.Control
                                        as="textarea"
                                        rows="3"
                                        value={this.state.sintomas}
                                        onChange={this.handleChange}
                                        placeholder="Cuáles son los síntomas"
                                    />}
                                />
                            </Form.Group>
                            <Form.Group controlId="cuandoAparecen">
                                <TextoAyuda
                                    nombre="cuandoAparecen"
                                    tooltip="Cuándo aparecen"
                                    componente={<Form.Control
                                        as="textarea"
                                        rows="3"
                                        value={this.state.cuandoAparecen}
                                        onChange={this.handleChange}
                                        placeholder="Cuándo aparecen"
                                    />}
                                />
                            </Form.Group>
                            <Form.Group controlId="cuandoIntensifican">
                                <TextoAyuda
                                    nombre="cuandoIntensifican"
                                    tooltip="Cuándo se intensifican"
                                    componente={<Form.Control
                                        as="textarea"
                                        rows="3"
                                        value={this.state.cuandoIntensifican}
                                        onChange={this.handleChange}
                                        placeholder="Cuándo se intensifican"
                                    />}
                                />
                            </Form.Group>
                            <Form.Group controlId="queHaceAlRespecto">
                                <TextoAyuda
                                    nombre="queHaceAlRespecto"
                                    tooltip="Qué hace al respecto-historia"
                                    componente={<Form.Control
                                        as="textarea"
                                        rows="8"
                                        value={this.state.queHaceAlRespecto}
                                        onChange={this.handleChange}
                                        placeholder="Que hace al respecto-historia"
                                    />}
                                />
                            </Form.Group>
                            <Form.Label><strong>5. Historia laboral</strong><i> (trabajo actual,  trabajo anterior más próximo en el tiempo). </i></Form.Label>
                            <Form.Group controlId="lugaresDeTrabajoActuales">
                                <TextoAyuda
                                    nombre="lugaresDeTrabajoActuales"
                                    tooltip="Indicar si profesional se desempeña en más de un lugar de trabajo actualmente"
                                    componente={<Form.Control
                                        as="textarea"
                                        rows="3"
                                        value={this.state.lugaresDeTrabajoActuales}
                                        onChange={this.handleChange}
                                        placeholder="Indicar si profesional se desempeña en más de un lugar de trabajo actualmente"
                                    />}
                                />
                            </Form.Group>
                            <Form.Group controlId="antiguedadEnTrabajos">
                                <TextoAyuda
                                    nombre="antiguedadEnTrabajos"
                                    tooltip="Antigüedad en ambos trabajos (tiempo de permanencia)"
                                    componente={<Form.Control
                                        as="textarea"
                                        rows="3"
                                        value={this.state.antiguedadEnTrabajos}
                                        onChange={this.handleChange}
                                        placeholder="Antigüedad en ambos trabajos (tiempo de permanencia)"
                                    />}
                                />
                            </Form.Group>
                            <Form.Group controlId="despidosRenunciasCausas">
                                <TextoAyuda
                                    nombre="despidosRenunciasCausas"
                                    tooltip="Despidos o renuncias y causas de estas"
                                    componente={<Form.Control
                                        as="textarea"
                                        rows="3"
                                        value={this.state.despidosRenunciasCausas}
                                        onChange={this.handleChange}
                                        placeholder="Despidos o renuncias y causas de estas"
                                    />}
                                />
                            </Form.Group>
                            <Form.Group controlId="interesMotivacionesTrabajoActual">
                                <TextoAyuda
                                    nombre="interesMotivacionesTrabajoActual"
                                    tooltip="Interés y motivaciones por el trabajo actual"
                                    componente={<Form.Control
                                        as="textarea"
                                        rows="3"
                                        value={this.state.interesMotivacionesTrabajoActual}
                                        onChange={this.handleChange}
                                        placeholder="Interés y motivaciones por el trabajo actual"
                                    />}
                                />
                            </Form.Group>

                            <Form.Label><strong>6. Historia familiar</strong></Form.Label>
                            <Form.Group controlId="genograma">
                                <TextoAyuda
                                    nombre="genograma"
                                    tooltip="Genograma (consignar: estructura y dinámica de familiar nuclear, y presencia de estresores). Indicar a crisis o eventos críticos al interior del sistema familiar (duelos, pérdidas, cambios de ciudad, enfermedades, etc). "
                                    componente={<Form.Control
                                        as="textarea"
                                        rows="4"
                                        value={this.state.genograma}
                                        onChange={this.handleChange}
                                        placeholder="Genograma (consignar: estructura y dinámica de familiar nuclear, y presencia de estresores). Indicar a crisis o eventos críticos al interior del sistema familiar (duelos, pérdidas, cambios de ciudad, enfermedades, etc). "
                                    />}
                                />
                            </Form.Group>

                            <Form.Label><strong>7. Expectativas del trabajador ¿Qué espera de la situación actual? ¿Cómo podría usted volver al trabajo? </strong></Form.Label>
                            <Form.Group controlId="expectativaTrabajador">
                                <TextoAyuda
                                    nombre="expectativaTrabajador"
                                    tooltip="Expectativas del trabajador"
                                    componente={<Form.Control
                                        as="textarea"
                                        rows="4"
                                        value={this.state.expectativaTrabajador}
                                        onChange={this.handleChange}
                                        placeholder="Expectativas del trabajador"
                                    />}
                                />
                            </Form.Group>

                            <Form.Label><strong>8. Evaluación multiaxial</strong></Form.Label>
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