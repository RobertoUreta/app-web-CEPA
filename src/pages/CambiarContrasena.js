import React, { Component } from "react";
import { Button, Form } from "react-bootstrap";
import { updatePasswordUsuario } from "../backend/usuario/usuario";

import SweetAlert from 'react-bootstrap-sweetalert';
export class CambiarContrasena extends Component {
  constructor(props) {
    super(props);

    this.state = {
      password: "",
      newPassword: "",
      repeatPassword: "",
    };
  }


  handleChange = event => {
    this.setState({
      [event.target.id]: event.target.value
    });
  }

  _hideAlert = () => {
    this.setState({ alert: null })
  }
  handleSubmit = event => {
    event.preventDefault();
    if (this.state.newPassword === this.state.repeatPassword) {
      const aux = JSON.stringify(this.state, null, '  ');
      console.log(aux);
      this.props.onSubmit(aux);
      let prom = updatePasswordUsuario(JSON.parse(aux), this.props.usuarioID);
      prom.then(res => {
        if (!res.data.ok) {
          const getAlert = () => (
            <SweetAlert warning title="Contraseña incorrecta" onConfirm={this._hideAlert}>
                La contraseña anterior no coincide.
             </SweetAlert>
          )
          this.setState({ alert: getAlert() })
        }
        else {
         
        }
      })
    }
    else {
      const getAlert = () => (
        <SweetAlert warning title="Contraseña incorrecta" onConfirm={this._hideAlert}>
          La nueva contraseña no coincide.
         </SweetAlert>
      )
      this.setState({ alert: getAlert() })
    }

  }

  render() {
    return (
      <div className="pass">
        <form onSubmit={this.handleSubmit} autoComplete="off">
          <Form.Group controlId="password">
            <Form.Control
              value={this.state.password}
              onChange={this.handleChange}
              type="password"
              inputRef={inputElement => this.inputPwd = inputElement}
              placeholder="Contraseña actual"
            />
          </Form.Group>
          <Form.Group controlId="newPassword">
            <Form.Control
              value={this.state.newPassword}
              onChange={this.handleChange}
              type="password"
              inputRef={inputElement => this.inputPwd = inputElement}
              placeholder="Nueva Contraseña"
            />
          </Form.Group>
          <Form.Group controlId="repeatPassword">
            <Form.Control
              value={this.state.repeatPassword}
              onChange={this.handleChange}
              type="password"
              inputRef={inputElement => this.inputPwd = inputElement}
              placeholder="Repetir Nueva Contraseña"
            />
          </Form.Group>

          <div className="button-container">
            <div className="div-btn-submit">
              <Button
                onClick={this.handleSubmit}
                className="btn-submit"
                size="sm"
                type="submit"
              >
                Cambiar contraseña
              </Button>
            </div>
          </div>


          {this.state.alert}
        </form>
      </div>
    );
  }
}