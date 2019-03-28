import React, { Component } from 'react'
import { Navbar, Nav } from 'react-bootstrap'
import "../styles/styles.css";
import { Tratamiento } from '../pages/Tratamiento'
import { General } from '../pages/General'
import { Evaluacion } from '../pages/Evaluacion'
import { Historial } from '../pages/Historial'
import { Epicrisis } from '../pages/Epicrisis'
import { Sesion } from '../pages/Sesion'
import { Diagnostico } from '../pages/Diagnostico'

export class NavLateral extends Component {
  state = { selectedPath: 'general' }

  _onItemSelection = (evt) => {
    console.log(evt)
    this.setState({ selectedPath: evt })

  }

  _renderSelection() {
    console.log('_renderSelection')
    if (this.state.selectedPath === "general") {
      return <General userId={this.props.userId} history={this.props.history}
        loggedUser={this.props.loggedUser}/>
    }
    if (this.state.selectedPath === "tratamiento") {
      return <Tratamiento userId={this.props.loggedUser} pacienteId={this.props.userId} />
    }
    if (this.state.selectedPath === "evaluacion") {
      return <Evaluacion userId={this.props.loggedUser} pacienteId={this.props.userId} />
    }

    if (this.state.selectedPath === "historial") {
      return <Historial userId={this.props.loggedUser} pacienteId = {this.props.userId} />
    }

    if (this.state.selectedPath === "epicrisis") {
      return <Epicrisis userId={this.props.loggedUser} pacienteId={this.props.userId} />
    }

    if (this.state.selectedPath === "diagnostico") {
      return <Diagnostico userId={this.props.loggedUser} pacienteId={this.props.userId} />
    }
  }


  render() {
    return (
      <div id="layout-container">
        <Navbar
          className="sidenav"
          onSelect={this._onItemSelection}
          bg="light"
          expand="lg"
        >
          <Nav className="flex-column" defaultActiveKey="general" variant="pills" fill>
            <Nav.Item className="navitem-prueba" >
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


        <div id="index-body">
          {this._renderSelection()}
        </div>
      </div>
    )
  }
}
