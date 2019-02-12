import React , { Component } from 'react'
import { NavItem, Navbar,NavDropdown, Nav} from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap'
import { Link } from 'react-router-dom'
import logo from '../images/cepaicono.png'


export class NavBar extends Component {
    render() {
        return (
       
            <div className="Layout">
               <Navbar bg="dark" >
               <Link to="/">
                   <Navbar.Brand >
                       
                       <img
                           src = {logo}
                           className="d-inline-block align-top"
                           alt="Cepa logo"
                       />
                       
                   </Navbar.Brand> 
               </Link>
              
                   <Navbar.Toggle aria-controls="basic-navbar-nav" />
                   <Navbar.Collapse  className="justify-content-end" id="basic-navbar-nav">
                       <Nav className="mr-auto">
                       
                       <LinkContainer to="/">
                            <NavItem> Home </NavItem>
                       </LinkContainer>
                       <NavDropdown  title="Opciones" id="basic-nav-dropdown">
                           <LinkContainer to="/Layout">
                               <NavDropdown.Item>Action</NavDropdown.Item>
                           </LinkContainer>

                           <LinkContainer to="/CrearUsuario">
                               <NavDropdown.Item>Crear Usuario</NavDropdown.Item>
                           </LinkContainer>
                           
                         
                           <LinkContainer to="/">
                               <NavDropdown.Item>Another action</NavDropdown.Item>
                           </LinkContainer>
                       </NavDropdown>
                       </Nav>
                       
                   </Navbar.Collapse>
               </Navbar>
         </div>
        )
   }
}