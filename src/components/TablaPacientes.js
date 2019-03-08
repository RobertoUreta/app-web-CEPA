import React, { Component } from 'react'

import { Table } from 'react-bootstrap'
import { Link } from 'react-router-dom'
let elements = []
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



    componentWillReceiveProps(props){
        const {usuarios, refresh} = this.props;

        if(props.refresh !== refresh){
            elements = usuarios;
        }
    }

    render() {            
        return (
            <Table striped bordered hover size="sm" >
                <thead>
                    <tr>
                        <th>Nombre</th>
                        <th >Rut</th>
                        <th style={{width: "10px"}}></th>
                        
                    </tr>
                </thead>
                <tbody>
                    {this.props.elements.map((v, i) => {
                        let href=`/${this.props.loggedUser}/editPaciente/${v.id_paciente}`
                        return (
                            <tr key={v.id_paciente}>

                                <td>{(v.nombre + " " + v.apellido_paterno + " " + v.apellido_materno)}</td>
                                <td>{v.rut + "-" + this.cambiarDigitoVerificador(v)}</td>
                                <Link to={href}><td ><i className="fa fa-edit"></i></td></Link>

                            </tr>
                        )
                    })}
                </tbody>
            </Table>
        )
    }
}