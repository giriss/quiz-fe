import { memo } from "react"
import styled from "styled-components"
import { Outlet } from "react-router-dom"
import Flex from "@react-css/flex"
import UserMenu from "@/components/connected/UserMenu"

const MainContent = styled.main`
  flex: 1;
  max-width: 75vw;
  margin: 15px auto 0 auto;
`

const Dashboard = memo(() => {
  return (
    <Flex>
      <UserMenu />
      <MainContent>
        <Outlet />
      </MainContent>
    </Flex>
  )
})

Dashboard.displayName = "Dashboard"

export default Dashboard
export { default as DashboardHome } from "./Home"
export { default as DashboardProfile } from "./Profile"
