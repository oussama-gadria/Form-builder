import { Button, Flex, Stack } from '@chakra-ui/react';
import { Formiz, useForm } from '@formiz/core';
import { useTranslation } from 'react-i18next';

import { FieldBooleanCheckbox } from '@/components/FieldBooleanCheckbox';
import { FieldInput } from '@/components/FieldInput';
import { FieldSelect } from '@/components/FieldSelect';

import { useFormBuilderContext } from '../FormBuilderContext';
import { FieldSelector } from '../fieldSelector';
import { FieldPropsSelector } from './FieldPropsSelector';
import { useState } from 'react';

export const FieldEditor = () => {
  let lastId = parseInt(localStorage.getItem('lastId') || '0', 10);
  const { inputs, updateInputs } = useFormBuilderContext();
  const [invalidForm, setInvalidForm] = useState(false);
  const { t } = useTranslation(['formBuilder']);
  const form = useForm();

  const fieldMappings: { [key: string]: { label: string; icon: string } } = {
    FieldInput: { label: t('formBuilder:Input'), icon: 'icon-input' },
    FieldSelect: { label: t('formBuilder:Select'), icon: 'icon-select' },
    FieldCheckboxes: {
      label: t('formBuilder:Checkboxes'),
      icon: 'icon-checkboxes',
    },
    FieldImage64bit: { label: t('formBuilder:Image'), icon: 'icon-image' },
    FieldRadios: { label: t('formBuilder:RadioButtons'), icon: 'icon-radio' },
    FieldTextarea: { label: t('formBuilder:Textarea'), icon: 'icon-textarea' },
    FieldDayPicker: { label: t('formBuilder:DatePicker'), icon: 'icon-date' },
    FieldEditor: { label: t('formBuilder:TextEditor'), icon: 'icon-editor' },
    FieldVideo: { label: t('formBuilder:Video'), icon: 'icon-editor' },
  };

  const {
    values: { type, options },
  } = form;

  const componentOptions = Object.keys(FieldSelector).map((key) => ({
    label: fieldMappings[key]?.label,
    value: key,
  }));

  const addNewField = (values: TODO) => {
    updateInputs([...inputs, values]);
  };

  const submitCreateDefaultInput = async (values: TODO) => {
    if(isOptionsValid()){
      const maxInputOrder = inputs.reduce((maxOrder, input) => {
        return input.inputOrder > maxOrder ? input.inputOrder : maxOrder;
      }, 0);
      lastId++;
      localStorage.setItem('lastId', lastId.toString());
      const newDefaultInput = {
        id: lastId,
        inputName: values.name,
        inputType: values.type,
        label: values.label,
        display: values.display,
        principalImage: values.principalImage,
        helper: values.helper,
        inputOrder: maxInputOrder + 1,
        options: values.options,
        inputValue: null,
        ...values,
      };
      addNewField(newDefaultInput);
      setInvalidForm(false);
      form.reset();
    }else{
      setInvalidForm(true);
    }

  };

  const isOptionsValid = () => {
    return (
      ((type == 'FieldSelect' ||
        type == 'FieldRadios' ||
        type == 'FieldCheckboxes') &&
        options &&
        options.length > 0) ||
      ((type == 'FieldInput' ||
        type == 'FieldVideo' ||
        type == 'FieldEditor' ||
        type == 'FieldDayPicker' ||
        type == 'FieldTextarea' ||
        type == 'FieldImage64bit') &&
        !options)
    );
  };

  return (
    <Flex
      minW={{ base: 'full', md: '25%' }}
      p="4"
      borderRadius={6}
      bg="gray.50"
      boxShadow="md"
    >
      <Formiz connect={form} onValidSubmit={submitCreateDefaultInput}>
        <form noValidate onSubmit={form.submit} >
          <Stack spacing="2" alignItems="flex-start">
            <FieldSelect
              label={t('formBuilder:Components')}
              selectProps={{ size: 'sm' }}
              name="type"
              options={componentOptions}
              required
              defaultValue={'FieldInput'}
            />
            <FieldInput
              size="sm"
              name="name"
              label={t('formBuilder:Name')}
              required
            />
            <FieldInput
              size="sm"
              name="label"
              label={t('formBuilder:Label')}
              required
            />
            <FieldBooleanCheckbox
              name="display"
              label={t('formBuilder:Display')}
              helper={t('formBuilder:HelperDisplay')}
            />
            <FieldInput
              size="sm"
              name="helper"
              label={t('formBuilder:Helper')}
              helper={t('formBuilder:HelperMessage')}
            />
            {!!type && <FieldPropsSelector type={type} />}
            {invalidForm && !isOptionsValid() && (
              <span style={{ color: 'red' }}>
                {t('formBuilder:selectorErrorMessage')}
              </span>
            )}
            <Button type="submit" variant="@primary">
              {t('formBuilder:Add')}
            </Button>
          </Stack>
        </form>
      </Formiz>
    </Flex>
  );
};
