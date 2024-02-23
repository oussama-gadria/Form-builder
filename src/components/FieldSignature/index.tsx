import React, { useEffect, useState } from 'react';

import {
  Box,
  Button,
  InputProps,
  Stack,
  useBreakpointValue,
} from '@chakra-ui/react';
import { FieldProps, useField } from '@formiz/core';
import { useTranslation } from 'react-i18next';
import SignatureCanvas from 'react-signature-canvas';

import { FormGroup, FormGroupProps } from '@/components/FormGroup';

export type FieldSignatureProps = FieldProps &
  Omit<FormGroupProps, 'placeholder'> &
  Pick<InputProps, 'type' | 'placeholder'> & {
    size?: 'sm' | 'md' | 'lg';
    autoFocus?: boolean;
  };

export const FieldSignature = (props: FieldSignatureProps) => {
  const sig = React.useRef<TODO>(null);
  const width = useBreakpointValue({
    base: 200,
    sm: 400,
    md: 600,
    lg: 700,
  });
  const {
    errorMessage,
    id,
    isValid,
    isPristine,
    isSubmitted,
    resetKey,
    setValue,
    otherProps,
  } = useField(props);
  const {
    children,
    label,
    // type,
    // placeholder,
    helper,
    // autoFocus,
    isDisabled = false,
    ...rest
  } = otherProps as Omit<FieldSignatureProps, keyof FieldProps>;
  const { required } = props;
  const [isTouched, setIsTouched] = useState(false);
  const showError = !isValid && ((isTouched && !isPristine) || isSubmitted);
  const { t } = useTranslation(['common']);

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
  return (
    <Stack>
      <FormGroup justifyContent="center" {...formGroupProps}>
        <Box
          border="2px"
          borderColor="gray.800"
          borderRadius="lg"
          w="fit-content"
          {...rest}
        >
          <SignatureCanvas
            ref={sig}
            onEnd={() => {
              !!isDisabled && sig?.current?.clear();
              !isDisabled && setValue(sig?.current?.toDataURL());
            }}
            penColor="black"
            canvasProps={{
              width: width,
              height: 200,
              className: 'sigCanvas',
            }}
          />
          {children}
        </Box>
      </FormGroup>
      <Button
        onClick={() => {
          sig?.current?.clear();
        }}
      >
        {t('common:actions.doSignature')}
      </Button>
    </Stack>
  );
};
