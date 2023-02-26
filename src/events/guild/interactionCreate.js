module.exports = async (client, interaction) => {
    try {
        if (interaction.isCommand()) {
            if (!interaction.inGuild()) {
                return interaction.reply({ content: 'The interaction can only be used in the guild.', ephemeral: true });
            }

            const command = client.slashCommands.get(interaction.commandName);
            if (!command) {
                return interaction.reply({ content: 'Unknown command', ephemeral: true });
            }

            await command.run(client, interaction);
        } else {
            console.log(`\x1b[31m[${String(new Date).split(" ", 5).join(" ")}]\x1b[0m \x1b[35m[BOT]\x1b[0m Unhandled interaction type: ${interaction.type}`);
        }
    } catch (error) {
        console.error(`\x1b[31m[${String(new Date).split(" ", 5).join(" ")}]\x1b[0m \x1b[35m[BOT]\x1b[0m ${error} ID: ${interaction.commandName}`);
    }
}