import React, { Component } from 'react'
import { Form, Col, Row, Button } from 'react-bootstrap'
import { Option } from '../../../components/Option'
import { TextoAyuda } from '../../../components/TextoAyuda'
import { obtenerDatosSocio } from '../../../backend/ingreso/ingreso';
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
        let info = JSON.stringify(this.state, null, '  ');

        this.props.handleDatosSocio(info)

        console.log(this.state)

    }

    componentDidMount() {
        let prom = obtenerDatosSocio(this.props.pacienteId);
        prom.then(res => {
            let data = res.data;
            console.log(res.data);
            if (data.ok) {
                let datos = data.respuesta[0];
                console.log(datos.estado_civil);
                this.setState({
                    pais: datos.pais === 'default' ? "" : datos.pais,
                    region: datos.region === 'default' ? "" : datos.region,
                    provincia: datos.provincia === 'default' ? "" : datos.provincia,
                    ciudad: datos.ciudad === 'default' ? "" : datos.ciudad,
                    direccion: datos.direccion === 'default' ? "" : datos.direccion,
                    ingresoFamiliar: datos.ingreso_familiar === 'default' ? "" : datos.ingreso_familiar,
                    tipoFamilia: datos.tipo_familia === 'default' ? "" : datos.tipo_familia,
                    estadoCivil: datos.estado_civil === 'default' ? "" : datos.estado_civil,
                });
            }
            console.log(this.state.estadoCivil);
        })
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
                                        <TextoAyuda
                                            nombre="pais"
                                            tooltip="País"
                                            componente={<Form.Control
                                                value={this.state.pais}
                                                onChange={this.handleChange}
                                                placeholder="País"
                                            />}
                                        />

                                    </Form.Group>
                                </Col>
                                <Col>
                                    <Form.Group controlId="region">
                                        <TextoAyuda
                                            nombre="region"
                                            tooltip="Región"
                                            componente={<Form.Control
                                                value={this.state.region}
                                                onChange={this.handleChange}
                                                placeholder="Región"
                                            />}
                                        />

                                    </Form.Group>
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <Form.Group controlId="provincia">
                                        <TextoAyuda
                                            nombre="provincia"
                                            tooltip="Provincia"
                                            componente={<Form.Control
                                                value={this.state.provincia}
                                                onChange={this.handleChange}
                                                placeholder="Provincia"
                                            />}
                                        />

                                    </Form.Group>
                                </Col>
                                <Col>
                                    <Form.Group controlId="ciudad">
                                        <TextoAyuda
                                            nombre="ciudad"
                                            tooltip="Ciudad"
                                            componente={<Form.Control
                                                value={this.state.ciudad}
                                                onChange={this.handleChange}
                                                placeholder="Ciudad"
                                            />}
                                        />

                                    </Form.Group>
                                </Col>
                            </Row>
                            <Form.Group controlId="direccion">
                                <TextoAyuda
                                    nombre="direccion"
                                    tooltip="Dirección"
                                    componente={<Form.Control
                                        value={this.state.direccion}
                                        onChange={this.handleChange}
                                        placeholder="Dirección"
                                    />}
                                />

                            </Form.Group>

                        </Form.Group>

                        <Form.Group as={Col}>
                            <Form.Group controlId="ingresoFamiliar">
                                <TextoAyuda
                                    nombre="ingresoFamiliar"
                                    tooltip="Ingreso Familiar"
                                    componente={<Form.Control
                                        value={this.state.ingresoFamiliar}
                                        onChange={this.handleChange}
                                        placeholder="Ingreso Familiar"
                                    />}
                                />

                            </Form.Group>
                            <Form.Group controlId="tipoFamilia">
                                <TextoAyuda
                                    nombre="tipoFamilia"
                                    tooltip="Tipo de familia"
                                    componente={<Form.Control
                                        as="select"
                                        value={this.state.tipoFamilia}
                                        onChange={this.handleChange}
                                    >
                                        <option hidden>Tipo de Familia</option>
                                        <Option options={tiposFamilias} />
                                    </Form.Control>}
                                />

                            </Form.Group>
                            <Form.Group controlId="estadoCivil">
                                <TextoAyuda
                                    nombre="estadoCivil"
                                    tooltip="Estado Civil"
                                    componente={<Form.Control
                                        as="select"
                                        value={this.state.estadoCivil}
                                        onChange={this.handleChange}
                                    >
                                        <option hidden>Estado Civil</option>
                                        <Option options={estadosCiviles} />
                                    </Form.Control>}
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

