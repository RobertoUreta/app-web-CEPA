import React, { Component } from 'react'
import { Form, Col, Button } from 'react-bootstrap'
import DatePicker from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css";
import { TextoAyuda } from '../../../components/TextoAyuda'
import { ImagePicker } from 'react-file-picker'
//--Para cambiar el calendario a español--
import { registerLocale, setDefaultLocale } from 'react-datepicker'
import es from 'date-fns/locale/es';
registerLocale("es", es)
setDefaultLocale("es")


export class EntrevistaPsicologica extends Component {


    constructor(props) {
        super(props);
        this.state = {
            fechaEntrevista: null,
            genograma: "",//imagen
            ecomapa: "",//imagen
            recursosIndividualesFamiliares:"",
            impresionesClinicas:"",
            relacionesInterpersonales:"",
            relacionTerapeuta:"",
            diagnosticoNosologico:"",
            diagnosticoDescriptivo:"",
            motivoConsultaCoconstruido:"",
            observaciones:"",
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
            <div className="EntrevistaPsicologica">
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
                            <Form.Group controlId="Genograma">
                                <Form.Label>Genograma</Form.Label>
                                <div>
                                    <img src={this.state.srcGenograma} alt="Imagen de genograma"/>
                                </div>
                                <ImagePicker
                                    extensions={['jpg', 'jpeg', 'png']}
                                    dims={{ minWidth: 100, maxWidth: 500, minHeight: 100, maxHeight: 500 }}
                                    onChange={this._handleImageGenograma}
                                    onError={errMsg => { alert(errMsg) }}
                                >
                                    <Button className= "btn-custom">
                                    <i className="fa fa-image"></i>
                                    </Button>
                                </ImagePicker>
                            </Form.Group>
                            <Form.Group controlId="ecomapa">
                                <Form.Label>Ecomapa</Form.Label>
                                <div>
                                    <img src={this.state.srcEcomapa} alt="Imagen de Ecomapa"/>
                                </div>
                                <ImagePicker
                                    extensions={['jpg', 'jpeg', 'png']}
                                    dims={{ minWidth: 100, maxWidth: 500, minHeight: 100, maxHeight: 500 }}
                                    onChange={this._handleImageEcomapa}
                                    onError={errMsg => { alert(errMsg) }}
                                >
                                    <Button className= "btn-custom">
                                    <i className="fa fa-image"></i>
                                    </Button>
                                </ImagePicker>
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
                            <Form.Group controlId="diagnosticoNosologico">
                                <Form.Label>Diagnóstico nosológico</Form.Label>
                                <Form.Control
                                    as="textarea"
                                    rows="5"
                                    value={this.state.diagnosticoNosologico}
                                    onChange={this.handleChange}
                                    placeholder="Diagnóstico nosológico"
                                />
                            </Form.Group>
                            <Form.Group controlId="diagnosticoDescriptivo">
                                <Form.Label>Diagnóstico descriptivo</Form.Label>
                                <Form.Control
                                    as="textarea"
                                    rows="5"
                                    value={this.state.diagnosticoDescriptivo}
                                    onChange={this.handleChange}
                                    placeholder="Diagnóstico descriptivo"
                                />
                            </Form.Group>
                            <Form.Group controlId="motivoConsultaInstitucion">
                                <Form.Label>Motivo de consulta co-construido</Form.Label>
                                <Form.Control
                                    as="textarea"
                                    rows="5"
                                    value={this.state.motivoConsultaCoconstruido}
                                    onChange={this.handleChange}
                                    placeholder="motivo consulta co-construido"
                                />
                            </Form.Group>
                            <Form.Group controlId="observaciones">
                                <Form.Label>Observaciones</Form.Label>
                                <Form.Control
                                    as="textarea"
                                    rows="5"
                                    value={this.state.observaciones}
                                    onChange={this.handleChange}
                                    placeholder="Observaciones"
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