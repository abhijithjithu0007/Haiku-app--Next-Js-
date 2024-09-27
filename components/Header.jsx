import Link from 'next/link'
import { getUserFromCookie } from '@/lib/getUser'
import { logout } from '@/actions/userController';

export default async function Header() {

    const isuser = await getUserFromCookie()
    return (
        <header className='bg-gray-100'>
            <div className='container mx-auto'>
                <div className="navbar bg-gray-100">
                    <div className="flex-1">
                        <Link href='/' className="btn btn-ghost text-xl">
                            Haiku App
                        </Link>
                    </div>
                    <div className="flex-none">
                        <ul className="menu menu-horizontal px-1">
                            {isuser && (
                                <>
                                <li className='mr-3'><Link href='/create-haiku' className='btn btn-primary'>Create Haiku</Link></li>
                                    <form action={logout}>
                                        <button className='bg-gray-600 rounded-md p-2 text-white text-sm'>Log Out</button>
                                    </form>
                                </>
                            )}
                            {!isuser && (
                                <li>
                                    <Link className='bg-gray-600 rounded-md p-4' href='/login'>Log In</Link>
                                </li>
                            )}
                        </ul>
                    </div>
                </div>

            </div>
        </header>
    )
}