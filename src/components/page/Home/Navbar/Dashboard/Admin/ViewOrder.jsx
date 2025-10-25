import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../../../../../providers/AuthProvider';
import useAxiosPublic from '../../../../../../Hooks/useAxiousPublic';
import useAdmin from '../../../../../../Hooks/useAdmin';

const MyOrder = () => {
  const [orders, setOrders] = useState([]);
  const { user } = useContext(AuthContext);
  const { isAdmin } = useAdmin();
  const axiosPublic = useAxiosPublic();

    useEffect(()=>{
        if (!user?.email) return;
        if (isAdmin) {
            axiosPublic.get('/orders')
                .then(response => {
                    setOrders(response.data);
                })
                .catch(error => {
                    console.error('Error fetching all orders:', error);
                });
        }
    }, [user?.email, isAdmin, axiosPublic]);

  return (
    <div>
     <p>alls orders : {orders.length}</p>
    </div>
  );
};

export default MyOrder;
