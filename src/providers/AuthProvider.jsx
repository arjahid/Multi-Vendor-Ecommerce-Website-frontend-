import React, { createContext, useEffect, useState } from 'react';
import app from '../firebase/firebase.config';
import { createUserWithEmailAndPassword, getAuth, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import useAxiosPublic from '../Hooks/useAxiousPublic';

export const AuthContext = createContext(null);
const auth=getAuth(app);
const provider=new GoogleAuthProvider();


const AuthProvider = ({ children }) => {
    const [user,setUser]=useState(null);
    const [loading, setLoading] = useState(true);
    const axiousPublic=useAxiosPublic();

    const createUser=(email,password)=>{
        setLoading(true);
        return createUserWithEmailAndPassword(auth,email,password);
    }

    const signIn=(email,password)=>{
        setLoading(true);
        return signInWithEmailAndPassword(auth,email,password);

    }
    const signInWithGoogle=()=>{
        setLoading(true);
        return signInWithPopup(auth,provider)
    }
    const logout=()=>{
        setLoading(true);
        return auth.signOut();
    }
   
    const authInfo={
        
        signInWithGoogle,
        user,
        signIn,
        loading,
        createUser,
        logout
    }
    useEffect(()=>{
        const unscribe=onAuthStateChanged(auth,(currentUSer)=>{
            console.log('Current User:', currentUSer);
            setUser(currentUSer);
            if(currentUSer){
                const userInfo={
                    email:currentUSer.email,
                    name:currentUSer.displayName,
                    photoURL:currentUSer.photoURL
                }
                axiousPublic.post('/users',userInfo)
                .then(data=>{
                    console.log('User data saved:', data.data);
                })
                .catch(error=>{
                    console.error('Error saving user data:', error);
                }
                );
            }
            setLoading(false);
        })
        return () => unscribe();
    },[])
  return (
    <AuthContext.Provider value={authInfo}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;
