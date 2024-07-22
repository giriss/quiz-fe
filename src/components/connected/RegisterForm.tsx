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
import { EMAIL_REGEX, PASSWORD_REGEX } from "@/constants"
import { postRegister } from "@/atoms"

const RegisterForm = memo(() => {
  const {
    control,
    handleSubmit,
    formState: { isValid },
  } = useForm({
    mode: "all",
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  })

  const register = useSetAtom(postRegister)

  return (
    <Card elevation={Elevation.THREE}>
      <H1 style={{ marginBottom: "10px" }}>Register</H1>
      <form onSubmit={handleSubmit(register)}>
        <Controller
          control={control}
          name="name"
          rules={{ required: "Full Name can't be blank" }}
          render={({ field: { ref, ...props }, fieldState: { error } }) => (
            <FormGroup
              label="Full Name"
              labelFor="register-name-field"
              intent={error ? "danger" : undefined}
              helperText={error ? error.message : undefined}
            >
              <InputGroup
                {...props}
                id="register-name-field"
                placeholder="Your Name"
                inputRef={ref}
                intent={error ? "danger" : undefined}
              />
            </FormGroup>
          )}
        />
        <Controller
          control={control}
          name="email"
          rules={{
            required: "Email can't be blank",
            pattern: {
              value: EMAIL_REGEX,
              message: "Email address is invalid",
            },
          }}
          render={({ field: { ref, ...props }, fieldState: { error } }) => (
            <FormGroup
              label="Email"
              labelFor="register-email-field"
              intent={error ? "danger" : undefined}
              helperText={error ? error.message : undefined}
            >
              <InputGroup
                {...props}
                id="register-email-field"
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
          rules={{
            required: "Password can't be blank",
            pattern: {
              value: PASSWORD_REGEX,
              message:
                "Password must contain at least an uppercase, a lowercase, a number and a special character",
            },
            minLength: {
              value: 8,
              message: "Password must be at least 8 characters",
            },
          }}
          render={({ field: { ref, ...props }, fieldState: { error } }) => (
            <FormGroup
              label="Password"
              labelFor="register-password-field"
              intent={error ? "danger" : undefined}
              helperText={error ? error.message : undefined}
            >
              <InputGroup
                {...props}
                id="register-password-field"
                placeholder="**********"
                type="password"
                inputRef={ref}
                intent={error ? "danger" : undefined}
              />
            </FormGroup>
          )}
        />
        <Controller
          control={control}
          name="confirmPassword"
          rules={{
            validate: (value, { password }) =>
              value === password ? undefined : "Passwords doesn't match",
          }}
          render={({ field: { ref, ...props }, fieldState: { error } }) => (
            <FormGroup
              label="Confirm Password"
              labelFor="register-confirm-password-field"
              intent={error ? "danger" : undefined}
              helperText={error ? error.message : undefined}
            >
              <InputGroup
                {...props}
                id="register-confirm-password-field"
                placeholder="**********"
                type="password"
                inputRef={ref}
                intent={error ? "danger" : undefined}
              />
            </FormGroup>
          )}
        />
        <Flex justifyEnd>
          <Button intent="primary" type="submit" disabled={!isValid}>
            Register
          </Button>
        </Flex>
      </form>
    </Card>
  )
})

RegisterForm.displayName = "RegisterForm"

export default RegisterForm
