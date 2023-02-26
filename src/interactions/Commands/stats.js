const os = require('os');
const osu = require('node-os-utils')
const uuid = require('uuid');
const config = require('../../config/config.json');

module.exports = {
    name: "!stats",

    execute(socket, mensaje, sender, wss, startTime, client) {
        
        function getUptime() {
            const now = Date.now();
            const uptime = now - startTime;
            const seconds = Math.floor(uptime / 1000) % 60;
            const minutes = Math.floor(uptime / (1000 * 60)) % 60;
            const hours = Math.floor(uptime / (1000 * 60 * 60)) % 24;
            const days = Math.floor(uptime / (1000 * 60 * 60 * 24));
            return `${days} Days, ${hours} Hours, ${minutes} Minutes, ${seconds} Seconds`;
        }

        const usedMemory = os.totalmem() - os.freemem(), totalMemory = os.totalmem();
        const getpercentage = ((usedMemory / totalMemory) * 100).toFixed(2) + '%'
        osu.cpu.usage().then(cpuPercentage => {
            socket.send(JSON.stringify({
                "header": {
                    "version": 1,
                    "requestId": uuid.v4(),
                    "messagePurpose": "commandRequest",
                    "messageType": "commandRequest"
                },
                "body": {
                    "commandLine": `tellraw @a {"rawtext":[{"text":"§8[§eStatus§8]: §r§fShowing server status\n\n§a§lServer§r:\n§9§lServer Started: §r§f[${new Date(startTime).toLocaleString()}]§r\n§9§lServer Time: §r§f[${String(new Date).split(" ", 5).join(" ")}]§r\n§9§lCpu: §r§f${cpuPercentage}§r\n§9§lMemory: §r§f${(usedMemory / Math.pow(1024, 3)).toFixed(2)}mb | ${getpercentage}§r\n§9§lUptime: §r§f${getUptime()}.\n\n§a§lDiscord§r:\n§9§lChannel: §r§a${config.Discord[0].CHANNEL_ID}§r\n\n§9§lSupport: §r§fhttps://discord.gg/bAEZqtxr82"}]}`
                }
            }))
        })
    }
}