import React, { useEffect } from 'react';

const ScrollToFirstError: React.FC = () => {
  useEffect(
    () => {
      // Wrap the code in setTimeout to make sure it runs after the DOM has been
      // updated and has the error message elements.
      // Can maybe use useLayoutEffect instead.
      setTimeout(() => {
        const errorMessageSelector = 'chakra-form__error-message';
        const firstErrorMessage =
          document.getElementsByClassName(errorMessageSelector);
        firstErrorMessage[0]?.scrollIntoView({
          behavior: 'smooth',
          block: 'center',
        });
      }, 100);
    }
    // , [submitCount, isValid]
  );

  return null;
};

export default ScrollToFirstError;
