import React, { Component } from 'react'
import { Card, Collapse } from 'react-bootstrap'
import "../styles/styles.css"
import {TratamientoPsicologico} from './Paciente/tratamiento/TratamientoPsicologico'
import {TratamientoPsiquiatrico} from './Paciente/tratamiento/TratamientoPsiquiatrico'


export class Tratamiento extends Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      openPsicologico: false,
      openPsiquiatria: false,
      openSocial: false
    };
  }

  render() {

    return (
      <div>
        <h2>Paciente</h2>

        <Card.Header
          onClick={() => this.setState({ openPsicologico: !this.state.openPsicologico })} >
          <span className="linkspan">
            <strong>Psicologico</strong>
          </span></Card.Header>
        <Collapse in={this.state.openPsicologico}>
          <Card.Body>
            <TratamientoPsicologico />
          </Card.Body>
        </Collapse>

        <br></br>

        <Card.Header
          onClick={() => this.setState({ openPsiquiatria: !this.state.openPsiquiatria })} >
          <span className="linkspan">
            <strong>Psiquiatría</strong>
          </span></Card.Header>

        <Collapse in={this.state.openPsiquiatria}>
          <Card.Body >
            <TratamientoPsiquiatrico />
          </Card.Body>
        </Collapse>

        <br></br>

        <Card.Header
          onClick={() => this.setState({ openSocial: !this.state.openSocial })} >
          <span className="linkspan">
            <strong>Social</strong>
          </span></Card.Header>
        <Collapse in={this.state.openSocial}>
          <Card.Body >
            Dolor elit fugiat qui minim elit reprehenderit est tempor ad officia. Labore veniam duis incididunt nulla aute amet eu. Deserunt mollit et reprehenderit et pariatur veniam do veniam exercitation fugiat ex. Duis amet voluptate excepteur irure commodo commodo. Mollit anim tempor do labore pariatur ea. Exercitation id esse ea deserunt. Est nulla incididunt dolor id pariatur sit aliqua irure voluptate incididunt.
            Consequat do ex irure aute adipisicing aute consequat. Qui id proident veniam ipsum nisi ipsum minim ipsum eiusmod. Nulla proident fugiat non fugiat do amet dolor ut commodo irure minim laboris. Aliquip nulla ex irure nulla adipisicing. Laboris culpa sit minim consectetur excepteur sit culpa et ex duis consectetur veniam elit. Dolore anim Lorem commodo ex non quis dolor qui consectetur et et fugiat nostrud sunt.
            Cupidatat proident tempor dolore veniam ad esse nulla irure. Labore esse eu tempor magna dolor. Labore commodo ea anim cupidatat velit non laborum laborum est tempor culpa eu nisi. Culpa occaecat ut officia sit eu et nulla qui do ut labore nisi consequat.

            </Card.Body>
        </Collapse>

        <br></br>
      </div>
    )
  }
}