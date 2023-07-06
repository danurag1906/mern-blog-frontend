import React from 'react'
import Header from './components/Header'
import { Outlet } from 'react-router-dom'

const Layout = () => {
  return (
    <main>
        <Header/>
        <Outlet/>
        {/* the content inside the layout route in App.js file sits inside the <Outlet/>  */}
    </main>
  )
}

export default Layout