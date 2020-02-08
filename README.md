# Slack Autoreply

A quick-and-dirty out-of-office Slack autoreply based on NodeJS.

![example image](https://yongzhenlow.github.com/slack-autoreply/images/example.png)

Sends an [ephemeral message](https://api.slack.com/methods/chat.postEphemeral) when someone DMs you. Use [`chat.postMessage`](https://api.slack.com/methods/chat.postMessage) if you want to send an actual message.

You'll need `NodeJS` (tested on 12.15.0) and the [Slack legacy token](https://api.slack.com/legacy/custom-integrations/legacy-tokens).

## Development

Clone the `.env.example` file to `.env`

```bash
cp .env.example .env
```

Request your [Slack legacy token](https://api.slack.com/legacy/custom-integrations/legacy-tokens) and replace `xoxp-your-token` in the `.env` file with it.

### Run the app in development mode

```bash
yarn dev
```

## Production setup

Install [pm2](https://pm2.keymetrics.io/docs/usage/quick-start/)

```bash
npm install pm2@latest -g
```

Start the server by running

```bash
pm2 start server.js --name your-app-name
```

Alternatively, for convenience you can create a `ecosystem.config.js` config file with the following example and simply run `pm2 start`

```js
module.exports = {
  apps: [
    {
      name: "your-app-name",
      script: "server.js"
    }
  ]
};
```

The `server.js` uses the "Require hook" hack, check it out [here](https://pm2.keymetrics.io/docs/tutorials/using-transpilers-with-pm2#require-hook).

**Enjoy!**
