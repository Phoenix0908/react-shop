import React from 'react'
import {Layout} from 'antd'
import SiderNav from '../../components/SiderNav'
import HeaderBar from '../../components/HeaderBar'

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
				     <Layout>
						<Header style={{background: '#fff', padding: '0 16px'}}>
				            <HeaderBar collapsed={this.state.collapsed} onToggle={this.toggle}/>
						</Header>
						 <Content style={{
				            margin: '24px 16px', padding: 24, background: '#fff', minHeight: 280,
				          }}
				          >
				            Content
				          </Content>
						<Footer style={{ textAlign: 'center' }}>
				           React-Admin ©2018 Created by Phoenix
				        </Footer>
				     </Layout>
				</Layout>
			</div>
		)
	}
}

export default Index;
