 import React from 'react'
 import BGParticle from '../../utils/BGParticle'//粒子动画
 import { notification } from 'antd'
 import 'animate.css'
 import './style.css'
 import { withRouter } from 'react-router-dom'
 import { inject, observer } from 'mobx-react/index'
 import Loading2 from '../../components/Loading2'//加载动画
 import LoginForm from './LoginForm'

const url = require('../../assets/img/bg1.jpg')

@withRouter @inject('appStore') @observer
 class Login extends React.Component {
 	constructor (props){
 		super(props)
 		this.state = {
	 		url:'',
	 		loading: false
	 	}
 	}
 	

 	componentDidMount () {
 		this.initPage()
 	}
	componentWillUnmount () {
	    this.particle && this.particle.destory()
	    notification.destroy()
	}

	initPage = () => {
		this.setState({
			loading: true
		})
		this.props.appStore.initUsers()
		this.loadImageAsync(url).then(url=>{
	      this.setState({
	        loading: false,
	        url
	      })
	    }).then(()=>{
	      //为什么写在then里？id为backgroundBox的DOM元素是在loading为false时才有，而上面的setState可能是异步的，必须等到setState执行完成后才去获取dom
	      this.particle = new BGParticle('backgroundBox')
	      this.particle.init()
	      notification.open({
	        message:<ul><li>初始账号：admin</li><li>初始密码：admin</li></ul>,
	        duration:0,
	        className:'login-notification'
	      })
	    })
	}

	//登录的背景图太大，等载入完后再显示，实际上是图片预加载，
	loadImageAsync (url) {
		return new Promise(function(resolve, reject) {
		  const image = new Image();
		  image.onload = function() {
		    resolve(url);
		  };
		  image.onerror = function() {
		    console.log('图片载入错误')
		  };
		  image.src = url;
		});
	}
 	render () {
 		return (
			<div id='login-page'>
			{
				this.state.loading ? <div><h3 style={styles.loadingTitle} className="animate bounceInLeft">载入中...</h3><Loading2/>
				</div>:
				<div>
					<div id='backgroundBox' style={styles.backgroundBox}></div>
					<div className='container'>
						<LoginForm/>
					</div>
				</div>
				
			}
			</div>
 		)
 	}
 }

const styles = {
	backgroundBox: {
    	position: 'fixed',
        top: '0',
        left: '0',
        width: '100vw',
        height: '100vh',
        backgroundImage: `url("${url}")`,
        backgroundSize: '100% 100%',
        transition:'all .5s'
  	},
	loadingTitle:{
	    position:'fixed',
	    top:'50%',
	    left:'50%',
	    marginLeft: -45,
	    marginTop: -18,
	    color:'#000',
	    fontWeight:500,
	    fontSize:24
  	}
}

export default Login
