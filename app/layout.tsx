import '../styles/globals.css'
import {Roboto} from "@next/font/google"
import Nav from './nav/Nav'
const roboto = Roboto({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-roboto",
})

export const metadata = {
  title: 'OkVoiture',
  description: 'Plateforme permettant aux particuliers de louer leur voiture entre eux.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`text-center bg-gray-20 ${roboto.variable}`}>
        <Nav />
        {children}
      </body>
    </html>
  )
}
