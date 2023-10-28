const baseHTML = ` <!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Sample Input Prompt</title>
    <style>
        .container {
            font-family: Arial, sans-serif;
            margin: 0 auto;
        }

        .prompt {
            white-space: pre-wrap;
            padding: 10px;
            border: 1px solid #ccc;
        }
    </style>
</head>
<body>
    <h1>Sample Prompt</h1>
    <div class="container">
      <div class="prompt">
         <p>
             FILTERED_PROMPT
         </p>
      </div>
   </div>
</body>
</html>`;

const regexMap = {
   DB_HOST: /^[a-zA-Z0-9]+$/,
   DB_USER: /^[a-zA-Z0-9]+$/,
   DB_PASSWORD: /^[a-zA-Z0-9]+$/,
   DB_NAME: /^[a-zA-Z]+$/,
   PORT_NUMBER: /^\d+$/,
};

let nonEmptyValues = {
   LANGUAGE: null,
   PORT_NUMBER: null,
   EXECUTEFILEPATH: null,
};

module.exports = {
   baseHTML,
   regexMap,
   nonEmptyValues,
};
