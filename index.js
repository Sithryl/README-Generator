const inquirer = require("inquirer");
const fs = require("fs");

function renderLicenseBadge(license) {
  if (license) {
    return `[!${license} license](https://img.shields.io/badge/License-${license}-blue.svg)](${renderLicenceLink(license)})`
  } else {
    return ''
  }
}

function renderLicenceLink(license) {
  if (license === 'MIT') {
    return 'https://mit-license.org/'
  }
  if (license === 'Apache') {
    return 'https://www.apache.org/licenses/LICENSE-2.0.html'
  }
  if (license === 'Boost') {
    return 'https://www.boost.org/users/license.html'
  }
  if (license === 'Eclipse') {
    return 'https://www.eclipse.org/legal/epl-2.0/'
  }
  if (license === 'Mozilla') {
    return 'https://www.mozilla.org/en-US/MPL/'
  }
}

const generateREADME = ({
  // input name values
  title,
  description,
  install,
  usage,
  license,
  credit,
  questions,
}) =>
  // README layout
  `# ${title}

## Description
${renderLicenseBadge(license)}

${description}

## Table of Contents

-[Installation](#installation)

-[Usage](#usage)

-[License](#license)

-[Credits](#credits)

-[Test](#test)

-[Questions](#questions)

## Installation

${install}

## Usage

${usage}

## License

${license}

## Credits

${credit}

## Test

Add a preview here

## Questions

Contact me at ${questions}`;
// prompts for readme info
const readmeInput = inquirer
  .prompt([
    {
      type: "input",
      name: "title",
      message: "What is your project title?",
    },
    {
      type: "input",
      name: "description",
      message: "What is a brief description of your application?",
    },
    {
      type: "input",
      name: "install",
      message: "Do you have any notes about installation?",
    },
    {
      type: "input",
      name: "usage",
      message: "Any notes on using this application?",
    },
    {
      type: "checkbox",
      name: "license",
      message: "What licenses can apply to this application?",
      choices: ["MIT", "Apache", "Boost", "Eclipse", "Mozilla"],
    },
    {
      type: "input",
      name: "credit",
      message:
        "Is there any credit you would like to give to someone/something?",
    },
    {
      type: "input",
      name: "questions",
      message: "Enter your Github URL.",
    },
  ])
  // take answers and put them in the readme layout with success message
  .then((answers) => {
    const readmePageContent = generateREADME(answers);
    // generate readme file
    fs.writeFile("README.md", readmePageContent, (err) =>
      err
        ? console.log(err)
        : console.log("Successfully created README.md file!")
    );
  });
