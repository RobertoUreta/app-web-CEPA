import React, { Component } from 'react'
import { Table, Pagination } from 'react-bootstrap'
import "../../../styles/styles.css"
import { ModalRegistroSesion } from '../../../components/ModalRegistroSesion';
import { updateRegistoPsiquiatrico } from '../../../backend/paciente/registros';
import SweetAlert from 'react-bootstrap-sweetalert'

let active = 1;


export class HistorialPacientePsiquiatrico extends Component {

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
            refRegistro:0,
            alert: null,
            numSesion: 0,
            usuario: this.props.usuario
        }
    }

    _handleShow(ref, largo,id ) {
        console.log("RefPsiquiatrico",ref, "IdSesion", id)
        this.setState({ show: true, idSesion: id ,refRegistro:ref, numSesion: largo })
    }
    
    _hideAlert = () => {
        this.setState({ alert: null })
    }
    _handleClose = (modalEvt) => {
        this.setState({ show: modalEvt });
    }

    _handleModalSubmit = (evt) => {
        let info = JSON.parse(evt)
        console.log("aqui info",info)
        let value = updateRegistoPsiquiatrico(info, info.id)
        value
            .then(res => {
                if (res.data.ok) {
                    console.log("resdataok", res.data.ok)
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
            let nsesion = largo - ((elementsPerPage * (currentPage - 1)) + i)
            let ref = v.ref_registro_sesion_psiquiatrica
            let id = v.id_sesion;
            console.log("V_idSesion",id)
            return (
                <tr key={v.id_sesion} id={v.id_sesion} >
                    <td id={v.id_sesion} onClick={() => this._handleShow(ref, nsesion,id)}  >Sesión N°{nsesion}</td>
                    <td id={v.id_sesion} onClick={() => this._handleShow(ref, nsesion,id)}  >{fecha}</td>
                    <td id={v.id_sesion} onClick={() => this._handleShow(ref, nsesion,id)}  >{(v.nombre + " " + v.apellido_paterno + " " + v.apellido_materno)}</td>
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
                    title={"Sesión Psiquiátrica"}
                    show={this.state.show}
                    onClose={this._handleClose}
                    onSubmit={this._handleModalSubmit}
                    renderPsi={false}
                    idSesion={this.state.idSesion}
                    refRegistro={this.state.refRegistro}
                    numSesion={this.state.numSesion}
                />
                {this.state.alert}

            </div>
        )
    }
}