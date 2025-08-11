import { useQuery } from '@tanstack/react-query';
import { useContext } from 'react';
import { AuthContext } from '../providers/AuthProvider';

const useWishlist=()=>{
    const {user}=useContext(AuthContext);
    const {refetch,data:wishlistItems=[]}=useQuery({
        queryKey:['wishlistItems', user?.email],
        queryFn:async()=>{
            const res=await fetch(`http://localhost:3100/wishlist?email=${user?.email}`);
            if(!res.ok){
                throw new Error("Failed to fetch wishlist items");
            }
            return res.json();
        }
    });
    return {wishlistItems,refetch};
}
export default useWishlist;