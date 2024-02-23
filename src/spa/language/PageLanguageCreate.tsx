import React from 'react';

import { Button, ButtonGroup, Heading, Stack } from '@chakra-ui/react';
import { Formiz, useForm } from '@formiz/core';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import { useToastError, useToastSuccess } from '@/components/Toast';
import { Page, PageContent, PageTopBar } from '@/spa/layout';

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
    <Page containerSize="md">
      <PageContent>
        <PageTopBar showBack onBack={() => navigate(-1)}>
          <Heading size="md">{t('language:AddLanguage')}</Heading>
        </PageTopBar>
        <Formiz
          id="create-user-form"
          onValidSubmit={submitCreateLanguage}
          connect={form}
        >
          <form noValidate onSubmit={form.submit}>
            <LanguageForm />
            <Stack>
              <ButtonGroup
                mt={4}
                p={4}
                bg={'white'}
                _dark={{ bg: 'blackAlpha.400' }}
                justifyContent="space-between"
              >
                <Button onClick={() => navigate(-1)}>
                  {t('common:actions.cancel')}
                </Button>
                <Button
                  type="submit"
                  variant="@primary"
                  isLoading={createLanguageLoading}
                >
                  {t('language:Add')}
                </Button>
              </ButtonGroup>
            </Stack>
          </form>
        </Formiz>
      </PageContent>
    </Page>
  );
};
