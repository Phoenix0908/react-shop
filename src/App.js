import React, { Component } from 'react';
import {Route,Switch,HashRouter} from 'react-router-dom'
import Index from './routes/Index/index'
import "antd/dist/antd.css";
import './App.css';

class App extends Component {
  render() {
    return (
 	<HashRouter>
         <Switch>
          <Route path='/' component={Index}/>
        </Switch>
	</HashRouter>
    );
  }
}

export default App;
