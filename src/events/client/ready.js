const { ActivityType } = require('discord.js');
module.exports = client => {
    console.log(`\x1b[34m[${String(new Date).split(" ", 5).join(" ")}]\x1b[0m \x1b[35m[BOT]\x1b[0m Online: \x1b[32m${client.user.tag}\x1b[0m`)
    client.user.setPresence({
        activities: [{
            name: `your messages`,
            type: ActivityType.Watching,
        }],
        status: `online`,
    });
}