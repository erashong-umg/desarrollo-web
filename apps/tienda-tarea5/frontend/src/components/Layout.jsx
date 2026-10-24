import { Outlet } from 'react-router-dom'
import { Toast, ToastContainer } from 'react-bootstrap'
import AppNavbar from './AppNavbar'
import Footer from './Footer'
import VersionBadge from './VersionBadge'
import { useAuth } from '../context/AuthContext'

export default function Layout() {
  const { sessionMessage, clearSessionMessage } = useAuth()

  return (
    <>
      <AppNavbar />
      <main className="tc-main">
        <Outlet />
      </main>
      <Footer />
      <VersionBadge />
      <ToastContainer position="top-end" className="p-3" style={{ zIndex: 1080 }}>
        <Toast show={Boolean(sessionMessage)} onClose={clearSessionMessage} delay={8000} autohide bg="warning">
          <Toast.Header closeButton>
            <strong className="me-auto">Sesión caducada</strong>
          </Toast.Header>
          <Toast.Body>{sessionMessage}</Toast.Body>
        </Toast>
      </ToastContainer>
    </>
  )
}
