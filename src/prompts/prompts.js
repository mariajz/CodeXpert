const Prompts = {
   CREATE_DOCKER_FILE: `
      Project Description:

      We are building a web application that utilizes Golang (version 1.13) as the programming language. The application connects to a PostgreSQL database for data management. The environment variables required for the database connection are DB_HOST, DB_USER, DB_PASSWORD, and DB_NAME. The application exposes port PORT_NUMBER. 
      Please construct a multi-stage Dockerfile to encapsulate this application.
      
      Guidelines:
      1. Use Golang 1.13 as the base image for the first stage.
      2. Utilize environment variables for the database connection DB_HOST, DB_USER, DB_PASSWORD, and DB_NAME. 
      3. Expose port PORT_NUMBER to allow external access to the application.
      4. Import all the necessary Golang 1.13 modules utilized in the project.
      5. Optimize the Dockerfile for the best practices and efficiency.
      6. Use the /cmd/server/ path as the entry file to build the project.
      
      Please create the Dockerfile keeping the guidelines in mind and ensure that the application runs smoothly within the Docker container.`,
};

module.exports = Prompts;
