/*
    Note: this should be replaced with grunt-ts.  We should be able to import from the
    regex files.
 */

// const gen = `// ns__start_section unit: appSpec, comp: UserTypeCreationForm, loc: return
//    return (
//        <Form>
//              <label htmlFor='userType-value'>
//                      UserType:\n        <input\n          id='userType-value'\n          type='text'\n          onChange={handleChange}\n          onKeyPress={handleKeyPress}\n          value={ userTypeValue }\n          disabled={loading}\n        />\n      </label>\n      <Button type='submit'  disabled={loading}  onClick={handleSubmit}>\n        {loading ? 'Creating UserType...' : 'Create UserType'}\n      </Button>\n    </Form>
//      );
//      // ns__end_section unit: appSpec, comp: UserTypeCreationForm, loc: return`
const fs = require('fs-extra');
// const path = require("path");
// const untildify = require('untildify');

let customCodeObject = {};
let addedCodeObject = {};
let replacedCodeObject = {};
// let removedCodeObject = {};

// the following should not be here.  Should be exported from constants/regExAddedCodeSections.
// but grunt isn't set up to import from external ts files.
const commentOpen = '(\\/\\/|{\\/\\*)';
const endOfFirstLine = '( \\*\\/\\}\\n|\\n)';

const locationSpec = '(\\w*), comp: (\\w*), loc: (\\w*)';
const locationRepetition = '\\2, comp: \\3, loc: \\4'

const content = '((.|\n)*?)';
const firstLineBody = `${commentOpen} ns__custom_start unit: ${locationSpec}${endOfFirstLine}`;
// const firstLineMinusEndingBody = `${commentOpen} np__added_start unit: ${locationSpec}`;
const fullRegExBody = `${firstLineBody}${content}${commentOpen} ns__custom_end`;
const regExAddedCodeSection = new RegExp(fullRegExBody, 'g');
const regExForFirstLine = new RegExp(firstLineBody);

const genFirstLineBody = `${commentOpen} ns__start_section unit: ${locationSpec}${endOfFirstLine}`
const genFullRegExBody = `${genFirstLineBody}${content}${commentOpen} ns__end_section unit: ${locationRepetition}`
const regExGeneratedCodeSection = new RegExp(genFullRegExBody, 'g')
const genRegExForFirstLine = new RegExp(genFirstLineBody);

// const removeImport = `^(\\s)*import (${locationSpec})`
// const regExRemoveImport = new RegExp(removeImport, 'g')

module.exports = function (grunt) {
  // console.log(untildify(grunt.option('appDir')) + '/src/components/**/*.js');

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    replace: {
      addedCode: {
        src: [grunt.option('appDir') + '/src/components/**/*.jsx', grunt.option('appDir') +
        '/src/components/**/*.js'],
        overwrite: true,             // destination directory or file
        replacements: [
          {
            from: regExAddedCodeSection,
            to: function (matchedWord) {   // callback replacement
              const lines = matchedWord.split('\n');
              const firstLine = lines[0];
              const lastLine = lines[lines.length - 1];
              // grunt.log.write(`firstLine = ${firstLine}`);

              const match = regExForFirstLine.exec(firstLine + '\n');
              // console.log(`match: ${JSON.stringify(match, null, 2)}`);
              // const firstLineOpening = match[1];
              const unit = match[2];
              const component = match[3];
              const location = match[4];
              // const firstLineEnding = match[5];
              // console.log(`match found: unit: ${unit} component: ${component} location: ${location}`);
              // console.log(`content = ${JSON.stringify(addedCodeObject,null,2)}`);

              if (!addedCodeObject[unit] ||
                !addedCodeObject[unit][component] ||
                !addedCodeObject[unit][component][location]) {
                return firstLine + '\n' + lastLine.trimLeft();
              }

              const stringToInsert = firstLine + '\n' + addedCodeObject[unit][component][location] + lastLine.trimLeft();
              // console.log(`stringToInsert: ${stringToInsert}`);
              return stringToInsert;
            },
          },
        ],
      },

      replacedCode: {
        src: [grunt.option('appDir') + '/src/components/**/*.jsx', grunt.option('appDir') +
        '/src/components/**/*.js'],
        overwrite: true,             // destination directory or file
        replacements: [
          {
            from: regExGeneratedCodeSection,
            to: function (matchedWord) {   // callback replacement
              const lines = matchedWord.split('\n');
              const firstLine = lines[0];
              // const lastLine = lines[lines.length - 1];
              // console.log(`firstLine of gen = ${firstLine}`);
              // grunt.log.write(`lines of gen = ${JSON.stringify(lines, null, 2)}\n`);
              grunt.log.write(`firstLine of gen = ${firstLine}\n`);

              const match = genRegExForFirstLine.exec(firstLine + '\n');
              if (match) {
                console.log(`gen match found: ${JSON.stringify(match, null, 2)}\n`);
                // const firstLineOpening = match[1];
                const unit = match[2];
                const component = match[3];
                const location = match[4];
                // const firstLineEnding = match[5];
                console.log(`match found: unit: ${unit} component: ${component} location: ${location}`);
                // console.log(`content = ${JSON.stringify(addedCodeObject,null,2)}`);

                // if (!replacedCodeObject[unit]);
                // if (!replacedCodeObject[unit][component]) grunt.fatal(`ERROR adding the code: component '${component}' for unit '${unit}' not found`);
                if (!replacedCodeObject[unit] ||
                  !replacedCodeObject[unit][component] ||
                  !replacedCodeObject[unit][component][location]
                )  {
                  console.log('no replacement code.')
                  lines[0] = `// ns__start_section ${location}`
                  lines[lines.length - 1] = `// ns__end_section ${location}\n`
                  return lines.join('\n');
                }

                const stringToInsert = `// ns__start_replacement ${location}\n` +
                  replacedCodeObject[unit][component][location] +
                  `// ns__end_replacement ${location}\n`;
                console.log(`stringToInsert: ${stringToInsert}`);
                return stringToInsert;
              }
              grunt.log.write('no match found in gen\n');
            },
          },
        ],
      },

      // removedCode: {
      //   src: [grunt.option('appDir') + '/src/components/**/*.jsx', grunt.option('appDir') +
      //   '/src/components/**/*.js'],
      //   overwrite: true,             // destination directory or file
      //   replacements: [
      //     {
      //       from: regExRemoveImport,
      //       to: function (matchedWord, index, fullText, regexMatches) {   // callback replacement
      //         if (removedCodeObject[unit] &&
      //           removedCodeObject[unit][component] &&
      //           removedCodeObject[unit][component][location]
      //         ) {
      //           return `\n${regexMatches[0]}// removed_${regexMatches[1]}`
      //         }
      //         return matchedWord
      //       },
      //     },
      //   ],
      // },

    },
  });

  async function setCustomCodeObject() {
    // docs/addedCode.json
    // const baseDir = path.resolve(__dirname, grunt.option('appDir'));
    const addedCodeJsonFile = grunt.option('appDir') + '/docs/addedCode.json';
    // if (addedCodeJsonFile.substring(0, 5)!=='/home') addedCodeJsonFile = './' + grunt.option('appDir');
    console.log(`addedCodeJsonFile=${addedCodeJsonFile}`);

    const existsJsonFile = await fs.pathExists(addedCodeJsonFile);
    if (!existsJsonFile) {
      customCodeObject = {};
      fs.outputJson(addedCodeJsonFile, customCodeObject);
      console.log(`content = ${JSON.stringify(customCodeObject, null, 2)}`);
      return
    }

    try {
      customCodeObject = await fs.readJson(addedCodeJsonFile);
      addedCodeObject = customCodeObject.addedCode;
      replacedCodeObject = customCodeObject.replacedCode;
      // removedCodeObject = customCodeObject.removedCode;
      console.log(`content = ${JSON.stringify(customCodeObject, null, 2)}`);
    } catch (err) {
      grunt.fatal(`ERROR loading the added code: ${err}`);
    }
  }

  grunt.registerTask('setAddedCode', 'Grabs the added code from a json', async function () {
    // Force task into async mode and grab a handle to the "done" function.
    const done = this.async();

    // Get the added code
    setTimeout(async function () {
      await setCustomCodeObject();
      done();
    }, 1000);
  });

  // Load the plugin that provides the "replace" task.
  grunt.loadNpmTasks('grunt-text-replace');

  // Default task.
  // grunt.registerTask('default', ['replace']);
  grunt.registerTask('default', ['setAddedCode', 'replace']);
};
