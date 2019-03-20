import React, { Component } from 'react'
import { Form, Col, Button, Row } from 'react-bootstrap'
import { Option } from '../../../components/Option'
import { TextoAyuda } from '../../../components/TextoAyuda'

const tiposTratamiento = ["Terapia individual", "Taller", "Intervención grupal", "Derivación asistida"];
export class SesionPsiquiatrica extends Component {

    constructor(props) {
        super(props);

        this.state = {
            numSesion: "",
            tipoTratamiento: "",
            notasSesion: "",
            editable: false,
        };
    }

    handleChange = event => {
        this.setState({
            [event.target.id]: event.target.value
        });
    }

    handleSubmit = event => {
       

    }

    _handleClick = () => {
        this.setState({ editable: !this.state.editable })
    }


    render() {
        return (
            <div className="sesionPsiquiatrica">
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
                                                value={this.state.numSesion}
                                                onChange={this.handleChange}
                                                placeholder="N° de Sesión"
                                            />}
                                        />

                                    </Form.Group>
                                </Col>
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
                            </Row>
                            <Form.Group controlId="notasSesion">
                                <Form.Label>Notas de la sesión</Form.Label>
                                <Form.Control
                                    readOnly={!this.state.editable}

                                    as="textarea"
                                    rows="10"
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