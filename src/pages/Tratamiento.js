import React, { Component } from 'react'
import "../styles/styles.css"
import {TratamientoPsicologico} from './Paciente/tratamiento/TratamientoPsicologico'
import {TratamientoPsiquiatrico} from './Paciente/tratamiento/TratamientoPsiquiatrico'

import Accordion from '../components/Accordion'

export class Tratamiento extends Component {
  
  render() {

    return (
      <div>
        <h2>Paciente</h2>

        <Accordion>
          <div label="Psicológico">
            <TratamientoPsicologico  userId={this.props.userId} pacienteId={this.props.pacienteId} />
          </div>
          <div label="Psiquiatría">
            <TratamientoPsiquiatrico userId={this.props.userId} pacienteId={this.props.pacienteId}/>
          </div>
          <div label="Social">
          </div>
        </Accordion>

        <br></br>

        <br></br>
      </div>
    )
  }
}