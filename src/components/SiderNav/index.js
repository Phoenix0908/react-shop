import React from 'react'
import CustomMenu from '../CustomMenu/index'

const menus = [
	{
		title: '首页',
		icon: 'home',
		key: '/home'
	},
	{
		title: '商品',
		icon: 'shopping',
		key: '/home/merchandise',
		subs: [
			{title: '商品管理', icon: '', key: '/home/merchandise/merManagement'},
			{title: '品类管理', icon: '', key: '/home/merchandise/categoryManagement'}
		]
	},
	{
		title: '订单',
		icon: 'reconciliation',
		key: '/home/order',
		subs: [
			{title: '订单管理', icon: '', key: 'home/order/orderManagement'}
		]
	},
	{
		title: '用户',
		icon: 'user',
		key: '/home/user',
		subs: [
			{title: '用户管理', icon: '', key: '/home/user/userManagement'}
		]
	}
]

class SiderNav extends React.Component {
	render() {
		return (
			<div style={{height: '100vh',overflowY: 'scroll'}}>
				<div style={style.logo}>HAPPY MALL</div>
				<CustomMenu menus={menus}/>
			</div>
		)
	}
}

const style = {
	logo: {
		height: '35px',
		background: 'rgba(255, 255, 255, .2)',
    	margin: '16px',
    	fontSize: '24px',
    	color: '#fff',
    	textAlign: 'center'
	}
}

export default SiderNav
