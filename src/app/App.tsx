import { useLocation, Outlet } from 'react-router-dom'
import { useEffect, useRef, useState } from 'react'
import Sidebar from '../shared/components/Sidebar'
import Header from '../shared/components/Header'
import Breadcrumb from '../shared/components/Breadcrumb'
import Footer from '../shared/components/Footer'
import { Toaster } from 'react-hot-toast'

function AppContent() {
  const location = useLocation()

  const [collapsed, setSidebarCollapsed] = useState(() => {
    const saved = localStorage.getItem('sidebarCollapsed')
    return saved === 'true'
  })

  useEffect(() => {
    localStorage.setItem('sidebarCollapsed', String(collapsed))
  }, [collapsed])


  // Generate breadcrumbs based on current route
  const getBreadcrumbs = () => {
    const paths = location.pathname.split('/').filter(Boolean)

    return paths.map((path, index) => {
      const isLast = index === paths.length - 1
      return {
        label: path.charAt(0).toUpperCase() + path.slice(1),
        path: isLast ? undefined : `/${paths.slice(0, index + 1).join('/')}`
      }
    })
  }

  return (
    <div className="flex h-screen">
      {/* <Sidebar
        collapsed={collapsed}
        toggleCollapse={() => setSidebarCollapsed(!collapsed)}
      /> */}

      {/* Main content area */}
      <div className={`flex-1 flex flex-col overflow-auto transition-all duration-300 ${collapsed ? 'ml-0' : 'ml-64'
        }`}>
        <Header />
        {/* <Breadcrumb items={[
          { label: 'Home', path: '/' },
          ...getBreadcrumbs()
        ]} /> */}

        <main className="flex-grow">
          <Outlet />
        </main>

        <Toaster />

        <Footer />
      </div>
    </div>
  )
}

export default function App() {
  return (
    <AppContent />
  )
}