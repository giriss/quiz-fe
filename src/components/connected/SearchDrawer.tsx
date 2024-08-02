import {
  Button,
  Classes,
  Drawer,
  DrawerProps,
  DrawerSize,
  InputGroup,
  NonIdealState,
  Tooltip,
} from "@blueprintjs/core"
import { useAtomValue, useSetAtom } from "jotai"
import {
  type ChangeEventHandler,
  memo,
  useCallback,
  useEffect,
  useRef,
} from "react"
import styled from "styled-components"
import { useDebounce } from "@/utils"
import { accountSearchTerm, searchAccounts } from "@/atoms"
import AccountTile from "./AccountTile"

type SearchDrawerProps = Omit<
  DrawerProps,
  "title" | "position" | "size" | "onOpened"
>

const SearchDrawer = memo(({ isOpen, ...props }: SearchDrawerProps) => {
  const searchInputRef = useRef<HTMLInputElement>(null)
  const handleOpening = useCallback(() => {
    searchInputRef.current?.focus()
  }, [])

  const [delayedCriteria, setCriteria, criteria, setCriteriaWithoutDebounce] =
    useDebounce("", 1_000)
  const setSearchTerm = useSetAtom(accountSearchTerm)
  const handleSearch = useCallback<ChangeEventHandler<HTMLInputElement>>(
    event => setCriteria(event.target.value),
    [],
  )

  const foundAccounts = useAtomValue(searchAccounts)

  const clearSearchTerm = useCallback(() => {
    setSearchTerm("")
    setCriteriaWithoutDebounce("")
  }, [])

  useEffect(() => {
    if (!isOpen) {
      clearSearchTerm()
    }
  }, [isOpen, clearSearchTerm])

  useEffect(() => {
    setSearchTerm(delayedCriteria.length > 2 ? delayedCriteria : "")
  }, [delayedCriteria])

  return (
    <Drawer
      {...props}
      isOpen={isOpen}
      position="left"
      size={DrawerSize.SMALL}
      onOpening={handleOpening}
    >
      <DrawerBody>
        <InputGroup
          placeholder="Search..."
          inputRef={searchInputRef}
          value={criteria}
          rightElement={
            criteria === "" ? undefined : (
              <Tooltip content="Clear search" position="bottom-right">
                <Button minimal icon="cross" onClick={clearSearchTerm} />
              </Tooltip>
            )
          }
          onChange={handleSearch}
        />
        {foundAccounts.state === "loading" && (
          <SearchContainer>
            {[0, 1, 2, 3, 4].map(key => (
              <AccountTile
                loading
                key={key}
                id="fake"
                username="_a.fake-username_"
              />
            ))}
          </SearchContainer>
        )}
        {foundAccounts.state === "hasData" &&
          !!foundAccounts.data &&
          foundAccounts.data.length > 0 && (
            <SearchContainer>
              {foundAccounts.data.map(account => (
                <AccountTile key={account.id} {...account} />
              ))}
            </SearchContainer>
          )}
        {foundAccounts.state === "hasData" &&
          foundAccounts.data?.length === 0 && (
            <NonIdealState
              icon="warning-sign"
              title="No results"
              description="Try another search term"
            />
          )}
        {foundAccounts.state === "hasData" && !foundAccounts.data && (
          <NonIdealState
            icon="search"
            title="Start typing to search"
            description="Type at least 3 characters to search"
          />
        )}
      </DrawerBody>
    </Drawer>
  )
})

SearchDrawer.displayName = "SearchDrawer"

export default SearchDrawer

const DrawerBody = styled.aside.attrs({ className: Classes.DRAWER_BODY })`
  padding: 10px;
  display: flex;
  flex-direction: column;
`

const SearchContainer = styled.aside`
  padding: 5px 0;
`
