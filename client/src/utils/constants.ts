export const customModalContent = (pathname: string) => {
  switch (pathname) {
    case "/profile":
      return {
        title: "Login to Access Your Profile",
        message:
          "Sign in to manage your profile , addresses and account settings",
      };
    default:
      return {
        title: "Login required",
        message: "Please sign in to continue",
      };
  }
};
