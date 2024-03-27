import React from 'react'
import { FormControl, FormField, FormItem } from '../ui/form'
import { Checkbox } from '../ui/checkbox'

interface FormCheckboxProps {
  control: any
  name: string;
}

const FormCheckbox = ({ control, name }:
  FormCheckboxProps
) => {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md ">
          <FormControl>
            <Checkbox
              checked={field.value}
              onCheckedChange={field.onChange}
            />
          </FormControl>

        </FormItem>
      )}
    />
  )
}

export default FormCheckbox