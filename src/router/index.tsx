import React, { lazy, ReactElement, Suspense } from 'react';
import { Navigate, useRoutes } from 'react-router-dom';
import About from '@/views/Home/About/index.js';
import Login from '@/views/Login/index.js';
import {
  DesktopOutlined,
  FileOutlined,
  PieChartOutlined,
} from '@ant-design/icons';

export const routes = [
  {
    path: '/',
    key: '/',
    element: <Navigate to='/home' />,
    hidden: true,
  },
  {
    path: '/home',
    label: 'home',
    key: 'home',
    icon: <DesktopOutlined />,
    children: [
      {
        path: 'about',
        element: <About />,
        label: 'about',
        key: 'about',
        icon: <FileOutlined />,
      },
    ],
  },
  {
    path: '/login',
    element: <Login />,
    label: 'login',
    key: 'login',
    icon: <PieChartOutlined />,
    hidden: true,
  },
  {
    path: '*',
    title: '404',
    key: '404',
    element: <div>404</div>,
    hidden: true,
  },
];

export default function Router() {
  // https://reactrouter.com/en/6.4.5/hooks/use-routes
  return useRoutes(routes);
}
