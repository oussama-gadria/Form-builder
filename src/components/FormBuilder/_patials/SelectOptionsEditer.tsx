import { FC, useEffect, useState } from 'react';

import { Button, Stack } from '@chakra-ui/react';
import { Formiz, useForm } from '@formiz/core';
import { SetFieldsValuesOptions } from '@formiz/core/dist/types/form.types';

import { FieldInput } from '@/components/FieldInput';

type SelectOptionsEditerProps = {
  updateForm: (
    objectOfValues: {
      [key: string]: TODO;
    },
    options?: SetFieldsValuesOptions | undefined
  ) => void;
  optionsFormValues?: { label: string; value: string }[];
};

export const SelectOptionsEditer: FC<SelectOptionsEditerProps> = ({
  updateForm,
  optionsFormValues,
}) => {
  const [options, setOptions] = useState<{ label: string; value: string }[]>(
    optionsFormValues || []
  );

  useEffect(() => {
    setOptions(optionsFormValues || []);
  }, [optionsFormValues]);

  const addOptionForm = useForm();
  const { values } = addOptionForm;

  const onAddOption = () => {
    updateForm({ options: [...options, values] });
    setOptions([...options, values]);
    addOptionForm.reset();
  };

  return (
    <Formiz
      connect={addOptionForm}
      id="FormOfOptions"
      autoForm
      onValidSubmit={onAddOption}
    >
      <Stack spacing="2" alignItems="flex-start">
        <Stack spacing="2">
          <FieldInput size="sm" name="label" label="Label" required />
          <FieldInput size="sm" name="value" label="Value" required />
        </Stack>

        <Button
          onClick={(e) => {
            e.preventDefault();
            !!addOptionForm.isValid && onAddOption();
          }}
          type="submit"
        >
          Add
        </Button>
      </Stack>
    </Formiz>
  );
};
