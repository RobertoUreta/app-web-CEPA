import React, { Component } from 'react'
import { Form, Col, Button, Row } from 'react-bootstrap'
import { Option } from '../../../components/Option'
import DatePicker from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css";
import { TextoAyuda } from '../../../components/TextoAyuda'
import SweetAlert from 'react-bootstrap-sweetalert'
import { updateEpicrisisPsiquiatrica, obtenerEpicrisisPsiquiatrica } from '../../../backend/epicrisis/epicrisisPsiquiatrica';


const tiposEpicrisis = ["Alta terapéutica", "Alta administrativa", "Renuncia voluntaria", "Alta por abandono", "Derivación", "Otra"]
export class EpicrisisPsiquiatrica extends Component {


    constructor(props) {
        super(props);

        this.state = {
            fecha: null,
            tipoEpicrisis: "",
            motivos: "",
            diagnosticoEgreso: "",
            indicaciones: ""
        };
    }


    _handleChange = (date) => {
        this.setState({
            fecha: date
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
        let fecha1 = new Date(aux.fecha)
        aux.fecha = fecha1.toJSON().slice(0, 19).replace('T', ' ')
        console.log(aux);
        let resp = updateEpicrisisPsiquiatrica(aux, this.props.pacienteId);
        resp
            .then(res => {
                //console.log("agregado", res.data)
                if (res.data.ok) {
                    const getAlert = () => (
                        <SweetAlert success title="Datos agregados" onConfirm={this._hideAlert}>
                            Se agregaron correctamente los datos de la epicrisis psiquiatrica.
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
        let prom = obtenerEpicrisisPsiquiatrica(this.props.pacienteId);
        prom.then(res => {
            let data = res.data;
            console.log(res.data);
            if (data.ok) {
                let epi = data.respuesta[0];
                this.setState({
                    fecha: epi.fecha_epicrisis === '0000-00-00' ? null :epi.fecha_epicrisis,
                    tipoEpicrisis:epi.tipo_epicrisis === 'default' ? "" : epi.tipo_epicrisis,
                    motivos: epi.motivos=== 'default' ? "" :epi.motivos,
                    diagnosticoEgreso: epi.diagnostico_egreso=== 'default' ? "" :epi.diagnostico_egreso,
                    indicaciones: epi.indicaciones=== 'default' ? "" :epi.indicaciones
                });
            }
        })
    }

    render() {
        return (
            <div className="epicrisisPsiquiatrica">
                <form onSubmit={this.handleSubmit}>
                    <Form.Row>
                        <Form.Group as={Col}>
                            <Row>
                                <Col>
                                    <Form.Group controlId="fecha">
                                        <div>
                                            <TextoAyuda
                                                nombre="fecha"
                                                tooltip="Fecha"
                                                componente={<DatePicker
                                                    customInput={<Form.Control />}
                                                    dateFormat="dd/MM/yyyy"
                                                    selected={this.state.fecha}
                                                    onChange={this._handleChange}
                                                    placeholderText="Fecha"
                                                />}
                                            />

                                        </div>
                                    </Form.Group>
                                </Col>
                                <Col>
                                    <Form.Group controlId="tipoEpicrisis">
                                        <TextoAyuda
                                            nombre="tipoEpicrisis"
                                            tooltip="Tipo epicrisis"
                                            componente={<Form.Control
                                                as="select"
                                                value={this.state.tipoEpicrisis}
                                                onChange={this.handleChange}
                                            >
                                                <option hidden>Tipo epicrisis</option>
                                                <Option options={tiposEpicrisis} />
                                            </Form.Control>}
                                        />

                                    </Form.Group>
                                </Col>
                            </Row>

                            <Form.Group controlId="motivos">
                                <Form.Label>Detallar motivos</Form.Label>
                                <Form.Control
                                    as="textarea"
                                    rows="3"
                                    value={this.state.motivos}
                                    onChange={this.handleChange}
                                    placeholder="Detallar Motivos"
                                />
                            </Form.Group>
                            <Form.Group controlId="diagnosticoEgreso">
                                <Form.Label>Diagnóstico al momento de egreso</Form.Label>
                                <Form.Control
                                    as="textarea"
                                    rows="3"
                                    value={this.state.diagnosticoEgreso}
                                    onChange={this.handleChange}
                                    placeholder="Diagnóstico"
                                />
                            </Form.Group>
                            <Form.Group controlId="indicaciones">
                                <Form.Label>Indicaciones</Form.Label>
                                <Form.Control
                                    as="textarea"
                                    rows="3"
                                    value={this.state.indicaciones}
                                    onChange={this.handleChange}
                                    placeholder="Indicaciones"
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