import React from 'react';
import { Link } from 'react-router-dom';
import NavBar from '../Navbar/NavBar';

const Login = () => {
    return (
        <div>
            <NavBar></NavBar>
             <div className="hero bg-base-200 min-h-screen"> 
      <div>
        <img src="" alt="" />
      </div>
      <div className="hero-content flex-col lg:flex-row-reverse">
        
        <div className="card bg-base-100 w-full max-w-sm  shadow-2xl">
        <div className="text-center lg:text-left">
          <h1 className="text-5xl font-bold pl-4">Login now!</h1>
        
        </div>
          <div className="card-body">
            <form  className="fieldset">
              <label className="label">Email</label>
              <input
                type="email"
                name="email"
                className="input"
                placeholder="Email"
              />
              <label className="label">Password</label>
              <input
                type="password"
                name="password"
                className="input"
                placeholder="Password"
              />
              <input
              
                
                className="btn btn-neutral"
                type="submit"
                value="Login"
              />
            </form>
            <p><small>New Here?<Link to='/signup' className="text-green-600"> create an accoutn</Link></small></p>
          </div>
      
        </div>
      </div>
     
    </div>
        </div>
    );
};

export default Login;