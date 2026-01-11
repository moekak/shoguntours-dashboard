import React, { useEffect } from 'react';
import { useCommonContext } from '../../context/CommonContext';
import { useLocation } from 'react-router';

function Reset() {
    const { resetAll } = useCommonContext();
    const { pathname } = useLocation();
    useEffect(() => {
        resetAll();
    }, [pathname]);
    return null;
}

export default Reset;
