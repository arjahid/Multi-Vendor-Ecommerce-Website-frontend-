import { useEffect, useState } from 'react';
import useAxiosPublic from './useAxiousPublic';

const useAllUsers = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const axiosPublic = useAxiosPublic();
    
    useEffect(() => {
        axiosPublic.get('/users')
        .then(response => {
            setUsers(response.data);
            setLoading(false);
        })
        .catch(err => {
            setError(err.message);
            setLoading(false);
        });
    }, []);
    
    return { users, loading, error };
};

export default useAllUsers;