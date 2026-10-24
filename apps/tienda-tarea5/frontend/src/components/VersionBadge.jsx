// Instrumentación agregada en la Tarea 6: hace visible, en la propia interfaz,
// qué versión/color del frontend está siendo servida durante las pruebas de
// despliegue (recreate / blue-green / canary). No forma parte de la lógica de negocio.
const version = import.meta.env.VITE_APP_VERSION || '1.0.0'
const color = import.meta.env.VITE_APP_COLOR || 'blue'

const backgrounds = {
  blue: '#0d6efd',
  green: '#198754',
  yellow: '#997404',
}

export default function VersionBadge() {
  return (
    <div
      style={{
        position: 'fixed',
        bottom: '0.75rem',
        right: '0.75rem',
        zIndex: 2000,
        padding: '0.35rem 0.75rem',
        borderRadius: '999px',
        fontSize: '0.8rem',
        fontWeight: 600,
        color: '#fff',
        backgroundColor: backgrounds[color] || '#6c757d',
        boxShadow: '0 2px 6px rgba(0,0,0,0.25)',
      }}
    >
      v{version} · {color}
    </div>
  )
}
