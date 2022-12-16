import React from 'react'
import Layout from './layout/index.js'
import MyRoutes from '@/router/index.js'
import { Outlet } from "react-router-dom"

export default function App() {
  return (
    <Layout>
      <MyRoutes />
      <Outlet />
    </Layout>
  )
}
