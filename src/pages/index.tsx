import React, { useEffect, useState } from 'react';

import { Center } from '@chakra-ui/react';
import { useRouter } from 'next/router';


const Index = () => {
  const router = useRouter();
  const [calledPush, setCalledPush] = useState(false);
  useEffect(() => {
    // check if we have previously called router.push() before redirecting
    if (calledPush) {
      return; // no need to call router.push() again
    }
    router.push('/app');
    setCalledPush(true);
  }, [router, calledPush]);

  return (
    <Center flex="1">
    </Center>
  );
};
export default Index;
