const { EmbedBuilder } = require("discord.js")
const os = require('os');
const osu = require('node-os-utils')
const config = require('../../../config/config.json');

module.exports = {
    name: "stats",
    description: "Shows the status of the server.",

    run: async (client, interaction, message, startTime) => {

        await interaction.deferReply();

        let userCounts = client.guilds.cache.reduce(
            (acc, guild) => acc + guild.memberCount,
            0
        );

        function getUptime() {
            let days = Math.floor(client.uptime / 86400000)
            let hours = Math.floor(client.uptime / 3600000) % 24
            let minutues = Math.floor(client.uptime / 60000) % 60
            let seconds = Math.floor(client.uptime / 1000) % 60
            return `${days} Days, ${hours} Hours, ${minutues} Minutes, ${seconds} Seconds`;
        }

        var usedMemory = os.totalmem() - os.freemem(), totalMemory = os.totalmem();
        var getpercentage = ((usedMemory / totalMemory) * 100).toFixed(2) + '%'
        osu.cpu.usage().then(cpuPercentage => {
            return interaction.editReply({
                embeds:
                    [new EmbedBuilder()
                        .setAuthor({ name: client.user.tag, iconURL: client.user.displayAvatarURL() })
                        .setTitle("Server stats")
                        .addFields(
                            { name: 'Server Time:', value: `\`\`\`[${String(new Date).split(" ", 5).join(" ")}]\`\`\``, inline: false },
                            { name: 'Cpu:', value: `${cpuPercentage}`, inline: true },
                            { name: 'Memory:', value: `${(usedMemory / Math.pow(1024, 3)).toFixed(2)}mb | ${getpercentage}`, inline: true },
                            { name: 'Discord Ping:', value: `${Math.floor(client.ws.ping)}ms`, inline: true },
                            { name: 'Users:', value: `${userCounts}`, inline: true },
                            { name: 'Commands', value: `${client.slashCommands.size}`, inline: true },
                            { name: 'Selected channel', value: `<#${config.Discord[0].CHANNEL_ID}>`, inline: true},
                            { name: 'Uptime:', value: `\`\`\`${getUptime()}\`\`\``, inline: false },
                            { name: 'Support:', value: `https://discord.gg/bAEZqtxr82`, inline: true },
                        )
                        .setColor("White")
                        .setTimestamp()
                    ]
            });
        })
    }
}

