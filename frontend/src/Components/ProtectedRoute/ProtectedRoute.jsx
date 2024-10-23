import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { UserContext } from '../../Context/UserContext';

export default function ProtectedRoute({ children }) {
    const { userId } = useContext(UserContext);

    if (!userId) {
        return <Navigate to="/login" />;
    } 
    return children;
}
