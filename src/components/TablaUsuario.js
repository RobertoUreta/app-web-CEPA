import React, { Component } from 'react'

import { Table } from 'react-bootstrap'
import { } from '../backend/usuario/usuario'
import { ModalUsuario} from './ModalUsuario'

export class TablaUsuario extends Component {
    constructor(props) {
        super(props)

        this.state = ({
            usuarios: [],
            show: false,
            id:0,
        })
    }
    _handleShow(id) {

        this.setState({ show: true,id:id })

    }

    _handleClose = (modalEvt) => {
        this.setState({ show: modalEvt });
    }

    render() {
        if (this.props.esAdmin) {
            return (
                <div>
                    <Table striped bordered hover size="sm">
                        <thead>
                            <tr>
                                <th>Nombre</th>
                                <th>Rol</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.props.elements.map((v, i) => {
                                return (
                                    <tr key={i}>

                                        <td onClick={() => this._handleShow(v.id_usuario)}>{(v.nombre + " " + v.apellido_paterno + " " + v.apellido_materno)}</td>
                                        <td onClick={() => this._handleShow(v.id_usuario)}>{v.nombre_rol}</td>

                                    </tr>
                                )
                            })}
                        </tbody>
                    </Table>
                    <ModalUsuario
                        name="Editar Usuario"
                        usuarioID={this.state.id}
                        show={this.state.show}
                        onClose={this._handleClose} />
                </div>
            )
        }
        else {
            return (
                <Table striped bordered hover size="sm">
                    <thead>
                        <tr>
                            <th>Nombre</th>
                            <th>Rol</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.props.elements.map((v, i) => {
                            return (
                                <tr key={i}>

                                    <td>{(v.nombre + " " + v.apellido_paterno + " " + v.apellido_materno)}</td>
                                    <td>{v.nombre_rol}</td>

                                </tr>
                            )
                        })}
                    </tbody>
                </Table>
            )
        }
    }
}