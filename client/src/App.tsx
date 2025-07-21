import { Toaster } from "react-hot-toast"
import { PromoBanner } from "./components/PromotionalBanner"
import { Navbar } from "./components/Navbar"
import AppRoutes from "./routes/Approutes"

function App() {
  return (
    <>
      <PromoBanner/>
      <Navbar />
      <AppRoutes/>
      <Toaster/>
    </>
  )
}

export default App

