module.exports = async (client) => {
    console.log(`\x1b[34m[${String(new Date).split(" ", 5).join(" ")}]\x1b[0m ` + `Loaded Logs System.`)

    process.on('unhandledRejection', (error, promise) => {
        console.error(`\x1b[${new Date().toLocaleString()}]\x1b[0m ` + `unhandledRejection:`, error);
    });
    process.on("uncaughtException", (err, origin) => {
        console.error(`\x1b[${new Date().toLocaleString()}]\x1b[0m ` + `uncaughtException:`, err);
    });
    process.on("uncaughtExceptionMonitor", (err, origin) => {
        console.error(`\x1b[${new Date().toLocaleString()}]\x1b[0m ` + `uncaughtExceptionMonitor:`, err);
    });
    process.on("multipleResolves", () => { });
}