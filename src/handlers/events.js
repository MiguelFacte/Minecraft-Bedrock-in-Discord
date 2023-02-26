const fs = require('fs');
const allevents = [];
let cantidad = 0;

module.exports = async (client) => {
    try {
        console.log(`\x1b[34m[${String(new Date).split(" ", 5).join(" ")}]\x1b[0m \x1b[35m[BOT]\x1b[0m Loading Events.`)

        const cargar_dir = (dir) => {
            const archivos_eventos = fs.readdirSync(`./src/events/${dir}`).filter((file) => file.endsWith('.js'));

            for (const archivo of archivos_eventos) {
                try {
                    const evento = require(`../events/${dir}/${archivo}`);
                    const nombre_evento = archivo.split(".")[0];
                    allevents.push(nombre_evento);
                    client.on(nombre_evento, evento.bind(null, client));
                    cantidad++
                } catch (e) {
                    console.log(`\x1b[31m[${String(new Date).split(" ", 5).join(" ")}]\x1b[0m \x1b[35m[BOT]\x1b[0m` + e)
                }
            }
        }
        await ["client", "guild"].forEach(e => cargar_dir(e));

        console.log(`\x1b[34m[${String(new Date).split(" ", 5).join(" ")}]\x1b[0m \x1b[35m[BOT]\x1b[0m ${cantidad} Loaded Events.`)
        console.log(`\x1b[34m[${String(new Date).split(" ", 5).join(" ")}]\x1b[0m \x1b[35m[BOT]\x1b[0m Logging in.`)

    } catch (e) {
        console.log(`\x1b[31m[${String(new Date).split(" ", 5).join(" ")}]\x1b[0m \x1b[35m[BOT]\x1b[0m` + e)
    }
}