import { useAuthStore } from "../store/authStore";
import { useState } from "react";
import { Lock, Mail, MapPin, Phone, UserCircle } from "lucide-react";
import PasswordUpdateModal from "../modals/PasswordUpdateModal";
import AddressManager from "../components/AddressManager/AddressManager";

const ProfilePage = () => {
  const { authUser } = useAuthStore();
  const [showPasswordModal, setshowPasswordModal] = useState(false);

  if (!authUser) return null;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* HEADER SECTION */}
      <div className="bg-white border-b border-gray-200 shadow-sm">
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-center text-gray-900">
            My Profile
          </h1>
          <p className="text-center text-gray-600 mt-2">
            Manage your account settings and preferences
          </p>
        </div>
      </div>

      {/* USER INFO CARD */}
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="space-y-8">
          {/* USER DETAILS SECTION */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
            {/* SECTION HEADER */}
            <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
              <h2 className="text-xl font-semibold text-gray-900 flex items-center gap-2">
                <UserCircle className="size-5 text-yellow-600" />
                Personal Information
              </h2>
            </div>

            {/* USER INFO CONTENT */}
            <div className="p-6">
              <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
                {/* AVATAR */}
                <div className="relative">
                  <div className="size-24 sm:size-28 rounded-full bg-yellow-600 flex items-center justify-center text-3xl sm:text-4xl font-bold text-white shadow-lg">
                    {authUser.name?.charAt(0).toUpperCase()}
                  </div>
                  <div className="absolute -bottom-1 -right-1 size-8 bg-green-500 rounded-full border-4 border-white flex items-center justify-center">
                    <span className="text-white text-xs">✓</span>
                  </div>
                </div>

                {/* USER DETAILS */}
                <div className="flex-1 text-center sm:text-left space-y-4">
                  <div>
                    <h3 className="text-2xl sm:text-3xl font-semibold text-gray-900">
                      {authUser.name}
                    </h3>
                    <div className="inline-flex items-center py-1 px-3 rounded-full text-sm font-medium bg-yellow-100 text-yellow-800 mt-2">
                      {authUser.role === "admin" ? "👑 Admin" : "🛍️ Customer"}
                    </div>
                  </div>

                  <div className="space-y-3">
                    {authUser.email && (
                      <div className="flex items-center justify-center sm:justify-start gap-3 p-3 bg-gray-50 rounded-lg">
                        <Mail className="size-5 text-gray-500" />
                        <span className="text-gray-700 font-medium">
                          {authUser.email}
                        </span>
                      </div>
                    )}

                    <div className="flex items-center justify-center sm:justify-start gap-3 p-3 bg-gray-50 rounded-lg">
                      <Phone className="size-5 text-gray-500" />
                      <span className="text-gray-700 font-medium">
                        {authUser.phone}
                      </span>
                    </div>

                    {/* UPDATE PASSWORD BUTTON */}
                    <button
                      onClick={() => setshowPasswordModal(true)}
                      className="flex items-center gap-2 bg-yellow-600 text-white px-4 py-2 sm:px-6 sm:py-3 rounded-lg hover:bg-yellow-700 font-medium transition-colors w-full sm:w-auto justify-center"
                    >
                      <Lock size={4} />
                      Change Password
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* ADDRESS SECTION */}

            <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
              {/* SECTION HEADER */}
              <div className="px-6 py-4 borde-b border-gray-200 bg-gray-50">
                <h2 className="text-xl font-semibold text-gray-900 flex items-center gap-2">
                  <MapPin className="size-5 text-yellow-600" />
                  Delivery Addresses
                </h2>
                <p className="text-sm text-gray-600 mt-1">
                  Manage your saved delivery addresses
                </p>
              </div>
              {/* ADDRESS CONTENT */}
              <div className="p-6">
                <AddressManager />
              </div>
            </div>
          </div>
        </div>
        {/* PASSWORD UPDATE MODAL */}
        {showPasswordModal && (
          <PasswordUpdateModal
            isOpen={showPasswordModal}
            onClose={() => setshowPasswordModal(false)}
          />
        )}
      </div>
    </div>
  );
};

export default ProfilePage;
