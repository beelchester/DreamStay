import Navbar from './components/navbar/Navbar'
import './globals.css'
import {Nunito} from 'next/font/google'

export const metadata = {
  title: 'DreamStay',
  description: 'A vacation rental booking dummy platform',
}

const font = Nunito({
        subsets: ['latin'],
    })

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={font.className}>
      <Navbar />
      {children}</body>
    </html>
  )
}
