import React, { useEffect, useRef, useState } from 'react';

import {
  Button,
  Img,
  Input,
  InputGroup,
  InputProps,
  Stack,
} from '@chakra-ui/react';
import { FieldProps, useField } from '@formiz/core';
import { t } from 'i18next';

import { FormGroup, FormGroupProps } from '@/components/FormGroup';

import { Dropzone } from '../Dropzone';

export type FieldInputProps = FieldProps &
  Omit<FormGroupProps, 'placeholder'> &
  Pick<InputProps, 'type' | 'placeholder'> & {
    size?: 'sm' | 'md' | 'lg';
    autoFocus?: boolean;
  };

export const FieldImage64bit = (props: FieldInputProps) => {
  const inputRef = useRef<TODO>();
  const {
    errorMessage,
    id,
    isValid,
    isPristine,
    isSubmitted,
    resetKey,
    setValue,
    value,
    otherProps,
  } = useField(props);
  const {
    children,
    label,
    placeholder,
    helper,
    size = 'md',
    autoFocus,
    isDisabled = false,

    ...rest
  } = otherProps as Omit<FieldInputProps, keyof FieldProps>;
  const { required } = props;
  const [isTouched, setIsTouched] = useState(false);
  const showError = !isValid && ((isTouched && !isPristine) || isSubmitted);

  useEffect(() => {
    setIsTouched(false);
  }, [resetKey]);

  const formGroupProps = {
    errorMessage,
    helper,
    id,
    isRequired: !!required,
    label,
    showError,
    ...rest,
  };

  const convertToBase64 = (file: TODO) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.onload = () => {
        setValue(fileReader.result);
      };
      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  };

  const changeHandler = (e: TODO) => {
    const { files } = e.target;
    convertToBase64(files[0]);
  };

  return (
    <FormGroup {...formGroupProps}>
      <InputGroup size={size}>
        <Input
          id={id}
          type="file"
          onChange={changeHandler}
          onFocus={() => setIsTouched(false)}
          onBlur={() => setIsTouched(true)}
          placeholder={placeholder ? String(placeholder) : ''}
          accept="image/*"
          autoFocus={autoFocus}
          disabled={isDisabled}
          style={{ display: 'none' }}
          ref={inputRef}
        />
      </InputGroup>
      {children}
      {value ? (
        <Stack>
          <Img
            style={{ maxWidth: '200px', margin: '0 auto' }}
            src={value?.includes('data:image/') ? value : `${value}`}
          />
          <Button
            colorScheme="red"
            onClick={() => {
              setValue('');
            }}
          >
            {t('common:actions.delete')}
          </Button>
        </Stack>
      ) : (
        <Dropzone onClick={() => inputRef.current.click()} />
      )}
    </FormGroup>
  );
};
