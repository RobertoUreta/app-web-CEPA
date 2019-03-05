import React, { Component } from 'react'

import { Table } from 'react-bootstrap'
import {} from '../backend/usuario/usuario'


export class TablaUsuario extends Component {
    constructor(props){
        super(props)

        this.state = ({
            usuarios:[]
        }) 
    }

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
                            
                            <td>{(v.nombre + " " + v.apellido_paterno + " " + v.apellido_materno)}</td>
                            <td>{v.nombre_rol}</td>
        
                        </tr>
                    )
                }) }
                </tbody>
            </Table>
        )
    }
}