import React from 'react';
import { DownCircleOutlined, MenuOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { Menu } from 'antd';
import Nav from './components/Nav';
import ContentCard from './components/ContentCard';





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
  {
    label: '',
    key: '/notfound4',
    icon: <MenuOutlined />,

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
      <div>
        <ContentCard />
      </div>
    </div>

  )
};

export default App;


