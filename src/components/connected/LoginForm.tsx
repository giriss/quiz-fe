import { memo } from "react"
import {
  Button,
  Card,
  Elevation,
  FormGroup,
  H1,
  InputGroup,
} from "@blueprintjs/core"
import Flex from "@react-css/flex"
import { Controller, useForm } from "react-hook-form"
import { useSetAtom } from "jotai"
import { postLogin } from "@/atoms"
import PasswordInputGroup from "../base/PasswordInputGroup"

const LoginForm = memo(() => {
  const {
    control,
    handleSubmit,
    formState: { isValid },
  } = useForm({
    mode: "all",
    defaultValues: {
      identifier: "",
      password: "",
    },
  })

  const login = useSetAtom(postLogin)

  return (
    <Card elevation={Elevation.THREE}>
      <H1 style={{ marginBottom: "10px" }}>Login</H1>
      <form onSubmit={handleSubmit(login)}>
        <Controller
          control={control}
          name="identifier"
          rules={{
            required: "Email / Username can't be blank",
          }}
          render={({
            field: { ref, ...otherProps },
            fieldState: { error },
          }) => (
            <FormGroup
              label="Email / Username"
              labelFor="login-email-field"
              intent={error ? "danger" : undefined}
              helperText={error ? error.message : undefined}
            >
              <InputGroup
                {...otherProps}
                id="login-email-field"
                placeholder="someone@example.com"
                inputRef={ref}
                intent={error ? "danger" : undefined}
              />
            </FormGroup>
          )}
        />
        <Controller
          control={control}
          name="password"
          rules={{ required: "Password can't be empty" }}
          render={({
            field: { ref, ...otherProps },
            fieldState: { error },
          }) => (
            <FormGroup
              label="Password"
              labelFor="login-password-field"
              intent={error ? "danger" : undefined}
              helperText={error ? error.message : undefined}
            >
              <PasswordInputGroup
                {...otherProps}
                id="login-password-field"
                placeholder="**********"
                inputRef={ref}
                intent={error ? "danger" : undefined}
              />
            </FormGroup>
          )}
        />
        <Flex justifyEnd>
          <Button intent="primary" type="submit" disabled={!isValid}>
            Login
          </Button>
        </Flex>
      </form>
    </Card>
  )
})

LoginForm.displayName = "LoginForm"

export default LoginForm
