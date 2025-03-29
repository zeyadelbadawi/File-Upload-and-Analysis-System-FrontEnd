'use client';

import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import axios from 'axios';

const UserProfilePage = () => {
  const [userData, setUserData] = useState<any>(null);
  const [usersList, setUsersList] = useState<any[]>([]); 
  const [loading, setLoading] = useState(true);
  const [newUsername, setNewUsername] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(true); 
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      toast.error("User not logged in");
      setIsLoggedIn(false); 
      return;
    }

    const fetchUserProfile = async () => {
      try {
        const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/auth/profile`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setUserData(res.data);
        if (res.data.role === "admin") {
          fetchUsers();
        }
      } catch (error) {
        setIsLoggedIn(false); 
      }
    };

    fetchUserProfile();
    setLoading(false);
  }, [router]);

  const fetchUsers = async () => {
    try {
      const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/auth/users`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setUsersList(res.data); 
    } catch (error) {
      console.error('Error fetching users:', error);  
      toast.error("Failed to fetch users");
    }
  };

  const handleUsernameUpdate = async () => {
    try {
      const token = localStorage.getItem("token");

      const userId = userData?.id;

      if (!userId || !newUsername) {
        toast.error("Invalid data");
        return;
      }

      const res = await axios.put(
        `${process.env.NEXT_PUBLIC_API_URL}/${userId}/edit`, 
        { username: newUsername },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setUserData(res.data); 
      toast.success("Username updated successfully");
    } catch (error) {
      toast.error("existing username");
    }
  };

  const handleDeleteUser = async (userId: string) => {
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}users/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
  
      setUsersList(usersList.filter(user => user.id !== userId));
      toast.success("User deleted successfully");
    } catch (error) {
      toast.error("Failed to delete user");
    }
  };

  const handleEditUser = async (userId: string) => {
    const newName = prompt("Enter new username: ");
    if (newName) {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.put(
          `${process.env.NEXT_PUBLIC_API_URL}/users/${userId}/edit`,
          { username: newName },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const updatedUsers = usersList.map(user => 
          user.id === userId ? { ...user, username: newName } : user
        );
        setUsersList(updatedUsers);
        toast.success("User updated successfully");
      } catch (error) {
        toast.error("Failed to update user");
      }
    }
  };

  if (loading) return <div className="text-center text-gray-600">Loading...</div>;

  return (
    <div className={`flex min-h-screen ${!isLoggedIn ? 'opacity-50' : ''}`}>
      <div className="flex-1 p-8">
        {!isLoggedIn ? (
          <div className="text-center opacity-100">
            <h2 className="text-2xl font-semibold text-red-600">You should log in to access this page</h2>
            <p>Please log in to see your profile details.</p>
          </div>
        ) : (
          <>
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-3xl font-bold text-gray-800">Welcome, {userData?.username}</h1>
              <p className="text-lg text-gray-600">Role: {userData?.role}</p>
            </div>

            {userData?.role !== "admin" && (
              <div className="mt-8">
                <h2 className="text-2xl font-semibold mb-4">Update Username</h2>
                <div className="bg-white p-6 rounded-lg shadow-lg">
                  <input
                    type="text"
                    value={newUsername}
                    onChange={(e) => setNewUsername(e.target.value)}
                    placeholder="Enter new username"
                    className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <button
                    onClick={() => handleUsernameUpdate()}
                    className="mt-4 bg-blue-500 text-white py-2 px-6 rounded-md hover:bg-blue-700 transition duration-300"
                  >
                    Update Username
                  </button>
                </div>
              </div>
            )}

            {userData?.role === "admin" && (
              <div className="mt-8">
                <h2 className="text-2xl font-semibold mb-4">Manage Users</h2>
                <div className="bg-white p-6 rounded-lg shadow-lg">
                  <table className="w-full table-auto border-collapse">
                    <thead className="bg-gray-100">
                      <tr>
                        <th className="text-center p-4 text-xl font-semibold text-gray-800">Username</th>
                        <th className="text-center p-4 text-xl font-semibold text-gray-800">Role</th>
                        <th className="text-center p-4 text-xl font-semibold text-gray-800">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {usersList.map((user: any) => (
                        <tr key={user.id} className="border-t hover:bg-gray-50">
                          <td className="text-center p-4">{user.username}</td>
                          <td className="text-center p-4">{user.role}</td>
                          <td className="text-center p-4 flex justify-center gap-4">
                            <button 
                              onClick={() => handleEditUser(user.id)}
                              className="bg-yellow-500 text-white py-2 px-4 rounded-md hover:bg-yellow-600 transition duration-300"
                            >
                              Edit
                            </button>
                            <button
                              onClick={() => handleDeleteUser(user.id)}
                              className="bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600 transition duration-300"
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
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default UserProfilePage;
