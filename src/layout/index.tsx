import { routes } from '@/router/index.js';
import { Breadcrumb, Layout, Menu } from 'antd';
import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import FooterComponent from './Footer.js';
import HeaderComponent from './Header.js';
const { Header, Content, Footer, Sider } = Layout;

const App = (props: any) => {
  const [collapsed, setCollapsed] = useState(false);
  const [list, setList] = useState([]);
  const location = useLocation();
  const navigate = useNavigate();

  let breadcrumbNameRoutes = routes.map(item => ({ ...item, breadcrumb: item.key }))

  useEffect(() => {
    // TODO: 递归路由 生成extra的路径
    console.log(location)
    const newList = breadcrumbNameRoutes.filter(item => item.path == location.pathname)
    setList([...newList])
  }, [location])

  const handleToMenu = (e: any) => {
    if (e.key == 'home') {
      return navigate('/')
    }
    navigate(e.keyPath.reverse().join('/'))
  }

  return (
    <Layout style={{ minHeight: '100vh' }} >
      <Sider theme='light' collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
        <div style={{ height: 32, margin: 16, background: 'rgba(255, 255, 255, 0.2)' }} />
        <Menu
          theme="light"
          defaultSelectedKeys={['1']}
          mode="inline"
          items={routes.filter(item => !item.hidden).map(item => {
            if (item.path == '/home') {
              return { ...item, selectable: "false" }
            } else {
              return { ...item }
            }
          })}
          onClick={handleToMenu}
        />
      </Sider>
      <Layout >
        <Header style={{ padding: 0, background: '#fff' }} >
          <HeaderComponent />
        </Header>
        <Content style={{ margin: '0 16px' }}>
          <Breadcrumb separator='/'>
            {list.map(item => (
              <Breadcrumb.Item key={item.key}>
                {
                  item.path !== '/' && (
                    <Link to={item.path}>{item.label}</Link>
                  )
                }
              </Breadcrumb.Item>
            ))}
          </Breadcrumb>
          {props.children}
        </Content>
        <Footer style={{ textAlign: 'center' }}>
          <FooterComponent />
        </Footer>
      </Layout>
    </Layout>
  );
};

export default App;