import { useStore } from '@tanstack/react-form'

import { Field, FieldError, FieldLabel } from '../ui/field'
import { Input } from '../ui/input'

import { useFieldContext } from '@/context/form-context'

export type TextFieldProps = {
  label?: string
  id: string
  name: string
  placeholder?: string
  type?: 'text' | 'password'
}

export function TextField(props: TextFieldProps) {
  const field = useFieldContext<string>()
  const errors = useStore(field.store, (state) => state.meta.errors)

  return (
    <Field>
      {props.label && <FieldLabel htmlFor={props.id}>{props.label}</FieldLabel>}
      <Input
        id={props.id}
        name={field.name}
        type={props.type ?? 'text'}
        placeholder={props.placeholder}
        value={field.state.value}
        onBlur={field.handleBlur}
        onChange={(e) => field.handleChange(e.target.value)}
        aria-invalid={!field.state.meta.isValid}
      />
      {field.state.meta.isTouched && <FieldError errors={errors} />}
    </Field>
  )
}
