'use client'

import { useEffect, useState } from 'react'

import { Box, Container, Heading, Skeleton } from '@chakra-ui/react'
import { useQuery } from '@tanstack/react-query'
import lodash from 'lodash'
import { useSession } from 'next-auth/react'

import Card from '@/components/card'
import FullScreenError from '@/components/fullscreen-error'
import FullScreenLoading from '@/components/fullscreen-loading'
import UserMenu from '@/components/user-menu'
import { guessMBTI, type AudioData } from '@/lib/guessMBTI'
import { type Track } from '@/types/Track'

export default function ResultPage() {
  const { data: session } = useSession()

  const [ids, setIds] = useState<string[]>()

  const { data: topTracks, status: tracksStatus } = useQuery<Track[]>({
    queryKey: ['tracks'],
    queryFn: async () =>
      fetch('/api/top?type=tracks&time_range=short_term&limit=50').then(
        async (res) => res.json()
      ),
  })

  useEffect(() => {
    setIds(topTracks?.map((track) => track.id))
  }, [topTracks])

  const [audioData, setAudioData] = useState<AudioData>({
    danceability: 0,
    energy: 0,
    liveness: 0,
    valence: 0,
  })

  const { data: audioFeatures, status: audioFeaturesStatus } = useQuery({
    queryKey: ['audio-features', ids],
    queryFn: async () =>
      fetch(`/api/audio-features?ids=${ids?.join(',')}`).then(async (res) =>
        res.json()
      ),
  })

  useEffect(() => {
    const danceability = audioFeatures?.map(
      (track: AudioData) => track?.danceability
    )
    const energy = audioFeatures?.map((track: AudioData) => track?.energy)
    const liveness = audioFeatures?.map((track: AudioData) => track?.liveness)
    const valence = audioFeatures?.map((track: AudioData) => track?.valence)

    setAudioData({
      danceability: lodash.mean(danceability),
      energy: lodash.mean(energy),
      liveness: lodash.mean(liveness),
      valence: lodash.mean(valence),
    })
  }, [audioFeatures])

  if ((tracksStatus || audioFeaturesStatus) === 'loading')
    return <FullScreenLoading />

  if ((tracksStatus || audioFeaturesStatus) === 'error')
    return <FullScreenError />

  return (
    <Container maxW='container.lg' my={12}>
      <Box w='full' display='flex' justifyContent='end'>
        <UserMenu />
      </Box>
      <Heading my={8}>{session?.user?.name}, your MBTI is ...</Heading>
      {guessMBTI(audioData) === 'XXXX' ? (
        <Skeleton height='360px' width='full' />
      ) : (
        <Card mbti={guessMBTI(audioData)} stats={audioData} />
      )}
    </Container>
  )
}
