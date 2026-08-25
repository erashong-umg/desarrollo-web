import { Outlet } from 'react-router-dom'
import AppNavbar from './AppNavbar'
import Footer from './Footer'

export default function Layout() {
  return (
    <>
      <AppNavbar />
      <main className="tc-main">
        <Outlet />
      </main>
      <Footer />
    </>
  )
}
