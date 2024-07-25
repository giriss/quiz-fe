import { logout } from "@/atoms"
import { Classes, Menu, MenuItem } from "@blueprintjs/core"
import { useSetAtom } from "jotai"
import { memo, useCallback } from "react"
import { useNavigate } from "react-router-dom"
import styled from "styled-components"

const UserMenuBase = styled(Menu)`
  height: 100vh;
  border-radius: 0;
  display: flex;
  flex-direction: column;

  li:last-of-type {
    flex: 1;
    align-content: end;
  }

  a {
    padding-left: 20px;
    padding-right: 90px;
  }
`

const UserMenu = memo(() => {
  const navigate = useNavigate()

  const handleHome = useCallback(() => navigate("/dashboard"), [])
  const handleSearch = useCallback(() => {}, [])
  const handleMyProfile = useCallback(() => navigate("/dashboard/profile"), [])
  const handleLogOut = useSetAtom(logout)

  return (
    <UserMenuBase large className={Classes.ELEVATION_2}>
      <MenuItem icon="home" text="Home" onClick={handleHome} />
      <MenuItem icon="search" text="Search" onClick={handleSearch} />
      <MenuItem icon="settings" text="My Profile" onClick={handleMyProfile} />
      <MenuItem icon="log-out" text="Log Out" onClick={handleLogOut} />
    </UserMenuBase>
  )
})

UserMenu.displayName = "UserMenu"

export default UserMenu
