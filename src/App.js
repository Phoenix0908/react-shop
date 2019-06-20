import React, { Component } from 'react';
import PrivateRoute from './components/PrivateRoute'
import {Route,Switch,HashRouter} from 'react-router-dom'
import Index from './routes/Index/index'
import Login from './routes/Login/index'
import "antd/dist/antd.css";
import './App.css';
import './assets/font/iconfont.css'

class App extends Component {
  render() {
    return (
	 	<HashRouter>
	         <Switch>
	          <Route path='/login' component={Login}/>
	          <PrivateRoute path='/' component={Index}/>
	        </Switch>
		</HashRouter>
    );
  }
}

export default App;
