import { FC, useState } from 'react';

import {
  Box,
  Button,
  IconButton,
  Popover,
  PopoverArrow,
  PopoverCloseButton,
  PopoverContent,
  PopoverTrigger,
  Stack,
} from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';
import {
  FiArrowDown,
  FiArrowUp,
  FiEdit,
  FiEye,
  FiEyeOff,
  FiTrash,
} from 'react-icons/fi';

import { Icon } from '@/components/Icons';

import { useFormBuilderContext } from '../FormBuilderContext';
import FieldInputForm from '../FormForEachField/FieldInputForm';
import { FieldSelector } from '../fieldSelector';
import { InputType, fieldType } from '../formBuilder.type';
import FieldOptionsForm from '../FormForEachField/FieldOptionsForm';

interface FieldFormViewerProps {
  input: fieldType;
}

export const FieldFormViewer: FC<FieldFormViewerProps> = ({ input }) => {
  const { inputs, updateInputs } = useFormBuilderContext();
  const RenderInput: React.ElementType =
    FieldSelector[input.inputType as keyof typeof FieldSelector];
  const [isValueChange, setIsValueChange] = useState(false);
  const [isOpenInputForm, setIsOpenInputForm] = useState(false);
  const [isOpenOptionsForm, setIsOpenOptions] = useState(false);
  const leftValue = !input.principalImage
    ? { base: '55%', sm: '55%', md: '55%', lg: '67%', xl: '73%' }
    : '85%';
  const [currentInputValue, setCurrentInputValue] = useState(input.inputValue);
  const { t } = useTranslation(['formBuilder']);

  const handleInputChange = (e: TODO) => {
    setCurrentInputValue(e);
    setIsValueChange(true);
  };

  const updateInput = (id: string, updatedProperties: Partial<fieldType>) => {
    updateInputs(
      inputs.map((input) =>
        input.id === id ? { ...input, ...updatedProperties } : input
      )
    );
  };

  const saveFieldValue = async () => {
    updateInput(input.id, { inputValue: currentInputValue });
    setIsValueChange(false);
  };

  const handleDisplayStatus = () => {
    const id = input.id;
    updateInputs(
      inputs.map((input) =>
        input.id === id ? { ...input, display: !input.display } : input
      )
    );
  };

  const incrementOrder = (inputId: string) => {
    const newInputs = [...inputs];
    const currentIndex = newInputs.findIndex((input) => input.id === inputId);

    if (currentIndex === -1 || currentIndex >= newInputs.length - 1) {
      return;
    }

    const currentInput = newInputs[currentIndex];
    const nextInput = newInputs[currentIndex + 1];

    if (!currentInput || !nextInput) {
      return;
    }
    const tempOrder = currentInput.inputOrder;
    currentInput.inputOrder = nextInput.inputOrder;
    nextInput.inputOrder = tempOrder;

    updateInputs(newInputs);
  };

  const decrementOrder = (inputId: string) => {
    const newInputs = [...inputs];
    const currentIndex = newInputs.findIndex((input) => input.id === inputId);

    if (currentIndex <= 0 || currentIndex === -1) {
      return;
    }

    const currentInput = newInputs[currentIndex];
    const prevInput = newInputs[currentIndex - 1];

    if (!currentInput || !prevInput) {
      return;
    }

    const tempOrder = currentInput.inputOrder;
    currentInput.inputOrder = prevInput.inputOrder;
    prevInput.inputOrder = tempOrder;

    updateInputs(newInputs);
  };

  const removeInput = () => {
    const id = input.id;
    updateInputs(inputs.filter((input) => input.id !== id));
  };

  const handleEditForm = () => {
    input.inputType == 'FieldRadios' ||
      input.inputType == 'FieldSelect' ||
      input.inputType == 'FieldCheckboxes'
      ? setIsOpenOptions(true)
      : setIsOpenInputForm(true);
  };

  return (
    <>
      {isOpenInputForm && (
        <FieldInputForm
          isOpenInputForm={isOpenInputForm}
          id={input.id}
          //  isUpdatedInput={isUpdateInputLoading}
          updateInput={updateInput}
          setIsOpenInputForm={setIsOpenInputForm}
        />
      )}
      {isOpenOptionsForm && (
        <FieldOptionsForm
          isOpenOptionsForm={isOpenOptionsForm}
          id={input.id}
          //  isUpdatedInputLoading={isUpdateInputLoading}
          updateInput={updateInput}
          setIsOpenOptions={setIsOpenOptions}
        />
      )}
      <Box position="relative" pb={'8'}>
        <Popover>
          <PopoverTrigger>
            <IconButton
              aria-label="remove"
              icon={<Icon icon={FiTrash} />}
              top="0"
              left={{ base: '85%', sm: '85%', md: '85%', lg: '91%', xl: '91%' }}
              zIndex={99}
              size="2"
              pb={'8px'}
            />
          </PopoverTrigger>
          <PopoverContent w="full">
            <PopoverArrow />
            <PopoverCloseButton size={'sm'} />
            <Button
              onClick={removeInput}
              colorScheme="error"
              size={'xs'}
              mx={2}
            //  isLoading={isDeleteInputLoading}
            >
              Click to confirm delete
            </Button>
          </PopoverContent>
        </Popover>

        <IconButton
          aria-label="edit"
          icon={<Icon icon={FiEdit} />}
          onClick={handleEditForm}
          position="absolute"
          top="0"
          left={{ base: '95%', sm: '95%', md: '95%', lg: '97%', xl: '97%' }}
          zIndex={99}
          size="2"
        />

        {!input.principalImage && (
          <IconButton
            aria-label="orderDown"
            icon={<Icon icon={FiArrowUp} />}
            position="absolute"
            onClick={() => decrementOrder(input.id)}
            top="0"
            left={{ base: '65%', sm: '65%', md: '65%', lg: '79%', xl: '79%' }}
            zIndex={99}
            size="2"
          />
        )}

        {!input.principalImage && (
          <IconButton
            aria-label="orderDown"
            icon={<Icon icon={FiArrowDown} />}
            position="absolute"
            onClick={() => incrementOrder(input.id)}
            top="0"
            left={{ base: '75%', sm: '75%', md: '75%', lg: '85%', xl: '85%' }}
            zIndex={99}
            size="2"
          />
        )}
        <IconButton
          aria-label="display"
          icon={
            input.display ? <Icon icon={FiEye} /> : <Icon icon={FiEyeOff} />
          }
          position="absolute"
          onClick={handleDisplayStatus}
          top="0"
          left={leftValue}
          zIndex={99}
          size="2"
        />

        {!!RenderInput && (
          <RenderInput
            onClick={() => setIsValueChange(true)}
            onChange={handleInputChange}
            name={input.inputName}
            type={input.inputType}
            defaultValue={currentInputValue}
            options={input.options}
          />
        )}
        <Stack direction={'row'} justifyContent={'flex-end'}>
          {isValueChange && (
            <Button
              onClick={() => setIsValueChange(false)}
              colorScheme="blackAlpha"
              size={'xs'}
            >
              {t('formBuilder:Cancel')}
            </Button>
          )}
          {isValueChange && (
            <Button
              onClick={() => saveFieldValue()}
              colorScheme="whatsapp"
              size={'xs'}
              px={'4'}
            >
              {t('formBuilder:Save')}
            </Button>
          )}
        </Stack>
      </Box>
    </>

  );
};
