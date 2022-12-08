const inquirer = require("inquirer");
const fs = require("fs");

const generateREADME = ({
  title,
  description,
  install,
  usage,
  license,
  credit,
  tests,
  questions,
}) =>
  //`${badges}
    `# ${title}

## Description

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

inquirer
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
  .then((answers) => {
    const readmePageContent = generateREADME(answers);

    fs.writeFile("README.md", readmePageContent, (err) =>
      err
        ? console.log(err)
        : console.log("Successfully created README.md file!")
    );
  });
