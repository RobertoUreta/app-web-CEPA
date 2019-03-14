import React, { Component } from 'react'
import { Modal } from 'react-bootstrap'
import { obtenerSesionPorId } from '../backend/agenda/agenda';
export class InfoSesion extends Component {
    constructor(props) {

        super(props)

        this.state = {
            sesion: null,
            loadingInfo: 'initial',
            horaInicio: "",
            horaTermino: "",
            nombreProfesional: "",
            apellidoPaternoProfesional: "",
            apellidoMaternoProfesional: "",
            sala: "",
            id: this.props.clickedInfo,
            fechaSesion: ""

        }
    }

   
    componentDidMount() {
        this.setState({
            loadingInfo: 'true'
        })
        let promise = obtenerSesionPorId(this.state.id)
        promise
            .then(res => {
                console.log("resDat", res.data.response[0])
                let data = res.data.response[0]
                let fecha = new Date(data.fecha_sesion)
                let fecha_sesion = fecha.toISOString().split('T')[0]
                console.log("fechasesion",fecha_sesion)
                this.setState({
                    
                    loadingInfo: 'false',
                    horaInicio: data.hora_inicio_atencion,
                    horaTermino: data.hora_termino_atencion,
                    nombreProfesional: data.nombre_usuario,
                    apellidoPaternoProfesional: data.apellido_paterno,
                    apellidoMaternoProfesional: data.apellido_materno,
                    sala: data.nombre_sala,
                    fechaSesion: fecha_sesion
                })
            })


    }


    render() {
        if (this.state.loadingInfo === 'initial') {
            return <h2>Intializing...</h2>;

        }


        if (this.state.loadingInfo === 'true') {
            console.log("amipixula21231", this.props.clickedInfo)

            return <h2>Cargando...</h2>;

        }
        //console.log("propseventos",this.props.eventos)
        //console.log("propsclickedinfo", this.props.clickedInfo)
        //console.log("undfinde?", this.props.eventos[this.props.clickedInfo - 1])
        let nombreProfesional= this.state.nombreProfesional + " " + this.state.apellidoPaternoProfesional + " " + this.state.apellidoMaternoProfesional
        return (
            <div>
                <ul>
                    <li><strong>Profesional a cargo: </strong>{nombreProfesional}</li>
                    <li><strong>Sala: </strong>{this.state.sala}</li>
                    <li><strong>Fecha:</strong>{this.state.fechaSesion}</li>
                    <li><strong>Hora inicio:</strong>{this.state.horaInicio}</li>
                    <li><strong>Hora termino: </strong>{this.state.horaTermino}</li>
                </ul>
            </div>
        )
    }
}