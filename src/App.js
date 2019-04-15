import React, { Component } from 'react';
import {Route,HashRouter as Router,Switch} from 'react-router-dom'
import Index from './routes/Index/index'
import './App.css';

class App extends Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route path='/' component={Index}/>
        </Switch>
      </Router>
    );
  }
}

export default App;
