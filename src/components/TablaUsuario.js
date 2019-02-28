import React, { Component } from 'react'

import { Table } from 'react-bootstrap'


export class TablaUsuario extends Component {
    render() {
        return (
            <Table striped bordered hover size="sm">
                <thead>
                    <tr>
                        <th>Nombre</th>
                        <th>Rol</th>
                    </tr>
                </thead>
                <tbody>
                {this.props.elements.map((v,i) => {
                    return (
                        <tr key={i}>
                            <td>{(v.nombre + " " + v.apellidoPaterno + " " + v.apellidoMaterno)}</td>
                            <td>{v.rol}</td>
                           
                        </tr>
                    )
                }) }
                </tbody>
            </Table>
        )
    }
}