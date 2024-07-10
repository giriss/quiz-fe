import { Button, ButtonProps, Classes, H5, Popover, PopoverProps } from "@blueprintjs/core"
import Flex from "@react-css/flex"
import { cloneElement, forwardRef, memo, ReactElement, ReactNode, useMemo } from "react"
import styled from "styled-components"
import clsx from "clsx"

interface AlertPopoverProps extends Omit<PopoverProps, "content"> {
  title?: ReactNode
  description?: ReactNode
  children: ReactNode
  confirmButton?: ReactElement<Partial<ButtonProps>>
  onConfirm: VoidFunction
}

const AlertContainer = styled.aside`
  padding: 20px;
  min-width: 300px;

  > :not(:last-child) {
    margin-bottom: 15px;
  }

  button + button {
    margin-left: 5px;
  }
`

const AlertPopover = memo(forwardRef<Popover, AlertPopoverProps>(({
  title,
  description,
  children,
  confirmButton,
  onConfirm,
  ...others
}, ref) => {
  const overriddenConfirmButton = useMemo(() => {
    if (confirmButton) {
      const { className, intent, text } = confirmButton.props
      return cloneElement(confirmButton, {
        onClick: onConfirm,
        className: clsx(Classes.POPOVER_DISMISS, className),
        intent: intent ?? "primary",
        text: text ?? "Confirm",
      })
    } else {
      return (
        <Button
          intent="primary"
          className={Classes.POPOVER_DISMISS}
          onClick={onConfirm}
        >
          Confirm
        </Button>
      )
    }
  }, [confirmButton, onConfirm])

  return (
    <Popover
      {...others}
      ref={ref}
      content={
        <AlertContainer>
          {title && <H5>{title}</H5>}
          {description && <div>{description}</div>}
          <Flex justifyEnd>
            <Button minimal className={Classes.POPOVER_DISMISS}>Cancel</Button>
            {overriddenConfirmButton}
          </Flex>
        </AlertContainer>
      }
    >
      {children}
    </Popover>
  )
}))

AlertPopover.displayName = "AlertPopover"

export default AlertPopover
