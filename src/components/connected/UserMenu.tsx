import { Classes, Menu, MenuItem } from "@blueprintjs/core"
import { useSetAtom } from "jotai"
import { memo, useCallback, useState } from "react"
import { useNavigate, useLocation } from "react-router-dom"
import styled from "styled-components"
import { logout } from "@/atoms"
import UserAvatar from "./UserAvatar"
import SearchDrawer from "./SearchDrawer"

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
  const { pathname } = useLocation()
  const [searchActive, setSearchActive] = useState(false)

  const handleHome = useCallback(() => navigate("/dashboard"), [])
  const handleMyProfile = useCallback(() => navigate("/dashboard/profile"), [])
  const handleLogOut = useSetAtom(logout)
  const handleSearch = useCallback(() => setSearchActive(true), [])
  const handleDrawerClose = useCallback(() => setSearchActive(false), [])

  return (
    <UserMenuBase large className={Classes.ELEVATION_2}>
      <MenuItem
        active={pathname === "/dashboard"}
        icon="home"
        text="Home"
        onClick={handleHome}
      />
      <MenuItem icon="search" text="Search" onClick={handleSearch} />
      <MenuItem
        active={pathname === "/dashboard/profile"}
        text="My Profile"
        icon={<UserAvatar $size="16px" />}
        onClick={handleMyProfile}
      />
      <MenuItem icon="log-out" text="Log Out" onClick={handleLogOut} />
      <SearchDrawer isOpen={searchActive} onClose={handleDrawerClose} />
    </UserMenuBase>
  )
})

UserMenu.displayName = "UserMenu"

export default UserMenu
