export type Album = {
  album_type: string
  total_tracks: number
  available_markets: string[]
  external_urls: {
    spotify: string
  }
  href: string
  id: string
  images: Array<{
    url: string
    height: number
    width: number
  }>
  name: string
  release_date: string
  release_date_precision: string
  restrictions: {
    reason: string
  }
  type: string
  uri: string
  copyrights: Array<{
    text: string
    type: string
  }>
  external_ids: {
    isrc: string
    ean: string
    upc: string
  }
  genres: string[] | undefined
  label: string
  popularity: number
  album_group: string
  artists: Array<{
    external_urls: {
      spotify: string
    }
    href: string
    id: string
    name: string
    type: string
    uri: string
  }>
}
