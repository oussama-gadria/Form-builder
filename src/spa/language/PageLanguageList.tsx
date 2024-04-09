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
    <>
    </>
  );
};
