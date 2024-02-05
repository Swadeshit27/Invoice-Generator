import React from 'react'
import { Navigate } from 'react-router-dom';
import { useAppSelector } from '../redux/store';

const PublicPage = ({ children }: { children: React.ReactNode }) => {
    const { token } = useAppSelector(store => store.products);
    if (token) {
        return <Navigate to={'/'} />
    }
    return children
}

export default PublicPage