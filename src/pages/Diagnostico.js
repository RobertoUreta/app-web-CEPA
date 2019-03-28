import React , { Component } from 'react'
import Accordion from '../components/Accordion'

import { DiagnosticoPsicologico } from './Paciente/diagnostico/DiagnosticoPsicologico'
import { DiagnosticoPsiquiatrico } from './Paciente/diagnostico/DiagnosticoPsquiatrico'
import { obtenerDatosPaciente } from '../backend/paciente/paciente';

export class Diagnostico extends Component { 
    constructor(props) {
        super(props)
    
        this.state = {
          nombre: "",
          apellidoPaterno: "",
          apellidoMaterno: "",
          paciente: this.props.pacienteId
    
        }
      }
      componentDidMount() {
        let promise = obtenerDatosPaciente(this.state.paciente)
        promise
          .then(res => {
            let data = res.data.paciente[0]
            this.setState({
    
              nombre: data.nombre === "default" ? "" : data.nombre,
              apellidoPaterno: data.apellido_paterno === "default" ? "" : data.apellido_paterno,
              apellidoMaterno: data.apellido_materno === "default" ? "" : data.apellido_materno,
            })
          }).catch(err => {
            console.log(err)
          });
    
      }
    
      render() {
        return (
          <div>
            <h2>{this.state.nombre + " " + this.state.apellidoPaterno + " "
              + this.state.apellidoMaterno}</h2>
                <Accordion>
                    <div label="Diagnostico Psicológico">
                        <DiagnosticoPsicologico userId={this.props.userId} pacienteId={this.props.pacienteId}/>
                    </div>

                    <div label="Diagnostico Psiquiatrico">
                        <DiagnosticoPsiquiatrico userId={this.props.userId} pacienteId={this.props.pacienteId}/>
                    </div>
                </Accordion>
            </div>
        )
    }
}