export const checkHeading = (str) => {
  return /^(\*)(\*)(.*)\*$/.test(str)
}

export const replaceHeadStars = (str) => {
  return (
    str.replace(/^(\*)(\*)|(\*)\$/g,'')
  )
}

