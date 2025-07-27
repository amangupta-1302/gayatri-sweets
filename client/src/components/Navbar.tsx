import { Menu, Transition } from "@headlessui/react";
import { Fragment, useEffect, useState } from "react";
import {
  UserRound,
  LogIn,
  LogOut,
  ShoppingCart,
  Search,
  UserCircle,
  Package,
} from "lucide-react";
import LoginModal from "../modals/LoginModal";
import SignupModal from "../modals/SignupModal";
import LogoutModal from "../modals/LogoutModal";
import { useNavbarActions } from "../hooks/useNavbarActions";

const Navbar = () => {
  const {
    authUser,
    formModal,
    onLoginClick,
    onLogoutClick,
    onProfileClick,
    actionLoginClose,
    handleLogoutConfirm,
    actionSignupClose,
    switchToLogin,
    switchToSignup,
    closeLogoutModal,
  } = useNavbarActions();

  const [protectedRouteCallback, setProtectedRouteCallback] = useState<
    (() => void) | null
  >(null);

  useEffect(() => {
    const handleOpenLogin = (event: CustomEvent) => {
      onLoginClick();

      //store the callback if provided from protected Route
      if (event.detail?.onClose) {
        setProtectedRouteCallback(() => event.detail.onClose);
      }
    };
    window.addEventListener("openLoginModal", handleOpenLogin as EventListener);
    return () => {
      window.removeEventListener(
        "openLoginModal",
        handleOpenLogin as EventListener
      );
    };
  }, [onLoginClick]);

  const handleLoginClose = () => {
    actionLoginClose();

    if (protectedRouteCallback && !authUser) {
      //dispatchEvent to trigger callback
      window.dispatchEvent(new CustomEvent("loginModalClose"));
      protectedRouteCallback();
      setProtectedRouteCallback(null);
    }
  };

  const handleSignupClose = () => {
    actionSignupClose();

    if (protectedRouteCallback && !authUser) {
      window.dispatchEvent(new CustomEvent("loginModalClose"));
      protectedRouteCallback();
      setProtectedRouteCallback(null);
    }
  };

  return (
    <>
      <nav className="border-b border-border bg-background/95 backdrop-blur supports-[backdrop:filter]:bg-background/60 sticky top-0 z-50">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* LOGO */}
            <div className="flex-shrink-0">
              <div className="text-2xl font-bold text-primary">
                GAYATRI SWEETS
              </div>
            </div>

            {/* SEARCH BAR */}
            <div className="flex-1 max-w-md mx-8">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground size-4" />
                <input
                  type="search"
                  placeholder="Search Traditional Sweets..."
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 pl-10 text-sm ring-offset-background file:border-0 file:text-sm file:bg-transparent file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                />
              </div>
            </div>

            {/* CART AND PROFILE */}
            <div className="flex items-center space-x-4">
              <button className="relative inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-10 w-10">
                <ShoppingCart className="size-5" />
                {/*  todo : ADD dynamic value of cart items */}
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  0
                </span>
              </button>

              {/* USER DROPDOWN */}
              <Menu as="div" className="relative inline-block text-left">
                <div>
                  <Menu.Button className="inline-flex items-center justify-center whitespace-nowrap rounded-full text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-10 w-10">
                    <UserCircle className="size-5" />
                  </Menu.Button>
                </div>
                <Transition
                  as={Fragment}
                  enter="transition ease-out duration-100"
                  enterFrom="transform opacity-0 scale-95"
                  enterTo="transform opacity-100 scale-100"
                  leave="transition ease-in duration-75"
                  leaveFrom="transform opacity-100 scale-100"
                  leaveTo="transform opacity-0 scale-95"
                >
                  <Menu.Items className="absolute right-0 mt-2 w-56 origin-top-right rounded-md border border-border bg-popover p-1 text-popover-foreground shadow-md focus:outline-none z-50">
                    {/* PROFILE */}
                    <Menu.Item>
                      {({ active }: { active: boolean }) => (
                        <button
                          onClick={onProfileClick}
                          className={`${
                            active ? "bg-accent text-accent-foreground" : ""
                          } group flex w-full items-center rounded-sm px-2 py-1.5 text-sm transition-colors`}
                        >
                          <UserRound className="mr-2 size-4" />
                          Profile
                        </button>
                      )}
                    </Menu.Item>
                    {/* MY ORDERS */}
                    <Menu.Item>
                      {({ active }: { active: boolean }) => (
                        <button
                          className={`${
                            active ? "bg-accent text-accent-foreground" : ""
                          } group flex w-full items-center rounded-sm px-2 py-1.5 text-sm transition-colors`}
                        >
                          <Package className="mr-2 size-4" />
                          My Orders
                        </button>
                      )}
                    </Menu.Item>
                    {/* LOGIN/SIGNUP */}
                    {!authUser && (
                      <>
                        <Menu.Item>
                          {({ active }: { active: boolean }) => (
                            <button
                              onClick={onLoginClick}
                              className={`${
                                active ? "bg-accent text-accent-foreground" : ""
                              } group flex w-full items-center rounded-sm px-2 py-1.5 text-sm transition-colors`}
                            >
                              <LogIn className="mr-2 size-4" />
                              Login/SignUp
                            </button>
                          )}
                        </Menu.Item>
                      </>
                    )}
                    <hr className="-mx-1 my-1 h-px bg-muted" />
                    {/* LOGOUT */}
                    {authUser && (
                      <Menu.Item>
                        {({ active }: { active: boolean }) => (
                          <button
                            className={`${
                              active ? "bg-red-50 text-red-700" : "text-red-600"
                            } group flex w-full items-center rounded-sm px-2 py-1.5 text-sm transition-colors hover:bg-red-50 hover:text-red-700`}
                            onClick={onLogoutClick}
                          >
                            <LogOut className="mr-2 h-4 w-4" />
                            Log out
                          </button>
                        )}
                      </Menu.Item>
                    )}
                  </Menu.Items>
                </Transition>
              </Menu>
            </div>
          </div>
        </div>
      </nav>

      {/*  LOGIN MODAL */}
      <LoginModal
        isOpen={formModal.showLoginModal}
        onClose={handleLoginClose}
        onSwitchToSignup={switchToSignup}
      />
      {/* SIGNUP MODAL */}
      <SignupModal
        isOpen={formModal.showSignupModal}
        onClose={handleSignupClose}
        onSwitchToLogin={switchToLogin}
      />
      {/* LOGOUT MODAL */}
      <LogoutModal
        isOpen={formModal.showLogoutModal}
        onClose={closeLogoutModal}
        onConfirm={handleLogoutConfirm}
      />
    </>
  );
};

export default Navbar;
