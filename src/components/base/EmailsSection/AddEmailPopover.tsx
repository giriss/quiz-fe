import { Button, InputGroup, Popover } from "@blueprintjs/core"
import {
  type ChangeEventHandler,
  type KeyboardEventHandler,
  useCallback,
  useMemo,
  useRef,
  useState,
  memo,
} from "react"
import { EMAIL_REGEX } from "@/constants"
import { AlertPopover, AlertPopoverButton } from "@/components/base"

interface AddPopoverProps {
  readonly onAdd: (email: string) => void
}

const AddEmailPopover = memo(({ onAdd }: AddPopoverProps) => {
  const [newEmail, setNewEmail] = useState("")
  const newEmailValid = useMemo(() => EMAIL_REGEX.test(newEmail), [newEmail])
  const newEmailRef = useRef<HTMLInputElement>(null)
  const popoverRef = useRef<Popover>(null)
  const handleAddEmail = useCallback(() => {
    onAdd(newEmail)
    popoverRef.current?.setState(state => ({ ...state, isOpen: false }))
  }, [newEmail, onAdd])

  const handlePopoverOpen = useCallback(() => {
    newEmailRef.current?.focus()
  }, [])

  const handlePopoverOpening = useCallback(() => {
    setNewEmail("")
  }, [])

  const handleNewEmail: ChangeEventHandler<HTMLInputElement> = useCallback(
    event => {
      setNewEmail(event.currentTarget.value)
    },
    [],
  )

  const handleEnterKey: KeyboardEventHandler<HTMLInputElement> = useCallback(
    ({ code }) => {
      if (code === "Enter" && newEmailValid) {
        handleAddEmail()
      }
    },
    [handleAddEmail, newEmailValid],
  )

  return (
    <AlertPopover
      ref={popoverRef}
      title="Add email address"
      confirmButton={
        <AlertPopoverButton text="Add" disabled={!newEmailValid} />
      }
      description={
        <InputGroup
          inputRef={newEmailRef}
          placeholder="someone@example.com"
          value={newEmail}
          onChange={handleNewEmail}
          onKeyDown={handleEnterKey}
        />
      }
      onConfirm={handleAddEmail}
      onOpened={handlePopoverOpen}
      onOpening={handlePopoverOpening}
    >
      <Button minimal icon="add" intent="primary" text="Add" />
    </AlertPopover>
  )
})

AddEmailPopover.displayName = "AddEmailPopover"

export default AddEmailPopover
