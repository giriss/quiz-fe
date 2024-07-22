import {
  ButtonProps,
  Button as BlueprintButton,
  Classes,
} from "@blueprintjs/core"
import clsx from "clsx"
import { memo, useMemo } from "react"

const Button = memo(
  ({ className, intent, text, children, ...otherProps }: ButtonProps) => {
    const hasNoChild = useMemo(
      () => text === undefined && children === undefined,
      [text === undefined && children === undefined],
    )

    return (
      <BlueprintButton
        {...otherProps}
        className={clsx(Classes.POPOVER_DISMISS, className)}
        intent={intent ?? "primary"}
        text={hasNoChild ? "Confirm" : text}
        // eslint-disable-next-line react/no-children-prop
        children={hasNoChild ? undefined : children}
      />
    )
  },
)

Button.displayName = "AlertPopoverButton"

export default Button
