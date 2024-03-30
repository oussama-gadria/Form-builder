import React,{ FC, useEffect, useState } from 'react';

import {
  Button,
  FormControl,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
} from '@chakra-ui/react';
import { Formiz, useForm } from '@formiz/core';
import { useTranslation } from 'react-i18next';

import { FieldInput } from '@/components/FieldInput';

import { fieldType } from '../formBuilder.type';

interface fieldInputFormProps {
  setIsOpenInputForm: TODO;
  updateInput: TODO;
  id: string;
  isOpenInputForm: boolean;
  detailsInput?: fieldType
}

const FieldInputForm : FC<fieldInputFormProps> = ({
  isOpenInputForm,
  id,
  setIsOpenInputForm,
  updateInput,
  detailsInput
}) => {
  const { t } = useTranslation(['common', 'formBuilder']);
  const { onClose } = useDisclosure();
  const form = useForm();

  const submitCreateDefaultInput = (values: TODO) => {

    updateInput(id, values);
    setIsOpenInputForm(false);
  };

  return (
    <>
      {isOpenInputForm && (
        <Modal isOpen={true} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <Formiz
              connect={form}
              onValidSubmit={submitCreateDefaultInput}
            >
              <form noValidate onSubmit={form.submit}>
                <ModalHeader>{t('common:Inputs.Update')}</ModalHeader>
                <ModalBody pb={6}>
                  <FormControl>
                    <FieldInput
                      mt={2}
                      size="sm"
                      name="inputName"
                      label={t('common:Inputs.Name')}
                      placeholder={t('common:Inputs.PlaceHolder')}
                      required
                      defaultValue={detailsInput?.inputName}
                    />
                    <FieldInput
                      mt={2}
                      size="sm"
                      name="label"
                      label={t('common:Inputs.Label')}
                      placeholder={t('common:Inputs.Label')}
                      required
                      defaultValue={detailsInput?.label}
                    />
                    <FieldInput
                      size="sm"
                      name="helper"
                      label={t('formBuilder:Helper')}
                      helper={t('formBuilder:HelperMessage')}
                      defaultValue={detailsInput?.helper}
                    />
                  </FormControl>
                </ModalBody>
                <ModalFooter>
                  <Button type="submit" colorScheme="blue" mr={3}>
                    {t('common:Inputs.Save')}
                  </Button>
                  <Button onClick={() => setIsOpenInputForm(false)}>
                    {t('common:Inputs.Cancel')}
                  </Button>
                </ModalFooter>
              </form>
            </Formiz>
          </ModalContent>
        </Modal>
      )}
    </>
  );
};
export default FieldInputForm;
