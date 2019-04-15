import React from 'react'
import {Layout} from 'antd'
import SiderNav from './components/SiderNav/SiderNav'

const {Sider, Header, Content, Footer} = Layout

class Index extends React.Component{
	state = {
	    collapsed: false,
	 };

	toggle = () => {
	    this.setState({
	      collapsed: !this.state.collapsed,
	    });
	  }
	render () {
		return (
			<div>
				<Layout>
					<Sider
				          collapsible
				          collapsed={this.state.collapsed}
				          trigger={null}
				        >
				        <SiderNav/>
				     </Sider>
				</Layout>
			</div>
		)
	}
}

export default Index;
