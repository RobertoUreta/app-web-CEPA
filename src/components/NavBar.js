import React, { Component } from 'react'
import { Navbar, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom'
import logo from '../images/cepaicono.png'
import "../styles/styles.css"



export class NavBar extends Component {
    render() {
        return (

            <div className="Layout">
                <Navbar bg="light" expand="lg" fixed="top">
                    <Link to="/">
                        <Navbar.Brand >

                            <img
                                src={logo}
                                className="d-inline-block align-top"
                                alt="Cepa logo"
                                width="45"
                                height="30"
                            />

                        </Navbar.Brand>
                    </Link>

                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse className="justify-content-end" id="basic-navbar-nav">
                        <Nav className="mr-auto" variant="pills">
                            <Nav.Item>
                                    <Nav.Link eventKey="usuarios">Usuarios</Nav.Link>
                                </Nav.Item>
                            <Nav.Item>
                                    <Nav.Link eventKey="pacientes">Pacientes</Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                    <Nav.Link eventKey="utilidades">Utilidades</Nav.Link>
                            </Nav.Item>

                        </Nav>

                    </Navbar.Collapse>
                </Navbar>
            </div>
        )
    }
}