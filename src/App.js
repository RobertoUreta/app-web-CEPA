import React, { Component } from 'react';
import { Login } from './pages/Login';
import { Layout } from './components/Layout'
import { Switch , Route} from 'react-router-dom'
import CrearUsuario from './pages/CrearUsuario'
import { Paciente } from './pages/Paciente'

class App extends Component {
  render() {
    return (
      <div className="App">
        <Switch>
          <Route exact path='/' component = {Login}  />
          <Route path='/index' component = {Layout} />
          <Route path='/listaPacientes' component = { Paciente } />
          <Route path='/CrearUsuario' component = {CrearUsuario} />
        </Switch>
        
      </div>
    );
  }
}

export default App;
