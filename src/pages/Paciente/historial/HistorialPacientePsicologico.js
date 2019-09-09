import React, { Component } from 'react'
import { Table, Pagination } from 'react-bootstrap'
import "../../../styles/styles.css"
import { ModalRegistroSesion } from '../../../components/ModalRegistroSesion';
import { updateRegistroPsicologico } from '../../../backend/paciente/registros';
import SweetAlert from 'react-bootstrap-sweetalert'
import { verificarSesion } from '../../../backend/paciente/paciente';



export class HistorialPacientePsicologico extends Component {

    constructor(props) {
        super(props)
        this._handleShow = this._handleShow.bind(this);

        this.state = {
            sesiones: this.props.sesiones,
            show: false,
            elementsPerPage: 10,
            currentPage: 1,
            resta: 0,
            idSesion: 0,
            alert: null,
            numSesion: 0,
            usuario: this.props.usuario
        }
    }

    _hideAlert = () => {
        this.setState({ alert: null })
    }

    _handleShow(id, largo, idUsuario) {
        console.log("id,largo,idUsuario", id, largo, idUsuario)

        this.setState({ show: true, idSesion: id, numSesion: largo })

    }

    _handleClose = (modalEvt) => {
        this.setState({ show: modalEvt });
    }

    _handleModalSubmit = (evt) => {
        let info = JSON.parse(evt)
        console.log(info)
        let value = updateRegistroPsicologico(info, info.id)
        value
            .then(res => {
                if (res.data.ok) {
                    const getAlert = () => (
                        <SweetAlert success title="Sesión exitosa" onConfirm={this._hideAlert}>
                            Se registró correctamente la sesión.
                    </SweetAlert>
                    )
                    this.setState({ alert: getAlert() })
                }

            })
    }

    _handleClick = (event) => {
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
            let nsesion = largo - ((elementsPerPage * (currentPage - 1)) + i)
            return (
                <tr key={v.id_sesion} id={v.id_sesion} >
                    <td id={v.id_sesion} onClick={() => this._handleShow(v.id_sesion, nsesion, this.state.usuario)}  >Sesión N°{nsesion}</td>
                    <td id={v.id_sesion} onClick={() => this._handleShow(v.id_sesion, nsesion, this.state.usuario)}  >{fecha}</td>
                    <td id={v.id_sesion} onClick={() => this._handleShow(v.id_sesion, nsesion, this.state.usuario)}  >{(v.nombre + " " + v.apellido_paterno + " " + v.apellido_materno)}</td>
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

                                <th>Psicológo a Cargo</th>
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
                    title={"Sesión Psicológica"}
                    show={this.state.show}
                    onClose={this._handleClose}
                    onSubmit={this._handleModalSubmit}
                    renderPsi={true}
                    idSesion={this.state.idSesion}
                    numSesion={this.state.numSesion}
                />
                {this.state.alert}
            </div>
        )
    }
}