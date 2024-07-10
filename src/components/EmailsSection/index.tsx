import { type FC, memo } from "react"
import { Button, Section, SectionCard, CardList, Card, Tag, ButtonGroup, Tooltip } from "@blueprintjs/core"
import styled from "styled-components"
import { EmailResponse } from "@/api"
import { AlertPopover } from "@/components"
import AddEmailPopover from "./AddEmailPopover"

const EmailCard = styled(Card)`
  justify-content: space-between;
`

interface EmailsSectionProps {
  emails: EmailResponse[]
  onEmailAdd: (email: string) => void
  onEmailDelete: (id: string) => void
  onEmailPrimary: (id: string) => void
}

const EmailsSection: FC<EmailsSectionProps> = memo(({ emails, onEmailAdd, onEmailDelete, onEmailPrimary }) => (
  <Section title="Emails" rightElement={<AddEmailPopover onAdd={onEmailAdd} />}>
    <SectionCard padded={false}>
      <CardList bordered={false}>
        {emails.map(({ id, address, primary, verified }) => (
          <EmailCard key={id}>
            <div>
              <span>{address}</span>
              {primary && <>
                {' '}
                <Tag minimal intent="primary">Primary</Tag>
              </>}
              {!verified && <>
                {' '}
                <Tag minimal intent="danger">Unverified</Tag>
              </>}
            </div>
            {!primary && (
              <ButtonGroup minimal>
                {verified && (
                  <Tooltip content="Make primary" intent="primary" placement="left">
                    <Button icon="endorsed" intent="primary" onClick={() => onEmailPrimary(id)} />
                  </Tooltip>
                )}
                <AlertPopover
                  placement="bottom"
                  title="Confirm deletion"
                  description={<>Are you sure to delete <strong>{address}</strong>?</>}
                  confirmButton={
                    <Button intent="danger" text="Delete" />
                  }
                  onConfirm={() => onEmailDelete(id)}
                >
                  <Tooltip content="Delete" intent="danger" placement="right">
                    <Button icon="trash" intent="danger" />
                  </Tooltip>
                </AlertPopover>
              </ButtonGroup>
            )}
          </EmailCard>
        ))}
      </CardList>
    </SectionCard>
  </Section>
))

EmailsSection.displayName = "EmailsSection"

export default EmailsSection
