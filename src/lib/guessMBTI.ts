import { AudioFeatures } from '@/types/AudioFeatures'

export type AudioData = Pick<
  AudioFeatures,
  'danceability' | 'energy' | 'liveness' | 'valence'
>

export function guessMBTI({
  danceability,
  energy,
  liveness,
  valence,
}: AudioData) {
  let mbti = ''

  if (danceability > 0.8) {
    mbti += 'E'
  } else {
    mbti += 'I'
  }

  if (energy > 0.5) {
    mbti += 'N'
  } else {
    mbti += 'S'
  }

  if (liveness > 0.5) {
    mbti += 'F'
  } else {
    mbti += 'T'
  }

  if (valence > 0.5) {
    mbti += 'P'
  } else {
    mbti += 'J'
  }

  return mbti
}
