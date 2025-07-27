import { Toaster } from "react-hot-toast";
import PromoBanner from "./utils/PromoBanner";
import AppRoutes from "./routes/AppRoutes";
import Navbar from "./components/Navbar";

function App() {
  return (
    <>
      <PromoBanner />
      <Navbar />
      <AppRoutes />
      <Toaster />
    </>
  );
}

export default App;
