import React, { Component } from 'react'
import { Form, Col, Button, Row } from 'react-bootstrap'
import DatePicker from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css";
import SweetAlert from 'react-bootstrap-sweetalert'
import { TextoAyuda } from '../../../components/TextoAyuda'
import { updateDiagnosticoPsicologico, obtenerDiagnosticoPsicologico } from '../../../backend/diagnostico/diagnosticoPsicologico';

export class DiagnosticoPsicologico extends Component {


    constructor(props) {
        super(props);

        this.state = {
            diagnostico: "",
            subtrastorno: "",
            tipoEpisodio: "",
            otroTipoEspecificacion: "",
            modalidadTratamiento: "",
            modeloTerapeutico: "",
            otroModeloTerapeutico: "",
            traspasoModalidadTratamiento: 0,
            fechaTraspasoModTratamiento: null,
            fechaCierrePsicologico: null,
            alert: null
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
        if (aux.fechaTraspasoModTratamiento===null) {
            aux.fechaTraspasoModTratamiento='1900-01-10'
        }
        if (aux.fechaCierrePsicologico===null) {
            aux.fechaCierrePsicologico='1900-01-10'
        }
        let fecha = new Date(aux.fechaTraspasoModTratamiento)
        aux.fechaTraspasoModTratamiento = fecha.toJSON().slice(0, 19).replace('T', ' ')
        let fecha1 = new Date(aux.fechaCierrePsicologico)
        aux.fechaCierrePsicologico = fecha1.toJSON().slice(0, 19).replace('T', ' ')
        console.log(aux);
        let resp = updateDiagnosticoPsicologico(aux, this.props.pacienteId);
        resp
            .then(res => {
                //console.log("agregado", res.data)
                if (res.data.ok) {
                    const getAlert = () => (
                        <SweetAlert success title="Datos agregados" onConfirm={this._hideAlert}>
                            Se agregaron correctamente los datos deL diagnostico psicologico.
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
        let prom = obtenerDiagnosticoPsicologico(this.props.pacienteId);
        prom.then(res => {
            let data = res.data;
            console.log(res.data);
            if (data.ok) {
                let diag = data.respuesta[0];
                let aux = new Date(diag.fecha_traspaso_mod_tratamiento)
                let fecha = aux.toISOString().split('T')
                let aux1 = new Date(diag.fecha_cierre_psicologico)
                let fecha1 = aux1.toISOString().split('T')
                this.setState({
                    diagnostico: diag.diagnostico==='default'?"":diag.diagnostico,
                    subtrastorno: diag.subtrastorno==='default'?"":diag.subtrastorno,
                    tipoEpisodio: diag.tipo_episodio==='default'?"":diag.tipo_episodio,
                    otroTipoEspecificacion: diag.otro_tipo_especificacion==='default'?"":diag.otro_tipo_especificacion,
                    modalidadTratamiento: diag.modalidad_tratamiento==='default'?"":diag.modalidad_tratamiento,
                    modeloTerapeutico: diag.modelo_terapeutico==='default'?"":diag.modelo_terapeutico,
                    otroModeloTerapeutico: diag.otro_modelo_terapeutico==='default'?"":diag.otro_modelo_terapeutico,
                    traspasoModalidadTratamiento: diag.traspaso_modalidad_tratamiento?1:0,
                    fechaTraspasoModTratamiento: fecha[0]==='1900-01-10'?null:diag.fecha_traspaso_mod_tratamiento,
                    fechaCierrePsicologico: fecha1[0]==='1900-01-10'?null:diag.fecha_cierre_psicologico
                });
            }
        })
    }

    render() {
        return (
            <div className="DiagnosticoPsicologico">
                <form onSubmit={this.handleSubmit}>
                    <Form.Row>
                        <Form.Group as={Col}>
                            <Form.Group controlId="diagnostico">
                                <Form.Label>Diagnostico</Form.Label>
                                <Form.Control
                                    as="textarea"
                                    rows="3"
                                    value={this.state.diagnostico}
                                    onChange={this.handleChange}
                                    placeholder="Diagnostico"
                                />
                            </Form.Group>
                            <Form.Group controlId="subtrastorno">
                                <Form.Label>Subtrastorno</Form.Label>
                                <Form.Control
                                    as="textarea"
                                    rows="3"
                                    value={this.state.subtrastorno}
                                    onChange={this.handleChange}
                                    placeholder="Subtrastorno"
                                />
                            </Form.Group>
                            <Form.Group controlId="tipoEpisodio">
                                <Form.Label>Tipo de episodio</Form.Label>
                                <Form.Control
                                    as="textarea"
                                    rows="3"
                                    value={this.state.tipoEpisodio}
                                    onChange={this.handleChange}
                                    placeholder="Tipo de Episodio"
                                />
                            </Form.Group>
                            <Form.Group controlId="otroTipoEspecificacion">
                                <Form.Label>Otro tipo de especificacion</Form.Label>
                                <Form.Control
                                    as="textarea"
                                    rows="3"
                                    value={this.state.otroTipoEspecificacion}
                                    onChange={this.handleChange}
                                    placeholder="Otro tipo de especificacion"
                                />
                            </Form.Group>
                            <Form.Group controlId="modalidadTratamiento">
                                <Form.Label>Modalidad de Tratamiento</Form.Label>
                                <Form.Control
                                    as="textarea"
                                    rows="3"
                                    value={this.state.modalidadTratamiento}
                                    onChange={this.handleChange}
                                    placeholder="Modalidad de Tratamiento"
                                />
                            </Form.Group>
                            <Form.Group controlId="modeloTerapeutico">
                                <Form.Label>Modelo Terapeutico</Form.Label>
                                <Form.Control
                                    as="textarea"
                                    rows="3"
                                    value={this.state.modeloTerapeutico}
                                    onChange={this.handleChange}
                                    placeholder="Modelo Terapeutico"
                                />
                            </Form.Group>
                            <Form.Group controlId="otroModeloTerapeutico">
                                <Form.Label>Especificar otro modelo terapeutico</Form.Label>
                                <Form.Control
                                    as="textarea"
                                    rows="3"
                                    value={this.state.otroModeloTerapeutico}
                                    onChange={this.handleChange}
                                    placeholder="Especificar otro modelo terapeutico"
                                />
                            </Form.Group>
                            <Row>
                                <Col>
                                    <Form.Check
                                        custom
                                        checked={this.state.traspasoModalidadTratamiento}
                                        value={this.state.traspasoModalidadTratamiento}
                                        onChange={event => this.setState({
                                            [event.target.id]: event.target.checked ? 1 : 0
                                        })}
                                        label="Traspaso de modalidad de tratamiento(grupal a individual)"
                                        type="checkbox"
                                        id="traspasoModalidadTratamiento"
                                    />
                                </Col>
                                <Col>
                                    <Form.Group controlId="fechaTraspasoModTratamiento">
                                        <div>
                                            <TextoAyuda
                                                nombre="fechaTraspasoModTratamiento"
                                                tooltip="Fecha Traspaso Modalidad de Tratamiento"
                                                componente={<DatePicker
                                                    customInput={<Form.Control />}
                                                    dateFormat="dd/MM/yyyy"
                                                    selected={this.state.fechaTraspasoModTratamiento}
                                                    onChange={(date) => {
                                                        this.setState({
                                                            fechaTraspasoModTratamiento: date
                                                        });
                                                    }}
                                                    placeholderText="Fecha Traspaso Modalidad de tratamiento"
                                                />}
                                            />

                                        </div>
                                    </Form.Group>
                                </Col>
                                <Col>
                                    <Form.Group controlId="fechaCierrePsicologico">
                                        <div>
                                            <TextoAyuda
                                                nombre="fechaCierrePsicologico"
                                                tooltip="Fecha Cierre Psicologico"
                                                componente={<DatePicker
                                                    customInput={<Form.Control />}
                                                    dateFormat="dd/MM/yyyy"
                                                    selected={this.state.fechaCierrePsicologico}
                                                    onChange={(date) => {
                                                        this.setState({
                                                            fechaCierrePsicologico: date
                                                        });
                                                    }}
                                                    placeholderText="Fecha cierre psicologico"
                                                />}
                                            />
                                        </div>
                                    </Form.Group>
                                </Col>
                            </Row>



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