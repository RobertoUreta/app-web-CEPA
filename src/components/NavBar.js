import React , { Component } from 'react'
import { Navbar,Nav} from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap'
import { Link } from 'react-router-dom'
import logo from '../images/cepaicono.png'
import "../styles/styles.css"



export class NavBar extends Component {
    render() {
        return (
       
            <div className="Layout">
               <Navbar bg="light">
               <Link to="/">
                   <Navbar.Brand >
                       
                       <img
                           src = {logo}
                           className="d-inline-block align-top"
                           alt="Cepa logo"
                           width= "45"
                           height="30"
                       />
                       
                   </Navbar.Brand> 
               </Link>
              
                   <Navbar.Toggle aria-controls="basic-navbar-nav" />
                   <Navbar.Collapse  className="justify-content-end" id="basic-navbar-nav">
                       <Nav className="mr-auto">
                       <LinkContainer to="/"> 
                            <Nav.Link>Usuarios</Nav.Link>
                       </LinkContainer>
                       <LinkContainer to="/">
                            <Nav.Link>Pacientes</Nav.Link>
                       </LinkContainer>
                       <LinkContainer to="/">
                            <Nav.Link>Utilidades</Nav.Link>
                       </LinkContainer>
                       
                       </Nav>
                       
                   </Navbar.Collapse>
               </Navbar>
         </div>
        )
   }
}