import { memo } from "react"
import { Classes, H1 } from "@blueprintjs/core"
import clsx from "clsx"
import { useAccount } from "@/utils"

const Home = memo(() => {
  const account = useAccount()

  return (
    <H1 className={clsx({ [Classes.SKELETON]: account == null })}>
      Hello {account?.name ?? "Fake Name"}
    </H1>
  )
})

Home.displayName = "DashboardHome"

export default Home
