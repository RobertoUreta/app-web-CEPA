import React, { Component } from 'react'
import { Col, Button, Row } from 'react-bootstrap'
import { Layout } from '../components/Layout'
import { ModalUsuario } from '../components/ModalUsuario'
import { TablaUsuario } from '../components/TablaUsuario'
import "../styles/styles.css"
import {verificarSesion} from '../backend/login'

import { obtenerListaUsuarios } from '../backend/usuario/usuario'

import request from '../backend/config'

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
        request.get('/listaUsuario')
            .then(res => {
                self.setState({ usuarios: res.data.usuarios })
                console.log("usuarios", this.state.usuarios)
            })

            .catch(err => {
            });


        let id = this.props.match.params.id;
        let res = verificarSesion();
        res.then(resp => {
            if (!resp.data.ok) {
                console.log('entro aqui');
                this.props.history.push('/')
            }
        })
    }

    render() {
        const id = this.props.match.params.id
        return (
            <div>
                <div>

                    <Layout
                        mustBeSideNav={false} 
                        loggedUser= {id}/>

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