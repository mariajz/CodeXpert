const Prompts = {
   DBTYPE: `The application interacts with a ##DBTYPE## database for data management.`,
   ENV_VARIABLE_LIST: `The required environment variables are ##ENV_VARIABLE_LIST##.`,
   CREATE_DOCKER_FILE: `
      Project Description:
      
      We are developing a web application in ##LANGUAGE##. ##DBTYPE## ##ENV_VARIABLE_LIST## The application should expose port ##PORT_NUMBER##. Please create a multi-stage Dockerfile to encapsulate this application.

      Guidelines:

      Utilize ##LANGUAGE## as the base image for the first stage.
      Include environment variables  ##ENV_VARIABLE_LIST##.
      Expose port ##PORT_NUMBER## to enable external access to the application.
      Import all the necessary ##LANGUAGE## libraries utilized in the project.
      Use the ##EXECUTEFILEPATH## path as the entry file to build the project.
      Construct the Dockerfile adhering to these guidelines to ensure a smooth application run within the Docker container.`,
};

module.exports = Prompts;
