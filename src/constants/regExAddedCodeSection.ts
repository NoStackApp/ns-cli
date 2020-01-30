const commentOpen = '(\\/\\/|{\\/\\*)'
const endOfFirstLine = '( \\*\\/\\}\\n|\\n)'
const locationSpec = '(\\w*), comp: (\\w*), loc: (\\w*)'
const content = '((.|\n)*?)'
const firstLineBody = `${commentOpen} np__added_start unit: ${locationSpec}${endOfFirstLine}`
const fullRegExBody = `${firstLineBody}${content}${commentOpen} np__added_end`

export const regExAddedCodeSection = new RegExp(fullRegExBody, 'g')
export const regExForFirstLine = new RegExp(firstLineBody, 'g')
