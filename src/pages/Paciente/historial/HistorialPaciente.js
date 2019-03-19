import React, { Component } from 'react'
import { Table, Pagination } from 'react-bootstrap'
import "../../../styles/styles.css"
import { obtenerHistorial } from '../../../backend/paciente/paciente';

let active = 2;
let items = [];
for (let number = 1; number <= 5; number++) {
    items.push(
        <Pagination.Item key={number} active={number === active}>
            {number}
        </Pagination.Item>,
    );
}

export class HistorialPaciente extends Component {

    constructor(props) {
        super(props)

        this.state = {
            sesiones: this.props.sesiones
        }
    }
    render() {

        console.log(this.state.sesiones)
        return (
            <div className="table-page-container">
                <div className="table-historial">
                    <Table striped bordered hover size="sm">
                        <thead>
                            <tr>
                                <th>Sesión</th>
                                <th>Fecha</th>
                                
                                <th>Profesional a Cargo</th>
                            </tr>
                        </thead>
                        <tbody>
                        {this.state.sesiones.map((v, i) => {
                        let fecha = v.fecha_sesion.getDate() + "-" + (v.fecha_sesion.getMonth()+1) + "-" + v.fecha_sesion.getFullYear()
                        console.log(fecha)
                        return (
                             <tr key={v.id_sesion}>
                                <td>Sesión n°{i+1}</td>
                                <td>{fecha}</td>
                                
                                <td>{(v.nombre + " " + v.apellido_paterno + " " + v.apellido_materno)}</td>

                            </tr>
                        )
                    })}
                        </tbody>
                    </Table>
                </div>

                <div className="pagination-historial">
                    <Pagination size="sm">{items}</Pagination>
                </div>
            </div>
        )
    }
}