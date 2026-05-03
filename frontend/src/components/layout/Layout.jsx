import { Outlet, useLocation } from 'react-router-dom'
import Header from './Header.jsx'
import Footer from './Footer.jsx'
import ToastContainer from './ToastContainer.jsx'
import ScrollToTop from './ScrollToTop.jsx'

export default function Layout() {
  const { pathname } = useLocation()

  return (
    <div className="min-h-screen flex flex-col bg-copa-dark">
      <ScrollToTop />
      <Header />
      <main className="flex-1">
        <div key={pathname} className="animate-page-enter">
          <Outlet />
        </div>
      </main>
      <Footer />
      <ToastContainer />
    </div>
  )
}
