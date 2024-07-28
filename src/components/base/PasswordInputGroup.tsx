import { Button, InputGroup, type InputGroupProps } from "@blueprintjs/core"
import { forwardRef, type LegacyRef, memo, useCallback, useState } from "react"

type PasswordInputGroupProps = Omit<InputGroupProps, "type" | "rightElement">

const PasswordInputGroup = memo(
  forwardRef(function (
    props: PasswordInputGroupProps,
    ref: LegacyRef<InputGroup>,
  ) {
    const [showPassword, setShowPassword] = useState(false)

    const toggleShowPassword = useCallback(
      () => setShowPassword(prev => !prev),
      [],
    )

    return (
      <InputGroup
        {...props}
        ref={ref}
        type={showPassword ? "text" : "password"}
        rightElement={
          <Button
            minimal
            icon={showPassword ? "eye-open" : "eye-off"}
            onClick={toggleShowPassword}
          />
        }
      />
    )
  }),
)

PasswordInputGroup.displayName = "PasswordInputGroup"

export default PasswordInputGroup
