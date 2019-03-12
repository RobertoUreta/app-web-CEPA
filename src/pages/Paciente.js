import React, { Component } from 'react'
import { Col, Form, Button, Row } from 'react-bootstrap'
import { Layout } from '../components/Layout'
import { Option } from '../components/Option'
import { TextoAyuda } from '../components/TextoAyuda'
import { TablaPaciente } from '../components/TablaPacientes'
import "../styles/styles.css"
import {verificarSesion} from '../backend/login'

import request from '../backend/config'
import { obtenerPacientes, busquedaPacientes, obtenerIdPaciente } from '../backend/paciente/paciente'
import {insertarIngreso} from '../backend/ingreso/ingreso'




export class Paciente extends Component {

    constructor(props) {
        super(props)

        this.state = {
            filtro: "",
            idUsuario: "",
            rows: [],
            pacientes: [],
            refresh: false

        }
    }

    componentDidMount() {
        let res = verificarSesion();
        res.then(resp => {
            if (!resp.data.ok) {
                this.props.history.push('/')
            }
        });
        console.log("componentDidMount")
        request.get('/obtener_id_paciente')
        let idPaciente = obtenerIdPaciente()
        idPaciente
            .then(res => {
                console.log(res.data)
                let id = res.data.rows[0].id + 1
                let enlace = this.props.match.params.id + "/crearPaciente/" + id

                this.setState({ rows: res.data.rows, idUsuario: enlace })
            })

            .catch(err => {
                console.log(err);
            });
        const self = this
        if (this.props.match.params.search === undefined) {
            let promise = obtenerPacientes()
            promise
                .then(res => {
                    self.setState({ pacientes: res.data.pacientes })
                    console.log("pacientes", this.state.pacientes)
                }).catch(err => {
                    console.log(err)
                });
        }
        else {
            let promise = busquedaPacientes(this.props.match.params.search)
            promise
                .then(res => {
                    self.setState({ pacientes: res.data.pacientes, refresh: !this.state.refresh })
                   
                }).catch(err => {
                    console.log(err)
                });
        }

    }

    

    render() {
        const id = this.props.match.params.id
        console.log(this.state.idUsuario)
        const href = "/" + this.state.idUsuario
        var filtros = ["Todos los pacientes", "Pacientes Asociados", "Pacientes en Lista de Espera"]
        return (
            <div>
                <div>

                    <Layout
                        mustBeSideNav={false}
                        loggedUser={id}
                        history={this.props.history} />

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
                                <Button className="btn-custom" href={href} > Agregar Paciente</Button>
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
                        <TablaPaciente
                            elements={this.state.pacientes}
                            refresh = {this.state.refresh}
                            loggedUser = {id} />
                    </div>
                </div>
            </div>
        )
    }
}