import { memo, useCallback, useEffect, useMemo } from "react"
import { useAtom, useSetAtom } from "jotai"
import { createEmail, getEmails, makePrimaryEmail, removeEmail } from "@/atoms"
import { EmailsSection } from "../base"

const ProfileEmails = memo(() => {
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
    const verifiedEmails = emails.filter(
      ({ primary, verified }) => !primary && verified,
    )
    return [
      primaryEmail,
      ...verifiedEmails,
      ...emails.filter(
        email => [primaryEmail, ...verifiedEmails].indexOf(email) < 0,
      ),
    ]
  }, [emails])

  return !orderedEmails ? null : (
    <EmailsSection
      emails={orderedEmails}
      onEmailAdd={handleEmailAdd}
      onEmailDelete={handleEmailDelete}
      onEmailPrimary={handleEmailPrimary}
    />
  )
})

ProfileEmails.displayName = "ProfileEmails"

export default ProfileEmails
