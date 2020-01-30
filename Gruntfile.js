const fs = require('fs-extra');
// const path = require("path");
// const untildify = require('untildify');

let addedCodeObject = {};

// the following should not be here.  Should be exported from constants/regExAddedCodeSections.
// but grunt isn't set up to import from external ts files.
const commentOpen = '(\\/\\/|{\\/\\*)';
const endOfFirstLine = '( \\*\\/\\}\\n|\\n)';
const locationSpec = '(\\w*), comp: (\\w*), loc: (\\w*)';
const content = '((.|\n)*?)';
const firstLineBody = `${commentOpen} np__added_start unit: ${locationSpec}${endOfFirstLine}`;
// const firstLineMinusEndingBody = `${commentOpen} np__added_start unit: ${locationSpec}`;
const fullRegExBody = `${firstLineBody}${content}${commentOpen} np__added_end`;
const regExAddedCodeSection = new RegExp(fullRegExBody, 'g');
const regExForFirstLine = new RegExp(firstLineBody);

// const regExAddedCodeSection = /\/\/ np__added_start unit: (\w*), comp: (\w*), loc: (\w*)\n((.|\n)*?)\/\/ np__added_end/g;

module.exports = function(grunt) {

  // console.log(untildify(grunt.option('appDir')) + '/src/components/**/*.js');

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    replace: {
      addedCode: {
        src: [grunt.option('appDir')
              + '/src/components/**/*.js'],
        overwrite: true,             // destination directory or file
        replacements: [
          {
            from: regExAddedCodeSection,
            to: function (matchedWord) {   // callback replacement

              const lines = matchedWord.split('\n');
              const firstLine = lines[0];
              const lastLine = lines[lines.length-1];
              console.log(`firstLine = ${firstLine}`);

              match = regExForFirstLine.exec(firstLine + '\n');
              console.log(`match: ${JSON.stringify(match,null, 2)}`);
              const firstLineOpening = match[1];
              const unit = match[2];
              const component = match[3];
              const location = match[4];
              const firstLineEnding = match[5];
              console.log(`match found: unit: ${unit} component: ${component} location: ${location}`);
              // console.log(`content = ${JSON.stringify(addedCodeObject,null,2)}`);

              if (!addedCodeObject[unit]) grunt.fatal(`ERROR adding the code: unit '${unit}' not found`);
              if (!addedCodeObject[unit][component]) grunt.fatal(`ERROR adding the code: component '${component}' for unit '${unit}' not found`);
              if (!addedCodeObject[unit][component][location]) grunt.fatal(`ERROR adding the code: location '${location}' in component '${component}' for unit '${unit}' not found`);

              const stringToInsert = firstLine + '\n' + addedCodeObject[unit][component][location] + lastLine.trimLeft();
              // console.log(`stringToInsert: ${stringToInsert}`);
              return stringToInsert;
            }
        }
        ]
      }
    }
  });

  async function setAddedCodeObject() {
    // docs/addedCode.json
    // const baseDir = path.resolve(__dirname, grunt.option('appDir'));
    let addedCodeJsonFile = grunt.option('appDir') + '/docs/addedCode.json';
    // if (addedCodeJsonFile.substring(0, 5)!=='/home') addedCodeJsonFile = './' + grunt.option('appDir');
    console.log(`addedCodeJsonFile=${addedCodeJsonFile}`);

    const existsJsonFile = await fs.pathExists(addedCodeJsonFile);
    if (!existsJsonFile) {
      addedCodeObject = {};
      console.log(`content = ${JSON.stringify(addedCodeObject,null,2)}`);
      return
    }

    try {
      addedCodeObject = await fs.readJson( addedCodeJsonFile);
      console.log(`content = ${JSON.stringify(addedCodeObject,null,2)}`);
    } catch (err) {
      grunt.fatal(`ERROR loading the added code: ${err}`);
    }
  }

  grunt.registerTask('setAddedCode', 'Grabs the added code from a json', async function () {
    // Force task into async mode and grab a handle to the "done" function.
    let done = this.async();

    // Get the added code
    setTimeout(async function() {
      await setAddedCodeObject();
      done();
    }, 1000);
  });

  // Load the plugin that provides the "replace" task.
  grunt.loadNpmTasks('grunt-text-replace');

  // Default task.
  // grunt.registerTask('default', ['replace']);
  grunt.registerTask('default', ['setAddedCode','replace']);
};
