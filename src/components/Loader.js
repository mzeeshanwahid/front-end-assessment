import { Flex, Spinner } from '@chakra-ui/react';
import React from 'react';

const Loader = () => {
  return (
    <Flex justify="center" align="center" w="100%" minH="600px">
      <Spinner
        thickness="4px"
        speed="0.65s"
        emptyColor="gray.200"
        color="blue.500"
        size="xl"
      />
    </Flex>
  );
};

export default Loader;
