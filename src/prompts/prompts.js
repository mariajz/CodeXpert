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
   SMART_COMMIT_MESSAGE: `
   Generate Git commit message

   Context:
   You're preparing to commit changes to your Git repository. The following changes are staged for commit:
   ##GIT_DIFF##

   Please provide a comprehensive commit message that clearly explains the reasoning behind the modifications. Focus on the "why" rather than just the "what." Consider the following guidelines to ensure your commit message effectively communicates the motivation behind the changes:
   
   Guidelines:
   1. Begin the commit message by clearly explaining the underlying problem, opportunity, or goal that drove the changes related to the staged files.
   2. Provide detailed context or background information that sheds light on the factors influencing the decision to implement these modifications.
   3. Use descriptive language to emphasize the impact of the changes and how they contribute to the broader objectives of the project.
   4. The commit message should have title and optionally a description, seperated by a #. 
   
   Instructions:
   1. You will receive a diff containing the changes made.
   2. Generate a commit message in Commitizen format.
   3. The commit message should follow this structure:
      - Type: [feat], [fix], [chore], [docs], [style], [refactor], [test], or [perf]
      - Main Line: A concise summary of what the commit accomplishes.
      - Description: Additional details about the changes (optional but encouraged)
   4. If description is present, there should compulsorily be a # added between the main line and the description. Each line of description should start with a #.
   5. The title should be maximum 100 characters and each description should be maximum 100 characters. Total commit message should be maximum 500 characters.
   6. You need not list all the changes in the commit, instead focus on the impact of those changes. 
   
   Example commit message:
   [feat] Enhance application security by implementing stricter input validations # Address potential vulnerabilities in the login and registration forms. # Recent security audit highlighting potential risks in user input handling.

`,
   CODE_REVIEW: `
   You are working on a codebase and need to conduct a comprehensive code review. During the review, you need to look for the following issues:

   1. Violations of SOLID principles.
   2. Any potential security violations or insecure coding practices.
   3. Instances of anti-design patterns that need to be refactored.
   4. Any potential memory leaks that may occur within the code.
   5. Are variable and function names clear and descriptive?
   6. Is the code properly indented and formatted following the project's style guide?
   7. Does the code accomplish its intended purpose?
   8. Are there any logical errors or edge cases that need attention?
   9. Are there any bottlenecks or inefficiencies that should be addressed?
   10. Are data structures and algorithms used appropriately?
   11. Are exceptions and error handling mechanisms in place where necessary?
   12. Are error messages informative and helpful?
   13. Are there sufficient unit tests covering the code?
   14. Is there inline documentation explaining complex logic or algorithms?
   15. Are there any potential security vulnerabilities or risks in the code?
   16. Is sensitive information handled appropriately?
   17. Is the code modular and organized for easy maintenance and future extensions?
   18. Are there any code smells or anti-patterns that should be addressed?

   You're tasked with thoroughly examining the codebase and providing detailed feedback on the identified issues. Please review the code snippet below and provide actionable recommendations for each issue you encounter.

   Code Snippet diff:
   ##GIT_FULL_DIFF##

   Please thoroughly assess the code, identify any violations or issues related to the specified criteria, and suggest appropriate solutions for each problem.
`,
   EXPLAIN_CODE: `You have been provided with a Spring Boot code base that contains a controller, service, model with multiple methods, endpoints, and request mappings. Your task is to read the source code and document the key methods, endpoints, request mappings, and any important logic within this controller.

   ## Instructions 
   1. Read the code annotations and comments to understand the purpose of the controller, service, and model.
   2. Read the method definitions and call to understand the flow of the code.
   3. If the class is controller include request mapping and if its other class request mapping must be nil with quotes.
   4. Remove the method arguments just use () 
   5. Do not include any java library functions here. Only include function name in function_calls not arguments
   6. Convert the result into json format
   7. JSON format should be in following format for the given java code
   public class ShoppingCartController{
   @GetMapping("/shoppingCart")
       public ModelAndView shoppingCart() {
           ModelAndView modelAndView = new ModelAndView("/shoppingCart");
           modelAndView.addObject("products", shoppingCartService.getProductsInCart());
           modelAndView.addObject("total", shoppingCartService.getTotal().toString());
           return modelAndView;
       }
   }
   
   [{
      "class": "ShoppingCartController",
      "method": "shoppingCart",
      "description": "This method is used to get the products in cart and total amount and return the view",
      "function_calls": ["shoppingCartService.getProductsInCart()", "shoppingCartService.getTotal().toString()"]
   }]
   
   function_calls must have class name followed by method name without arguments
   
   now generate the json for all the methods in the given java code as below`,
   DOCKER_HELP: `
   Task: Create docker commands based on user's requirements

   Instructions:
   1. You will receive a user input which can be anything like logs, images, containers, etc.
   2. Create a docker command based on the user input.

   User input is the following: ##DOCKER_HELP##`,
   ISSUES: `Issues User Reported with the above dockerfile or what the user wants to update : ##ISSUES##`,
   UPDATE_DOCKER: `
   Task: Update Dockerfile

   Description:
   You have been tasked with updating a Dockerfile for a project. The Dockerfile is used to build a containerized application. The goal is to make necessary changes or improvements to the Dockerfile to ensure the application runs smoothly and efficiently within the container.

   Instructions:
   1. Review the existing Dockerfile provided below.
   2. Identify any potential improvements or updates that could enhance the containerization process.
   3. Make specific recommendations or changes to the Dockerfile, including but not limited to:
      - Updating base images
      - Adding or removing dependencies
      - Optimizing build steps
      - Setting environment variables
      - Configuring ports or volumes
      - Any other modifications that you believe are beneficial.
   4. Provide clear explanations for each change you recommend, if applicable.

   Existing Dockerfile Content:

   ##DOCKERFILE##

   ##ISSUES##

   Please provide the updated Dockerfile with your recommended changes along with explanations for each modification. If a change is not necessary, please state so. If you are unable to provide a solution, please state so and provide a brief explanation of why you were unable to complete the task. 

   Your response should be of the following format:
   **DOCKERFILE**
   <insert content of new dockerfile here>
   **EXPLANATION**
   <insert explanation of changes made here>
`,
};

module.exports = Prompts;
