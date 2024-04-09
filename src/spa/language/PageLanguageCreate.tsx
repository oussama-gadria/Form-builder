import React from 'react';

import { Button, ButtonGroup, Heading, Stack } from '@chakra-ui/react';
import { Formiz, useForm } from '@formiz/core';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import { useToastError, useToastSuccess } from '@/components/Toast';

import { useLanguageCreate } from './Language.service';
import { LanguageForm } from './LanguageForm';

export const PageLanguageCreate = () => {
  const { t } = useTranslation(['common', 'language']);
  const navigate = useNavigate();
  const form = useForm({ subscribe: false });

  const toastError = useToastError();
  const toastSuccess = useToastSuccess();

  const { mutate: createLanguage, isLoading: createLanguageLoading } =
    useLanguageCreate({
      onError: (error) => {
        if (error.response) {
          toastError({
            title:
              (error?.response?.data as string) ||
              t('common:use.errorOccurred'),
          });
        }
      },
      onSuccess: () => {
        toastSuccess({
          title: t('language:SuccessAdd'),
        });
        navigate('/admin/settings/language');
      },
    });

  const submitCreateLanguage = async (values: TODO) => {
    const newLanguage = {
      ...values,
    };
    await createLanguage(newLanguage);
  };

  return (
    <>
     
    </>
  );
};
