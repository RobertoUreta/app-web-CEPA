import React, { Component } from 'react';
import { Login } from './pages/Login';
import { Layout } from './components/Layout'
import { Switch , Route} from 'react-router-dom'
import { Usuario } from './pages/Usuario'
import { Paciente } from './pages/Paciente'
import { Agenda }  from './pages/Agenda'
class App extends Component {
  render() {
    return (
      <div className="App">
        <Switch>
          <Route exact path='/' component = {Login}  />
          <Route path='/index/:id' component = {Layout} />
          <Route path='/listaPacientes' component = { Paciente } />
          <Route path='/agenda' component = { Agenda } />

          <Route path='/listaUsuarios' component = {Usuario} />
        </Switch>
        
      </div>
    );
  }
}

export default App;
