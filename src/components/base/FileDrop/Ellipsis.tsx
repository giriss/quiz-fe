import { memo, useEffect, useState } from "react"

interface EllipsisProps {
  readonly delay?: number
}

const Ellipsis = memo(({ delay = 1_000 }: EllipsisProps) => {
  const [count, setCount] = useState(0)

  useEffect(() => {
    const timer = setTimeout(() => {
      setCount(count + 1 > 2 ? 0 : count + 1)
    }, delay)

    return () => {
      clearTimeout(timer)
    }
  }, [count, delay])

  return <>.{".".repeat(count)}</>
})

Ellipsis.displayName = "Ellipsis"

export default Ellipsis
