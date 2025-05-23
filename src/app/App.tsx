import { Outlet } from 'react-router-dom'
import Header from '../shared/components/Header'
import Footer from '../shared/components/Footer'
import { Toaster } from 'react-hot-toast'

function AppContent() {

  return (
    <div className="flex h-screen">

      {/* Main content area */}
      <div className={`flex-1 flex flex-col overflow-auto transition-all duration-300`}>
        <Header />

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