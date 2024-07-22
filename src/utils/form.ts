/* eslint-disable @typescript-eslint/no-explicit-any */
import { useCallback, useMemo } from "react"
import {
  type FieldPath,
  type FieldValues,
  type RefCallBack,
  type RegisterOptions,
  type UseFormProps,
  type UseFormRegisterReturn,
  type UseFormReturn,
  useForm,
} from "react-hook-form"

export type NewUseFormRegister<TFieldValues extends FieldValues> = <
  TFieldName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>(
  name: TFieldName,
  options?: RegisterOptions<TFieldValues, TFieldName>,
) => Omit<UseFormRegisterReturn<TFieldName>, "ref"> & {
  inputRef: RefCallBack
}

export type NewUseFormReturn<
  TFieldValues extends FieldValues = FieldValues,
  TContext = any,
  TTransformedValues extends FieldValues | undefined = undefined,
> = Omit<
  UseFormReturn<TFieldValues, TContext, TTransformedValues>,
  "register"
> & {
  register: NewUseFormRegister<TFieldValues>
}

export function useBlueprintForm<
  TFieldValues extends FieldValues = FieldValues,
  TContext = any,
  TTransformedValues extends FieldValues | undefined = undefined,
>(
  props?: UseFormProps<TFieldValues, TContext>,
): NewUseFormReturn<TFieldValues, TContext, TTransformedValues> {
  const fns = useForm<TFieldValues, TContext, TTransformedValues>(props)
  const newRegister: NewUseFormRegister<TFieldValues> = useCallback(
    (name, options) => {
      const { ref, ...otherProps } = fns.register(name, options)
      return {
        ...otherProps,
        inputRef: ref,
      }
    },
    [fns.register],
  )

  const modifiedFns = useMemo(
    () => ({
      ...fns,
      register: newRegister,
    }),
    [fns],
  )

  return modifiedFns
}
