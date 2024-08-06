import { FormGroup, InputGroupProps } from "@blueprintjs/core"
import { nanoid } from "nanoid"
import { ReactElement } from "react"
import {
  Controller,
  ControllerProps,
  ControllerRenderProps,
  FieldPath,
  FieldValues,
  UseControllerProps,
} from "react-hook-form"

type Render<
  A extends FieldValues = FieldValues,
  B extends FieldPath<A> = FieldPath<A>,
> = Omit<ControllerRenderProps<A, B>, "ref"> & {
  id: string
  inputRef: ControllerRenderProps<A, B>["ref"]
  intent: InputGroupProps["intent"]
}

type ControlledFormGroupProps<
  A extends FieldValues = FieldValues,
  B extends FieldPath<A> = FieldPath<A>,
> = Omit<ControllerProps<A, B>, "render"> & {
  readonly label: string
  readonly children: (props: Render<A, B>) => ReactElement
} & UseControllerProps<A, B>

function ControlledFormGroup<
  A extends FieldValues = FieldValues,
  B extends FieldPath<A> = FieldPath<A>,
>({ label, children, ...props }: ControlledFormGroupProps<A, B>) {
  const id = nanoid()

  return (
    <Controller
      {...props}
      render={({ field: { ref, ...otherProps }, fieldState: { error } }) => (
        <FormGroup
          label={label}
          labelFor={id}
          intent={error ? "danger" : undefined}
          helperText={error ? error.message : undefined}
        >
          {children({
            id,
            inputRef: ref,
            intent: error ? "danger" : undefined,
            ...otherProps,
          })}
        </FormGroup>
      )}
    />
  )
}

ControlledFormGroup.displayName = "ControlledFormGroup"

export default ControlledFormGroup
