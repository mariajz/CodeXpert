const baseHTML = ` <!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Sample Input Prompt</title>
</head>
<body>
    <h1>Sample Prompt</h1>
    <p>FILTERED_PROMPT</p>
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
