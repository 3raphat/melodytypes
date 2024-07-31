export type MusicPreferences = {
  acousticness: number
  danceability: number
  energy: number
  instrumentalness: number
  liveness: number
  mode: 0 | 1
  speechiness: number
  tempo: number
  valence: number
}

export function classifyMBTI(prefs: MusicPreferences): string {
  let type = ""

  // Extraversion (E) vs. Introversion (I)
  type += prefs.danceability > 0.6 && prefs.energy > 0.6 ? "E" : "I"

  // Sensing (S) vs. Intuition (N)
  type += prefs.acousticness > 0.5 && prefs.instrumentalness < 0.4 ? "S" : "N"

  // Thinking (T) vs. Feeling (F)
  type += prefs.valence < 0.5 && prefs.mode < 0.5 ? "T" : "F"

  // Judging (J) vs. Perceiving (P)
  type += prefs.tempo < 100 && prefs.speechiness > 0.4 ? "J" : "P"

  return type
}

export function getName(type: string): string {
  const names: Record<string, string> = {
    ENFJ: "Protagonist",
    ENFP: "Campaigner",
    ENTJ: "Commander",
    ENTP: "Debater",
    ESFJ: "Consul",
    ESFP: "Entertainer",
    ESTJ: "Executive",
    ESTP: "Entrepreneur",
    INFJ: "Advocate",
    INFP: "Mediator",
    INTJ: "Architect",
    INTP: "Logician",
    ISFJ: "Defender",
    ISFP: "Adventurer",
    ISTJ: "Logistician",
    ISTP: "Virtuoso",
  }

  return names[type] ?? "Unknown"
}
