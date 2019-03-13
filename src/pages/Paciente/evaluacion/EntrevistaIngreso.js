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
            alert: null
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
        this.setState({
            [event.target.id]: event.target.value
        });
    }

    _hideAlert = () => {
        this.setState({ alert: null })
    }

    handleSubmit = event => {
        event.preventDefault();
        const aux = JSON.parse(JSON.stringify(this.state, null, '  '));
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
            if (data !== undefined) {
                let entrevista = data.respuesta[0];
                this.setState({
                    fechaEntrevista: entrevista.fecha_entrevista === '0000-00-00' ? null : entrevista.fecha_entrevista,
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
        /*
        
        prom.then(res => {
            let ent = res.data.respuesta[0];
            console.log('tamizaje cambiandooooooo: ', ent)
            if (tami !== undefined) {
                console.log("no es undefined", ent)
                this.setState({
                    nombreSolicitante: tami.nombre_solicitante === 'default' ? "" : tami.nombre_solicitante,
                    fechaSolicitud: tami.fecha_solicitud ===  '0000-00-00' ? "" : tami.fecha_solicitud,
                    horarioDisponible: tami.horario_disponible === 'default' ? "" :tami.horario_disponible,
                    nivelUrgencia: tami.nivel_urgencia === 'default' ? "" : tami.nivel_urgencia,
                    preguntaSintomatologia:tami.pregunta_sintomatologia === 'default' ? "": tami.pregunta_sintomatologia,
                    preguntaMalestar: tami.pregunta_malestar === 'default' ? "" : tami.pregunta_malestar,
                    preguntaObservaciones: tami.pregunta_observaciones === 'default' ? "": tami.pregunta_observaciones
                })
            }
        }).catch(err => {
            console.log(err)
        })*/
    }

    render() {
        return (
            <div className="EntrevistaIngreso">
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
                                    rows="2"
                                    value={this.state.observaciones}
                                    onChange={this.handleChange}
                                    placeholder="Observaciones"
                                />
                            </Form.Group>

                            <Form.Group controlId="modalGrupoFamiliar">
                                <TablaFamiliar
                                    elements={this.state.familia} />
                                <Button className="btn-custom" onClick={this._handleShow}> Agregar integrante familia</Button>
                                <ModalFamiliar
                                    show={this.state.show}
                                    fnCerrar={this._handleClose}
                                    onSubmit={this._handleModalSubmit} />
                            </Form.Group>

                            <Form.Group controlId="solicitante">
                                <Form.Label>¿Quién solicita la consulta? (iniciativa propia, médico, instituciones, otros)</Form.Label>
                                <Form.Control
                                    as="textarea"
                                    rows="5"
                                    value={this.state.solicitante}
                                    onChange={this.handleChange}
                                    placeholder="solicitante"
                                />
                            </Form.Group>
                            <Form.Group controlId="motivoConsultaPaciente">
                                <Form.Label>Motivo de consulta del paciente (textual)</Form.Label>
                                <Form.Control
                                    as="textarea"
                                    rows="5"
                                    value={this.state.motivoConsultaPaciente}
                                    onChange={this.handleChange}
                                    placeholder="motivo consulta paciente"
                                />
                            </Form.Group>
                            <Form.Group controlId="motivoConsultaInstitucion">
                                <Form.Label>De la institución (si corresponde)</Form.Label>
                                <Form.Control
                                    as="textarea"
                                    rows="5"
                                    value={this.state.motivoConsultaInstitucion}
                                    onChange={this.handleChange}
                                    placeholder="motivo consulta institución"
                                />
                            </Form.Group>
                            <Form.Group controlId="motivoConsultaFamilia">
                                <Form.Label>De la familia</Form.Label>
                                <Form.Control
                                    as="textarea"
                                    rows="5"
                                    value={this.state.motivoConsultaFamilia}
                                    onChange={this.handleChange}
                                    placeholder="motivo consulta familia"
                                />
                            </Form.Group>
                            <Form.Group controlId="solucionesIntensadas">
                                <Form.Label>Soluciones intentadas y resultados</Form.Label>
                                <Form.Control
                                    as="textarea"
                                    rows="5"
                                    value={this.state.solucionesIntensadas}
                                    onChange={this.handleChange}
                                    placeholder="soluciones intensadas"
                                />
                            </Form.Group>
                            <Form.Group controlId="principalSintomatologia">
                                <Form.Label>Principal sintomatología</Form.Label>
                                <Form.Control
                                    as="textarea"
                                    rows="5"
                                    value={this.state.principalSintomatologia}
                                    onChange={this.handleChange}
                                    placeholder="principal sintomatologia"
                                />
                            </Form.Group>
                            <Form.Group controlId="tratamientoPrevio">
                                <Form.Label>Tratamiento o evaluaciones previas (salud mental)</Form.Label>
                                <Form.Control
                                    as="textarea"
                                    rows="5"
                                    value={this.state.tratamientoPrevio}
                                    onChange={this.handleChange}
                                    placeholder="tratamiento previo"
                                />
                            </Form.Group>
                            <Form.Group controlId="consumoSustancias">
                                <Form.Label>Consumo de sustancias(Alcohol, tabaco y otras drogas)</Form.Label>
                                <Form.Control
                                    as="textarea"
                                    rows="5"
                                    value={this.state.consumoSustancias}
                                    onChange={this.handleChange}
                                    placeholder="Consumo de sustancias"
                                />
                            </Form.Group>
                            <Form.Group controlId="impresionesClinicas">
                                <Form.Label>Impresiones clínicas</Form.Label>
                                <Form.Control
                                    as="textarea"
                                    rows="5"
                                    value={this.state.impresionesClinicas}
                                    onChange={this.handleChange}
                                    placeholder="impresiones clinicas"
                                />
                            </Form.Group>
                            <Form.Group controlId="observacionesFinales">
                                <Form.Label>Observaciones (incluir percepción de apoyo social)</Form.Label>
                                <Form.Control
                                    as="textarea"
                                    rows="5"
                                    value={this.state.observacionesFinales}
                                    onChange={this.handleChange}
                                    placeholder="Observaciones (incluir percepción de apoyo social)"
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