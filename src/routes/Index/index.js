import React from 'react'
import {Layout} from 'antd'
import SiderNav from '../../components/SiderNav'
import HeaderBar from '../../components/HeaderBar'
import ContentMain from '../../components/ContentMain'

const {Sider, Header, Content, Footer} = Layout

class Index extends React.Component{
	state = {
	    collapsed: false,
	    fsize: '24px'
	 };

	toggle = () => {
	    this.setState({
	      collapsed: !this.state.collapsed,
	    });
	    if (this.state.collapsed === false) {
	    	this.setState({
	    		fsize: '12px'
	    	})
	    }else{
	    	this.setState({
	    		fsize: '24px'
	    	})
	    }
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
				        <SiderNav fsize={this.state.fsize}/>
				     </Sider>
				     <Layout>
						<Header style={{background: '#fff', padding: '0 16px'}}>
				            <HeaderBar collapsed={this.state.collapsed} onToggle={this.toggle}/>
						</Header>
						 <Content>
				            <ContentMain/>
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
