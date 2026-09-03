import { Outlet } from 'react-router-dom'
import Header from './Header'
import Footer from './Footer'

const Layout = () => (
    <>
        <Header />
        <main className='w-full'>
            <Outlet />
        </main>
        <Footer />
    </>
)

export default Layout
