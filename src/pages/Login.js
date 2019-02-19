import React, { Component } from "react";
import { Image, Button, Form } from "react-bootstrap";
import logo from '../images/cepalogo.png'
import "../styles/login.css";

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
    console.log({ email, pwd });

  }

  render() {
    return (
      <div className="Login">
        <form onSubmit={this.handleSubmit}>
          <Form.Group controlId="usuario">
            <Image src={logo} className="logo img-fluid center-block" alt="" responsive />
            <p></p>
           
            <Form.Control
              autoFocus
              type="usuario"
              value={this.state.usuario}
              onChange={this.handleChange}
              inputRef={inputElement => this.inputEmail = inputElement}
              placeholder="Usuario"
            />
          </Form.Group>
          <Form.Group controlId="password">
            <Form.Control
              value={this.state.password}
              onChange={this.handleChange}
              type="password"
              inputRef={inputElement => this.inputPwd = inputElement}
              placeholder="Contraseña"
            />
          </Form.Group>

          <div className="button-container">
            <div className="div-link-forgot-pwd">
              <Button
                className="btn-link"
                variant="link">
                ¿Olvidó su contraseña?
            </Button>
            </div>

            <div className="div-btn-submit">
              <Button
                className="btn-submit"
                size="sm"
                disabled={!this.validateForm()}
                type="submit"
              >
                Acceder
              </Button>
            </div>
          </div>


        </form>
      </div>
    );
  }
}