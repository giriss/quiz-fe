import {
  AnchorButton,
  Classes,
  Menu,
  MenuItem,
  Navbar,
  Popover,
} from "@blueprintjs/core"
import clsx from "clsx"
import { memo } from "react"

export interface UserNavbarProps {
  readonly name: string
  readonly loading?: boolean
  readonly onMyProfile?: VoidFunction
  readonly onLogout?: VoidFunction
}

const UserNavbar = memo(
  ({ name, loading = false, onMyProfile, onLogout }: UserNavbarProps) => (
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
              <MenuItem
                icon="id-number"
                text="My Profile"
                onClick={onMyProfile}
              />
              <MenuItem icon="log-out" text="Log Out" onClick={onLogout} />
            </Menu>
          }
        >
          <AnchorButton
            minimal
            className={clsx({ [Classes.SKELETON]: loading })}
            icon="user"
          >
            {name}
          </AnchorButton>
        </Popover>
      </Navbar.Group>
    </Navbar>
  ),
)

UserNavbar.displayName = "UserNavbar"

export default UserNavbar
