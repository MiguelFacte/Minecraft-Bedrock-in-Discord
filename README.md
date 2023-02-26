# Minecraft Bedrock in Discord
Connect Minecraft Bedrock chat with Discord chat using WebSocket and Discord.js v14

## Installation

Requires [Node.js](https://nodejs.org/) to run.

Install the dependencies and start the server.

```sh
npm i discord.js
npm i node-os-utils
npm i os
npm i uuid
npm i ws
```

You must fill the [config.json](https://github.com/MiguelFacte/Minecraft-Bedrock-in-Discord/blob/main/src/config/config.json) file with the information that is requested. You can get the token here [Discord Developer](https://discord.com/developers/applications), by registering a new app.
![Screenshot](https://cdn.discordapp.com/attachments/911045186027671582/1079267304241635399/image.png)
```json
{
  "port": "9090",
  "Discord": [
    {
      "token": "Your Discord bot token",
      "CHANNEL_ID": "ID of the channel you want to receive and send messages",
      "WebHook_URL": "Webhook URL link",
      "WebHook_iconURL": "https://cdn.discordapp.com/emojis/1079239833957974046.webp?size=96&quality=lossless"
    }
  ]
}
```

## Run the WebSocket
To run the WebSocket, you have to open a console and run the following command
```sh
node .
```
## Connect with Minecraft Bedrock
To connect the WebSocket with Minecraft Bedrock, you must write the ```/connect``` command, then put your ipv4 and followed by the port, in this case in the [config.json](https://github.com/MiguelFacte/Minecraft-Bedrock-in-Discord/blob/main/src/config/config.json) file it is defined as 9090 in the port, so through that port will connect
#### Example:
```sh
/connect 192.168.1.5:9090
```

##### Do you have any question?
If so, do not hesitate to enter my [Discord server](https://discord.gg/bAEZqtxr82).
