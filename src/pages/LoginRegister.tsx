import { FC } from "react";
import { Divider } from "@blueprintjs/core";
import Flex from "@react-css/flex";
import { LoginForm, RegisterForm } from "@/components";
import { useAuth } from "@/utils";

const LoginRegister: FC = () => {
  useAuth(true)

  return (
    <Flex as="main" column justifyCenter style={{ height: "100vh" }}>
      <Flex justifyContent="space-evenly">
        <Flex.Item style={{ width: "30vw" }}>
          <LoginForm />
        </Flex.Item>
        <Divider />
        <Flex.Item style={{ width: "30vw" }}>
          <RegisterForm />
        </Flex.Item>
      </Flex>
    </Flex>
  )
}

export default LoginRegister
