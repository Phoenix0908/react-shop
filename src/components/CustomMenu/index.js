import React from 'react'
import {Link,withRouter} from 'react-router-dom'
import {Menu, Icon} from 'antd'


class CustomMenu extends React.Component {
	state = {
	    openKeys: [],
	    selectedKeys: []
	 }
	onOpenChange = (openKeys) => {
		console.log(openKeys)
	    //此函数的作用只展开当前父级菜单（父级菜单下可能还有子菜单）
	    if (openKeys.length === 0 || openKeys.length === 1) {
	      this.setState({
	        openKeys
	      })
	     return
	 	}
		//最新展开的菜单
	 	const latestOpenKey = openKeys[openKeys.length - 1];
	 	//判断最新展开的菜单是不是父级菜单，若是父级菜单就只展开一个，不是父级菜单就展开父级菜单和当前子菜单
	    //因为我的子菜单的key包含了父级菜单，所以不用像官网的例子单独定义父级菜单数组，然后比较当前菜单在不在父级菜单数组里面。
	    //只适用于3级菜单
	    if (latestOpenKey.includes(openKeys[0])) {
	      this.setState({ openKeys });
	    } else {
	      this.setState({
	        openKeys: [latestOpenKey]
	      });
	    }
	 }
	renderMenuItem = ({key,icon,title}) => {
		return (
			<Menu.Item key={key}>
				<Link to={key}>
					{icon && <Icon type={icon} />}
            		<span>{title}</span>
				</Link>
          </Menu.Item>
		)
	}
	renderSubMenu = ({key, icon, title, subs}) => {
		return (
			<Menu.SubMenu key={key} title={<span>{icon && <Icon type={icon} />}<span>{title}</span></span>}>
				{
					subs && subs.map(item => {
						return item.subs && item.subs.length > 0 ? this.renderSubMenu(item) : this.renderMenuItem(item)
					})
				}
	        </Menu.SubMenu>
		)
	}
	render() {
		const {openKeys, selectedKeys} = this.state
		const {menus} = this.props
		return (
		    <Menu
		        mode="inline"
		        theme={this.props.theme ? this.props.theme : 'dark'}
		        openKeys={openKeys}
		        onOpenChange={this.onOpenChange}
		        onClick={({key}) => this.setState({selectedKeys: [key]})}
		        selectedKeys={selectedKeys}>
		     {
		      	menus && menus.map(item => {
		      		return item.subs && item.subs.length > 0 ? this.renderSubMenu(item) : this.renderMenuItem(item)
		      	})
		    }
		    </Menu>
		)
	}
}

export default CustomMenu