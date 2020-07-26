const commentOpen = '(\\/\\/|{\\/\\*)'
const endOfFirstLine = '( \\*\\/\\}\\n|\\n)'
const content = '((.|\n)*?)'
const firstLineBody = `${commentOpen} ns__start_replacement (\\w*)${endOfFirstLine}`
const fullRegExBody = `${firstLineBody}${content}${commentOpen} ns__end_replacement \\2`

export const regExReplacedCodeSection = new RegExp(fullRegExBody, 'g')
