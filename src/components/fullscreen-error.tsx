import {
  Box,
  Button,
  Flex,
  Grid,
  Heading,
  Icon,
  LayoutProps,
  Stack,
  Text,
} from '@chakra-ui/react'
import { X } from 'lucide-react'
import { signOut } from 'next-auth/react'

interface FullScreenErrorProps {
  height?: LayoutProps['height']
}

export default function FullScreenError({ height }: FullScreenErrorProps) {
  return (
    <Grid height={height ?? '75vh'}>
      <Box textAlign='center' py={10} px={6} m='auto'>
        <Box display='inline-block'>
          <Flex
            flexDirection='column'
            justifyContent='center'
            alignItems='center'
            bg='red.500'
            rounded='50px'
            w='55px'
            h='55px'
            textAlign='center'
          >
            <Icon as={X} boxSize='20px' color='white' />
          </Flex>
        </Box>
        <Heading mt={6} mb={2}>
          Something went wrong!
        </Heading>
        <Text color='gray.500'>Please try again later.</Text>
        <Stack mt={8}>
          <Button onClick={() => window.location.reload()} variant='outline'>
            Try again
          </Button>
          <Button onClick={() => signOut()}>Sign out</Button>
        </Stack>
      </Box>
    </Grid>
  )
}
