import React from 'react';
import { DownCircleOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
// import type { MenuProps } from 'antd';
import { Menu } from 'antd';
// import NotFound from './components/notFound';
import Nav from './components/Nav';




const navigation = [
  {
    label: 'Home',
    key: '/',
    icon: <DownCircleOutlined />,

  },
  {
    label: 'Link 1',
    key: '/notfound1',
    icon: <DownCircleOutlined />,

  },
  {
    label: 'Link 2',
    key: '/notfound2',
    icon: <DownCircleOutlined />,

  },
  {
    label: 'Link 3',
    key: '/notfound3',
    icon: <DownCircleOutlined />,

  },

]






const App: React.FC = () => {

  const navigate = useNavigate()
  const handleClick = (kp: string) => navigate(kp)

  return (
    <div>

      <Menu
        theme="light"
        mode="horizontal"
        defaultSelectedKeys={['1']}
        items={navigation}
        onClick={({ key }) => {
          handleClick(key)

        }}
      />

      <Nav />
    </div>

  )
};

export default App;


