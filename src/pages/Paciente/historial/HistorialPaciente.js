import React, { Component } from 'react'
import { Table, Pagination } from 'react-bootstrap'
import "../../../styles/styles.css"
import { obtenerHistorial } from '../../../backend/paciente/paciente';
import { ModalRegistroSesion } from '../../../components/ModalRegistroSesion';

let active = 1;


export class HistorialPaciente extends Component {

    constructor(props) {
        super(props)
        this._handleShow = this._handleShow.bind(this);

        this.state = {
            sesiones: this.props.sesiones,
            show: false,
            elementsPerPage: 5,
            currentPage: 1,
            resta: 0
        }
    }

    _handleShow(event) {
        console.log("aaa",event.target.id)
        this.setState({ show: true })
    }

    _handleClose = (modalEvt) => {
        this.setState({ show: modalEvt });
    }

    _handleModalSubmit = (evt) => {

    }

    _handleClick = (event) => {
        console.log("handleCLick", event.target.id)
        this.setState({
            currentPage: Number(event.target.id)
        });
    }

    render() {
        const { sesiones, show, elementsPerPage, currentPage } = this.state;
        const indexOfLastElement = currentPage * elementsPerPage;
        const indexOfFirstElement = indexOfLastElement - elementsPerPage;
        const currentSesiones = sesiones.slice(indexOfFirstElement, indexOfLastElement);

        let largo = sesiones.length
        const renderSesiones = currentSesiones.map((v, i) => {
            let fecha = v.fecha_sesion.getDate() + "-" + (v.fecha_sesion.getMonth() + 1) + "-" + v.fecha_sesion.getFullYear()

            return (
                <tr key={v.id_sesion} id={v.id_sesion}>
                    <td id={v.id_sesion} onClick={this._handleShow} >Sesión n°{largo - ((elementsPerPage * (currentPage - 1)) + i)}</td>
                    <td id={v.id_sesion} onClick={this._handleShow} >{fecha}</td>
                    <td id={v.id_sesion} onClick={this._handleShow} >{(v.nombre + " " + v.apellido_paterno + " " + v.apellido_materno)}</td>
                </tr>
            )
        })

        const pageNumbers = [];
        for (let i = 1; i <= Math.ceil(sesiones.length / elementsPerPage); i++) {
            pageNumbers.push(i);
        }

        const renderPageNumbers = pageNumbers.map(number => {
            if (number === currentPage) {
                return (
                    <li
                        onClick={this._handleClick}
                        className="page-item active"

                    >
                        <a className="page-link "
                            key={number}
                            id={number}
                        >
                            {number}
                        </a>
                    </li>
                )
            }
            return (
                <li
                    onClick={this._handleClick}
                    className="page-item"

                >
                    <a className="page-link"
                        key={number}
                        id={number}
                    >
                        {number}
                    </a>
                </li>
            );
        });

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
                            {renderSesiones}
                        </tbody>
                    </Table>
                </div>

                <div className="pagination-historial">
                    <ul className="pagination pagination-sm" id="page-numbers">
                        {renderPageNumbers}
                    </ul>
                </div>

                <ModalRegistroSesion
                    show={this.state.show}
                    onClose={this._handleClose}
                    onSubmit={this._handleModalSubmit}
                />
            </div>
        )
    }
}