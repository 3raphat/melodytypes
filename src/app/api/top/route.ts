import { NextResponse, type NextRequest } from 'next/server'

import { getServerSession } from 'next-auth'

import { authOptions } from '@/lib/auth'
import { getTopItems } from '@/lib/spotify'

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const type = searchParams.get('type') as string
  const time_range = searchParams.get('time_range') as string
  const limit = searchParams.get('limit') as string

  const session = await getServerSession(authOptions)

  const access_token = session?.accessToken

  const topItems = await getTopItems(
    access_token!,
    type,
    time_range,
    parseInt(limit, 10)
  )

  const { items } = topItems

  return NextResponse.json(items)
}
