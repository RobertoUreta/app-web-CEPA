import React, { Component } from 'react'
import { Form, Col, Button, Row } from 'react-bootstrap'
import { Option } from '../../../components/Option'
import { TextoAyuda } from '../../../components/TextoAyuda'
import { obtenerRegistroPsicologico } from '../../../backend/agenda/agenda';


const asistentes = ["PI", "Adulto responsable", "Familia", "Otro significativo"];
const tiposTratamiento = ["Terapia individual", "Taller", "Intervención grupal", "Derivación asistida"];
export class SesionPsicologica extends Component {

    constructor(props) {
        super(props);

        this.state = {
            numSesion: "",
            diagnostico: 0,
            tratamiento: 0,
            seguimiento: 0,
            tipoTratamiento: "",
            quienAsiste: "",
            descripcionLlegada: "",
            objetivoSesion: "",
            intervencionResultado: "",
            conductaObservada: "",
            descripcionRetiro: "",
            indicaciones: "",
            notasSesion: "",
            editable: false,
            loadingInfo: 'initial',

        };
    }

    componentDidMount() {
        const self = this
        this.setState({ loadingInfo: 'true' })
        console.log("idsesionasdfa", this.props.idSesion)
        let promise = obtenerRegistroPsicologico(this.props.idSesion)
        promise
            .then(res => {
                let data = res.data;
                console.log("data", data)
                if (data !== undefined) {
                    let reg = data.response[0]
                    self.setState({
                        diagnostico: 0,
                        tratamiento: 0,
                        seguimiento: 0,
                        tipoTratamiento: reg.tipo_tratamiento === "default" ? "" : reg.tipo_tratamiento,
                        quienAsiste: reg.quien_asiste === "default" ? "": reg.quien_asiste,
                        descripcionLlegada: reg.descripcion_llegada === "default" ? "": reg.descripcion_llegada,
                        objetivoSesion: reg.objetivo_sesion==="default" ? "": reg.objetivo_sesion,
                        intervencionResultado: reg.intervencion_resultado === "default" ? "" : reg.intervencion_resultado,
                        conductaObservada: reg.conducta_observada ==="default"?"":reg.conducta_observada,
                        descripcionRetiro: reg.descripcion_retiro==="default"? "":reg.descripcion_retiro,
                        indicaciones: reg.indicaciones ==="default" ? "": reg.indicaciones,
                        notasSesion: reg.notas_sesion === "default" ? "" : reg.notas_sesion,
                        loadingInfo: 'false'
                    })
                }
            })
    }


    handleChange = event => {
        this.setState({
            [event.target.id]: event.target.value
        });
    }

    

    _handleClick = () => {
        this.setState({ editable: !this.state.editable })
    }

    render() {
        if (this.state.loadingInfo === 'initial') {
            return <h2>Intializing...</h2>;

        }


        if (this.state.loadingInfo === 'true') {
            console.log("sesiones", this.state.sesiones)

            return <h2>Cargando...</h2>;

        }
        return (
            <div className="sesionPsicologica">
                <form onSubmit={this.handleSubmit}>
                    <Form.Row>
                        <Form.Group as={Col}>
                            <Row>
                                <Col>
                                    <Form.Group controlId="numSesion">
                                        <TextoAyuda
                                            nombre="numSesion"
                                            tooltip="N° de sesión"
                                            componente={<Form.Control
                                                plaintext readOnly
                                                value={this.state.numSesion}
                                                onChange={this.handleChange}
                                                placeholder="N° de Sesión"
                                            />}
                                        />

                                    </Form.Group>
                                </Col>
                                <Col>
                                    <Form.Check
                                        custom
                                        value={this.state.diagnostico}
                                        onChange={this.handleChange}
                                        label="Diagnóstico"
                                        type="checkbox"
                                        id="checkbox-diagnostico"
                                    />
                                </Col>
                                <Col>
                                    <Form.Check
                                        custom
                                        value={this.state.tratamiento}
                                        onChange={this.handleChange}
                                        label="Tratamiento"
                                        type="checkbox"
                                        id="checkbox-tratamiento"
                                    />
                                </Col>
                                <Col>
                                    <Form.Check
                                        custom
                                        value={this.state.seguimiento}
                                        onChange={this.handleChange}
                                        label="Seguimiento"
                                        type="checkbox"
                                        id="checkbox-seguimiento"
                                    />
                                </Col>
                            </Row>
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
                                    <Form.Group controlId="quienAsiste">
                                        <TextoAyuda
                                            nombre="quienAsiste"
                                            tooltip="Asiste"
                                            componente={<Form.Control
                                                as="select"
                                                value={this.state.quienAsiste}
                                                onChange={this.handleChange}
                                            >
                                                <option hidden>Asiste</option>
                                                <Option options={asistentes} />
                                            </Form.Control>}
                                        />

                                    </Form.Group>
                                </Col>
                            </Row>

                            <Form.Group controlId="descripcionLlegada">
                                <Form.Label>Descripción del usuario a su llegada</Form.Label>
                                <Form.Control
                                    readOnly={!this.state.editable}
                                    as="textarea"
                                    rows="3"
                                    value={this.state.descripcionLlegada}
                                    onChange={this.handleChange}
                                    placeholder="Descripción"
                                />
                            </Form.Group>
                            <Form.Group controlId="objetivoSesion">
                                <Form.Label>Objetivo de la sesión</Form.Label>
                                <Form.Control
                                    readOnly={!this.state.editable}
                                    as="textarea"
                                    rows="3"
                                    value={this.state.objetivoSesion}
                                    onChange={this.handleChange}
                                    placeholder="Objetivo"
                                />
                            </Form.Group>
                            <Form.Group controlId="intervencionResultado">
                                <Form.Label>Intervenciones realizadas y resultado obtenido</Form.Label>
                                <Form.Control
                                    readOnly={!this.state.editable}
                                    as="textarea"
                                    rows="3"
                                    value={this.state.intervencionResultado}
                                    onChange={this.handleChange}
                                    placeholder="Intervencion realizada y resultado obtenido"
                                />
                            </Form.Group>
                            <Form.Group controlId="conductaObservada">
                                <Form.Label>Conducta observada durante la sesión</Form.Label>
                                <Form.Control
                                    readOnly={!this.state.editable}
                                    as="textarea"
                                    rows="3"
                                    value={this.state.conductaObservada}
                                    onChange={this.handleChange}
                                    placeholder="Conducta observada"
                                />
                            </Form.Group>
                            <Form.Group controlId="descripcionRetiro">
                                <Form.Label>Descripción del usuario a su retiro</Form.Label>
                                <Form.Control
                                    readOnly={!this.state.editable}
                                    as="textarea"
                                    rows="3"
                                    value={this.state.descripcionRetiro}
                                    onChange={this.handleChange}
                                    placeholder="Descripción"
                                />
                            </Form.Group>
                            <Form.Group controlId="indicaciones">
                                <Form.Label>Indicaciones (en el caso de proceder)</Form.Label>
                                <Form.Control
                                    readOnly={!this.state.editable}
                                    as="textarea"
                                    rows="3"
                                    value={this.state.indicaciones}
                                    onChange={this.handleChange}
                                    placeholder="Indicaciones"
                                />
                            </Form.Group>
                            <Form.Group controlId="notasSesion">
                                <Form.Label>Notas de la sesión</Form.Label>
                                <Form.Control
                                    readOnly={!this.state.editable}
                                    as="textarea"
                                    rows="8"
                                    value={this.state.notasSesion}
                                    onChange={this.handleChange}
                                    placeholder="Notas de la sesión"
                                />
                            </Form.Group>

                            <Form.Group>
                                <div className="btn-container">
                                    <Button
                                        className="btn-submit"
                                        onClick={this._handleClick}
                                    >
                                        Editar
                                        </Button>
                                    <div className="divider"></div>
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