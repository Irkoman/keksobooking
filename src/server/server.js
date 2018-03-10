const express = require(`express`);
const userInput = require(`../user-input`);
const offerStore = require(`./offers/store`);
const imageStore = require(`./images/store`);
const offersRouter = require(`./offers/route`)(offerStore, imageStore);

const app = express();
app.use(express.static(`static`));
app.use(`/api/offers`, offersRouter);

const HOSTNAME = `127.0.0.1`;

module.exports = {
  name: `--server`,
  description: `Starts server`,
  execute: async () => {
    const port = await userInput.getServerInfo();
    const serverAddress = `http://${HOSTNAME}:${port}/`;

    app.listen(port, HOSTNAME, () => {
      return console.log(`Server is running at ${serverAddress}`);
    });
  },
  app
};
