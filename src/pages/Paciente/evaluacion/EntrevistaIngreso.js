import React, { Component } from 'react'
import { Form, Col, Button, Row } from 'react-bootstrap'
import { Option } from '../../../components/Option'
import DatePicker from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css";
import { TextoAyuda } from '../../../components/TextoAyuda'

//--Para cambiar el calendario a español--
import {registerLocale,setDefaultLocale} from 'react-datepicker'
import es from 'date-fns/locale/es';
registerLocale("es",es)
setDefaultLocale("es")
//---------------------------------------
const tiposFamilias = ["Familia Nuclear", "Familia Extensa", "Familia monoparental",
    "Familia ensamblada", "Familia homoparental", "Familia de padres separados"]

export class EntrevistaIngreso extends Component {


    constructor(props) {
        super(props);

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
            observacionesFinales: ""
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
                            <Form.Group controlId="Genograma">
                                <Form.Label>Genograma</Form.Label>
                                <Form.Control
                                    as="textarea"
                                    rows="5"
                                    value={this.state.genograma}
                                    onChange={this.handleChange}
                                    placeholder="Genograma"
                                />
                            </Form.Group>
                            <Form.Group controlId="ecomapa">
                                <Form.Label>Ecomapa</Form.Label>
                                <Form.Control
                                    as="textarea"
                                    rows="5"
                                    value={this.state.ecomapa}
                                    onChange={this.handleChange}
                                    placeholder="ecomapa"
                                />
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
                                <Row>
                                    <Col />
                                    <Col />
                                    <Col />
                                    <Col />
                                    <Col />
                                    <Col>
                                        <Button
                                            type="submit"
                                        >
                                            Guardar
                                        </Button>
                                    </Col>
                                </Row>
                            </Form.Group>
                        </Form.Group>
                    </Form.Row>

                </form>
            </div>
        );
    }
}