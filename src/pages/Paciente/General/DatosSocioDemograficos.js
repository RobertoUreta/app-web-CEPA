import React, { Component } from 'react'
import { Form, Col, Row, Button } from 'react-bootstrap'
import { Option } from '../../../components/Option'
const estadosCiviles = ["Soltero/a", "Casado/a", "Viudo/a", "Divorciado/a", "Separado/a", "Conviviente"]
const tiposFamilias = ["Familia Nuclear", "Familia Extensa", "Familia monoparental",
    "Familia ensamblada", "Familia homoparental", "Familia de padres separados"]


export class DatosSocioDemograficos extends Component {

    constructor(props) {
        super(props);

        this.state = {
            pais: "",
            region: "",
            provincia: "",
            ciudad: "",
            direccion: "",
            ingresoFamiliar: "",
            tipoFamilia: "",
            estadoCivil: ""
        };
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
            <div className="DatosSocioDemograficos">
                <form onSubmit={this.handleSubmit}>
                    <Form.Row>
                        <Form.Group as={Col}>
                            <Row>
                                <Col>
                                    <Form.Group controlId="pais">
                                        <Form.Control
                                            value={this.state.pais}
                                            onChange={this.handleChange}
                                            placeholder="País"
                                        />
                                    </Form.Group>
                                </Col>
                                <Col>
                                    <Form.Group controlId="region">
                                        <Form.Control
                                            value={this.state.region}
                                            onChange={this.handleChange}
                                            placeholder="Región"
                                        />
                                    </Form.Group>
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <Form.Group controlId="provincia">
                                        <Form.Control
                                            value={this.state.provincia}
                                            onChange={this.handleChange}
                                            placeholder="Provincia"
                                        />
                                    </Form.Group>
                                </Col>
                                <Col>
                                    <Form.Group controlId="ciudad">
                                        <Form.Control
                                            value={this.state.ciudad}
                                            onChange={this.handleChange}
                                            placeholder="Ciudad"
                                        />
                                    </Form.Group>
                                </Col>
                            </Row>
                            <Form.Group controlId="direccion">
                                <Form.Control
                                    value={this.state.direccion}
                                    onChange={this.handleChange}
                                    placeholder="Dirección"
                                />
                            </Form.Group>

                        </Form.Group>

                        <Form.Group as={Col}>
                            <Form.Group controlId="ingresoFamiliar">
                                <Form.Control
                                    value={this.state.ingresoFamiliar}
                                    onChange={this.handleChange}
                                    placeholder="Ingreso Familiar"
                                />
                            </Form.Group>
                            <Form.Group controlId="tipoFamilia">
                                <Form.Control
                                    as="select"
                                    value={this.state.tipoFamilia}
                                    onChange={this.handleChange}
                                >
                                    <option hidden>Tipo de Familia</option>
                                    <Option options={tiposFamilias} />
                                </Form.Control>
                            </Form.Group>
                            <Form.Group controlId="estadoCivil">
                                <Form.Control
                                    as="select"
                                    value={this.state.estadoCivil}
                                    onChange={this.handleChange}
                                >
                                    <option hidden>Estado Civil</option>
                                    <Option options={estadosCiviles} />
                                </Form.Control>
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

