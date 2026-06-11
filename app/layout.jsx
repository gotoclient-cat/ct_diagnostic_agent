export const metadata = {
  title: 'Charles Taylor · Diagnóstico de Madurez',
  description: 'Evaluación Claims & Fraude',
}

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body style={{ margin: 0, padding: 0, fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif' }}>
        {children}
      </body>
    </html>
  )
}
