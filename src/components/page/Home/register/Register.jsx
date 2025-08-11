import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import NavBar from '../Navbar/NavBar';
import useAxiosPublic from '../../../../Hooks/useAxiousPublic';
import { AuthContext } from '../../../../providers/AuthProvider';


const Register = () => {
    const axiosPublic = useAxiosPublic();
    const navigate = useNavigate();
    const authContext = useContext(AuthContext);
    
    // Check if context is available
    if (!authContext) {
        return (
            <div>
                <NavBar />
                <div className="min-h-screen flex items-center justify-center">
                    <div className="text-center">
                        <h2 className="text-2xl font-bold text-red-600 mb-4">Authentication Error</h2>
                        <p className="text-gray-600">Please make sure AuthProvider is properly configured.</p>
                    </div>
                </div>
            </div>
        );
    }
    
    const { createUser, loading } = authContext; // Use createUser instead of signIn
    
    const resetForm = (form) => {
        form.reset();
    };
    
    const handleForm = (e) => {
        e.preventDefault();
        const form = e.target;
        const name = form.name.value;
        const email = form.email.value;
        const password = form.password.value;
        const confirmPassword = form.confirmPassword.value;
       
        if (password !== confirmPassword) {
            alert("Passwords don't match!");
            resetForm(form);
            return;
        }

        // Handle registration logic here
        console.log("Name:", name, "Email:", email, "Password:", password);
        createUser(email, password) // Use createUser instead of signIn
        .then((result) => {
            alert("Registration successful!");
            const userInfo = {
                name: name,
                email: email
            }
            axiosPublic.post('/users',userInfo)
            .then(data => {
                console.log('User data saved:', data.data);
            })
            .catch(error => {
                console.error('Error saving user data:', error);
            });
            navigate('/login');
        })
        .catch((error) => {
            console.error("Registration error:", error);
            alert("Registration failed. Please try again.");
        });
    }

    return (
        <div>
            <NavBar />
            <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 flex items-center justify-center py-8 px-4">
                <div className="w-full max-w-md mx-auto">
                    <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
                        <div className="px-6 py-8 sm:px-8">
                            <div className="text-center mb-8">
                                <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2">Create Account</h1>
                                <p className="text-gray-600 text-sm sm:text-base">Join us today and start shopping</p>
                            </div>
                            
                            <form onSubmit={handleForm} className="space-y-6">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                                    <input
                                        type="text"
                                        name="name"
                                        required
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition duration-200"
                                        placeholder="Enter your full name"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                                    <input
                                        type="email"
                                        name="email"
                                        required
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition duration-200"
                                        placeholder="Enter your email"
                                    />
                                </div>
                                
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
                                    <input
                                        type="password"
                                        name="password"
                                        required
                                        minLength="6"
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition duration-200"
                                        placeholder="Create a password"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Confirm Password</label>
                                    <input
                                        type="password"
                                        name="confirmPassword"
                                        required
                                        minLength="6"
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition duration-200"
                                        placeholder="Confirm your password"
                                    />
                                </div>

                                <div className="flex items-center">
                                    <input
                                        id="terms"
                                        name="terms"
                                        type="checkbox"
                                        required
                                        className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
                                    />
                                    <label htmlFor="terms" className="ml-2 block text-sm text-gray-700">
                                        I agree to the{' '}
                                        <a href="#" className="text-green-600 hover:text-green-500 hover:underline">
                                            Terms and Conditions
                                        </a>
                                    </label>
                                </div>
                                
                                <button
                                
                                    type="submit"
                                    className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-4 rounded-lg transition duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
                                >
                                    Create Account
                                </button>
                            </form>
                            
                            <div className="mt-6 text-center">
                                <p className="text-sm text-gray-600">
                                    Already have an account? 
                                    <Link to='/login' className="text-green-600 hover:text-green-500 font-medium ml-1 hover:underline">
                                        Sign in
                                    </Link>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Register;