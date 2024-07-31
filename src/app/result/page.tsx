import { redirect } from "next/navigation"

import { CircularProgress } from "@nextui-org/react"

import { BackButton } from "~/components/back-button"
import { ImageResult } from "~/components/image-result"
import { SignOutButton } from "~/components/sign-out-button"
import {
  classifyMBTI,
  getName,
  type MusicPreferences,
} from "~/lib/classify-mbti"
import { getServerAuthSession } from "~/server/auth"
import { api } from "~/trpc/server"

export default async function ResultPage() {
  const session = await getServerAuthSession()

  if (!session) return redirect("/api/auth/signin")

  const topTracks = await api.spotify.getTopTracks()

  const audioFeatures = await api.spotify.getAudioFeatures({
    trackIds: topTracks.items.map((track) => track.id),
  })

  const avgAudioFeatures = audioFeatures.audio_features.reduce(
    (acc, feature) => {
      acc.acousticness += feature.acousticness
      acc.danceability += feature.danceability
      acc.energy += feature.energy
      acc.instrumentalness += feature.instrumentalness
      acc.liveness += feature.liveness
      acc.mode += feature.mode
      acc.speechiness += feature.speechiness
      acc.tempo += feature.tempo
      acc.valence += feature.valence
      return acc
    },
    {
      acousticness: 0,
      danceability: 0,
      energy: 0,
      instrumentalness: 0,
      liveness: 0,
      mode: 0,
      speechiness: 0,
      tempo: 0,
      valence: 0,
    } as MusicPreferences
  )

  for (const key of Object.keys(avgAudioFeatures) as Array<
    keyof MusicPreferences
  >) {
    avgAudioFeatures[key] /= audioFeatures.audio_features.length
  }

  const mbti = classifyMBTI(avgAudioFeatures)

  const bar = (feature: keyof MusicPreferences) => (
    <div className="mx-auto">
      <CircularProgress
        aria-label={feature}
        label={feature.toUpperCase().charAt(0) + feature.slice(1)}
        size="lg"
        value={avgAudioFeatures[feature] * 100}
        color="warning"
        showValueLabel={true}
      />
    </div>
  )

  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      <BackButton />
      <SignOutButton />
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
        <div className="flex flex-col items-center justify-center">
          <ImageResult
            mbti={mbti.toLowerCase()}
            name={getName(mbti).toLowerCase()}
          />
          <h2 className="mt-4 text-4xl font-bold">{mbti}</h2>
          <p className="text-xl dark:text-subtle-light">{getName(mbti)}</p>
        </div>
        <div className="flex items-center justify-center">
          <div className="grid grid-cols-2 gap-4">
            {bar("acousticness")}
            {bar("danceability")}
            {bar("energy")}
            {bar("instrumentalness")}
            {bar("liveness")}
            {bar("mode")}
            {bar("speechiness")}
            {bar("valence")}
          </div>
        </div>
      </div>
    </div>
  )
}
