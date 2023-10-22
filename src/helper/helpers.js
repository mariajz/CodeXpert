const getStringifiedPrompt = (prompt, values) => {
   const { DB_HOST, DB_USER, DB_PASSWORD, DB_NAME, PORT_NUMBER } = values;

   const filteredPrompt = prompt
      .replace(/DB_HOST/g, DB_HOST)
      .replace(/DB_USER/g, DB_USER)
      .replace(/DB_PASSWORD/g, DB_PASSWORD)
      .replace(/DB_NAME/g, DB_NAME)
      .replace(/PORT_NUMBER/g, PORT_NUMBER);

   const stringifiedPropt = JSON.stringify(filteredPrompt);

   return stringifiedPropt;
};

module.exports = { getStringifiedPrompt };
