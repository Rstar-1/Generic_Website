import AppRoutes from '../routes/index';

import ScrollToTop from '../components/common/generic/ScrollToTop';
import Cursor from '../components/common/animation/Cursor';
import CopyProtection from '../components/common/generic/CopyProtection';

const App = () => {
    return (
        <>
            <ScrollToTop />
            <Cursor />
            <CopyProtection />
            <AppRoutes />
        </>
    );
};

export default App;
