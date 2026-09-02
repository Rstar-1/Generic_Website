import { BrowserRouter } from 'react-router-dom'
import AppRoutes from '../routes/index'
import ScrollToTop from '../componets/common/generic/ScrollToTop'

const App = () => {
    return (
        <BrowserRouter>
            <ScrollToTop />
            <AppRoutes />
        </BrowserRouter>
    )
}

export default App

