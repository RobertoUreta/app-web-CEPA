import React, { Component } from "react";
import { Button, Form } from "react-bootstrap";
import { updatePasswordUsuario } from "../backend/usuario/usuario";
export class CambiarContrasena extends Component {
  constructor(props) {
    super(props);

    this.state = {
      password: "",
      newPassword:""
    };
  }


  handleChange = event => {
    this.setState({
      [event.target.id]: event.target.value
    });
  }

  handleSubmit = event => {
    event.preventDefault();
    const aux = JSON.stringify(this.state, null, '  ');
    console.log(aux);
    this.props.onSubmit(aux);
    let prom = updatePasswordUsuario(JSON.parse(aux),this.props.usuarioID);
    prom.then(res=>{
      console.log(res.data);
    })
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


        </form>
      </div>
    );
  }
}