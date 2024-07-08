import { type FC, memo } from "react";
import { H1 } from "@blueprintjs/core";
import { useAccount } from "@/utils";

const Home: FC = memo(() => {
  const account = useAccount()

  return !account ? null : (
    <H1>
      Hello {account.name}
    </H1>
  )
})

Home.displayName = "DashboardHome"

export default Home
