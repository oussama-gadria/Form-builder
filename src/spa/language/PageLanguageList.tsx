import React, { useEffect, useState } from 'react';

import {
  Center,
  HStack,
  Heading,
  LinkBox,
  LinkOverlay,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  MenuProps,
  Portal,
  Spinner,
} from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';
import { FiCheckCircle, FiPlus, FiTrash2 } from 'react-icons/fi';
import { Link, useNavigate } from 'react-router-dom';

import { ActionsButton } from '@/components/ActionsButton';
import { ConfirmMenuItem } from '@/components/ConfirmMenuItem';
import {
  DataList,
  DataListCell,
  DataListFooter,
  DataListHeader,
  DataListRow,
} from '@/components/DataList';
import { Icon } from '@/components/Icons';
import {
  Pagination,
  PaginationButtonFirstPage,
  PaginationButtonLastPage,
  PaginationButtonNextPage,
  PaginationButtonPrevPage,
  PaginationInfo,
} from '@/components/Pagination';
import { ResponsiveIconButton } from '@/components/ResponsiveIconButton';
import { useToastError, useToastSuccess } from '@/components/Toast';

import { Page, PageContent, PageTopBar } from '../layout';
import { useLanguageList, useLanguageRemove } from './Language.service';
import { Language } from './Language.type';

type LanguageActionProps = Omit<MenuProps, 'children'> & {
  lang: Language;
};

const LanguageActions = ({ lang, ...rest }: LanguageActionProps) => {
  const { t } = useTranslation(['common', 'language']);
  const toastSuccess = useToastSuccess();
  const toastError = useToastError();

  // const deactivateUser = () => userUpdate({ ...user, activated: false });

  const { mutate: LanguageRemove, ...LanguageRemoveData } = useLanguageRemove(
    lang.id,
    {
      onSuccess: () => {
        toastSuccess({
          title: t('language:SuccessDelete'),
        });
      },
      onError: () => {
        toastError({
          title: t('common:use.errorOccurred'),
        });
      },
    }
  );
  const removeLanguage = () => LanguageRemove(lang);
  const isRemovalLoading = LanguageRemoveData.isLoading;

  return (
    <Menu isLazy placement="left-start" {...rest}>
      <MenuButton as={ActionsButton} isLoading={isRemovalLoading} />
      <Portal>
        <MenuList>
          <MenuItem
            as={Link}
            to={`/admin/settings/language/update/${lang.id}`}
            icon={<Icon icon={FiCheckCircle} fontSize="lg" color="gray.400" />}
          >
            {t('common:actions.edit')}
          </MenuItem>

          <MenuDivider />
          <ConfirmMenuItem
            icon={<Icon icon={FiTrash2} fontSize="lg" color="gray.400" />}
            onClick={removeLanguage}
          >
            {t('common:actions.delete')}
          </ConfirmMenuItem>
        </MenuList>
      </Portal>
    </Menu>
  );
};

export const PageLanguageList = () => {
  const [page, setPage] = useState(1);
  const {
    LanguageList,
    isLoading: isLanguageLoading,
    refetch,
  } = useLanguageList({ page });
  useEffect(() => {
    refetch();
  }, [page, refetch]);
  const navigate = useNavigate();
  const { t } = useTranslation(['language']);

  return (
    <Page containerSize="xl">
      <PageContent>
        <PageTopBar mb="4" w="full" showBack onBack={() => navigate(-1)}>
          <HStack justifyContent="space-between" zIndex="99">
            <Heading size="md">{t('language:LanguageManagement')}</Heading>
          </HStack>
        </PageTopBar>
        <HStack mb="4" justifyContent={'flex-end'}>
          <ResponsiveIconButton
            icon={<FiPlus />}
            as={Link}
            to={'/admin/settings/language/create'}
          >
            {t('language:AddLanguage') as string}
          </ResponsiveIconButton>
        </HStack>
        {isLanguageLoading && (
          <Center>
            <Spinner size="xl" color="blue" />
          </Center>
        )}
        {!isLanguageLoading && (
          <DataList overflowY="scroll" flexWrap="wrap">
            <DataListHeader>
              <DataListCell colName="number">
                {t('language:Number')}
              </DataListCell>
              <DataListCell colName="name">{t('language:Name')}</DataListCell>
              <DataListCell mr={2} colName="codeLangue">
                {t('language:Code')}
              </DataListCell>
              <DataListCell
                colName="actions"
                colWidth="4rem"
                align="flex-end"
              />
            </DataListHeader>
            {LanguageList?.data.length === 0 && (
              <DataListRow bg={'white'} _dark={{ bg: 'blackAlpha.400' }}>
                <DataListCell
                  alignItems={'stretch'}
                  textAlign={'center'}
                  width={'100%'}
                  colName="noData"
                >
                  {t('language:NoLanguage')}
                </DataListCell>
              </DataListRow>
            )}
            {LanguageList?.data.length !== 0 &&
              LanguageList?.data.map((language) => (
                <DataListRow as={LinkBox} key={language.id}>
                  <DataListCell colName="number">
                    <LinkOverlay
                      as={Link}
                      to={`/admin/settings/language/update/${language.id}`}
                    >
                      {language.id}
                    </LinkOverlay>
                  </DataListCell>
                  <DataListCell colName="name">{language.name}</DataListCell>
                  <DataListCell colName="codeLangue">
                    {language.code}
                  </DataListCell>
                  <DataListCell colName="actions">
                    <LanguageActions lang={language} />
                  </DataListCell>
                </DataListRow>
              ))}
            <DataListFooter>
              <Pagination
                isLoadingPage={isLanguageLoading}
                setPage={setPage}
                page={LanguageList?.current_page}
                pageSize={LanguageList?.per_page}
                totalItems={LanguageList?.total}
              >
                <PaginationButtonFirstPage />
                <PaginationButtonPrevPage />
                <PaginationInfo flex="1" />
                <PaginationButtonNextPage />
                <PaginationButtonLastPage />
              </Pagination>
            </DataListFooter>
          </DataList>
        )}
      </PageContent>
    </Page>
  );
};
