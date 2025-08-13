import React from 'react';

const useAxiousSecure = () => {
   const axiosSecure = axios.create({
       baseURL: 'http://localhost:3100',
       headers: {
           'Content-Type': 'application/json',
       },
   });

   axiosSecure.interceptors.request.use(
       (config) => {
           const token = localStorage.getItem('token');
           if (token) {
               config.headers.Authorization = `Bearer ${token}`;
           }
           return config;
       },
       (error) => {
           return Promise.reject(error);
       }
   );

   return { axiosSecure };
};

export default useAxiousSecure;