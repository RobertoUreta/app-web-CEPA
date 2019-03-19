import React, { Component } from 'react'
import { HistorialPaciente } from '../pages/Paciente/historial/HistorialPaciente'
import Accordion from '../components/Accordion'
import { obtenerHistorial } from '../backend/paciente/paciente';


export class Historial extends Component {
    constructor(props) {
        super(props)

        this.state = {
            usuario: this.props.userId,
            paciente: this.props.pacienteId,
            loadingInfo: 'initial',
           
            sesiones: []
        }
    }

    componentDidMount() {
        const self = this
        this.setState({ loadingInfo: 'true' })

        let promise = obtenerHistorial(this.state)

        promise
            .then(res => {
                let aux = []
                console.log("historial", res.data.response)
                res.data.response.forEach(element => {
                    element.fecha_sesion = new Date(element.fecha_sesion)
                    aux.push(element)
                    
                })
                console.log("sesiones", self.state.sesiones)
                aux.sort(function(date1,date2){
                    return date2 - date1
                })
                self.setState({ sesiones: aux, loadingInfo: 'false' })
                console.log("asdfasdfasdfamipixulasdfa")
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
                        <HistorialPaciente
                        sesiones = {this.state.sesiones} />
                    </div>
                    <div label="Psiquiátrico">
                        <HistorialPaciente />
                    </div>
                </Accordion>

            </div>
        )
    }
}