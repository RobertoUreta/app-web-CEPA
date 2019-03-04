import React, { Component } from 'react'
import { Col, Form, Table, Button, Row } from 'react-bootstrap'
import { Layout } from '../components/Layout'
import { ModalUsuario } from '../components/ModalUsuario'
import { TablaUsuario } from '../components/TablaUsuario'
import "../styles/styles.css"

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
        this.state.usuarios.push(aux)
        this.setState(this.state)

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
                        <TablaUsuario
                            elements={this.state.usuarios} />
                    </div>
                </div>
            </div>
        )
    }
}