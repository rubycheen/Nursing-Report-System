import { useState } from 'react';
import LoginPage from './Component/Login';
import LayoutContainer from './Component/Layout';

const App = () => {
    const [page, setPage] = useState(0)
    return(
        <>
            {page===0?<LoginPage setPage={setPage}/>:<></>}
            {page===1?<LayoutContainer/>:<></>}
        </>
    )
}

export default App