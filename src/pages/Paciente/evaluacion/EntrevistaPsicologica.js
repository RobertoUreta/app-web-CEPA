import React, { Component } from 'react'
import { Form, Col, Button } from 'react-bootstrap'
import DatePicker from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css";
import { TextoAyuda } from '../../../components/TextoAyuda'
import { ImagePicker } from 'react-file-picker'
import SweetAlert from 'react-bootstrap-sweetalert'
//--Para cambiar el calendario a español--
import { registerLocale, setDefaultLocale } from 'react-datepicker'
import es from 'date-fns/locale/es';
import { updateEvaPsicologica, obtenerEvaPsicologica } from '../../../backend/evaluacion/evaluacionPsicologica';
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
            srcEcomapa: '',
            alert: null
        };
    }

    _handleImageGenograma = (image) => {
        console.log("_handleImage")
        //console.log(this.state.srcGenograma)
        this.setState({ srcGenograma: image })
        console.log(this.state.srcGenograma)
    }

    _handleImageEcomapa= (image) => {
        console.log("_handleImage")
        //console.log(this.state.srcEcomapa)
        this.setState({ srcEcomapa: image })
        console.log(this.state.srcEcomapa)
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
        let resp = updateEvaPsicologica(aux, this.props.pacienteId, this.props.userId);
        resp
            .then(res => {
                //console.log("agregado", res.data)
                if (res.data.ok) {
                    const getAlert = () => (
                        <SweetAlert success title="Datos agregados" onConfirm={this._hideAlert}>
                            Se agregaron correctamente los datos de la Entrevista Psicologica
                    </SweetAlert>
                    )
                    this.setState({ alert: getAlert() })
                }

            })
    }
    componentDidMount(){
        let prom = obtenerEvaPsicologica(this.props.pacienteId);
        prom.then(res => {
            let data = res.data;
            console.log(res.data);
            if (data !== undefined) {
                let entrevista = data.respuesta[0];
                this.setState({
                    fechaEntrevista: entrevista.fecha_entrevista === '0000-00-00' ? null : entrevista.fecha_entrevista,
                    recursosIndividualesFamiliares:entrevista.recursos_individuales_familiares==='default'?"":entrevista.recursos_individuales_familiares,
                    impresionesClinicas: entrevista.impresiones_clinicas === 'default' ? "" : entrevista.impresiones_clinicas,
                    relacionesInterpersonales:entrevista.relaciones_interpersonales==='default'?"":entrevista.relaciones_interpersonales,
                    relacionTerapeuta:entrevista.relacion_terapeuta==='default'?"":entrevista.relacion_paciente,
                    diagnosticoNosologico:entrevista.diagnostico_nosologico==='default'?"":entrevista.diagnostico_nosologico,
                    diagnosticoDescriptivo:entrevista.diagnostico_descriptivo==='default'?"":entrevista.diagnostico_descriptivo,
                    motivoConsultaCoconstruido:entrevista.motivo_consulta_coconstruido==='default'?"":entrevista.motivo_consulta_coconstruido,
                    observaciones:entrevista.observaciones==='default'?"":entrevista.observaciones,
                    srcGenograma: entrevista.genograma==='default'?'':entrevista.genograma,
                    srcEcomapa: entrevista.ecomapa==='default'?'':entrevista.ecomapa
                });
            }
        })
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
                                    dims={{ minWidth: 50, maxWidth: 1000, minHeight: 50, maxHeight: 1000 }}
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
                                    dims={{ minWidth: 50, maxWidth: 1000, minHeight: 50, maxHeight: 1000 }}
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
                            <Form.Group controlId="motivoConsultaCoconstruido">
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
                    {this.state.alert}
                </form>
            </div>
        );
    }
}