const fs = require('fs');
let slashCommands = [];

module.exports = async (client, discord) => {

    console.log(`\x1b[34m[${String(new Date).split(" ", 5).join(" ")}]\x1b[0m \x1b[35m[BOT]\x1b[0m loading SlashCommands`)

    fs.readdirSync("./src/interactions/SlashCommands/").forEach(dir => {

        const commands = fs.readdirSync(`./src/interactions/SlashCommands/${dir}/`).filter((file) => file.endsWith('.js'));
        for (const file of commands) {
            try {
                let scmd = require(`../interactions/SlashCommands/${dir}/${file}`);
                if (scmd.name) {
                    client.slashCommands.set(scmd.name, scmd);
                    slashCommands.push(scmd);
                } else {
                    console.log(`\x1b[31m[${String(new Date).split(" ", 5).join(" ")}]\x1b[0m \x1b[35m[BOT]\x1b[0m [/${file}/${file}], Is not configured.`)
                }
            } catch (error) {
                console.log(`\x1b[31m[${String(new Date).split(" ", 5).join(" ")}]\x1b[0m \x1b[35m[BOT]\x1b[0m An error occurred in the file: [/${dir}/${file}]`)
            }
        }
    });

    console.log(`\x1b[34m[${String(new Date).split(" ", 5).join(" ")}]\x1b[0m \x1b[35m[BOT]\x1b[0m ${client.slashCommands.size} SlashCommands Loaded.`)

    client.on("ready", async () => {
        await client.application.commands.set(slashCommands);
    });
};