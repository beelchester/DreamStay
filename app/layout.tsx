import ClientOnly from './components/ClientOnly'
import Modal from './components/modals/Modal'
import SignupModal from './components/modals/SignupModal'
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
      <ClientOnly>
      <SignupModal/>
      <Navbar/>
      </ClientOnly>
      {children}</body>
    </html>
  )
}
