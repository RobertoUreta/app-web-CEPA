import React, { Component } from 'react'
import { Table, Pagination } from 'react-bootstrap'
import "../../../styles/styles.css"

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

    render() {
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
                            <tr>
                                <td>Sesión n°10</td>
                                <td>17/12/2018</td>
                                <td>Miguel Arriagada</td>
                            </tr>
                            <tr>
                                <td>Sesión n°9</td>
                                <td>23/11/2018</td>
                                <td>Miguel Arriagada</td>
                            </tr>
                            <tr>
                                <td>Sesión n°8</td>
                                <td>05/09/2018</td>
                                <td>Miguel Arriagada</td>
                            </tr>
                            <tr>
                                <td>Sesión n°7</td>
                                <td>05/09/2018</td>
                                <td>Miguel Arriagada</td>
                            </tr>
                            <tr>
                                <td>Sesión n°6</td>
                                <td>05/09/2018</td>
                                <td>Miguel Arriagada</td>
                            </tr>
                            <tr>
                                <td>Sesión n°5</td>
                                <td>05/09/2018</td>
                                <td>Miguel Arriagada</td>
                            </tr>
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