import React from 'react';

import { Button, ButtonGroup, Heading } from '@chakra-ui/react';
import { Formiz, useForm } from '@formiz/core';
import { useTranslation } from 'react-i18next';
import { useNavigate, useParams } from 'react-router-dom';

import { useToastError, useToastSuccess } from '@/components/Toast';

import { useLanguage, useLanguageUpdate } from './Language.service';
import { LanguageForm } from './LanguageForm';

export const PageLanguageUpdate = () => {
  const { t } = useTranslation(['common', 'language']);
  const { id } = useParams();
  const navigate = useNavigate();
  const { language, isLoading: languageDetailsLoading } = useLanguage(id, {
    refetchOnWindowFocus: false,
    enabled: !!id,
  });
  const form = useForm({ subscribe: false });

  const toastError = useToastError();
  const toastSuccess = useToastSuccess();

  const { mutate: updateLanguage, isLoading: updateLanguageLoading } =
    useLanguageUpdate(id, {
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
          title: t('language:SuccessUpdate'),
        });
        navigate('/admin/settings/language');
      },
    });

  const submitUpdateLanguage = async (values: TODO) => {
    const newLanguage = {
      ...values,
    };
    await updateLanguage(newLanguage);
  };

  return (
    <>
     
    </>
  );
};
