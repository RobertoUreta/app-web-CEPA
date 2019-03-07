import React, { Component } from 'react'
import { NavDropdown, Navbar, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom'
import logo from '../images/cepaicono.png'
import "../styles/styles.css"
import {cerrarSesion} from '../backend/login'

export class NavBar extends Component{
    constructor(props){
        super(props)
    }
    _cerrarSesion = () => {
        console.log('logouooottt');
        let res = cerrarSesion();
        res.then(resp=>{
            if (resp.data.ok) {
                return true;
            }
            return false;
        })
        .catch(err =>{
            console.log(err);
        }
        )
    
    }
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
                    <Navbar.Collapse className="justify-content-end" id="collasible-nav-dropdown">
                        <Nav className="mr-auto" variant="pills">
                            <Nav.Item>
                                <Nav.Link eventKey="usuarios" href="/listaUsuarios">Usuarios</Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                    <Nav.Link eventKey="pacientes" href="/listaPacientes">Pacientes </Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link eventKey="utilidades" href="/agenda">Agenda</Nav.Link>
                            </Nav.Item>

                        </Nav>
                        
                        <NavDropdown className="dropdown-menu-nav" title={<i className="fa fa-user"> Nombre Usuario</i>} id="basic-nav-dropdown">
                        
                            <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                            <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
                            <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item onClick={this._cerrarSesion} href="/">Cerrar Sesión</NavDropdown.Item>
                        </NavDropdown>

                    </Navbar.Collapse>
                </Navbar>
            </div>
        )
    }
}