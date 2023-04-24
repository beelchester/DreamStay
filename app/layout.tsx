import getCurrentUser from './actions/getCurrentUser'
import ClientOnly from './components/ClientOnly'
import LoginModal from './components/modals/LoginModal'
import RentModal from './components/modals/RentModal'
import SearchModal from './components/modals/SearchModal'
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
      <SearchModal/>
      <Navbar currentUser={currentUser}/>
      </ClientOnly>
      <div>
      {children}
      </div>
      </body>
    </html>
  )
}
