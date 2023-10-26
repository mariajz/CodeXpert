const Prompts = {
   CREATE_DOCKER_FILE: `
      Project Description:
      
      We are developing a web application in ##LANGUAGE##. The application interacts with a ##DBTYPE## database for data management. The required environment variables are ##ENV_VARIABLE_LIST##. The application should expose port ##PORT_NUMBER##. Please create a multi-stage Dockerfile to encapsulate this application.

      Guidelines:

      1. Utilize ##LANGUAGE## as the base image for the first stage.
      2. Include environment variables  ##ENV_VARIABLE_LIST##.
      3. Expose port ##PORT_NUMBER## to enable external access to the application.
      4. Import all the necessary ##LANGUAGE## libraries utilized in the project.
      5. Use the ##EXECUTEFILEPATH## path as the entry file to build the project.
      6. Construct the Dockerfile adhering to these guidelines to ensure a smooth application run within the Docker container.`,
};

module.exports = Prompts;
