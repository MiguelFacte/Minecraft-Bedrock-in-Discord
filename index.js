const config = require('./src/config/config.json')
const { Client, GatewayIntentBits, Partials, Collection, WebhookClient } = require('discord.js');
const webhook = new WebhookClient({ url: config.Discord[0].WebHook_URL })
const WebSocket = require('ws');
const uuid = require('uuid');
const wss = new WebSocket.Server({ port: config.port });
const connection = require('./src/utils/connection');
const os = require('os');
const fs = require('fs');
const startTime = Date.now();

//Discord Bot
const client = new Client({
    restTimeOffset: 0,
    fetchAllMembers: true,
    partials: [Partials.User, Partials.Channel, Partials.GuildMember, Partials.Message, Partials.Reaction],
    intents: [
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.GuildWebhooks,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildEmojisAndStickers,
        GatewayIntentBits.GuildMessageReactions,
        GatewayIntentBits.Guilds,
    ],
    allowedMentions: {
        parse: ["everyone", "roles", "users"],
        repliedUser: false,
    },
})

module.exports.client = client
client.slashCommands = new Collection();

function requerirhandlers() {
    ["error", "events", "SlashCommands"].forEach(handler => {
        try {
            require(`./src/handlers/${handler}`)(client)
        } catch (e) {
            console.log(e)
        }
    })
}
requerirhandlers();

client.login(config.Discord[0].token)

//WebSocket
const commands = {};
const commandFiles = fs.readdirSync('./src/interactions/Commands').filter(file => file.endsWith('.js'));
for (const file of commandFiles) {
    const command = require(`./src/interactions/Commands/${file}`);
    commands[command.name] = command;
}

console.log(`\x1b[34m[${String(new Date).split(" ", 5).join(" ")}]\x1b[0m \x1b[35m[WS]\x1b[0m \x1b[37mWebSocket Online\x1b[0m`);
console.log(`\x1b[34m[${String(new Date).split(" ", 5).join(" ")}]\x1b[0m \x1b[35m[WS]\x1b[0m \x1b[37mWebSocket Port: \x1b[32m${config.port}\x1b[0m`);
console.log(`\x1b[34m[${String(new Date).split(" ", 5).join(" ")}]\x1b[0m \x1b[35m[WS]\x1b[0m \x1b[37mCommands: \x1b[32m${Object.keys(commands).length}\x1b[0m`);

const interfaces = os.networkInterfaces();
for (const interfaceName in interfaces) {
    const interface = interfaces[interfaceName];
    for (const address of interface) {
        if (!address.internal && address.family === 'IPv4') {
            console.log(`\x1b[34m[${String(new Date).split(" ", 5).join(" ")}]\x1b[0m \x1b[35m[WS]\x1b[0m \x1b[37mIPv4: \x1b[32m${address.address}\x1b[0m`);
        }
    }
}

wss.on('connection', (socket, req) => {

    const ip = req.socket.remoteAddress;
    const app = ip.replace("::ffff:", "");

    connection.join(socket, wss, app, true);

    client.on('messageCreate', async (message) => {
        if (!message.guild || !message.channel || message.author.bot) return;
        if (message.channel.id === config.Discord[0].CHANNEL_ID) {
            socket.send(JSON.stringify({
                "header": { "version": 1, "requestId": uuid.v4(), "messagePurpose": "commandRequest", "messageType": "commandRequest" },
                "body": {
                    "commandLine": `tellraw @a {"rawtext":[{"text":"§7[§9Discord§7]§r §7${message.author.tag}: §f${message.content}"}]}`
                }
            }))
        }
    })

    socket.on('message', async (packet) => {
        if (!(JSON.parse(packet).header.eventName == 'PlayerMessage' && JSON.parse(packet).body.type == 'chat')) return;
        const res = JSON.parse(packet);
        let message = JSON.parse(packet).body.message;
        let sender = JSON.parse(packet).body.sender

        if (!res.body.message.startsWith('!')) {
            webhook.send({
                username: sender,
                avatarURL: config.Discord[0].WebHook_iconURL,
                content: message
            }).catch((error) => {
                client.channels.cache.get(config.Discord[0].CHANNEL_ID).send(`${sender}: ${message}`)
            })
        } else {
            const command = commands[message];
            if (command) {
                command.execute(socket, message, sender, wss, startTime, uuid, client);
            } else {
                if (res.body.message.length < 2) return;
                socket.send(JSON.stringify({
                    "header": { "version": 1, "requestId": uuid.v4(), "messagePurpose": "commandRequest", "messageType": "commandRequest" },
                    "body": {
                        "commandLine": `say Command not found.`
                    }
                }))
            }
        }
    });

    socket.addEventListener('close', (event) => {
        console.log(`\x1b[34m[${String(new Date).split(" ", 5).join(" ")}]\x1b[0m \x1b[35m[WS]\x1b[0m` + `\x1b[37m Disconnected: \x1b[32m${app}\x1b[0m`)
    });
});