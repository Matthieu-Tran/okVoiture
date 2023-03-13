import '../styles/globals.css'
import {Roboto} from "@next/font/google"
import Nav from './nav/Nav'
import AddCarForm from './components/form'
import QueryWrapper from './QueryWrapper'
import { getServerSession } from 'next-auth'
import { authOptions } from '../pages/api/auth/[...nextauth]'

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-roboto",
})

export const metadata = {
  title: 'OkVoiture',
  description: 'Plateforme permettant aux particuliers de louer leur voiture entre eux.',
}

export default async function RootLayout({children}){
  const session = await getServerSession(authOptions)
  return (
    <html lang="en">
      <head />
      <body className={`text-center bg-gray-200 ${roboto.variable}`}>
        <QueryWrapper>
          <Nav session={session}/>
          <AddCarForm session={session} />
          {children}
        </QueryWrapper>
      </body>
    </html>
  )
}
