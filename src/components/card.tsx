import {
  Box,
  Heading,
  HStack,
  Stack,
  Stat,
  StatGroup,
  StatLabel,
  StatNumber,
  Text,
  Tooltip,
} from '@chakra-ui/react'
import convert from 'color-convert'

import CopyToClipboard from '@/components/copy-to-clipboard'
import { getMBTIName } from '@/lib/getMBTIName'
import { AudioData } from '@/lib/guessMBTI'
import {
  convertToTitleCase,
  decimalsToPercentage,
  formatToPercentage,
} from '@/lib/utils'

interface CardProps {
  mbti: string
  stats: AudioData
}

export default function Card({ mbti, stats }: CardProps) {
  const { danceability, energy, liveness, valence } = stats

  const hex = convert.cmyk.hex([
    decimalsToPercentage(danceability),
    decimalsToPercentage(energy),
    decimalsToPercentage(liveness),
    decimalsToPercentage(valence),
  ])

  const hexWithHash = `#${hex}`

  return (
    <Box
      border='1px'
      borderColor='black'
      boxShadow='8px 8px 0 black'
      pos='relative'
    >
      <HStack spacing={0}>
        <Tooltip
          label={`This is color generate from your stats: ${hexWithHash}`}
          placement='auto-start'
          hasArrow
        >
          <Box
            boxSize={360}
            borderRight='1px solid black'
            bgColor={hexWithHash}
            pos='relative'
            _hover={{
              '.copy-button': {
                opacity: 1,
              },
            }}
          >
            <CopyToClipboard
              text={hexWithHash}
              className='copy-button'
              pos='absolute'
              top={2}
              right={2}
              opacity={0}
              transition='all 0.2s ease-in-out'
            />
          </Box>
        </Tooltip>

        <Box mx='auto' textAlign='center'>
          <Heading
            fontSize='9xl'
            lineHeight='none'
            mb={2}
            as='a'
            transition='all 0.2s ease-in-out'
            _hover={{
              color: hexWithHash,
            }}
            href={`https://www.16personalities.com/${mbti?.toLowerCase()}-personality`}
            target='_blank'
            rel='noopener noreferrer'
          >
            {mbti}
          </Heading>
          <Text fontSize='2xl' fontWeight='semibold'>
            {getMBTIName(mbti)}
          </Text>

          <Stack
            direction='row'
            justifyContent='center'
            alignItems='center'
            mt={8}
          >
            <StatGroup gap={4}>
              {Object.entries(stats).map(([key, value]) => (
                <Stat key={key}>
                  <StatLabel>{convertToTitleCase(key)}</StatLabel>
                  <StatNumber>{formatToPercentage(value)}</StatNumber>
                </Stat>
              ))}
            </StatGroup>
          </Stack>
        </Box>
      </HStack>
    </Box>
  )
}
