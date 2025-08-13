import React, { useContext } from 'react';
import { AuthContext } from '../providers/AuthProvider';
import useAxiosPublic from './useAxiousPublic';
import { useQuery } from '@tanstack/react-query';

const useAdmin = () => {
    const {user, loading} = useContext(AuthContext);
    const axiosPublic = useAxiosPublic();
    
    const {data: isAdmin, isPending: isAdminLoading} = useQuery({
        queryKey: ['isAdmin', user?.email],
        enabled: !loading && !!user?.email,
        queryFn: async () => {
            try {
                console.log('Checking admin status for:', user?.email);
                const res = await axiosPublic.get(`/users/admin/${user?.email}`);
                console.log('Full response:', res);
                console.log('Response status:', res.status);
                console.log('Response data:', res.data);
                
                // Change from res.data?.admin to res.data?.isAdmin
                return res.data?.isAdmin || false;
            } catch (error) {
                console.error('Error checking admin status:', error);
                console.error('Error response:', error.response?.data);
                console.error('Error status:', error.response?.status);
                // Return false if there's an error
                return false;
            }
        }
    });
    
    return {isAdmin: isAdmin , isAdminLoading};
};

export default useAdmin;