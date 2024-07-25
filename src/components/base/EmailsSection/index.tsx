import { ComponentPropsWithoutRef, memo, useMemo } from "react"
import {
  Button,
  Section,
  SectionCard,
  CardList,
  Card,
  Tag,
  ButtonGroup,
  Tooltip,
  Classes,
} from "@blueprintjs/core"
import styled from "styled-components"
import clsx from "clsx"
import { DateTime } from "luxon"
import { EmailResponse } from "@/api"
import { AlertPopover, AlertPopoverButton } from "@/components/base"
import AddEmailPopover from "./AddEmailPopover"

const EmailCard = styled(Card)`
  justify-content: space-between;
`

interface EmailsSectionProps extends ComponentPropsWithoutRef<typeof Section> {
  readonly emails?: EmailResponse[]
  readonly onEmailAdd: (email: string) => void
  readonly onEmailDelete: (email: string) => void
  readonly onEmailPrimary: (email: string) => void
}

const EmailsSection = memo(
  ({
    emails,
    onEmailAdd,
    onEmailDelete,
    onEmailPrimary,
    ...sectionProps
  }: EmailsSectionProps) => {
    const loading = useMemo(() => emails == null, [emails])
    const emailsWithPlaceholder = useMemo<EmailResponse[]>(
      () =>
        emails
          ? emails
          : [
              {
                address: "test@example.com",
                createdAt: DateTime.now(),
                primary: true,
                verified: true,
              },
            ],
      [emails],
    )

    return (
      <Section
        {...sectionProps}
        rightElement={
          <AddEmailPopover
            className={clsx({ [Classes.SKELETON]: loading })}
            onAdd={onEmailAdd}
          />
        }
        title={
          <span className={clsx({ [Classes.SKELETON]: loading })}>Emails</span>
        }
      >
        <SectionCard padded={false}>
          <CardList bordered={false}>
            {emailsWithPlaceholder.map(({ address, primary, verified }) => (
              <EmailCard key={address}>
                <div>
                  <span className={clsx({ [Classes.SKELETON]: loading })}>
                    {address}
                  </span>
                  {!!primary && (
                    <>
                      {" "}
                      <Tag
                        minimal
                        intent="primary"
                        className={clsx({ [Classes.SKELETON]: loading })}
                      >
                        Primary
                      </Tag>
                    </>
                  )}
                  {!verified && (
                    <>
                      {" "}
                      <Tag minimal intent="danger">
                        Unverified
                      </Tag>
                    </>
                  )}
                </div>
                {!primary && (
                  <ButtonGroup minimal>
                    {!!verified && (
                      <Tooltip
                        content="Make primary"
                        intent="primary"
                        placement="left"
                      >
                        <Button
                          icon="endorsed"
                          intent="primary"
                          onClick={() => onEmailPrimary(address)}
                        />
                      </Tooltip>
                    )}
                    <AlertPopover
                      placement="bottom"
                      title="Confirm deletion"
                      description={
                        <>
                          Are you sure to delete <strong>{address}</strong>?
                        </>
                      }
                      confirmButton={
                        <AlertPopoverButton intent="danger" text="Delete" />
                      }
                      onConfirm={() => onEmailDelete(address)}
                    >
                      <Tooltip
                        content="Delete"
                        intent="danger"
                        placement="right"
                      >
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
    )
  },
)

EmailsSection.displayName = "EmailsSection"

export default EmailsSection
