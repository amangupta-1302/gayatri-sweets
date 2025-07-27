import React, { useState } from "react";
import ModalPopup from "../components/ModalPopup";
import { type IAuthModalProps } from "../utils/types/auth";
import toast from "react-hot-toast";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/16/solid";
import { Loader2, Lock } from "lucide-react";
import { useAuthStore } from "../store/authStore";

const PasswordUpdateModal: React.FC<IAuthModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [formData, setFormData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const { isUpdatingPassword, updatePassword } = useAuthStore();

  const [showPasswords, setShowPasswords] = useState({
    currentPass: false,
    newPass: false,
    confirmPass: false,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.newPassword !== formData.confirmPassword) {
      toast.error("Password don't match");
    }
    if (formData.newPassword.length < 6) {
      toast.error("Password must be at least 6 characters");
    }
    try {
      await updatePassword({
        currentPassword: formData.currentPassword,
        newPassword: formData.newPassword,
      });
      toast.success("Password updated successfully");
      onClose();
    } catch (err) {
      toast.error("Failed to update password");
    }
  };

  const resetform = () => {
    setFormData({ confirmPassword: "", newPassword: "", currentPassword: "" });
    setShowPasswords({
      currentPass: false,
      newPass: false,
      confirmPass: false,
    });
  };

  const handleClose = () => {
    resetform();
    onClose();
  };

  return (
    <ModalPopup
      isOpen={isOpen}
      onClose={handleClose}
      title="Change Password"
      size="md"
    >
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* CURRENT PASSWORD */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-foreground flex items-center gap-2">
            Current Password
            <Lock className="size-4 text-gray-500" />
          </label>
          <div className="relative">
            <input
              type={showPasswords.currentPass ? "text" : "password"}
              value={
                showPasswords.currentPass
                  ? "Protected for security reasons!"
                  : "••••••••••••••••"
              }
              readOnly
              disabled
              className="flex h-10 w-full rounded-md border border-gray-200 bg-gray-50 px-3 py-2 pr-10 text-sm text-gray-600 cursor-not-allowed"
            />
            <button
              type="button"
              onClick={() => {
                setShowPasswords((prev) => ({
                  ...prev,
                  currentPass: !prev.currentPass,
                }));
              }}
              className="absolute inset-y-0 right-0 flex items-center justify-center w-10 text-gray-500 hover:text-gray-700 transition-colors"
            >
              {showPasswords.currentPass ? (
                <EyeSlashIcon className="size-4" />
              ) : (
                <EyeIcon className="size-4" />
              )}
            </button>
          </div>
        </div>
        {/* NEW PASSWORD */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-foreground">
            New Password
          </label>
          <div className="relative">
            <input
              type={showPasswords.newPass ? "text" : "password"}
              value={formData.newPassword}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  newPassword: e.target.value,
                }))
              }
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 pr-10 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              placeholder="Enter new password"
              required
              disabled={isUpdatingPassword}
            />
            <button
              type="button"
              onClick={() =>
                setShowPasswords((prev) => ({
                  ...prev,
                  newPass: !prev.newPass,
                }))
              }
              disabled={isUpdatingPassword}
              className="absolute inset-y-0 right-0 flex items-center justify-center w-10 text-muted-foreground hover:text-foreground disabled:opacity-50 transition-colors"
            >
              {showPasswords.currentPass ? (
                <EyeSlashIcon className="size-4" />
              ) : (
                <EyeIcon className="size-4" />
              )}
            </button>
          </div>
        </div>
        {/* CONFIRM PASSWORD */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-foreground">
            Confirm New Password
          </label>
          <div className="relative">
            <input
              type={showPasswords.confirmPass ? "text" : "password"}
              value={formData.confirmPassword}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  confirmPassword: e.target.value,
                }))
              }
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 pr-10 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              placeholder="Confirm new password"
              required
              disabled={isUpdatingPassword}
            />
            <button
              type="button"
              onClick={() =>
                setShowPasswords((prev) => ({
                  ...prev,
                  confirmPass: !prev.confirmPass,
                }))
              }
              disabled={isUpdatingPassword}
              className="absolute inset-y-0 right-0 flex items-center justify-center w-10 text-muted-foreground hover:text-foreground disabled:opacity-50 transition-colors"
            >
              {showPasswords.currentPass ? (
                <EyeSlashIcon className="size-4" />
              ) : (
                <EyeIcon className="size-4" />
              )}
            </button>
          </div>
          {formData.confirmPassword && formData.newPassword && (
            <p
              className={`text-xs ${
                formData.newPassword === formData.confirmPassword
                  ? "text-green-600"
                  : "text-red-600"
              }`}
            >
              {formData.newPassword === formData.confirmPassword
                ? "✓ Passwords match"
                : "✗ Passwords do not match"}
            </p>
          )}
        </div>
        {/* SUBMIT BUTTON */}
        <div className="flex space-x-3 pt-4">
          <button
            type="button"
            onClick={handleClose}
            disabled={isUpdatingPassword}
            className="flex-1 bg-gray-200 text-gray-800 font-medium py-2 px-4 rounded hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed transition"
          >
            Cancel
          </button>

          <button
            type="submit"
            disabled={
              isUpdatingPassword ||
              !formData.newPassword ||
              !formData.confirmPassword ||
              !formData.newPassword !== !formData.confirmPassword
            }
            className="flex-1 bg-yellow-600 text-white font-medium py-2 px-4 rounded hover:bg-yellow-700 disabled:opacity-50 disabled:cursor-not-allowed transition flex items-center justify-center gap-2"
          >
            {isUpdatingPassword && <Loader2 className="size-4 animate-spin" />}
            {isUpdatingPassword ? "Updating..." : "Update Password"}
          </button>
        </div>
      </form>
    </ModalPopup>
  );
};

export default PasswordUpdateModal;
