import { useCallback, useState } from "react";
import useAxiosPublic from "./useAxiousPublic";


const useUserBehaviour = (userEmail) => {
  const axiosPublic = useAxiosPublic();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const logBehaviour = useCallback(
    async (productId, action) => {
      if (!userEmail || !productId) return;
      const validActions = ["view", "add_to_cart", "wishlist", "purchase"];
      if (!validActions.includes(action)) return;

      setLoading(true);
      setError(null);

      try {
        const response = await axiosPublic.post("/userBehaviour", {
          email: userEmail,
          productId,
          action,
        });
        console.log("User behaviour logged:", response.data);
      } catch (err) {
        console.error("Error logging user behaviour:", err);
        setError(err);
      } finally {
        setLoading(false);
      }
    },
    [userEmail, axiosPublic]
  );

  return { logBehaviour, loading, error };
};

export default useUserBehaviour;
