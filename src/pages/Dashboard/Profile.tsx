import { type FC, useEffect, memo, useCallback, useMemo } from "react"
import { useAtom, useSetAtom } from "jotai"
import Flex from "@react-css/flex"
import { createEmail, getEmails, makePrimaryEmail, removeEmail } from "@/atoms"
import { EmailsSection } from "@/components"

const Profile: FC = memo(() => {
  const [emails, fetchEmails] = useAtom(getEmails)
  const postEmail = useSetAtom(createEmail)
  const deleteEmail = useSetAtom(removeEmail)
  const primaryEmail = useSetAtom(makePrimaryEmail)
  const handleEmailDelete = useCallback(deleteEmail, [])
  const handleEmailPrimary = useCallback(primaryEmail, [])
  const handleEmailAdd = useCallback((address: string) => {
    postEmail({ address })
  }, [])

  useEffect(() => {
    if (!emails) {
      fetchEmails()
    }
  }, [emails])

  const orderedEmails = useMemo(() => {
    if (!emails) {
      return undefined
    }
    const primaryEmail = emails.find(({ primary }) => primary)!
    const verifiedEmails = emails.filter(({ primary, verified }) => !primary && verified)
    return [
      primaryEmail,
      ...verifiedEmails,
      ...emails.filter(email => [primaryEmail, ...verifiedEmails].indexOf(email) < 0)
    ]
  }, [emails])

  return !orderedEmails ? null : (
    <Flex row>
      <Flex.Item flex={1}>
        <EmailsSection
          emails={orderedEmails}
          onEmailAdd={handleEmailAdd}
          onEmailDelete={handleEmailDelete}
          onEmailPrimary={handleEmailPrimary}
        />
      </Flex.Item>
      <Flex.Item flex={1}>
        <div />
      </Flex.Item>
    </Flex>
  )
})

Profile.displayName = "DashboardProfile"

export default Profile
