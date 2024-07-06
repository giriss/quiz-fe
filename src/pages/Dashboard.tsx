import { H1 } from "@blueprintjs/core";
import { memo, type FC } from "react";
import { useSetAtom } from "jotai";
import { useAccount } from "@/utils";
import { UserNavbar } from "@/components";
import { logout } from "@/atoms";

const Dashboard: FC = memo(() => {
  const account = useAccount()
  const handleLogout = useSetAtom(logout)

  return !account ? null : (
    <>
      <UserNavbar name={account.name} onLogout={handleLogout} />
      <H1>Hello {account.name}</H1>
    </>
  )
})

Dashboard.displayName = "Dashboard"

export default Dashboard
