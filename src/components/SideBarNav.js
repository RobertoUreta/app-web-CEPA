import React, { Component } from 'react'
import { Navbar, Nav } from 'react-bootstrap'
import {
  AppContainer,
  Body
} from "../containers/containers";
import "../styles/styles.css";
import { Tratamiento } from '../pages/Tratamiento'
import { General } from '../pages/General'
import { Evaluacion} from '../pages/Evaluacion'
import { Historial } from '../pages/Historial'


export class NavLateral extends Component {
  state = { selectedPath: '' }

  _onItemSelection = (evt) => {
    console.log(evt)
    this.setState({ selectedPath: evt })

  }

  _renderSelection() {
    console.log('_renderSelection')
    if (this.state.selectedPath === "general") {
      return <General />
    }
    if (this.state.selectedPath === "tratamiento") {
      return <Tratamiento />
    }
    if (this.state.selectedPath === "evaluacion") {
      return <Evaluacion />
    }

    if(this.state.selectedPath === "historial"){
      return <Historial />
    }
  }


  render() {
    return (
      <AppContainer>
        <Navbar
          className="flex-column"
          onSelect={this._onItemSelection}
          bg="light"
          expand="lg"
        >
            <Nav className="flex-column" variant="pills" fill>
              <Nav.Item className= "navitem-prueba" >
                <Nav.Link eventKey="general"> General </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="evaluacion"> Evaluación </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="diagnostico"> Diagnóstico</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="tratamiento"> Tratamiento</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="registrosesion"> Registro Sesión</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="epicrisis"> Epicrisis </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="derivacion"> Derivación</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="historial"> Historial</Nav.Link>
              </Nav.Item>

            </Nav>

        </Navbar>


        <Body>
          {this._renderSelection()}
        </Body>
      </AppContainer >
    )
  }
}
