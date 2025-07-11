import './globals.css'
import NavbarWrapper from './NavbarWrapper' // adjust path if needed

export const metadata = {
  title: 'Blog Site',
  description: 'A dynamic blog built with Next.js and Drizzle',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-gray-100 text-gray-900">
        <NavbarWrapper />
        <main className="p-6">{children}</main>
      </body>
    </html>
  )
}
