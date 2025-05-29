import { useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { Camera, Mail, User, Calendar, ShieldCheck } from "lucide-react";

const ProfilePage = () => {
  const { authUser, isUpdatingProfile, updateProfile } = useAuthStore();
  const [selectedImg, setSelectedImg] = useState(null);

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();

    reader.readAsDataURL(file);

    reader.onload = async () => {
      const base64Image = reader.result;
      setSelectedImg(base64Image);
      await updateProfile({ profilePic: base64Image });
    };
  };

  return (
    <div className="min-h-screen pt-20 bg-base-100/90">
      <div className="max-w-3xl mx-auto p-4 py-8">
        <div className="bg-base-100 rounded-2xl shadow-xl border border-base-200 overflow-hidden">
          <div className="bg-gradient-to-r from-primary/10 to-secondary/10 p-6 text-center">
            <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Your Profile
            </h1>
            <p className="mt-2 text-base-content/70">Manage your account information</p>
          </div>

          <div className="p-6 space-y-8">
            <div className="flex flex-col items-center gap-4">
              <div className="relative group">
                <img
                  src={selectedImg || authUser.profilePic || "/avatar.png"}
                  alt="Profile"
                  className="size-36 rounded-full object-cover border-4 border-base-200 shadow-lg group-hover:border-primary/50 transition-all duration-300"
                />
                <label
                  htmlFor="avatar-upload"
                  className={`
                    absolute bottom-3 right-3 
                    bg-gradient-to-br from-primary to-secondary 
                    p-2 rounded-full cursor-pointer shadow-md
                    hover:scale-110 transition-all duration-200
                    ${isUpdatingProfile ? "animate-pulse pointer-events-none" : ""}
                  `}
                >
                  <Camera className="w-5 h-5 text-white" />
                  <input
                    type="file"
                    id="avatar-upload"
                    className="hidden"
                    accept="image/*"
                    onChange={handleImageUpload}
                    disabled={isUpdatingProfile}
                  />
                </label>
              </div>
              <p className="text-sm text-base-content/60">
                {isUpdatingProfile ? (
                  <span className="inline-flex items-center gap-1">
                    <span className="loading loading-spinner loading-xs"></span>
                    Uploading your new photo...
                  </span>
                ) : (
                  "Click the camera icon to update your profile photo"
                )}
              </p>
            </div>

            <div className="space-y-6">
              <div className="form-control">
                <label className="label ">
                  <span className="label-text  text-base-content/80 flex items-center gap-2">
                    <User className="w-4 h-4 text-primary" />
                    Full Name
                  </span>
                </label>
                <div className="input input-bordered flex items-center w-full">
                  {authUser?.fullName}
                </div>
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text text-base-content/80 flex items-center gap-2">
                    <Mail className="w-4 h-4 text-primary" />
                    Email Address
                  </span>
                </label>
                <div className="input input-bordered flex items-center w-full">
                  {authUser?.email}
                </div>
              </div>
            </div>

            <div className="mt-8 bg-base-200/50 rounded-xl p-6 border border-base-200">
              <h2 className="text-xl font-semibold flex items-center gap-2 mb-4">
                <ShieldCheck className="w-5 h-5 text-primary" />
                Account Information
              </h2>
              <div className="space-y-4">
                <div className="flex items-center justify-between py-3 border-b border-base-300">
                  <div className="flex items-center gap-2 text-base-content/70">
                    <Calendar className="w-4 h-4" />
                    <span>Member Since</span>
                  </div>
                  <span className="font-medium">
                    {new Date(authUser.createdAt).toLocaleDateString()}
                  </span>
                </div>
                <div className="flex items-center justify-between py-3">
                  <div className="flex items-center gap-2 text-base-content/70">
                    <ShieldCheck className="w-4 h-4" />
                    <span>Account Status</span>
                  </div>
                  <span className="badge badge-success gap-2">
                    Active
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;