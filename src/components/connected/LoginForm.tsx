import { memo } from "react"
import { Button, Card, Elevation, H1, InputGroup } from "@blueprintjs/core"
import Flex from "@react-css/flex"
import { useForm } from "react-hook-form"
import { useSetAtom } from "jotai"
import { postLogin } from "@/atoms"
import PasswordInputGroup from "../base/PasswordInputGroup"
import { ControlledFormGroup } from "../base"

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
        <ControlledFormGroup
          control={control}
          label="Email / Username"
          name="identifier"
          rules={{
            required: "Email / Username can't be blank",
          }}
        >
          {props => <InputGroup {...props} placeholder="someone@example.com" />}
        </ControlledFormGroup>
        <ControlledFormGroup
          control={control}
          name="password"
          label="Password"
          rules={{ required: "Password can't be empty" }}
        >
          {props => <PasswordInputGroup {...props} placeholder="**********" />}
        </ControlledFormGroup>
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
