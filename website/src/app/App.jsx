import { BrowserRouter } from 'react-router-dom'
import AppRoutes from '../routes/index'
import ScrollToTop from '../componets/common/generic/ScrollToTop'
import Cursor from '../componets/common/animation/Cursor'

const App = () => {
    return (
        <BrowserRouter>
            <ScrollToTop />
            <Cursor />
            <AppRoutes />
        </BrowserRouter>
    )
}

export default App

