const baseHTML = ` <!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
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

const treeHTML =`<!DOCTYPE html>
<html>
<head>
    <link href='https://fonts.googleapis.com/css?family=Roboto:400,500' rel='stylesheet' type='text/css'>
    <style>
        * {
            font-family: "Roboto", sans-serif;
        }

        body {
            background: #5f6f72;
        }

        .heading {
            font-weight: 400;
            text-align: center;
            background: #293538;
            margin: 0;
            color: white;
            padding: 10px 0;
        }

        .wrapper {
            padding: 20px 10px;
            margin: 0 auto;
            width: 400px;
        }

        .file-browser {
            background: #364346;
            color: white;
            padding: 20px 10px;
            width: 400px;
        }

        .file {
            color: #eee;
            display: block;
            list-style: none;
        }

        .folder {
            list-style: none;
            cursor: pointer;
            margin: 4px 0;
        }

        .folder > ul {
            display: none;
        }

        .folder:before {
            padding: 5px;
            height: 10px;
            width: 10px;
            text-align: center;
            line-height: 10px;
            background: #5f6f72;
            border-radius: 1px;
            display: inline-block;
            content: '+';
        }

        .folder-open > ul {
            display: block;
            padding-left: 15px;
            margin-left: 9px;
            border-left: 2px solid #5f6f72;
        }

        .folder-open:before {
            content: '-';
        }
    </style>
</head>
<body>
    <h3 class="heading">Project Holistic View </h3>
    <div class="wrapper">
        <div class="file-browser">
            <ul>
                FILE_TREE
            </ul>
        </div>
    </div>
</body>
<script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
<script src="SCRIPT_URI"></script>

</html>`;

module.exports = {
   baseHTML,
   regexMap,
   nonEmptyValues,
    treeHTML,
};
