import React, { Component } from 'react'

import { Table } from 'react-bootstrap'


export class TablaFamiliar extends Component {
    render() {
        return (
            <Table striped bordered hover size="sm">
                <thead>
                    <tr>
                        <th>Nombre</th>
                        <th>Edad</th>
                        <th>Relación con el Paciente</th>
                        <th>Ocupación</th>
                    </tr>
                </thead>
                <tbody>
                {this.props.elements.map((v,i) => {
                    return (
                        <tr key={i}>
                            <td>{v.nombre}</td>
                            <td>{v.edad}</td>
                            <td>{v.relacionPaciente}</td>
                            <td>{v.ocupacion}</td>
                        </tr>
                    )
                }) }
                </tbody>
            </Table>
        )
    }
}