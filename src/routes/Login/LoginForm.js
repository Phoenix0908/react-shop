import React from 'react'
import { randomNum } from '../../utils/utils'
import { withRouter } from 'react-router-dom'
import { inject, observer } from 'mobx-react/index'
import { Form, Input, Button,Row, Col } from 'antd';
import { ajax } from '../../axios/axios'

@withRouter @inject('appStore') @observer
@Form.create()
class LoginForm extends React.Component {

	state = {
		focusItem: -1,
		code: ''
	}

	componentDidMount () {
		this.createCode();
	}

	/**
	* 生成验证码
	*/
	createCode = () => {
		const ctx = this.canvas.getContext('2d')
		const chars = [1, 2, 3, 4, 5, 6, 7, 8, 9, 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'j', 'k', 'l', 'm', 'n', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'J', 'K', 'L', 'M', 'N', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z']
		let code = ''
		ctx.clearRect(0, 0, 80, 39)
		for (let i = 0; i < 4; i++) {
		  const char = chars[randomNum(0, 57)]
		  code += char
		  ctx.font = randomNum(20, 25) + 'px SimHei'  //设置字体随机大小
		  ctx.fillStyle = '#D3D7F7'
		  ctx.textBaseline = 'middle'
		  ctx.shadowOffsetX = randomNum(-3, 3)
		  ctx.shadowOffsetY = randomNum(-3, 3)
		  ctx.shadowBlur = randomNum(-3, 3)
		  ctx.shadowColor = 'rgba(0, 0, 0, 0.3)'
		  let x = 80 / 5 * (i + 1)
		  let y = 39 / 2
		  let deg = randomNum(-25, 25)
		  /**设置旋转角度和坐标原点**/
		  ctx.translate(x, y)
		  ctx.rotate(deg * Math.PI / 180)
		  ctx.fillText(char, 0, 0)
		  /**恢复旋转角度和坐标原点**/
		  ctx.rotate(-deg * Math.PI / 180)
		  ctx.translate(-x, -y)
		}
		this.setState({
		  code
		})
	}


	handleSubmit = e => {
	    e.preventDefault();
	    this.props.form.validateFields((err, values) => {
	      if (!err) {
	        console.log(this.state.code);
	        if(this.state.code.toUpperCase() !== values.verification.toUpperCase()) {
	        	this.props.form.setFields({
	        		verification:{
						value: values.verification,
						errors: [new Error('验证码错误')]
	        		}
	        	})
	        	return
	        }
			// let login = ajax('/manage/user/login.do',{username: values.username,password: values.password});
			// console.log(login)
			const users = this.props.appStore.users;
			const result = users.find(item => item.username === values.username)

			if (!result) {
				this.props.form.setFields({
	        		verification:{
						value: values.verification,
						errors: [new Error('用户名不存在')]
	        		}
	        	})
	        	return
			}else{

				if (result.password !== values.password) {
					this.props.form.setFields({
		        		verification:{
							value: values.verification,
							errors: [new Error('密码错误')]
		        		}
		        	})
		        	return
				}
			}

			this.props.appStore.toggleLogin(true,{username : values.username})
			debugger
			console.log(this.props)
			const {from} = this.props.location.state || {from: {pathname: '/'}}
			this.props.history.push(from)
	      }
	    });
	 }

	render () {
		const { getFieldDecorator,getFieldError } = this.props.form
		const {focusItem } = this.state
		return (
			<div className='box'>
				<h3 className='title'>管理员登录</h3>
				 <Form onSubmit={this.handleSubmit}>
					<Form.Item help={getFieldError('username')}>
			          {getFieldDecorator('username', {
			            rules: [{ required: true, message: '请输入用户名' }],
			          })(
			            <Input
			              onFocus = {() => this.setState({focusItem:0})}
			              onBlur = {() => this.setState({focusItem:-1})}
			              addonBefore={<span className='iconfont icon-User' style = {focusItem === 0 ? styles.focus : {}}/>}
			              placeholder="用户名"
			              maxLength={16}
			            />,
			          )}
			        </Form.Item>
			        <Form.Item help={getFieldError('password')}>
			          {getFieldDecorator('password', {
			            rules: [{ required: true, message: '请输入验证码' }],
			          })(
			            <Input
			              onFocus = {() => this.setState({focusItem:1})}
			              onBlur = {() => this.setState({focusItem:-1})}
			              addonBefore={<span className='iconfont icon-suo1' style = {focusItem === 1 ? styles.focus : {}}/>}
			              placeholder="密码"
			              type='password'
			              maxLength={16}
			            />,
			          )}
			        </Form.Item>
			        <Form.Item help={getFieldError('verification')}>
			          {getFieldDecorator('verification', {
			            rules: [{ required: true, message: '请输入验证码' }],
			          })(
			           <Row>
			           	<Col span={15}>
							<Input
							  onFocus = {() => this.setState({focusItem:2})}
			              	  onBlur = {() => this.setState({focusItem:-1})}
				              addonBefore={<span className='iconfont icon-securityCode-b' style = {focusItem === 2 ? styles.focus : {}}/>}
				              placeholder="验证码"
				              maxLength={4}
				            />
			           	</Col>
			            <Col span={9}>
							<canvas  onClick='' width="80" height='30' ref={el => this.canvas = el}  onClick={this.createCode}/>
			            </Col>
			            </Row>
			          )}
			        </Form.Item>
			         <Button type="danger" htmlType="submit" className="login-form-button">登录</Button>
				 </Form>
				 <div className='footer'>
		          <div>欢迎登陆后台管理系统</div>
		         </div>
			</div>
		)
		
	}
}

const styles = {
	focus:{
		opacity: 1
	}
}

export default LoginForm