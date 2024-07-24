export const capitalize = (text: string) => {
  const [first, ...others] = text
  return `${first.toUpperCase()}${others.join("")}`
}
