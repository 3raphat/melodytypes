'use client'

import { useRouter } from 'next/navigation'

import { Button, Center, Heading, Text } from '@chakra-ui/react'
import { signIn, useSession } from 'next-auth/react'
import Balancer from 'react-wrap-balancer'

export default function Home() {
  const { data: session } = useSession()

  const router = useRouter()

  async function handleTakeTheResult() {
    if (session) {
      router.push('/result')
    } else {
      await signIn('spotify', {
        callbackUrl: '/result',
      })
    }
  }

  return (
    <Center h='100vh'>
      <Center textAlign='center' maxW='760px' mx='auto'>
        <Balancer>
          <Heading as='h1' size='4xl' fontWeight='black'>
            Get your{' '}
            <Text
              as='span'
              bgClip='text'
              bgGradient='linear(215deg, #A770EF, #CF8BF3, #FDB99B)'
            >
              MBTI
            </Text>{' '}
            with your music taste.
          </Heading>
          <Text fontSize='xl' my={6}>
            Explore Your MBTI Personality Type based on your top tracks on
            Spotify.
          </Text>
          <Button onClick={handleTakeTheResult}>Take the result</Button>
        </Balancer>
      </Center>
    </Center>
  )
}
