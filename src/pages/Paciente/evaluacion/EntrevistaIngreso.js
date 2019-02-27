import React, { Component } from 'react'
import { Image, Form, Col, Button } from 'react-bootstrap'
import { Option } from '../../../components/Option'
import DatePicker from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css";
import { TextoAyuda } from '../../../components/TextoAyuda'
import { ModalFamiliar } from '../../../components/ModalFamiliar'
import { TablaFamiliar } from '../../../components/TablaFamiliar'
import { ImagePicker } from 'react-file-picker'
//--Para cambiar el calendario a español--
import { registerLocale, setDefaultLocale } from 'react-datepicker'
import es from 'date-fns/locale/es';
registerLocale("es", es)
setDefaultLocale("es")
//---------------------------------------
const tiposFamilias = ["Familia Nuclear", "Familia Extensa", "Familia monoparental",
    "Familia ensamblada", "Familia homoparental", "Familia de padres separados"]


export class EntrevistaIngreso extends Component {


    constructor(props) {
        super(props);

        this._handleShow = this._handleShow.bind(this);

        this.state = {
            fechaEntrevista: null,
            grupoFamiliar: "",
            observaciones: "",
            genograma: "",//imagen
            ecomapa: "",//imagen
            solicitante: "",
            motivoConsultaPaciente: "",
            motivoConsultaInstitucion: "",
            motivoConsultaFamilia: "",
            solucionesIntensadas: "",
            principalSintomatologia: "",
            tratamientoPrevio: "",
            recursosIndividualesFamiliares: "",
            impresionesClinicas: "",
            relacionesInterpersonales: "",
            relacionTerapeuta: "",
            observacionesFinales: "",
            show: false,
            familia: [],
            srcGenograma: '',
            srcEcomapa: ''
        };
    }

    _handleImageGenograma = (image) => {
        console.log("_handleImage")
        console.log(this.state.src)

        this.setState({ srcGenograma: image })
        console.log(this.state.src)
    }

    _handleImageEcomapa= (image) => {
        console.log("_handleImage")
        console.log(this.state.src)

        this.setState({ srcGenograma: image })
        console.log(this.state.src)
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

    handleSubmit = event => {
        /*event.preventDefault();
        const email = this.inputEmail.value
        const pwd = this.inputPwd.value
        console.log({ email, pwd });*/

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

                            <Form.Group controlId="modalGrupoFamiliar">
                                <TablaFamiliar
                                    elements={this.state.familia} />
                                <Button className= "btn-custom" onClick={this._handleShow}> Agregar integrante familia</Button>
                                <ModalFamiliar
                                    show={this.state.show}
                                    fnCerrar={this._handleClose}
                                    onSubmit={this._handleModalSubmit} />
                            </Form.Group>
                            <Form.Group controlId="Genograma">
                                <Form.Label>Genograma</Form.Label>
                                <div>
                                    <img src={this.state.srcGenograma} />
                                </div>
                                <ImagePicker
                                    extensions={['jpg', 'jpeg', 'png']}
                                    dims={{ minWidth: 100, maxWidth: 500, minHeight: 100, maxHeight: 500 }}
                                    onChange={this._handleImageGenograma}
                                    onError={errMsg => { alert(errMsg) }}
                                >
                                    <Button className= "btn-custom">
                                        Subir Genograma
                                    </Button>
                                </ImagePicker>
                            </Form.Group>
                            <Form.Group controlId="ecomapa">
                                <Form.Label>Ecomapa</Form.Label>
                                <div>
                                    <img src={this.state.srcEcomapa} />
                                </div>
                                <ImagePicker
                                    extensions={['jpg', 'jpeg', 'png']}
                                    dims={{ minWidth: 100, maxWidth: 500, minHeight: 100, maxHeight: 500 }}
                                    onChange={this._handleImageEcomapa}
                                    onError={errMsg => { alert(errMsg) }}
                                >
                                    <Button className= "btn-custom">
                                        Subir Ecomapa
                                    </Button>
                                </ImagePicker>
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
                            <Form.Group controlId="recursosIndividualesFamiliares">
                                <Form.Label>Recursos individuales y familiares</Form.Label>
                                <Form.Control
                                    as="textarea"
                                    rows="5"
                                    value={this.state.recursosIndividualesFamiliares}
                                    onChange={this.handleChange}
                                    placeholder="recursos individuales y familiares"
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
                            <Form.Group controlId="relacionesInterpersonales">
                                <Form.Label>Relaciones interpersonales (descripción de la relación materno filial, paterno filial, fraterna, grupo de pares y/o pareja)</Form.Label>
                                <Form.Control
                                    as="textarea"
                                    rows="5"
                                    value={this.state.relacionesInterpersonales}
                                    onChange={this.handleChange}
                                    placeholder="relaciones interpersonales"
                                />
                            </Form.Group>
                            <Form.Group controlId="relacionTerapeuta">
                                <Form.Label>Descripción de la relación con el terapeuta</Form.Label>
                                <Form.Control
                                    as="textarea"
                                    rows="5"
                                    value={this.state.relacionTerapeuta}
                                    onChange={this.handleChange}
                                    placeholder="relación con el terapeuta"
                                />
                            </Form.Group>
                            <Form.Group controlId="observacionesFinales">
                                <Form.Label>Observaciones</Form.Label>
                                <Form.Control
                                    as="textarea"
                                    rows="5"
                                    value={this.state.observacionesFinales}
                                    onChange={this.handleChange}
                                    placeholder="observaciones finales"
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