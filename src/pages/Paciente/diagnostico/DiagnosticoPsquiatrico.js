import React, { Component } from 'react'
import { Form, Col, Button } from 'react-bootstrap'
import DatePicker from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css";
import { TextoAyuda } from '../../../components/TextoAyuda'
import SweetAlert from 'react-bootstrap-sweetalert'
import { updateDiagnosticoPsiquiatrico, obtenerDiagnosticoPsiquiatrico } from '../../../backend/diagnostico/diagnosticoPsiquiatrico';

export class DiagnosticoPsiquiatrico extends Component {


    constructor(props) {
        super(props);

        this.state = {
            tratamientoPsiquiatrico: "",
            diagnosticoDSMeje5: "",
            etapaTratamiento: "",
            observacion: "",
            fechaCierrePsiquiatra: null,
            alert: null
        };
    }


    _handleChange = (date) => {
        this.setState({
            fechaCierrePsiquiatra: date
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
        let fecha = new Date(aux.fechaCierrePsiquiatra)
        aux.fechaCierrePsiquiatra = fecha.toJSON().slice(0, 19).replace('T', ' ')
        console.log(aux);
        let resp = updateDiagnosticoPsiquiatrico(aux, this.props.pacienteId);
        resp
            .then(res => {
                //console.log("agregado", res.data)
                if (res.data.ok) {
                    const getAlert = () => (
                        <SweetAlert success title="Datos agregados" onConfirm={this._hideAlert}>
                            Se agregaron correctamente los datos deL diagnostico psiquiatrico.
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
        let prom = obtenerDiagnosticoPsiquiatrico(this.props.pacienteId);
        prom.then(res => {
            let data = res.data;
            console.log(res.data);
            if (data !== undefined) {
                let diag = data.respuesta[0];
                this.setState({
                    tratamientoPsiquiatrico: diag.tratamiento_psiquiatrico === 'default' ? "" : diag.tratamiento_psiquiatrico,
                    diagnosticoDSMeje5: diag.diagnostico_dsm_eje5 === 'default' ? "" : diag.diagnostico_dsm_eje5,
                    etapaTratamiento: diag.etapa_tratamiento === 'default' ? "" : diag.etapa_tratamiento,
                    observacion: diag.observacion === 'default' ? "" : diag.observacion,
                    fechaCierrePsiquiatra: diag.fecha_cierre_psiquiatra === '0000-00-00' ? null : diag.fecha_cierre_psiquiatra,
                });
            }
        })
    }

    render() {
        return (
            <div className="DiagnosticoPsiquiatrico">
                <form onSubmit={this.handleSubmit}>
                    <Form.Row>
                        <Form.Group as={Col}>
                            <Form.Group controlId="tratamientoPsiquiatrico">
                                <Form.Label>Tratamiento Psiquiatrico</Form.Label>
                                <Form.Control
                                    as="textarea"
                                    rows="3"
                                    value={this.state.tratamientoPsiquiatrico}
                                    onChange={this.handleChange}
                                    placeholder="Tratamiento psiquiatrico"
                                />
                            </Form.Group>
                            <Form.Group controlId="diagnosticoDSMeje5">
                                <Form.Label>Diagnostico DSM eje V</Form.Label>
                                <Form.Control
                                    as="textarea"
                                    rows="3"
                                    value={this.state.diagnosticoDSMeje5}
                                    onChange={this.handleChange}
                                    placeholder="Diagnostico DSM eje V"
                                />
                            </Form.Group>
                            <Form.Group controlId="etapaTratamiento">
                                <Form.Label>Etapa de Tratamiento</Form.Label>
                                <Form.Control
                                    as="textarea"
                                    rows="3"
                                    value={this.state.etapaTratamiento}
                                    onChange={this.handleChange}
                                    placeholder="Etapa de Tratamiento"
                                />
                            </Form.Group>
                            <Form.Group controlId="observacion">
                                <Form.Label>Observación</Form.Label>
                                <Form.Control
                                    as="textarea"
                                    rows="3"
                                    value={this.state.observacion}
                                    onChange={this.handleChange}
                                    placeholder="Observación"
                                />
                            </Form.Group>
                            <div>
                                <TextoAyuda
                                    nombre="fechaCierrePsiquiatra"
                                    tooltip="Fecha Cierre Psiquiatra"
                                    componente={<DatePicker
                                        customInput={<Form.Control />}
                                        dateFormat="dd/MM/yyyy"
                                        selected={this.state.fechaCierrePsiquiatra}
                                        onChange={this._handleChange}
                                        placeholderText="Fecha Cierre Psiquiatra"
                                    />}
                                />
                            </div>

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