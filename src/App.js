import React, { Component } from 'react';
import { Login } from './pages/Login';
import { Layout } from './components/Layout'
import { Switch , Route} from 'react-router-dom'


class App extends Component {
  render() {
    return (
      <div className="App">
        <Switch>
          <Route exact path='/' component = {Login}  />
          <Route path='/Layout' component = {Layout} />
        </Switch>
        
      </div>
    );
  }
}

export default App;
