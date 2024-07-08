import { memo, type FC } from "react";
import { useSetAtom } from "jotai";
import styled from "styled-components";
import { Outlet } from "react-router-dom";
import { useAccount } from "@/utils";
import { UserNavbar } from "@/components";
import { logout } from "@/atoms";

const MainContent = styled.main`
  max-width: 880px;
  margin: 15px auto 0 auto;
`

const Dashboard: FC = memo(() => {
  const account = useAccount()
  const handleLogout = useSetAtom(logout)

  return !account ? null : (
    <>
      <UserNavbar name={account.name} onLogout={handleLogout} />
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