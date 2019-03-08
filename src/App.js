import React, { Component } from 'react';
import { Login } from './pages/Login';
import { Switch, Route } from 'react-router-dom'
import { Usuario } from './pages/Usuario'
import { Paciente } from './pages/Paciente'
import { Agenda } from './pages/Agenda'
import { Home } from './pages/Home'
import { Index } from './pages/Index'
class App extends Component {
  render() {
    return (
      <div className="App">
        <Switch>
          <Route exact path='/' component={Login} />
          {['/:id/editPaciente/:userId', '/:id/crearPaciente/:userId'].map((path, index) =>
            <Route path={path} component={Index} key={index} />
          )}
          {['/:id/listaPacientes', '/:id/busquedaPaciente/:search'].map((path, index) =>
            <Route path={path} component={Paciente} key={index} />
          )}
          <Route path='/:id/agenda' component={Agenda} />
          <Route path='/home/:id' component={Home} />

          <Route path='/:id/listaUsuarios' component={Usuario} />
        </Switch>

      </div>
    );
  }
}

export default App;
