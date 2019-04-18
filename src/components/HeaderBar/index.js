import React from 'react'
import screenfull from 'screenfull'//全屏展示
import { Icon,Dropdown, Menu, Avatar } from 'antd'

class HeaderBar extends React.Component {
	state = {
		avatar: require('./img/01.jpg'),
		screenfullIcon: 'arrows-alt'
	}
	toggle = () => {
	    this.props.onToggle()
	}

	componentDidMount () {
		screenfull.onchange(() => {
			this.setState({
				screenfullIcon: screenfull.isFullscreen ? 'shrink' : 'arrows-alt'	
			})
		})
	}
	componentWillUnmount () {
		screenfull.off('change');
	}

	screenfullToggle = () => {
		if (screenfull.enabled) {
        	screenfull.toggle();
    	}
	}
	render() {
		const {avatar,screenfullIcon} = this.state
		const {collapsed} = this.props
		const menu = (
		  <Menu>
		    <Menu.Item>
		    	<Icon type="user"/>个人中心
		 	</Menu.Item>
		 	<Menu.Item>
		 		<Icon type="logout" />退出登陆
		 	</Menu.Item>
		  </Menu>
		);
		return (
			<div>
				<Icon
	              className="trigger"
	              type={collapsed ? 'menu-unfold' : 'menu-fold'}
	              onClick={this.toggle}
	            />
	            <div style={{float:'right'}}>
					<ul className='header-ul'>
						<li><Icon type={screenfullIcon} onClick={this.screenfullToggle}/></li>
						<li>你好，管理员</li>
						<li>
							<Dropdown overlay={menu}>
							    <Avatar src={avatar} alt=""/>
							 </Dropdown>
						</li>
					</ul>
	            </div>
			</div>
		)
	}
}

export default HeaderBar