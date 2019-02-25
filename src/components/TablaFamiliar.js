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
                
                </tbody>
            </Table>
        )
    }
}