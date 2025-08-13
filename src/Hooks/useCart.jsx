import { useQuery } from '@tanstack/react-query';
import { useContext } from 'react';
import { AuthContext } from '../providers/AuthProvider';

const useCart=()=>{

    const {user}=useContext(AuthContext);
    const {refetch,data:cartItems=[]}=useQuery({
        queryKey:['cartItems', user?.email],
        queryFn:async()=>{
            const res=await fetch(`http://localhost:3100/cart?email=${user?.email}`);
            if(!res.ok){
                throw new Error("Failed to fetch cart items");
            }
            return res.json();
        }
    });
    return {cartItems,refetch};
}
export default useCart;