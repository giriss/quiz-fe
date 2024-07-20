import { memo, useCallback } from "react";
import { useSetAtom } from "jotai";
import styled from "styled-components";
import { Outlet, useNavigate } from "react-router-dom";
import { useAccount } from "@/utils";
import { UserNavbar } from "@/components/base";
import { logout } from "@/atoms";

const MainContent = styled.main`
  max-width: 75vw;
  margin: 15px auto 0 auto;
`

const Dashboard = memo(() => {
  const account = useAccount()
  const handleLogout = useSetAtom(logout)
  const navigate = useNavigate()
  const handleMyProfile = useCallback(() => {
    navigate("/dashboard/profile")
  }, [navigate])

  return !account ? null : (
    <>
      <UserNavbar name={account.name} onMyProfile={handleMyProfile} onLogout={handleLogout} />
      <MainContent>
        <Outlet />
      </MainContent>
    </>
  )
})

Dashboard.displayName = "Dashboard"

export default Dashboard
export { default as DashboardHome } from "./Home"
export { default as DashboardProfile } from "./Profile"
