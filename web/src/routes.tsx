import React, { useContext } from 'react';

import AppRoutes from './routes/app.routes'
import AuthRoutes from './routes/auth.routes';

import AuthContext from './contexts/auth';


function Routes() {
    const { signed } = useContext(AuthContext);
    
    return signed ? <AuthRoutes/> : <AppRoutes/>;
}

export default Routes;