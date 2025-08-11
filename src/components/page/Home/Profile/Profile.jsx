import React from 'react';
import NavBar from '../Navbar/NavBar';
import { Helmet } from 'react-helmet-async';


const Profile = () => {
    return (
      <>
       <Helmet>
            <title>User Profile | E-Commerce Website</title>
          </Helmet>
            <div>
         
            <NavBar></NavBar>
          <div className='mt-4'>
              <h1 className="text-4xl font-bold text-gray-900 mb-4">User Profile</h1>
            <p className="text-lg text-gray-600">Welcome to your profile page!</p>
          </div>
        </div>
      
      </>
      
    );
};

export default Profile;