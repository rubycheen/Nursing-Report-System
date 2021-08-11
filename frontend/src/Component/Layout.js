import { Layout, Menu } from 'antd';
import Static from './Static'
import DefaultReport from './DefaultReport';
import CustomReport from './CustomReport'
import { BarChartOutlined, UserAddOutlined, DotChartOutlined } from '@ant-design/icons';
import { useState } from 'react';

const { Header, Content, Footer, Sider } = Layout;

const LayoutContainer = () => {

    const [content, setContent] = useState(1) 
    
    return (
    <Layout >
        <Sider
        style={{
            overflow: 'auto',
            height: '100vh',
            position: 'fixed',
            left: 0,
            paddingTop: '80px',
        }}
        >
      <div className="logo" />
      <Menu theme="dark" mode="inline" defaultSelectedKeys={['4']}>
        <Menu.Item key="1" style={{fontSize: '20px'}} onClick={()=>setContent(1)}>
        <BarChartOutlined style={{fontSize: '22px'}}/>
          預設報表
        </Menu.Item>
        <Menu.Item key="2" style={{fontSize: '20px'}} onClick={()=>setContent(2)}>
        <DotChartOutlined style={{fontSize: '22px'}}/>
          自訂報表
        </Menu.Item>
        <Menu.Item key="3" style={{fontSize: '20px'}} onClick={()=>setContent(3)}>
        <UserAddOutlined style={{fontSize: '22px'}}/>
          報表設計
        </Menu.Item>
      </Menu>
    </Sider>
    <Layout className="site-layout" style={{ marginLeft: 200 }}>
      <Header className="site-layout-background"> 
      <h1 style={{fontSize: '25px'}} >護理部藥物異常分析系統 Medicine Error Analysis System</h1>
      </Header>
      <Content style={{ margin: '24px 16px 0', overflow: 'initial'}}>
        <div className="site-layout-background" style={{ padding: 24, textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems:'center' }}>
            {content===1?<DefaultReport />:<></>}
            {content===2?<CustomReport/>:<></>}
            {content===3?<Static />:<></>}
        </div>
      </Content>
      <Footer style={{ textAlign: 'center' }}>© 2021 Department of Information Management, National Taiwan University all rights reserved</Footer>
    </Layout>
  </Layout>)
}

export default LayoutContainer