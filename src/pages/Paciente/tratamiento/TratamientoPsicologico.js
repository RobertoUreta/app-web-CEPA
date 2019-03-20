import React, { Component } from 'react'
import { Form, Col, Button, Row } from 'react-bootstrap'
import { Option } from '../../../components/Option'
import { TextoAyuda } from '../../../components/TextoAyuda'
import SweetAlert from 'react-bootstrap-sweetalert'
import { updateTratamientoPsicologico, obtenerTratamientoPsicologico } from '../../../backend/tratamiento/tratamientoPsicologico';
const tiposTratamiento = ["Terapia individual", "Taller", "Intervención grupal", "Derivación asistida"]
export class TratamientoPsicologico extends Component {

    constructor(props) {
        super(props);

        this.state = {
            motivoTratamiento: "",
            motivoCoconstruido: "",
            tipoTratamiento: "",
            esInterconsulta: 0,
            alert: null
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
        let resp = updateTratamientoPsicologico(aux, this.props.pacienteId);
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
        let prom = obtenerTratamientoPsicologico(this.props.pacienteId);
        prom.then(res => {
            let data = res.data;
            console.log(res.data);
            if (data !== undefined) {
                let tratamiento = data.respuesta[0];
                this.setState({
                    motivoTratamiento: tratamiento.motivo_tratamiento_psicologico==='default'?"":tratamiento.motivo_tratamiento_psicologico,
                    motivoCoconstruido: tratamiento.motivo_consulta_coconstruido==='default'?"":tratamiento.motivo_consulta_coconstruido,
                    tipoTratamiento: tratamiento.tipo_tratamiento==='default'?"":tratamiento.tipo_tratamiento,
                    esInterconsulta: tratamiento.es_interconsulta ? 1:0
                });
            }
        })
    }

    render() {
        return (
            <div className="tratamientoPsicologico">
                <form onSubmit={this.handleSubmit}>
                    <Form.Row>
                        <Form.Group as={Col}>
                            <Row>
                                <Col>
                                    <Form.Group controlId="tipoTratamiento">
                                    <TextoAyuda
                                            nombre="tipoTratamiento"
                                            tooltip="Tipo Tratamiento"
                                            componente={<Form.Control
                                            as="select"
                                            value={this.state.tipoTratamiento}
                                            onChange={this.handleChange}
                                        >
                                            <option hidden>Tipo Tratamiento</option>
                                            <Option options={tiposTratamiento} />
                                        </Form.Control>}
                                        />
                                        
                                    </Form.Group>
                                </Col>
                                <Col>
                                    <Form.Check
                                        custom
                                        checked={this.state.esInterconsulta}
                                        value={this.state.esInterconsulta}
                                        onChange={event=>this.setState({
                                            [event.target.id]: event.target.checked ? 1 : 0
                                        })}
                                        label="Interconsulta"
                                        type="checkbox"
                                        id="esInterconsulta"
                                    />
                                </Col>
                            </Row>
                            <Form.Group controlId="motivoTratamiento">
                                <Form.Label>Motivo tratamiento psicologico</Form.Label>
                                <Form.Control
                                    as="textarea"
                                    rows="3"
                                    value={this.state.motivoTratamiento}
                                    onChange={this.handleChange}
                                    placeholder="Detallar Motivos"
                                />
                            </Form.Group>
                            <Form.Group controlId="motivoCoconstruido">
                                <Form.Label>Motivo consulta Co-construido</Form.Label>
                                <Form.Control
                                    as="textarea"
                                    rows="3"
                                    value={this.state.motivoCoconstruido}
                                    onChange={this.handleChange}
                                    placeholder="Detallar Motivos"
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