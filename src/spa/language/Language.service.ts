import {
  createQueryKeys,
  inferQueryKeys,
} from '@lukemorales/query-key-factory';
import {
  UseMutationOptions,
  UseQueryOptions,
  useMutation,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';
import Axios, { AxiosError } from 'axios';

import { Language, LanguageListResult } from './Language.type';

const LanguageKeys = createQueryKeys('languageService', {
  all: () => ['languageService'] as const,
  language: (params: { languageId?: number | string }) => [params],
  listByTemplate: (params: { templateId?: number | string }) => [params],
});
type LanguageKeys = inferQueryKeys<typeof LanguageKeys>;

export const useLanguageList = (
  { page = 1 } = {},
  config: UseQueryOptions<
    LanguageListResult,
    AxiosError,
    LanguageListResult,
    LanguageKeys['all']['queryKey']
  > = {}
) => {
  const result = useQuery(
    LanguageKeys.all().queryKey,
    (): Promise<LanguageListResult> =>
      Axios.get(`admin/language`, { params: { page } }),
    { keepPreviousData: true, ...config }
  );

  return {
    LanguageList: result.data,
    ...result,
  };
};

export const useLanguageListByTemplate = (
  id?: number | string,
  config: UseQueryOptions<
    Language[],
    AxiosError,
    Language[],
    LanguageKeys['listByTemplate']['queryKey']
  > = {}
) => {
  const result = useQuery(
    LanguageKeys.listByTemplate({ templateId: id }).queryKey,
    (): Promise<Language[]> => Axios.get(`admin/language/listByTemplate/${id}`),
    { keepPreviousData: true, ...config }
  );

  return {
    LanguageListByTemplate: result.data,
    ...result,
  };
};

export const useLanguage = (
  id?: number | string,
  config: UseQueryOptions<
    Language,
    AxiosError,
    Language,
    LanguageKeys['language']['queryKey']
  > = {}
) => {
  const result = useQuery(
    LanguageKeys.language({ languageId: id }).queryKey,
    (): Promise<Language> => Axios.get(`/admin/language/${id}`),
    {
      ...config,
    }
  );

  return {
    language: result.data,
    ...result,
  };
};

export const useLanguageUpdate = (
  id?: number | string,
  config: UseMutationOptions<Language, AxiosError, Language> = {}
) => {
  const queryClient = useQueryClient();
  return useMutation((payload) => Axios.put(`/admin/language/${id}`, payload), {
    ...config,
    onSuccess: (...args) => {
      queryClient.invalidateQueries(LanguageKeys.language({ languageId: id }));
      config?.onSuccess?.(...args);
    },
  });
};

export const useLanguageCreate = (
  config: UseMutationOptions<Language, AxiosError, Language> = {}
) => {
  const queryClient = useQueryClient();
  return useMutation((payload) => Axios.post('/admin/language', payload), {
    ...config,
    onSuccess: (...args) => {
      queryClient.invalidateQueries(LanguageKeys.all._def);
      config?.onSuccess?.(...args);
    },
  });
};

export const useLanguageRemove = (
  id: number,
  config: UseMutationOptions<void, unknown, Language> = {}
) => {
  const queryClient = useQueryClient();
  return useMutation(
    (): Promise<void> => Axios.delete(`/admin/language/${id}`),
    {
      ...config,
      onSuccess: (...args) => {
        queryClient.invalidateQueries(LanguageKeys.all._def);
        config?.onSuccess?.(...args);
      },
    }
  );
};
