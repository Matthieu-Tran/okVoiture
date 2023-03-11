import Link from 'next/link'
import Login from './Login'
import Logged from './Logged'
import React from 'react'
import { getServerSession } from 'next-auth'
import { authOptions } from '../../pages/api/auth/[...nextauth]'

async function Nav() {
  const session = await getServerSession(authOptions)
  console.log(session)
  return (
    <nav className='flex justify-between bg-gray-custom text-white items-center py-5'>
       <Link href={'/'}>
          <h1 className='pl-4 font-bold'>Ok Voiture</h1>
       </Link>
       <ul className='flex items-center gap-6 pr-4'>
        {!session?.user && <Login />}
        {session?.user && <Logged image={session.user?.image || ""} />}
       </ul>
    </nav>
  )
}

export default Nav 