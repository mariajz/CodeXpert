# CodeXpert

This project is an experimental endeavor for the Thoughtworks AI4SoftwareDeliveryFestival Hackathon, aimed at developing a Visual Studio Code extension that seamlessly integrates with various GenAI tools. The primary objective is to enhance the development experience by providing intelligent, generative capabilities directly within the VS Code environment.

> This project is currently in the evolving phase. We have successfully implemented a basic framework for interaction with GenAI tools and are working towards refining the integration for a more seamless experience.

## Requirements

-  VS Code
-  PaLM Api Key: [Get your key here](https://developers.generativeai.google/tutorials/setup/)
-  OpenAI APi Key: [Get your key here](https://platform.openai.com/account/api-keys)

## Supported Commands

-  `Toggle Api Type` : Allows you to toggle between PaLM Api (Free) and Open AI Code Completions Api (Paid)
-  `Setup Workspace` : Setup the keys required for the extension
-  `Create Docker File` : Create a `Dockerfile` with minimal inputs
-  `Docker Help` : Get any docker command
-  `Update DockerFile` : Get suggestions for your existing dockerfile,
-  `Smart Commit` : Create a commit message from the staged files
-  `Code Review` : Get your staged code reviewed by AI
-  `Explain Code` : Get an AI delivered explantion for any intricate code

## Getting Started

### 1. Running the downloaded extension

Download the latest release from [this link](https://github.com/mariajz/CodeXpert/releases) and install `.vsix` package

### 2. Setup Actions

1. Open CodeXpert extension from side panel, choose `Setup Workspace` and add your keys. Adding any one key is sufficient.
2. Select `Toggle Api Type` and choose your preferred api type
3. Try out any of the tools from side panel or open command pallette `Cmd + shift + P` -> type down any of the supported commands, eg: `Docker Help`

### 3. Run the extension in debug mode

If you wish to try out running the extension in debug mode, follow the below steps:

#### 1. Setup the workspace

-  Clone the repo : `git clone git@github.com:mariajz/CodeXpert.git`
-  cd into the repo, and run `yarn`

#### 2. Run the extension

-  Go to Run and Debug Tab -> run extension , the extension will now open in a new "Extension development host" window
-  CodeXpert extension will now apprear in side panel
-  Do the Setup Actions as above

#### 3. Generate and run packaged Extension

```
vsce package
```

This generates a `.vsix` file, which can be installed and used for testing the extension locally

---

**Happy Coding!** 🚀
