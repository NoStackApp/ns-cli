const Handlebars = require('handlebars')

export const beginningOfFile = Handlebars.compile(`
/*
  This file has been partially generated!
  To permit updates to the generated portions of this code in the future,
  please follow all rules at https://docs.google.com/document/d/1vYGEyX2Gnvd_VwAcWGv6Ie37oa2vXNL7wtl7oUyyJcw/edit?usp=sharing
 */
// ns__file {{fileInfo}}

// ns__custom_start {{fileInfo}}, loc: beforeImports
{{{ defaultContent }}}
// ns__custom_end {{fileInfo}}, loc: beforeImports
`)
