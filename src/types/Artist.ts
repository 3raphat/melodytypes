export type Artist = {
  external_urls: {
    spotify: string
  }
  followers: {
    href: string | undefined
    total: number
  }
  genres: string[] | undefined[]
  href: string
  id: string
  images: Array<{
    url: string
    height: number
    width: number
  }>
  name: string
  popularity: number
  type: string
  uri: string
}
