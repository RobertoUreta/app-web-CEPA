import React, { Component } from 'react'

import { Table } from 'react-bootstrap'
import { } from '../backend/usuario/usuario'


export class TablaPaciente extends Component {
    constructor(props) {
        super(props)

        this.state = ({
            usuarios: []
        })
    }
    cambiarDigitoVerificador(v) {
        var M = 0, S = 1;
        var T = v.rut;
        for (; T; T = Math.floor(T / 10))
            S = (S + T % 10 * (9 - M++ % 6)) % 11;

        return S ? S - 1 : 'k'


    }

    render() {
        return (
            <Table striped bordered hover size="sm">
                <thead>
                    <tr>
                        <th>Nombre</th>
                        <th>Rut</th>
                    </tr>
                </thead>
                <tbody>
                    {this.props.elements.map((v, i) => {
                        return (
                            <tr key={i}>

                                <td>{(v.nombre + " " + v.apellido_paterno + " " + v.apellido_materno)}</td>
                                <td>{v.rut + "-" + this.cambiarDigitoVerificador(v)}</td>

                            </tr>
                        )
                    })}
                </tbody>
            </Table>
        )
    }
}