import React, { Component } from 'react'
import { Card, Collapse } from 'react-bootstrap'
import "../styles/styles.css"


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
            Cupidatat sint laboris qui amet ipsum sunt cupidatat. Sint proident est eu anim minim laborum laboris pariatur. Non ex est adipisicing et. Do sunt occaecat irure nisi minim laboris eu culpa officia et voluptate enim magna anim. Fugiat duis Lorem laborum minim duis dolor non.
            Velit excepteur dolore amet cupidatat sit consectetur dolor cupidatat dolore. Excepteur consectetur dolore deserunt ipsum nostrud id cillum nulla deserunt nisi. Elit ipsum ipsum eiusmod adipisicing nulla quis amet sit id.
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
            Aliquip amet proident culpa id dolor ut laborum tempor. Ut esse amet nostrud consectetur enim nostrud. Est velit eiusmod irure laborum excepteur velit. Dolore laborum nulla anim adipisicing dolor id et consequat duis minim incididunt officia eiusmod. Nulla labore adipisicing aliqua sit. Laboris nostrud non anim ex in.
            Cillum esse cupidatat irure aute excepteur consectetur reprehenderit. Fugiat amet aute ad consectetur ex ipsum magna ipsum duis. Incididunt officia nisi duis laboris id fugiat. Ea deserunt culpa aute magna aliqua cillum.
            Fugiat veniam dolore anim eu sit. Magna est est qui ad nisi ullamco commodo ad irure tempor pariatur. Consequat aliquip nulla culpa veniam dolore non velit deserunt officia mollit. Minim in velit quis pariatur commodo voluptate.
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