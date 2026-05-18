import { createFormHook } from '@tanstack/react-form';

import { TextField } from '@/components/forms/text-field';

import { fieldContext, formContext } from '@/utils/context/form-context';

export const { useAppForm } = createFormHook({
  fieldComponents: {
    TextField,
  },
  formComponents: {},
  fieldContext,
  formContext,
});
