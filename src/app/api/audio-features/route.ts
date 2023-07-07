import { NextResponse, type NextRequest } from 'next/server'

import { getServerSession } from 'next-auth'

import { authOptions } from '@/lib/auth'
import { getAudioFeatures } from '@/lib/spotify'

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const ids = searchParams.get('ids') as string

  const session = await getServerSession(authOptions)

  const access_token = session?.accessToken

  const audioFeatures = await getAudioFeatures(access_token!, ids)

  const { audio_features } = audioFeatures

  return NextResponse.json(audio_features)
}
