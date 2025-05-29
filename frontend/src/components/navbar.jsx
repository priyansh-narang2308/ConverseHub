import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";
import { LogOut, MessageSquare, Settings, User } from "lucide-react";

const Navbar = () => {
  const { logout, authUser } = useAuthStore();
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const handleLogout = () => {
    logout();
    setShowLogoutModal(false);
  };

  return (
    <>
      {showLogoutModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className="modal modal-open">
            <div className="modal-box max-w-md">
              <h3 className="text-lg font-bold flex items-center gap-2">
                <LogOut className="w-5 h-5 text-error" />
                Confirm Logout
              </h3>
              <p className="py-4">Are you sure you want to sign out of your account?</p>
              <div className="modal-action">
                <button
                  className="btn btn-ghost"
                  onClick={() => setShowLogoutModal(false)}
                >
                  Cancel
                </button>
                <button
                  className="btn btn-error text-white"
                  onClick={handleLogout}
                >
                  <LogOut className="w-4 h-4" />
                  Logout
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Navbar */}
      <header className="bg-base-100/80 border-b border-base-200 fixed w-full top-0 z-40 backdrop-blur-md">
        <div className="container mx-auto px-4 h-16">
          <div className="flex items-center justify-between h-full">
            <div className="flex items-center gap-8">
              <Link
                to="/"
                className="flex items-center gap-2.5 group transition-all cursor-pointer"
              >
                <div className="size-9 rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center shadow-md group-hover:shadow-lg transition-shadow">
                  <MessageSquare className="w-5 h-5 text-white" />
                </div>
                <h1 className="text-xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                  ConverseHub
                </h1>
              </Link>
            </div>

            {/* Navigation Links */}
            <div className="flex items-center gap-2">
              {authUser && (
                <>
                  <Link
                    to="/settings"
                    className="btn btn-sm btn-ghost gap-2 hover:bg-base-200 transition-colors"
                  >
                    <Settings className="w-4 h-4 text-base-content/80" />
                    <span className="hidden sm:inline">Settings</span>
                  </Link>

                  <Link
                    to="/profile"
                    className="btn btn-sm btn-ghost gap-2 hover:bg-base-200 transition-colors"
                  >
                    <User className="w-4 h-4 text-base-content/80" />
                    <span className="hidden sm:inline">Profile</span>
                  </Link>

                  <button
                    onClick={() => setShowLogoutModal(true)}
                    className="btn btn-sm btn-ghost gap-2 hover:bg-error/10 hover:text-error transition-colors"
                  >
                    <LogOut className="w-4 h-4" />
                    <span className="hidden sm:inline">Logout</span>
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export default Navbar;