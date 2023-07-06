import React from 'react'

import { Box, Flex, Spinner, Text, VStack } from '@chakra-ui/react'

export default function Loader() {
  return (
    <Flex
      direction='column'
      gap={4}
      textAlign='center'
      alignItems='center'
      m='auto'
    >
      <Spinner size='xl' thickness='0.5rem' marginX='auto' />
      <Text fontSize='lg'>Loading...</Text>
    </Flex>
  )
}
