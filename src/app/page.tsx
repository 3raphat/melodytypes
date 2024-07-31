import { Button, Link } from "@nextui-org/react"

import { GenderSelecter } from "~/components/gender-selecter"
import { getServerAuthSession } from "~/server/auth"
import { HydrateClient } from "~/trpc/server"

export default async function Home() {
  const session = await getServerAuthSession()

  return (
    <HydrateClient>
      <div className="flex min-h-screen flex-col">
        <main className="flex flex-1 flex-col items-center justify-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            version="1.1"
            x="0px"
            y="0px"
            viewBox="0 0 300 300"
            fill="currentColor"
            className="mb-8 size-16"
          >
            <path d="M21.3,224.3L150,298.6l128.7-74.3l0-148.6L150,1.4L21.3,75.7L21.3,224.3z M40.5,213.2l0-115.4l209.3,120.9L150,276.4  L40.5,213.2z M259.5,97.9l0,104.3L169.3,150L259.5,97.9z M249.9,81.2L150,138.9L50,81.3L150,23.6L249.9,81.2z" />
          </svg>
          <div className="flex flex-col items-center space-y-6 text-center">
            <h2 className="max-w-md text-balance text-2xl font-medium md:text-3xl">
              Get your MBTI through your music taste.
            </h2>
            <p className="max-w-sm text-balance text-subtle-dark dark:text-subtle-light md:text-lg">
              Explore your MBTI personality type based on your top tracks on
              Spotify.
            </p>
          </div>
          <div className="mt-10 flex flex-col items-center space-y-4">
            <Button
              as={Link}
              href={session ? "/result" : "/api/auth/signin"}
              size="lg"
              endContent={
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  className="size-5"
                >
                  <path
                    fillRule="evenodd"
                    d="M3 10a.75.75 0 0 1 .75-.75h10.638L10.23 5.29a.75.75 0 1 1 1.04-1.08l5.5 5.25a.75.75 0 0 1 0 1.08l-5.5 5.25a.75.75 0 1 1-1.04-1.08l4.158-3.96H3.75A.75.75 0 0 1 3 10Z"
                    clipRule="evenodd"
                  />
                </svg>
              }
            >
              Take the Result
            </Button>
          </div>
        </main>
        <footer className="bottom-0 px-6 py-3.5">
          <GenderSelecter />
        </footer>
      </div>
    </HydrateClient>
  )
}
