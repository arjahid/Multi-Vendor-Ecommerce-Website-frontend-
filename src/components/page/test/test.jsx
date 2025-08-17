import React, { useContext } from 'react';
import { AuthContext } from '../../../providers/AuthProvider';
import useAllUsers from '../../../Hooks/allUser';

const Test = () => {
    const {user} = useContext(AuthContext);
    const {users, loading, error} = useAllUsers();
    
    if (loading) return <div>Loading all users...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-4">All Users Information</h1>
            
            {users && users.length > 0 ? (
                <div className="space-y-4">
                    {users.map(user => (
                        <div key={user._id} className="bg-blue-100 p-4 rounded-lg border">
                            <p><strong>ID:</strong> {user._id}</p>
                            <p><strong>Name:</strong> {user.name}</p>
                            <p><strong>Email:</strong> {user.email}</p>
                            <p><strong>Gender:</strong> {user.gender}</p>
                            <p><strong>Role:</strong> {user.role}</p>
                            <p><strong>Vendor Status:</strong> {user.vendorStatus}</p>
                            <p><strong>UID:</strong> {user.uid}</p>
                            <p><strong>Created:</strong> {new Date(user.createdAt).toLocaleString()}</p>
                        </div>
                    ))}
                </div>
            ) : (
                <p>No users found in database.</p>
            )}
        </div>
    );
};

export default Test;