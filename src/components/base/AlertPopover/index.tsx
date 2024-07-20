/* eslint-disable react/no-unused-prop-types */
import { ButtonProps, H5, Popover, PopoverProps } from "@blueprintjs/core"
import Flex from "@react-css/flex"
import { cloneElement, forwardRef, memo, ReactElement, ReactNode, useMemo } from "react"
import styled from "styled-components"
import Button from "./Button"

interface AlertPopoverProps extends Omit<PopoverProps, "content"> {
  readonly title?: ReactNode
  readonly description?: ReactNode
  readonly children: ReactNode
  readonly confirmButton?: ReactElement<Partial<ButtonProps>>
  readonly onConfirm: VoidFunction
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
  const boundConfirmButton = useMemo(() => {
    return confirmButton ? (
      cloneElement(confirmButton, { onClick: onConfirm })
    ) : (
      <Button onClick={onConfirm} />
    )
  }, [confirmButton, onConfirm])

  return (
    <Popover
      {...others}
      ref={ref}
      content={
        <AlertContainer>
          {!!title && <H5>{title}</H5>}
          {!!description && <div>{description}</div>}
          <Flex justifyEnd>
            <Button minimal intent="none">Cancel</Button>
            {boundConfirmButton}
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
export { default as AlertPopoverButton } from "./Button"
