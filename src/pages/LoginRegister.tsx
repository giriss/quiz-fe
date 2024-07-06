import { type FC, memo } from "react";
import { Divider } from "@blueprintjs/core";
import Flex from "@react-css/flex";
import { LoginForm, RegisterForm } from "@/components";
import { useAuth } from "@/utils";

const LoginRegister: FC = memo(() => {
  useAuth(true)

  return (
    <Flex column justifyCenter as="main" style={{ height: "100vh" }}>
      <Flex justifyContent="space-evenly">
        <Flex.Item style={{ width: "35vw" }}>
          <LoginForm />
        </Flex.Item>
        <Divider />
        <Flex.Item style={{ width: "35vw" }}>
          <RegisterForm />
        </Flex.Item>
      </Flex>
    </Flex>
  )
})

LoginRegister.displayName = "LoginRegister"

export default LoginRegister
