import React, { Component } from 'react'
import { Form, NavDropdown, Navbar, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom'
import logo from '../images/cepaicono.png'
import "../styles/styles.css"
import { cerrarSesion } from '../backend/login'
import { obtenerDatosUsuario } from '../backend/usuario/usuario'
import { ModalUsuario } from '../components/ModalUsuario'

export class NavBar extends Component {
    constructor(props) {
        super(props);

        this._handleShow = this._handleShow.bind(this);
        this.state = {
            usuario: {},
            search: "",
            show: false
        }
    }

    componentWillMount() {

        let promesa = obtenerDatosUsuario(this.props.loggedUser);

        promesa
            .then((res) => {
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
        console.log(this.state.search)
        evt.preventDefault()
        console.log("navbar", this.props.history)
        let enlace = `/${this.props.loggedUser}/busquedaPaciente/${this.state.search}`
        this.props.history.push(enlace)
        window.location.reload()
    }

    _cerrarSesion = () => {
        console.log('logouooottt');
        let res = cerrarSesion();
        res.then(resp => {
            if (resp.data.ok) {
                return true;
            }
            return false;
        })
            .catch(err => {
                console.log(err);
            }
            )

    }

    _handleShow() {
        this.setState({ show: true })
    }

    _handleClose = (modalEvt) => {
        this.setState({ show: modalEvt });
    }

    
    render() {
        const { nombre, apellido_paterno, apellido_materno } = this.state.usuario
        const hrefListaUsuarios = `/${this.props.loggedUser}/listaUsuarios`
        const hrefListaPacientes = `/${this.props.loggedUser}/listaPacientes/`
        const hrefAgenda = `/${this.props.loggedUser}/agenda`
        const hrefHome = `/home/${this.props.loggedUser}`
        return (
            <div className="Layout">
                <Navbar bg="light" expand="lg" fixed="top">
                    <Link to={hrefHome}>
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
                                <span className="fa-icon-inner-text">
                                    {nombre + " " + apellido_paterno + " " + apellido_materno}
                                </span></i>}
                            id="basic-nav-dropdown">

                            <NavDropdown.Item onClick={this._handleShow}>Editar Usuario</NavDropdown.Item>
                            <ModalUsuario
                                name="Editar Usuario"
                                usuarioID={this.props.loggedUser}
                                show={this.state.show}
                                onClose={this._handleClose}/>
                            <NavDropdown.Divider />
                            <NavDropdown.Item onClick={this._cerrarSesion} href="/">Cerrar Sesión</NavDropdown.Item>
                        </NavDropdown>



                    </Navbar.Collapse>
                </Navbar>
            </div >
        )
    }
}