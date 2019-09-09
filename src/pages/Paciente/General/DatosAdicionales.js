import React, { Component } from 'react'
import { Form, Col, Button } from 'react-bootstrap'
import { Option } from '../../../components/Option'
import { TextoAyuda } from '../../../components/TextoAyuda'
import { obtenerDatosAdicionales } from '../../../backend/ingreso/ingreso';

const estados = ["Activo", "Cerrado"]
const tiposIngreso = ["Consulta espontánea","Derivación","ISL"]
const etapa = ["En lista de espera","Con evaluación de ingreso","En tratamiento","Derivación","En proceso de alta"]
export class DatosAdicionales extends Component {
    constructor(props) {
        super(props);

        this.state = {
            estado: "",
            etapa: "",
            tipoIngreso: "",
            institucion: "",
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

        this.props.handleDatosAdicionales(info)

        console.log(this.state)

    }

    componentDidMount() {
        let prom = obtenerDatosAdicionales(this.props.pacienteId);
        prom.then(res => {
            let data = res.data;
            console.log(res.data);
            if (data.ok) {
                let datos = data.respuesta[0];
                this.setState({
                    estado:datos.estado  === 'default' ? "" :datos.estado,
                    etapa: datos.etapa === 'default' ? "" :datos.etapa,
                    tipoIngreso:datos.tipo_ingreso === 'default' ? "" :datos.tipo_ingreso,
                    institucion:  datos.institucion=== 'default' ? "" :datos.institucion,
                });
            }
        })
    }

    render() {
        return (
            <div className="DatosAdicionales">
                <form onSubmit={this.handleSubmit}>
                    <Form.Row>
                        <Form.Group as={Col}>
                            <Form.Group controlId="estado">
                                <TextoAyuda
                                    nombre="estado"
                                    tooltip="Estado"
                                    componente={<Form.Control
                                        as="select"
                                        value={this.state.estado}
                                        onChange={this.handleChange}
                                    >
                                        <option hidden>Estado</option>
                                        <Option options={estados} />
                                    </Form.Control>}
                                />

                            </Form.Group>
                            <Form.Group controlId="etapa">
                                <TextoAyuda
                                    nombre="etapa"
                                    tooltip="Etapa"
                                    componente={<Form.Control
                                        as="select"
                                        value={this.state.etapa}
                                        onChange={this.handleChange}
                                    >
                                        <option hidden>Etapa</option>
                                        <Option options={etapa} />
                                    </Form.Control>}
                                />

                            </Form.Group>
                        </Form.Group>

                        <Form.Group as={Col}>
                            <Form.Group controlId="tipoIngreso">
                                <TextoAyuda
                                    nombre="tipoIngreso"
                                    tooltip="Tipo de Ingreso"
                                    componente={<Form.Control
                                        as="select"
                                        value={this.state.tipoIngreso}
                                        onChange={this.handleChange}
                                    >
                                        <option hidden>Tipo de Ingreso</option>
                                        <Option options={tiposIngreso} />
                                    </Form.Control>}
                                />

                            </Form.Group>
                            <Form.Group controlId="institucion">
                                <TextoAyuda
                                    nombre="institucion"
                                    tooltip="Institución"
                                    componente={<Form.Control
                                        value={this.state.institucion}
                                        onChange={this.handleChange}
                                        placeholder="Institución"
                                    />}
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