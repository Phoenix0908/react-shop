import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import {HashRouter} from 'react-router-dom'
import { Provider} from 'mobx-react'
import { LocaleProvider } from 'antd'
import zh_CN from 'antd/lib/locale-provider/zh_CN'
import store from './store'

ReactDOM.render(
	<HashRouter>
    	<LocaleProvider locale={zh_CN}>
      		<Provider {...store}>
       	 		<App/>
      		</Provider>
    	</LocaleProvider>
  	</HashRouter>,
	document.getElementById('root'));

serviceWorker.unregister();
