import React from 'react';

import { Stack } from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';

import { FieldImage64bit } from '@/components/FieldImage64bit';
import { FieldInput } from '@/components/FieldInput';

export const LanguageForm = () => {
  const { t } = useTranslation(['common', 'language']);

  return (
    <Stack
      direction="column"
      borderRadius="lg"
      spacing="6"
      shadow="md"
      bg="white"
      _dark={{ bg: 'gray.900' }}
      p="6"
    >
      <FieldInput
        name="name"
        required={t('common:use.required')}
        label={t('language:Form.Name')}
      />
      <FieldInput
        name="code"
        required={t('common:use.required')}
        label={t('language:Form.Code')}
      />
      <FieldImage64bit
        name={'flag'}
        label={t('language:Form.Flag')}
        required={t('common:use.required')}
      />
    </Stack>
  );
};
