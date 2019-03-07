import React, { Component } from 'react'
import { InputGroup, Button, Form, NavDropdown, Navbar, Nav } from 'react-bootstrap';
import { Link , Redirect } from 'react-router-dom'
import logo from '../images/cepaicono.png'
import "../styles/styles.css"

import { obtenerDatosUsuario } from '../backend/usuario/usuario'

export class NavBar extends Component {
    constructor(props) {
        super(props);

        this.state = {
            usuario: {},
            search: "",
        }
    }
    componentWillMount() {

        let promesa = obtenerDatosUsuario(this.props.loggedUser);
        promesa.
            then((res) => {
                console.log("resdatapromesa", res.data)
                this.setState({ usuario: res.data.usuarios[0] })
            })

    }
    
    handleChange = evt => {
        this.setState({
            search: evt.target.value
        });

    }
    _onSubmit = (evt) => {
        console.log(evt)
        evt.preventDefault()
    }  

    render() {
        const { nombre, apellido_paterno, apellido_materno } = this.state.usuario
        const hrefListaUsuarios= `/${this.props.loggedUser}/listaUsuarios`
        const hrefListaPacientes = `/${this.props.loggedUser}/listaPacientes/`
        const hrefAgenda = `/${this.props.loggedUser}/agenda`
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
                                <Nav.Link eventKey="usuarios" href={hrefListaUsuarios}>Usuarios</Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link eventKey="pacientes" href={hrefListaPacientes}>Pacientes </Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link eventKey="utilidades" href={hrefAgenda}>Agenda</Nav.Link>
                            </Nav.Item>

                        </Nav>
                        
                            <Form onSubmit={this._onSubmit} placeholder="Buscar">
                                <Form.Control
                                    id="custom-search"
                                    type="search"
                                    value={this.state.search}

                                    onChange={this.handleChange} />

                            </Form>
                        
                        
                        

                        <NavDropdown
                            className="dropdown-menu-nav"
                            title={<i className="fa fa-user">
                                <span className = "fa-icon-inner-text">
                                {nombre + " "+ apellido_paterno + " "+apellido_materno}
                                </span></i>}
                            id="basic-nav-dropdown">

                            <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                            <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
                            <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item href="#action/3.4">Cerrar Sesión</NavDropdown.Item>
                        </NavDropdown>



                    </Navbar.Collapse>
                </Navbar>
            </div >
        )
    }
}