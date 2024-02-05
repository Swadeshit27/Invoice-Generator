import React from 'react'
import { Navigate } from 'react-router-dom';
import { useAppSelector } from '../redux/store';

const PrivatePage = ({ children }: { children: React.ReactNode }) => {
    const { token } = useAppSelector(store => store.products);
    if (token) {
        return children;
    }
    return <Navigate to={'/login'} />
}

export default PrivatePage
