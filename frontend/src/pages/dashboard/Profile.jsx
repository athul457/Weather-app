import { useState, useEffect } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { motion } from "framer-motion";

function Profile() {
  const { user, updateUserProfile, logout } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    profilePhoto: "",
    password: "",
  });
  const [message, setMessage] = useState({ type: "", text: "" });

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || "",
        email: user.email || "",
        profilePhoto: user.profilePhoto || "",
        password: "", // Don't populate password
      });
    }
  }, [user]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage({ type: "", text: "" });

    const formDataObject = new FormData();
    formDataObject.append("name", formData.name);
    formDataObject.append("email", formData.email);
    
    if (formData.password) {
      formDataObject.append("password", formData.password);
    }

    if (formData.profilePhotoFile) {
      formDataObject.append("profilePhoto", formData.profilePhotoFile);
    } else {
       // If keeping existing URL approach as fallback or for display maintenance if no new file
       formDataObject.append("profilePhoto", formData.profilePhoto);
    }

    const result = await updateUserProfile(formDataObject);

    if (result.success) {
      setMessage({ type: "success", text: "Profile updated successfully!" });
      setIsEditing(false);
      setFormData((prev) => ({ ...prev, password: "", profilePhotoFile: null })); 
    } else {
      setMessage({ type: "error", text: result.message });
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({
        ...formData,
        profilePhotoFile: file,
        profilePhoto: URL.createObjectURL(file), // Preview
      });
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-6 ml-50 mt-30 "
    >
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-bold text-black">Profile</h1>
        <p className="mt-1 text-sm text-blue-800">
          Manage your personal information
        </p>
      </div>

      {/* Profile Card */}
      <div className="max-w-3xl rounded-xl bg-gray-300/100 backdrop-blur-md p-6 shadow-lg border border-white/20 text-black">
        {message.text && (
          <div
            className={`mb-4 p-3 rounded-lg text-sm ${
              message.type === "success"
                ? "bg-green-500/20 text-green-600 border border-green-500/50"
                : "bg-red-500/20 text-red-600 border border-red-500/50"
            }`}
          >
            {message.text}
          </div>
        )}

        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
          {/* Avatar */}
          <div className="flex-shrink-0">
            {formData.profilePhoto ? (
              <img
                src={formData.profilePhoto}
                alt="Profile"
                className="h-24 w-24 rounded-full object-cover border-4 border-white/20 shadow-lg"
                onError={(e) => {
                  e.target.src =
                    "https://ui-avatars.com/api/?name=" +
                    (formData.name || "User") +
                    "&background=random";
                }}
              />
            ) : (
              <div className="flex h-24 w-24 items-center justify-center rounded-full bg-blue-500/20 border-2 border-blue-400 text-3xl font-bold text-black uppercase backdrop-blur-sm">
                {formData.name ? formData.name.charAt(0) : "U"}
              </div>
            )}
          </div>

          {/* User Info / Form */}
          <div className="flex-grow w-full">
            {isEditing ? (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-black">
                    Profile Photo
                  </label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="mt-1 w-full text-sm text-black
                      file:mr-4 file:py-2 file:px-4
                      file:rounded-full file:border-0
                      file:text-sm file:font-semibold
                      file:bg-yellow-400 file:text-black
                      hover:file:bg-blue-700 transition"
                  />
                </div>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div>
                    <label className="block text-sm font-medium text-black">
                      Full Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className="mt-1 w-full rounded-lg border border-white/20 bg-white/40 px-4 py-2 text-black focus:border-blue-500 focus:outline-none placeholder-gray-400"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-black">
                      Email
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="mt-1 w-full rounded-lg border border-white/20 bg-white/40 px-4 py-2 text-black focus:border-blue-500 focus:outline-none placeholder-gray-400"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-black">
                    New Password (leave blank to keep current)
                  </label>
                  <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="••••••••"
                    className="mt-1 w-full rounded-lg border border-white/20 bg-white/40 px-4 py-2 text-white focus:border-blue-500 focus:outline-none placeholder-gray-400"
                  />
                </div>

                <div className="flex justify-end gap-3 mt-4">
                  <button
                    type="button"
                    onClick={() => {
                      setIsEditing(false);
                      setMessage({ type: "", text: "" });
                      // Reset form to current user data
                      if (user) {
                        setFormData({
                          name: user.name || "",
                          email: user.email || "",
                          profilePhoto: user.profilePhoto || "",
                          password: "",
                        });
                      }
                    }}
                    className="rounded-lg border border-yellow-600 px-4 py-2 text-gray-900 hover:bg-yellow-600 hover:text-white transition"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="rounded-lg bg-yellow-400 px-6 py-2 font-semibold text-white hover:bg-yellow-600 transition shadow-lg shadow-blue-600/30"
                  >
                    Save Changes
                  </button>
                </div>
              </form>
            ) : (
              <div className="space-y-2">
                <h2 className="text-xl font-semibold text-yellow-600">
                  {user?.name || "Guest"}
                </h2>
                <p className="text-black">{user?.email || "guest@example.com"}</p>
                <p className="text-sm text-blue-800">
                  Member since Jan 2025
                </p>
                
                {/* Static Details */}
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 mt-6">
                  <div className="p-3 rounded-lg bg-white/50 border border-white/10">
                     <p className="text-sm text-gray-900">Location</p>
                     <p className="font-medium text-black">Kochi, India</p>
                  </div>
        
                  <div className="p-3 rounded-lg bg-white/50 border border-white/10">
                    <p className="text-sm text-gray-900">Preferred Unit</p>
                     <p className="font-medium text-black">Celsius (°C)</p>
                  </div>
                </div>

                <div className="mt-6 flex justify-end">
                  <button
                    onClick={logout}
                    className="rounded-lg border border-yellow-500 text-yellow-600 px-6 py-2 font-semibold hover:bg-yellow-500/80 transition shadow-md mr-2 hover:text-white"
                  >
                    Logout
                  </button>
                  <button
                    onClick={() => setIsEditing(true)}
                    className="rounded-lg bg-yellow-400 px-6 py-2 font-semibold text-black hover:bg-yellow-500 transition shadow-lg shadow-yellow-400/20"
                  >
                    Edit Profile
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default Profile;
