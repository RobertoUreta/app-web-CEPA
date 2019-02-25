import React, { Component } from 'react'
import { Form, Col, Button, Row } from 'react-bootstrap'
import { Option } from '../../../components/Option'
import DatePicker from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css";


const tiposEpicrisis = ["Alta terapéutica", "Alta administrativa", "Renuncia voluntaria", "Alta por abandono", "Derivación", "Otra"]
export class EpicrisisPsiquiatrica extends Component {


    constructor(props) {
        super(props);

        this.state = {
            fecha: null,
            tipoEpicrisis: "",
            motivos: "",
            diagnotiscoEgreso: "",
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
        const email = this.inputEmail.value
        const pwd = this.inputPwd.value
        console.log({ email, pwd });

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
                                            <DatePicker
                                                customInput={<Form.Control />}
                                                dateFormat="dd/MM/yyyy"
                                                selected={this.state.fecha}
                                                onChange={this._handleChange}
                                                placeholderText="Fecha"
                                            />
                                        </div>
                                    </Form.Group>
                                </Col>
                                <Col>
                                    <Form.Group controlId="tipoEpicrisis">
                                        <Form.Control
                                            as="select"
                                            value={this.state.tipoEpicrisis}
                                            onChange={this.handleChange}
                                        >
                                            <option hidden>Tipo epicrisis</option>
                                            <Option options={tiposEpicrisis} />
                                        </Form.Control>
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
                                    value={this.state.diagnotiscoEgreso}
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

                </form>
            </div>
        );
    }
}