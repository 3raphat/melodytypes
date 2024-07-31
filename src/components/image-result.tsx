"use client"

import Image from "next/image"

import { useLocalStorage } from "@uidotdev/usehooks"

interface ImageResultProps {
  mbti: string
  name: string
}

export function ImageResult({ mbti, name }: ImageResultProps) {
  const [gender] = useLocalStorage("gender") as unknown as string

  return (
    <div className="relative size-[300px] rounded-full bg-slate-200 dark:bg-slate-200/10 md:size-[400px]">
      <Image
        width={500}
        height={500}
        alt={mbti}
        src={`https://static.neris-assets.com/images/personality-types/avatars/${mbti}-${name}-s3-${gender ?? "male"}.svg`}
        className="absolute -bottom-4 size-[400px] md:size-[500px]"
      />
    </div>
  )
}
