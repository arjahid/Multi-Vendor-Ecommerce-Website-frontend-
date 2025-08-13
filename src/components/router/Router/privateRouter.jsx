import React, { useContext } from 'react';
import { AuthContext } from '../../../providers/AuthProvider';
import { Navigate } from 'react-router-dom';

const PrivateRouter = ({ children }) => {
    const { user, loading } = useContext(AuthContext);
    
    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="text-center">
                    <div className="loading loading-spinner loading-lg text-green-600"></div>
                    <p className="mt-4 text-gray-600">Loading...</p>
                </div>
            </div>
        );
    }
    
    if (user) {
        return children;
    }
    
    return <Navigate to="/login" replace />;
};

export default PrivateRouter;