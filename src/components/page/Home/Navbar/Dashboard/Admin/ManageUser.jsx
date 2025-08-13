import React from 'react';
import useAllUsers from '../../../../../../Hooks/allUser';
import useAxiosPublic from '../../../../../../Hooks/useAxiousPublic';

const ManageUser = () => {
    const { users, loading, error } = useAllUsers();
    const axiosPublic = useAxiosPublic();

    // Delete user function
    const handleDelete = async (userId) => {
        if (!window.confirm("Are you sure you want to delete this user?")) return;

        try {
            await axiosPublic.delete(`/users/${userId}`);
            alert("User deleted successfully!");
            window.location.reload(); // refresh the page
        } catch (error) {
            console.error("Delete error:", error);
            alert("Failed to delete user.");
        }
    };

    // Toggle Admin Role
    const handleToggleAdmin = async (user) => {
        try {
            const newRole = user.role === "admin" ? "customer" : "admin";
            await axiosPublic.patch(`/users/admin/${user.email}`, {
                role: newRole,
            });
            alert("User role updated!");
            window.location.reload(); // refresh the page
        } catch (error) {
            console.error("Role update error:", error);
            alert("Failed to update role.");
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
