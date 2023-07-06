const BASE_ENDPOINT = 'https://api.spotify.com/v1'

export const getTopItems = async (
  access_token: string,
  type: string,
  time_range: string,
  limit: number
) => {
  const params = new URLSearchParams()
  params.append('time_range', time_range)
  params.append('limit', limit.toString())

  const res = await fetch(`${BASE_ENDPOINT}/me/top/${type}?${params}`, {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  })

  return await res.json()
}

export const getAudioFeatures = async (access_token: string, ids: string) => {
  const params = new URLSearchParams()
  params.append('ids', ids)

  const res = await fetch(`${BASE_ENDPOINT}/audio-features?${params}`, {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  })

  return await res.json()
}
