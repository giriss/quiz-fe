import { memo } from "react"
import { Route, Routes } from "react-router-dom"
import {
  LoginRegister,
  Dashboard,
  DashboardHome,
  DashboardProfile,
} from "@/pages"

const App = memo(() => (
  <Routes>
    <Route path="/" element={<LoginRegister />} />
    <Route path="/dashboard" element={<Dashboard />}>
      <Route path="/dashboard" element={<DashboardHome />} />
      <Route path="/dashboard/profile" element={<DashboardProfile />} />
    </Route>
  </Routes>
))

App.displayName = "App"

export default App
