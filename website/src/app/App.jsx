import { BrowserRouter } from 'react-router-dom'
import AppRoutes from '../routes/index'
import ScrollToTop from '../components/common/generic/ScrollToTop'
import Cursor from '../components/common/animation/Cursor'
import CopyProtection from '../components/common/generic/CopyProtection'

const App = () => {
    return (
        <BrowserRouter>
            <ScrollToTop />
            <Cursor />
            <CopyProtection />
            <AppRoutes />
        </BrowserRouter>
    )
}

export default App

