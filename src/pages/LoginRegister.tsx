import { type FC, memo } from "react";
import { Divider } from "@blueprintjs/core";
import Flex from "@react-css/flex";
import { LoginForm, RegisterForm } from "@/components";
import { useAuth } from "@/utils";
import styled from "styled-components";

const FullHeightFlex = styled(Flex)`
  min-height: 100vh;
`

const LoginRegister: FC = memo(() => {
  useAuth(true)

  return (
    <FullHeightFlex column justifyCenter>
      <Flex justifyContent="space-evenly">
        <Flex.Item style={{ width: "35vw" }}>
          <LoginForm />
        </Flex.Item>
        <Divider />
        <Flex.Item style={{ width: "35vw" }}>
          <RegisterForm />
        </Flex.Item>
      </Flex>
    </FullHeightFlex>
  )
})

LoginRegister.displayName = "LoginRegister"

export default LoginRegister
