import { useQuery } from '@tanstack/react-query';

const useCart=()=>{
    const {refetch,data:cartItems=[]}=useQuery({
        queryKey:['cartItems'],
        queryFn:async()=>{
            const res=await fetch('http://localhost:3100/cart');
            if(!res.ok){
                throw new Error("Failed to fetch cart items");
            }
            return res.json();
        }
    });
    return {cartItems,refetch};
}
export default useCart;