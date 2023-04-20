module.exports = {
  apps: [
    {
      name: "database",
      script: "./database/dist/main.js",
    },
    {
      name: "email",
      script: "./email/dist/main.js",
    },
  ],
};
