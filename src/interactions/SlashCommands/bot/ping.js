const { EmbedBuilder } = require("discord.js")

module.exports = {
    name: "ping",
    description: "Shows the latency of the bot.",
    
    run: async (client, interaction, message) => {
        try {
            const mesg = await interaction.reply({ content: "Ping!", fetchReply: true });
            await interaction.editReply({
                embeds:
                    [new EmbedBuilder()
                        .setTitle("Pong!🏓")
                        .addFields(
                            { name: 'latency:', value: `${Math.floor(client.ws.ping)}ms`, inline: false },
                            { name: 'Time:', value: `${mesg.createdTimestamp - interaction.createdTimestamp}ms`, inline: false },
                        )
                        .setColor("0x3EFE00")
                        .setTimestamp()
                    ]
            });
        } catch (err) {
            return;
        }
    }
}
