import Header from '@/components/Header'
import './globals.css'
import Link from 'next/link'

export const metadata = {
  title: 'Next.js',
  description: 'Generated by Next.js',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className='bg-white'>
        <Header />
        <main className='container mx-auto p-10'> {children}</main>
        <footer className='text-gray-400 text-center text-xs py-5'>
          <p>Copyright &copy; {new Date().getFullYear()} All right reserved</p>
        </footer>
      </body>
    </html>
  )
}
