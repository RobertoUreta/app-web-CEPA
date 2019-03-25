import React, { Component } from 'react'
import { HistorialPacientePsicologico } from './Paciente/historial/HistorialPacientePsicologico'
import { HistorialPacientePsiquiatrico } from './Paciente/historial/HistorialPacientePsiquiatrico'

import Accordion from '../components/Accordion'
import { obtenerHistorialPsicologico, obtenerHistorialPsiquiatrico } from '../backend/paciente/paciente';


export class Historial extends Component {
    constructor(props) {
        super(props)

        this.state = {
            usuario: this.props.userId,
            paciente: this.props.pacienteId,
            loadingInfo: 'initial',
           
            sesionesPsicologicas: [],
            sesionesPsiquiatricas:[],
        }
    }

    componentDidMount() {
        const self = this
        this.setState({ loadingInfo: 'true' })

        let promise = obtenerHistorialPsicologico(this.state)

        promise
            .then(res => {
                let aux = []
                res.data.response.forEach(element => {
                    element.fecha_sesion = new Date(element.fecha_sesion)
                    aux.push(element)
                    
                })
                aux.sort(function(date1,date2){
                    return date2.fecha_sesion - date1.fecha_sesion
                })
                self.setState({ sesionesPsicologicas: aux })
            }).catch(err => {
                this.setState({ loadingInfo: 'false ' })
            })

        promise = obtenerHistorialPsiquiatrico(this.state)

        promise
        .then(res => {
            let aux = []
            res.data.response.forEach(element => {
                element.fecha_sesion = new Date(element.fecha_sesion)
                aux.push(element)
                
            })
            aux.sort(function(date1,date2){
                return date2.fecha_sesion - date1.fecha_sesion
            })
            self.setState({ sesionesPsiquiatricas: aux, loadingInfo: 'false' })
        }).catch(err => {
            this.setState({ loadingInfo: 'false ' })
        })
    }

    

    render() {
        if (this.state.loadingInfo === 'initial') {
            return <h2>Intializing...</h2>;

        }


        if (this.state.loadingInfo === 'true') {
            console.log("sesiones", this.state.sesiones)

            return <h2>Cargando...</h2>;

        }
        console.log("sesiones", this.state.sesiones)
        return (
            <div>
                <Accordion>
                    <div label="Psicológico">
                        <HistorialPacientePsicologico
                        sesiones = {this.state.sesionesPsicologicas} 
                        usuario = {this.state.usuario}/>
                    </div>
                    <div label="Psiquiátrico">
                        <HistorialPacientePsiquiatrico
                        sesiones = {this.state.sesionesPsiquiatricas}
                        usuario = {this.state.usuario} />
                    </div>
                </Accordion>

            </div>
        )
    }
}