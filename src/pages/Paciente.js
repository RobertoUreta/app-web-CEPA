import React, { Component } from 'react'
import { Col, Form, Table, Button, Row } from 'react-bootstrap'
import { Layout } from '../components/Layout'
import { Option } from '../components/Option'
import { TextoAyuda } from '../components/TextoAyuda'
import "../styles/styles.css"

import axios from 'axios'




export class Paciente extends Component {

    constructor(props) {
        super(props)

        this.state = {
            filtro: "",
            idUsuario: "",
            rows:[]
        }
    }

    componentDidMount() {
        console.log("componentWillMount")
        axios.get('http://localhost:3001/obtener_id_paciente')
        .then(res => {
            console.log(res.data)
            let id = res.data.rows[0].id + 1
            let enlace= "/index/" + id
            
            this.setState({rows: res.data.rows, idUsuario: enlace})
        })
            
        .catch(err => {
            console.log(err);
        });

    }

 

    render() {

        var filtros = ["Todos los pacientes", "Pacientes Asociados", "Pacientes en Lista de Espera"]
        console.log("render", this.state.rows)
        return (
            <div>
                <div>

                    <Layout
                        mustBeSideNav={false} />

                </div>
                <div id="body">
                    <div>
                        <h3>
                            <strong>
                                Lista de Pacientes
                        </strong>
                        </h3>
                    </div>
                    <div style={{ display: 'flex', paddingBottom: '10px' }}>
                        <Row>
                            <Col>
                                <Button className="btn-custom" href={this.state.idUsuario}> Agregar Paciente</Button>
                            </Col>

                            <Col>
                                <Form.Group controlId="grupoFamiliar">
                                    <TextoAyuda
                                        nombre="grupoFamiliar"
                                        tooltip="Grupo familiar"
                                        componente={<Form.Control
                                            as="select"
                                            value={this.state.grupoFamiliar}
                                            onChange={this.handleChange}
                                        >
                                            <option hidden>Filtro de búsqueda...</option>
                                            <Option options={filtros} />
                                        </Form.Control>}
                                    />


                                </Form.Group>
                            </Col>
                        </Row>
                    </div>
                    <div>
                        <Table>
                            <thead>
                                <tr>
                                    <th>Rut</th>
                                    <th>Nombre</th>
                                </tr>
                            </thead>
                        </Table>
                    </div>
                </div>
            </div>
        )
    }
}