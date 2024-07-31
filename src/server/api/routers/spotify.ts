import { z } from "zod"

import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc"

export const spotifyRouter = createTRPCRouter({
  getTopTracks: protectedProcedure.mutation(async ({ ctx }) => {
    const baseUrl = "https://api.spotify.com/v1/me/top/tracks"

    const response = await fetch(baseUrl, {
      headers: {
        Authorization: `Bearer ${ctx.session.user.access_token}`,
      },
    })

    return response.json() as Promise<{
      items: Array<{
        id: string
        name: string
        artists: Array<{
          name: string
        }>
      }>
    }>
  }),
  getAudioFeatures: protectedProcedure
    .input(
      z.object({
        trackIds: z.array(z.string()).max(100),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const baseUrl = `https://api.spotify.com/v1/audio-features?ids=${input.trackIds.join(",")}`

      const response = await fetch(baseUrl, {
        headers: {
          Authorization: `Bearer ${ctx.session.user.access_token}`,
        },
      })

      return response.json() as Promise<{
        audio_features: Array<{
          acousticness: number
          analysis_url: string
          danceability: number
          duration_ms: number
          energy: number
          id: string
          instrumentalness: number
          key: number
          liveness: number
          loudness: number
          mode: 0 | 1
          speechiness: number
          tempo: number
          time_signature: number
          track_href: string
          type: string
          uri: string
          valence: number
        }>
      }>
    }),
})
