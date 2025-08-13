import React from 'react';
import useAllUsers from '../../../../../../Hooks/allUser';

const ManageUser = () => {
    const{users,loading}=useAllUsers();
    return (
        <div>
            {loading && <p>Loading...</p>}
            {users && users.map(user => (
                <div key={user.id}>
                    <h2>{user.name}</h2>
                    <p>{user.email}</p>
                </div>
            ))}
        </div>
    );
};

export default ManageUser;