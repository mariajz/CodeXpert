const htmlContent = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta http-equiv="X-UA-Compatible" content="ie=edge" />
    <title>Document</title>
    <link rel="stylesheet" href="app.css" />
</head>
<body>
    <script src="app.js"></script>
</body>
</html>
        `;

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

let validValues = {
   DB_HOST: null,
   DB_USER: null,
   DB_PASSWORD: null,
   DB_NAME: null,
   PORT_NUMBER: null,
};

let nonEmptyValues = {
   LANGUAGE: null,
   PORT_NUMBER: null,
   EXECUTEFILEPATH: null,
};

module.exports = {
   htmlContent,
   baseHTML,
   regexMap,
   validValues,
   nonEmptyValues,
};
