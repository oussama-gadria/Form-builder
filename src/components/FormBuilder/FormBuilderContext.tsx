import React,{ createContext, useCallback, useContext, useState } from 'react';

import { fieldType } from './formBuilder.type';

type FormBuilderContextValue = {
  inputs: fieldType[];
  updateInputs(inputs: fieldType[]): void;
};

const FormBuilderContext = createContext<FormBuilderContextValue>(null as TODO);

export const useFormBuilderContext = () => useContext(FormBuilderContext);

export const FormBuilderProvider: React.FC<
  React.PropsWithChildren<unknown>
> = ({ children }) => {
  const [inputs, setInputs] = useState<fieldType[]>([]);

  const handleUpdateInputs = useCallback(
    (newInputs: fieldType[]) => {
      setInputs(newInputs);
    },
    [setInputs]
  );

  return (
    <FormBuilderContext.Provider
      value={{
        inputs,
        updateInputs: handleUpdateInputs,
      }}
    >
      {children}
    </FormBuilderContext.Provider>
  );
};
