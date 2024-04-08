import { Button, Flex, Stack } from '@chakra-ui/react';
import { Formiz, useForm } from '@formiz/core';
import { useTranslation } from 'react-i18next';

import { FieldBooleanCheckbox } from '@/components/FieldBooleanCheckbox';
import { FieldInput } from '@/components/FieldInput';
import { FieldSelect } from '@/components/FieldSelect';

import { useFormBuilderContext } from '../FormBuilderContext';
import { FieldSelector } from '../fieldSelector';
import { FieldPropsSelector } from './FieldPropsSelector';

export const FieldEditor = () => {
  let lastId = parseInt(localStorage.getItem('lastId') || '0', 10);
  const { inputs, updateInputs } = useFormBuilderContext();
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

  const { values: { type } } = form;

  const componentOptions = Object.keys(FieldSelector).map((key) => ({
    label: fieldMappings[key]?.label,
    value: key,
  }));

  const addNewField = (values: TODO) => {
    updateInputs([...inputs, values]);
  };

  const submitCreateDefaultInput = async (values: TODO) => {
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
    form.reset();
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
            {(type == 'FieldImage64bit' || type == 'FieldVideo') && (
              <FieldBooleanCheckbox
                name="principalImage"
                label={t('formBuilder:Image')}
                helper={t('formBuilder:HelperImage')}
              />
            )}
            <FieldInput
              size="sm"
              name="helper"
              label={t('formBuilder:Helper')}
              helper={t('formBuilder:HelperMessage')}
            />
            {!!type && <FieldPropsSelector type={type} />}
            <Button type="submit" variant="@primary">
              {t('formBuilder:Add')}
            </Button>
          </Stack>
        </form>
      </Formiz>
    </Flex>
  );
};
