import { useQuery } from '@tanstack/react-query';

const useWishlist=()=>{
    const {refetch,data:wishlistItems=[]}=useQuery({
        queryKey:['wishlistItems'],
        queryFn:async()=>{
            const res=await fetch('http://localhost:3100/wishlist');
            if(!res.ok){
                throw new Error("Failed to fetch wishlist items");
            }
            return res.json();
        }
    });
    return {wishlistItems,refetch};
}
export default useWishlist;