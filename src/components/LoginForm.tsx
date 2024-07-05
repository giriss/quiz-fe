import { memo, type FC } from "react"
import { Button, FormGroup, H1, InputGroup } from "@blueprintjs/core"
import Flex from "@react-css/flex"
import { Controller, useForm } from "react-hook-form"
import { useSetAtom } from "jotai"
import { EMAIL_REGEX } from "@/constants"
import { postLogin } from "@/atoms"

const LoginForm: FC = memo(() => {
  const { control, handleSubmit, formState: { isValid } } = useForm({
    mode: "all",
    defaultValues: {
      email: "",
      password: "",
    },
  })

  const login = useSetAtom(postLogin)

  return (
    <>
      <H1 style={{ marginBottom: "10px" }}>Login</H1>
      <form onSubmit={handleSubmit(login)}>
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
          render={({ field: { ref, ...otherProps }, fieldState: { error } }) => (
            <FormGroup
              label="Email"
              labelFor="login-email-field"
              intent={error ? "danger" : undefined}
              helperText={error ? error.message : undefined}
            >
              <InputGroup
                {...otherProps}
                id="login-email-field"
                placeholder="someone@example.com"
                ref={undefined}
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
          render={({ field: { ref, ...otherProps }, fieldState: { error } }) => (
            <FormGroup
              label="Password"
              labelFor="login-password-field"
              intent={error ? "danger" : undefined}
              helperText={error ? error.message : undefined}
            >
              <InputGroup
                {...otherProps}
                id="login-password-field"
                placeholder="**********"
                type="password"
                ref={undefined}
                inputRef={ref}
                intent={error ? "danger" : undefined}
              />
            </FormGroup>
          )}
        />
        <Flex justifyEnd>
          <Button intent="primary" type="submit" disabled={!isValid}>Login</Button>
        </Flex>
      </form>
    </>
  )
})

LoginForm.displayName = "LoginForm"

export default LoginForm
