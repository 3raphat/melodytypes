export function getMBTIName(code: string): string {
  const mbtiNames: { [key: string]: string } = {
    ENFJ: 'Protagonist',
    ENFP: 'Campaigner',
    ENTJ: 'Commander',
    ENTP: 'Debater',
    ESFJ: 'Consul',
    ESFP: 'Entertainer',
    ESTJ: 'Executive',
    ESTP: 'Entrepreneur',
    INFJ: 'Advocate',
    INFP: 'Mediator',
    INTJ: 'Architect',
    INTP: 'Logician',
    ISFJ: 'Defender',
    ISFP: 'Adventurer',
    ISTJ: 'Logistician',
    ISTP: 'Virtuoso',
  }

  return mbtiNames[code] ?? 'Unknown MBTI'
}
