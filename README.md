# CodeXpert

This project is an experimental endeavor for the Thoughtworks AI4SoftwareDeliveryFestival Hackathon, aimed at developing a Visual Studio Code extension that seamlessly integrates with various GenAI tools. The primary objective is to enhance the development experience by providing intelligent, generative capabilities directly within the VS Code environment.

> This project is currently in the evolving phase. We have successfully implemented a basic framework for interaction with GenAI tools and are working towards refining the integration for a more seamless experience.

## Requirements

-  VS Code
-  PaLM Api Key: [Get your key here](https://developers.generativeai.google/tutorials/setup/)

## Supported Commands

-  `Generate Template`: Generates a predefined HTML template
-  `Call PaLM API`: Calls PaLM api with a predefined prompt and displys result in vscode window

## Getting Started

#### 1. Setup the workspace

```
git clone git@github.com:mariajz/CodeXpert.git
```

cd into the repo, and run `yarn`

Open `src/constants/constants.js` and add your PaLM Api key

#### 2. Run the extension in debug mode

-  Go to Run and Debug Tab -> run extension , the extension will now open in a new "Extension development host" window
-  Open command pallette `Cmd + shift + P` -> type down any of the supported commands, eg: `Generate Template`

#### 3. Generate and run packaged Extension

```
vsce package
```

This generates a `.vsix` file, which can be installed and used for testing the extension locally

---

**Happy Coding!**
