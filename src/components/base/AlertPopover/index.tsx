import { ButtonProps, Classes, H5, Popover, PopoverProps } from "@blueprintjs/core"
import Flex from "@react-css/flex"
import { forwardRef, memo, ReactElement, ReactNode } from "react"
import styled from "styled-components"
import Button from "./Button"

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
}, ref) => (
    <Popover
      {...others}
      ref={ref}
      content={
        <AlertContainer>
          {title && <H5>{title}</H5>}
          {description && <div>{description}</div>}
          <Flex justifyEnd>
            <Button minimal intent="none">Cancel</Button>
            {confirmButton ?? <Button />}
          </Flex>
        </AlertContainer>
      }
    >
      {children}
    </Popover>
  )
))

AlertPopover.displayName = "AlertPopover"

export default AlertPopover
export { default as AlertPopoverButton } from "./Button"
