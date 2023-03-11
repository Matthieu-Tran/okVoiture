import '../styles/globals.css'
import {Roboto} from "@next/font/google"
import Nav from './nav/Nav'
import QueryWrapper from './QueryWrapper'
const roboto = Roboto({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-roboto",
})

export const metadata = {
  title: 'OkVoiture',
  description: 'Plateforme permettant aux particuliers de louer leur voiture entre eux.',
}

export default function RootLayout({children}){
  return (
    <html lang="en">
      <head />
      <body className={`text-center bg-gray-200 ${roboto.variable}`}>
        <QueryWrapper>
          <Nav />
          {children}
        </QueryWrapper>
      </body>
    </html>
  )
}
