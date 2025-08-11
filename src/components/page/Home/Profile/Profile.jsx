import React, { useContext, useState } from 'react';
import NavBar from '../Navbar/NavBar';
import { AuthContext } from '../../../../providers/AuthProvider';
import useCart from '../../../../Hooks/useCart';
import useWishlist from '../../../../Hooks/useWishlist';

const Profile = () => {
  const {cartItems}=useCart();
  const{wishlistItems}=useWishlist();
  const {user} = useContext(AuthContext);
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    name: user?.displayName || '',
    email: user?.email || '',
    phone: '',
    address: '',
    dateOfBirth: '',
    gender: '',
    bio: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfileData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSave = () => {
    // Save profile data logic here
    console.log('Saving profile data:', profileData);
    setIsEditing(false);
    alert('Profile updated successfully!');
  };

  const handleCancel = () => {
    // Reset to original data
    setProfileData({
      name: user?.displayName || '',
      email: user?.email || '',
      phone: '',
      address: '',
      dateOfBirth: '',
      gender: '',
      bio: ''
    });
    setIsEditing(false);
  };

  return (
    <div>
      <NavBar />
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-purple-50 py-8">
        <div className="max-w-4xl mx-auto px-4">
          {/* Profile Header */}
          <div className="bg-white rounded-2xl shadow-xl border-0 p-8 mb-8 transform hover:scale-[1.01] transition-all duration-300">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-6">
                <div className="relative">
                  <div className="bg-gradient-to-br from-green-500 to-green-700 text-white rounded-full w-24 h-24 flex items-center justify-center shadow-lg ring-4 ring-green-100">
                    <span className="text-4xl font-bold">
                      {user?.email?.charAt(0).toUpperCase() || 'U'}
                    </span>
                  </div>
                  <div className="absolute -bottom-1 -right-1 w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                    <span className="text-white text-sm">✓</span>
                  </div>
                </div>
                <div>
                  <h1 className="text-4xl font-bold text-gray-900 mb-2">
                    {profileData.name || 'User Profile'}
                  </h1>
                  <p className="text-gray-600 text-lg">{user?.email}</p>
                  <span className="inline-block bg-gradient-to-r from-green-100 to-green-200 text-green-800 text-sm px-4 py-2 rounded-full mt-3 font-semibold">
                    🌟 Active Member
                  </span>
                </div>
              </div>
              <button
                onClick={() => setIsEditing(!isEditing)}
                className="bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white px-8 py-3 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
              >
                {isEditing ? '✕ Cancel' : '✏️ Edit Profile'}
              </button>
            </div>
          </div>

        
          <div className="bg-white rounded-2xl shadow-xl border-0 p-8 mb-8">
            <div className="flex items-center mb-8">
              <div className="w-1 h-8 bg-gradient-to-b from-green-500 to-green-700 rounded-full mr-4"></div>
              <h2 className="text-3xl font-bold text-gray-900">Personal Information</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              
              <div className="group">
                <label className="block text-sm font-semibold text-gray-700 mb-3">👤 Full Name</label>
                {isEditing ? (
                  <input
                    type="text"
                    name="name"
                    value={profileData.name}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-green-100 focus:border-green-500 transition-all duration-300"
                    placeholder="Enter your full name"
                  />
                ) : (
                  <div className="bg-gray-50 px-4 py-3 rounded-xl border-2 border-transparent hover:border-green-200 transition-colors duration-300">
                    <p className="text-gray-900 font-medium">{profileData.name || 'Not provided'}</p>
                  </div>
                )}
              </div>

           
              <div className="group">
                <label className="block text-sm font-semibold text-gray-700 mb-3">📧 Email Address</label>
                <div className="bg-gradient-to-r from-gray-50 to-gray-100 px-4 py-3 rounded-xl border-2 border-gray-200">
                  <p className="text-gray-900 font-medium">{user?.email}</p>
                </div>
                <span className="text-xs text-gray-500 mt-1 block">🔒 Email cannot be changed</span>
              </div>

             
              <div className="group">
                <label className="block text-sm font-semibold text-gray-700 mb-3">📱 Phone Number</label>
                {isEditing ? (
                  <input
                    type="tel"
                    name="phone"
                    value={profileData.phone}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-green-100 focus:border-green-500 transition-all duration-300"
                    placeholder="Enter your phone number"
                  />
                ) : (
                  <div className="bg-gray-50 px-4 py-3 rounded-xl border-2 border-transparent hover:border-green-200 transition-colors duration-300">
                    <p className="text-gray-900 font-medium">{profileData.phone || 'Not provided'}</p>
                  </div>
                )}
              </div>

             
              <div className="group">
                <label className="block text-sm font-semibold text-gray-700 mb-3">🎂 Date of Birth</label>
                {isEditing ? (
                  <input
                    type="date"
                    name="dateOfBirth"
                    value={profileData.dateOfBirth}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-green-100 focus:border-green-500 transition-all duration-300"
                  />
                ) : (
                  <div className="bg-gray-50 px-4 py-3 rounded-xl border-2 border-transparent hover:border-green-200 transition-colors duration-300">
                    <p className="text-gray-900 font-medium">{profileData.dateOfBirth || 'Not provided'}</p>
                  </div>
                )}
              </div>

             
              <div className="group">
                <label className="block text-sm font-semibold text-gray-700 mb-3">⚧ Gender</label>
                {isEditing ? (
                  <select
                    name="gender"
                    value={profileData.gender}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-green-100 focus:border-green-500 transition-all duration-300"
                  >
                    <option value="">Select Gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                  </select>
                ) : (
                  <div className="bg-gray-50 px-4 py-3 rounded-xl border-2 border-transparent hover:border-green-200 transition-colors duration-300">
                    <p className="text-gray-900 font-medium capitalize">{profileData.gender || 'Not provided'}</p>
                  </div>
                )}
              </div>

             
              <div className="md:col-span-2 group">
                <label className="block text-sm font-semibold text-gray-700 mb-3">🏠 Address</label>
                {isEditing ? (
                  <textarea
                    name="address"
                    value={profileData.address}
                    onChange={handleInputChange}
                    rows="4"
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-green-100 focus:border-green-500 transition-all duration-300 resize-none"
                    placeholder="Enter your address"
                  />
                ) : (
                  <div className="bg-gray-50 px-4 py-3 rounded-xl border-2 border-transparent hover:border-green-200 transition-colors duration-300 min-h-[4rem]">
                    <p className="text-gray-900 font-medium">{profileData.address || 'Not provided'}</p>
                  </div>
                )}
              </div>

             
              <div className="md:col-span-2 group">
                <label className="block text-sm font-semibold text-gray-700 mb-3">📝 Bio</label>
                {isEditing ? (
                  <textarea
                    name="bio"
                    value={profileData.bio}
                    onChange={handleInputChange}
                    rows="5"
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-green-100 focus:border-green-500 transition-all duration-300 resize-none"
                    placeholder="Tell us about yourself..."
                  />
                ) : (
                  <div className="bg-gray-50 px-4 py-3 rounded-xl border-2 border-transparent hover:border-green-200 transition-colors duration-300 min-h-[5rem]">
                    <p className="text-gray-900 font-medium">{profileData.bio || 'No bio provided'}</p>
                  </div>
                )}
              </div>
            </div>

           
            {isEditing && (
              <div className="flex justify-end space-x-4 mt-10 pt-8 border-t-2 border-gray-100">
                <button
                  onClick={handleCancel}
                  className="px-8 py-3 border-2 border-gray-300 rounded-xl text-gray-700 font-semibold hover:bg-gray-50 hover:border-gray-400 transition-all duration-300 transform hover:scale-105"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSave}
                  className="px-8 py-3 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white font-semibold rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
                >
                  💾 Save Changes
                </button>
              </div>
            )}
          </div>

         
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white rounded-2xl shadow-xl border-0 p-8 text-center transform hover:scale-105 transition-all duration-300 hover:shadow-2xl">
              <div className="text-5xl font-bold bg-gradient-to-r from-green-500 to-green-700 bg-clip-text text-transparent mb-4">{cartItems.length}</div>
              <p className="text-gray-600 font-semibold">📦 Total Orders</p>
            </div>
            <div className="bg-white rounded-2xl shadow-xl border-0 p-8 text-center transform hover:scale-105 transition-all duration-300 hover:shadow-2xl">
              <div className="text-5xl font-bold bg-gradient-to-r from-blue-500 to-blue-700 bg-clip-text text-transparent mb-4">{wishlistItems.length}</div>
              <p className="text-gray-600 font-semibold">💝 Wishlist Items</p>
            </div>
            <div className="bg-white rounded-2xl shadow-xl border-0 p-8 text-center transform hover:scale-105 transition-all duration-300 hover:shadow-2xl">
              <div className="text-5xl font-bold bg-gradient-to-r from-purple-500 to-purple-700 bg-clip-text text-transparent mb-4">3</div>
              <p className="text-gray-600 font-semibold">⭐ Reviews Written</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;