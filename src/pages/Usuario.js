import React, { Component } from 'react'
import { Col, Button, Row } from 'react-bootstrap'
import { Layout } from '../components/Layout'
import { ModalUsuario } from '../components/ModalUsuario'
import { TablaUsuario } from '../components/TablaUsuario'
import "../styles/styles.css"

import { obtenerListaUsuarios } from '../backend/usuario/usuario'

import axios from 'axios'

export class Usuario extends Component {

    constructor(props) {
        super(props)
        this._handleShow = this._handleShow.bind(this);

        this.state = {
            usuarios: [],
        }
    }



    _handleShow() {
        this.setState({ show: true })
    }

    _handleClose = (modalEvt) => {
        this.setState({ show: modalEvt });
    }

    _handleModalSubmit = (evt) => {
        let aux = JSON.parse(evt)
        let element = {
            
            nombre: aux.nombre,
            apellido_paterno: aux.apellidoPaterno,
            apellido_materno: aux.apellidoMaterno,
            nombre_rol: aux.rol
            
        }
        this.state.usuarios.push(element)

    }


    componentWillMount() {
        const self = this;
        axios.get('http://localhost:3001/listaUsuario')
            .then(res => {
                self.setState({ usuarios: res.data.usuarios })
                console.log("usuarios", this.state.usuarios)
            })

            .catch(err => {
            });


    }

    render() {
        return (
            <div>
                <div>

                    <Layout
                        mustBeSideNav={false} />

                </div>
                <div id="body">

                    <div style={{ display: 'flex', paddingBottom: '10px' }}>
                        <Row>
                            <Col>
                                <Button className="btn-custom" onClick={this._handleShow} > <i className="fa fa-user-plus"></i></Button>
                                <ModalUsuario
                                    show={this.state.show}
                                    onClose={this._handleClose}
                                    onSubmit={this._handleModalSubmit} />
                            </Col>

                            <Col>

                            </Col>
                        </Row>
                    </div>
                    <div>
                        {this.state && this.state.usuarios &&
                            <TablaUsuario
                                elements={this.state.usuarios} />}
                    </div>
                </div>
            </div>
        )
    }
}