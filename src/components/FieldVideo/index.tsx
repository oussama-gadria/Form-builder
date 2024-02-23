import React, { useEffect, useRef, useState } from 'react';
import { Button, Box, Input, InputGroup, InputProps, Stack } from '@chakra-ui/react';
import { FieldProps, useField } from '@formiz/core';
import { t } from 'i18next';
import { FormGroup, FormGroupProps } from '@/components/FormGroup';
import { Dropzone } from '../Dropzone';

export type FieldVideoProps = FieldProps &
  Omit<FormGroupProps, 'placeholder'> &
  Pick<InputProps, 'placeholder'> & {
    size?: 'sm' | 'md' | 'lg';
    autoFocus?: boolean;
  };

export const FieldVideo = (props: FieldVideoProps) => {
  const inputRef = useRef<HTMLInputElement | null>(null);
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
  } = otherProps as Omit<FieldVideoProps, keyof FieldProps>;
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

  const convertToBase64 = (file: File) => {
    return new Promise<string | ArrayBuffer | null>((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.onload = () => {
        resolve(fileReader.result);
      };
      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  };

  const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = e.target;
    if (files && files[0]) {
      convertToBase64(files[0]).then((result) => {
        setValue(result);
      });
    }
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
          accept="video/*"
          autoFocus={autoFocus}
          disabled={isDisabled}
          style={{ display: 'none' }}
          ref={inputRef}
        />
      </InputGroup>
      {children}
      {value ? (
        <Stack>
          <Box>
            <video controls width="100%">
              <source src={value as string} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </Box>
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
        <Dropzone onClick={() => inputRef.current?.click()} />
      )}
    </FormGroup>
  );
};
