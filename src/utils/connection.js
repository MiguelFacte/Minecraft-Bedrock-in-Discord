const uuid = require('uuid');

async function join(socket, wss, app) {
    console.log(`\x1b[34m[${String(new Date).split(" ", 5).join(" ")}]\x1b[0m \x1b[35m[WS]\x1b[0m` + `\x1b[37m Connected: \x1b[32m${app}\x1b[0m`)
    socket.send(JSON.stringify({
        "header": {
            "version": 1, "requestId": uuid.v4(), "messageType": "commandRequest", "messagePurpose": "subscribe"
        },
        "body": {
            "eventName": "PlayerMessage"
        },
    }))
    socket.send(JSON.stringify({
        "header": { "version": 1, "requestId": uuid.v4(), "messagePurpose": "commandRequest", "messageType": "commandRequest" },
        "body": {
            "commandLine": `say §7You have successfully connected to the server.\n§f- §7Use §l/connect off§r§7 to disconnect the server from the world.`
        }
    }))
    socket.send(JSON.stringify({
        "header": { "version": 1, "requestId": uuid.v4(), "messagePurpose": "commandRequest", "messageType": "commandRequest" },
        "body": {
            "commandLine": `playsound note.pling @a`
        }
    }))
    socket.send(JSON.stringify({
        "header": { "version": 1, "requestId": uuid.v4(), "messagePurpose": "commandRequest", "messageType": "commandRequest" },
        "body": {
            "commandLine": `title @a title §l§aConnected Server`
        }
    }))
    socket.send(JSON.stringify({
        "header": { "version": 1, "requestId": uuid.v4(), "messagePurpose": "commandRequest", "messageType": "commandRequest" },
        "body": {
            "commandLine": `title @a subtitle §fBy MiguelFacte`
        }
    }))
}

module.exports = { join };