import React from 'react'
import { Switch,Redirect,withRouter} from 'react-router-dom'
import LoadableComponent from '../../utils/LoadableComponent'
import PrivateRoute from '../PrivateRoute'

const Home = LoadableComponent(() => import('../../routes/Home/index'))//参数一定要是函数，否则不会懒加载，只会代码拆分

@withRouter
class ContentMain extends React.Component {
	render () {
		return (
			<div>
				<Switch>
					<PrivateRoute exact path='/home' component={Home}/>//exact严格匹配
				</Switch>
			</div>
		)
	}
}

export default ContentMain