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
   4. The commit message should have title and optionally a description, seperated by a \\n. The title should be maximum 50 characters and description should be maximum 200 characters.
   
   Instructions:
   1. You will receive a diff containing the changes made.
   2. Generate a commit message in Commitizen format.
   3. The commit message should follow this structure:
      - Type: [feat], [fix], [chore], [docs], [style], [refactor], [test], or [perf]
      - Main Line: A concise summary of what the commit accomplishes.
      - Description: Additional details about the changes (optional but encouraged)
   4. If description is present, there should compulsorily be a \\n added between the main line and the description
   
   Example commit message:
   [feat] Enhance application security by implementing stricter input validations \\n - Address potential vulnerabilities in the login and registration forms. \\n - Recent security audit highlighting potential risks in user input handling.

`,
   CODE_REVIEW: `Read the following diff and review the code, output only the issues with the code : \n\n ##GIT_FULL_DIFF##`,
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
};

module.exports = Prompts;
