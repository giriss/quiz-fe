import { AnchorButton, Menu, MenuItem, Navbar, Popover } from "@blueprintjs/core";
import { memo, type FC } from "react";

export interface UserNavbarProps {
  name: string
  onLogout: VoidFunction
}

const UserNavbar: FC<UserNavbarProps> = memo(({ name, onLogout }) => (
  <Navbar>
    <Navbar.Group align="left">
      <Navbar.Heading>Quiz</Navbar.Heading>
      <Navbar.Divider />
      <AnchorButton minimal>Home</AnchorButton>
    </Navbar.Group>
    <Navbar.Group align="right">
      <Popover
        placement="bottom-end"
        content={
          <Menu>
            <MenuItem icon="id-number" text="My Profile" />
            <MenuItem icon="log-out" text="Log Out" onClick={onLogout} />
          </Menu>
        }
      >
        <AnchorButton minimal icon="user">{name}</AnchorButton>
      </Popover>
    </Navbar.Group>
  </Navbar>
))

UserNavbar.displayName = "UserNavbar"

export default UserNavbar
