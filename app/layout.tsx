import getCurrentUser from './actions/getCurrentUser'
import ClientOnly from './components/ClientOnly'
import LoginModal from './components/modals/LoginModal'
import Modal from './components/modals/Modal'
import RentModal from './components/modals/RentModal'
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

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
    const currentUser = await getCurrentUser()
  return (
    <html lang="en">
      <body className={font.className}>
      <ClientOnly>
      <SignupModal/>
      <LoginModal/>
      <RentModal/>
      <Navbar currentUser={currentUser}/>
      </ClientOnly>
      {children}</body>
    </html>
  )
}
