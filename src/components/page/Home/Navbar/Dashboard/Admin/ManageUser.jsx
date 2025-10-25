import React from 'react';
import useAllUsers from '../../../../../../Hooks/allUser';
import useAxiosPublic from '../../../../../../Hooks/useAxiousPublic';
import Swal from 'sweetalert2';

const ManageUser = () => {
    const { users, loading, error } = useAllUsers();
    const axiosPublic = useAxiosPublic();

    // Delete user function
    const handleDelete = async (userId) => {
        const result = await Swal.fire({
            title: 'Are you sure?',
            text: "This action will permanently delete the user.",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Yes, delete it!',
            cancelButtonText: 'Cancel'
        });

        if (!result.isConfirmed) return;

        try {
            await axiosPublic.delete(`/users/${userId}`);
            await Swal.fire('Deleted!', 'User deleted successfully.', 'success');
            window.location.reload(); // refresh the page
        } catch (error) {
            console.error('Delete error:', error);
            await Swal.fire('Error', 'Failed to delete user.', 'error');
        }
    };

    // Toggle Admin Role
    const handleToggleAdmin = async (user) => {
        const newRole = user.role === 'admin' ? 'customer' : 'admin';
        const actionText = newRole === 'admin' ? 'promote to Admin' : 'remove Admin role';

        const result = await Swal.fire({
            title: 'Confirm role change',
            text: `Are you sure you want to ${actionText} for ${user.email}?`,
            icon: 'question',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#aaa',
            confirmButtonText: 'Yes, proceed',
            cancelButtonText: 'Cancel'
        });

        if (!result.isConfirmed) return;

        try {
            await axiosPublic.patch(`/users/admin/${user.email}`, { role: newRole });
            await Swal.fire('Updated!', 'User role updated.', 'success');
            window.location.reload(); // refresh the page
        } catch (error) {
            console.error('Role update error:', error);
            await Swal.fire('Error', 'Failed to update role.', 'error');
        }
    };

    if (loading) {
        return <div className="text-center mt-10">Loading users...</div>;
    }

    if (error) {
        return <div className="text-center mt-10 text-red-600">Error: {error}</div>;
    }

    return (
        <div className="p-6 bg-gray-50 min-h-[70vh] rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold mb-6">Manage Users ({users.length})</h2>
            <div className="overflow-x-auto">
                <table className="min-w-full bg-white rounded-lg shadow-md">
                    <thead className="bg-blue-500 text-white">
                        <tr>
                            <th className="py-3 px-4 text-left">Name</th>
                            <th className="py-3 px-4 text-left">Email</th>
                            <th className="py-3 px-4 text-left">Gender</th>
                            <th className="py-3 px-4 text-left">Role</th>
                            <th className="py-3 px-4 text-left">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user) => (
                            <tr
                                key={user._id}
                                className="border-b hover:bg-gray-100 transition"
                            >
                                <td className="py-3 px-4">{user.name || "N/A"}</td>
                                <td className="py-3 px-4">{user.email}</td>
                                <td className="py-3 px-4 capitalize">{user.gender || "N/A"}</td>
                                <td className="py-3 px-4">
                                    {user.role === "admin" ? (
                                        <span className="text-green-600 font-semibold">Admin</span>
                                    ) : (
                                        <span className="text-gray-700 font-medium">Customer</span>
                                    )}
                                </td>
                                <td className="py-3 px-4 flex gap-2">
                                    <button
                                        onClick={() => handleToggleAdmin(user)}
                                        className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded hover:bg-yellow-200 transition"
                                    >
                                        {user.role === "admin" ? "Remove Admin" : "Make Admin"}
                                    </button>
                                    <button
                                        onClick={() => handleDelete(user._id)}
                                        className="bg-red-100 text-red-800 px-3 py-1 rounded hover:bg-red-200 transition"
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ManageUser;
