export const formatToPercentage = (value: number) => {
  const percentage = decimalsToPercentage(value)

  return (percentage < 10 ? `0${percentage}` : percentage) + '%'
}

export const decimalsToPercentage = (value: number) => {
  return Math.round(value * 100)
}

export const convertToTitleCase = (text: string) => {
  return text.charAt(0).toUpperCase() + text.slice(1)
}
