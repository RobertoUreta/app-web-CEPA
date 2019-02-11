import React, { Component } from "react";
import {Image, Button, FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import logo from '../images/cepalogo.png'
import "../styles/styles.css";

export class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      usuario: "",
      password: ""
    };
  }

  validateForm() {
    return this.state.usuario.length > 0 && this.state.password.length > 0;
  }

  handleChange = event => {
    this.setState({
      [event.target.id]: event.target.value
    });
  }

  handleSubmit = event => {
    event.preventDefault();
    const email = this.inputEmail.value
    const pwd = this.inputPwd.value
    console.log({email,pwd});
    
  }

  render() {
    return (
      <div className="Login">
        <form onSubmit={this.handleSubmit}>
          <FormGroup controlId="usuario" bsSize="large">
          <Image src={logo} className="img-responsive center-block"  alt="" responsive/>
           <p></p>
            <ControlLabel>Usuario</ControlLabel>
            <FormControl
              autoFocus
              type="usuario"
              value={this.state.usuario}
              onChange={this.handleChange}
              inputRef ={inputElement => this.inputEmail = inputElement}
            />
          </FormGroup>
          <FormGroup controlId="password" bsSize="large">
            <ControlLabel>Password</ControlLabel>
            <FormControl
              value={this.state.password}
              onChange={this.handleChange}
              type="password"
              inputRef={inputElement => this.inputPwd = inputElement}
            />
          </FormGroup>
          <Button
            block
            bsSize="large"
            disabled={!this.validateForm()}
            type="submit"
          >
            Login
          </Button>
        </form>
      </div>
    );
  }
}