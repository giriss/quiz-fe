import { ButtonProps, Button as BlueprintButton, Classes } from "@blueprintjs/core";
import clsx from "clsx";
import { FC, memo, useMemo } from "react";

const Button: FC<ButtonProps> = memo(
  ({ className, intent, text, children, ...otherProps }) => {
    const hasNoChild = useMemo(
      () => text === undefined && children === undefined,
      [text === undefined && children === undefined]
    )

    return (
      <BlueprintButton
        {...otherProps}
        className={clsx(Classes.POPOVER_DISMISS, className)}
        intent={intent ?? "primary"}
        text={hasNoChild ? "Confirm" : text}
        children={hasNoChild ? undefined : children}
      />
    )
  }
)

Button.displayName = "AlertPopoverButton"

export default Button
