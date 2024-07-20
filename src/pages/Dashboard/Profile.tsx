import { memo } from "react"
import Flex from "@react-css/flex"
import { ProfileEmails, ProfileImage } from "@/components/connected"
import styled from "styled-components"

const SpacedFlexItem = styled(Flex.Item)`
  margin-right: 15px;

  &:last-child {
    margin-right: 0;
  }
`

const Profile = memo(() => {
  return (
    <Flex row>
      <SpacedFlexItem flex={1}>
        <ProfileImage />
      </SpacedFlexItem>
      <SpacedFlexItem flex={1}>
        <ProfileEmails />
      </SpacedFlexItem>
    </Flex>
  )
})

Profile.displayName = "DashboardProfile"

export default Profile
