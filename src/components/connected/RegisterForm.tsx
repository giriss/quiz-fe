import { FormEventHandler, memo, useCallback, useEffect } from "react"
import {
  Button,
  Card,
  Elevation,
  H1,
  InputGroup,
  Spinner,
} from "@blueprintjs/core"
import Flex from "@react-css/flex"
import { useForm } from "react-hook-form"
import { useAtomValue, useSetAtom } from "jotai"
import { EMAIL_REGEX, PASSWORD_REGEX } from "@/constants"
import {
  checkUsernameAvailability,
  postRegister,
  usernameSearchTerm,
} from "@/atoms"
import { useDebounce } from "@/utils"
import PasswordInputGroup from "../base/PasswordInputGroup"
import { ControlledFormGroup } from "../base"

const RegisterForm = memo(() => {
  const {
    control,
    handleSubmit,
    formState: {
      isValid,
      errors: { username: usernameError },
      dirtyFields: { username: usernameDirty },
      validatingFields: { username: usernameValidating },
    },
    watch,
  } = useForm({
    mode: "all",
    defaultValues: {
      username: "",
      name: "",
      email: "",
      password: "",
    },
  })

  const username = watch("username")
  const setUsernameSearchTerm = useSetAtom(usernameSearchTerm)
  const usernameAvailability = useAtomValue(checkUsernameAvailability)
  const [delayedUsername, setUsername] = useDebounce<string | undefined>(
    undefined,
    1_000,
  )

  useEffect(() => {
    if (
      usernameAvailability.state === "hasData" &&
      usernameAvailability.data?.username === username
    ) {
      return
    }
    setUsername(
      !usernameError && !!usernameDirty && !usernameValidating
        ? username
        : undefined,
    )
  }, [username, usernameError, usernameDirty, usernameValidating])

  useEffect(() => setUsernameSearchTerm(delayedUsername), [delayedUsername])

  const usernameAvailable =
    usernameAvailability.state === "hasData" &&
    usernameAvailability.data?.username === username &&
    usernameAvailability.data.available
  const usernameUnavailable =
    usernameAvailability.state === "hasData" &&
    usernameAvailability.data?.username === username &&
    !usernameAvailability.data.available
  const usernameChecking = usernameAvailability.state === "loading"

  const register = useSetAtom(postRegister)
  const handleRegister: FormEventHandler<HTMLFormElement> = useCallback(
    event => (usernameAvailable ? handleSubmit(register)(event) : undefined),
    [usernameAvailable, handleSubmit, register],
  )

  return (
    <Card elevation={Elevation.THREE}>
      <H1 style={{ marginBottom: "10px" }}>Register</H1>
      <form onSubmit={handleRegister}>
        <ControlledFormGroup
          label="Username"
          control={control}
          name="username"
          rules={{
            required: "Username can't be blank",
            pattern: {
              value: /^(?=.*[a-z])[a-z0-9_.-]{3,25}$/,
              message:
                "Username must be 3-25 characters and contain at least one letter",
            },
          }}
        >
          {props => (
            <InputGroup
              {...props}
              placeholder="_your.user-name_"
              rightElement={
                usernameChecking ? (
                  <Spinner size={16} />
                ) : usernameAvailable ? (
                  <Button disabled minimal icon="tick" intent="success" />
                ) : usernameUnavailable ? (
                  <Button disabled minimal icon="cross" intent="danger" />
                ) : undefined
              }
            />
          )}
        </ControlledFormGroup>
        <ControlledFormGroup
          label="Full Name"
          control={control}
          name="name"
          rules={{ required: "Full Name can't be blank" }}
        >
          {props => <InputGroup {...props} placeholder="Your Name" />}
        </ControlledFormGroup>
        <ControlledFormGroup
          label="Email"
          control={control}
          name="email"
          rules={{
            required: "Email can't be blank",
            pattern: {
              value: EMAIL_REGEX,
              message: "Email address is invalid",
            },
          }}
        >
          {props => <InputGroup {...props} placeholder="someone@example.com" />}
        </ControlledFormGroup>
        <ControlledFormGroup
          label="Password"
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
        >
          {props => <PasswordInputGroup {...props} placeholder="**********" />}
        </ControlledFormGroup>
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
