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
  } else if (danceability <= 0.8) {
    mbti += 'I'
  } else {
    mbti += 'X'
  }

  if (energy > 0.5) {
    mbti += 'N'
  } else if (energy <= 0.5) {
    mbti += 'S'
  } else {
    mbti += 'X'
  }

  if (liveness > 0.5) {
    mbti += 'F'
  } else if (liveness <= 0.5) {
    mbti += 'T'
  } else {
    mbti += 'X'
  }

  if (valence > 0.5) {
    mbti += 'P'
  } else if (valence <= 0.5) {
    mbti += 'J'
  } else {
    mbti += 'X'
  }

  return mbti
}
