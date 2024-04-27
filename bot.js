const fs = require('fs');
const lineReader = require('line-reader');
const Discord = require("discord.js");
const { EmbedBuilder } = require('discord.js');
const exec = require("child_process").exec;

const { Client, IntentsBitField, ActivityType } = require('discord.js');
const client = new Client({ intents: [IntentsBitField.Flags.Guilds, IntentsBitField.Flags.GuildMembers, IntentsBitField.Flags.GuildMessages, IntentsBitField.Flags.MessageContent] });

const isRunning = (query, cb) => {
    let platform = process.platform;
    let cmd = '';
    switch (platform) {
        case 'win32': cmd = `tasklist`; break;
        case 'darwin': cmd = `ps -ax | grep ${query}`; break;
        case 'linux': cmd = `ps -A`; break;
        default: break;
    }
    exec(cmd, (err, stdout, stderr) => {
        cb(stdout.toLowerCase().indexOf(query.toLowerCase()) > -1);
    });
}

var pr_ = "";
client.on('ready', () => {
    console.log(`${client.user.tag} Now Is Online!`);
    console.log("BOT GTPS REDY FOR USE");
    console.log("Code By RAF");
    console.log("This beta test you found bug can contacts owner");
    setInterval(() => {
        lineReader.eachLine('online.txt', function (line) {
            isRunning('gtps3.exe', (status_) => {
                if (status_ == true) {
                    pr_ = `${line} online players`;
                }
                else {
                    pr_ = "Server is down.";
                }
            });
            client.user.setPresence({ activities: [{ name: pr_, type: 3, url: 'https://discord.com' }], status: 'online' });
        });
    }, 15000);
});

client.on("messageCreate", (message) => {
    const prefix = '+';
    if (message.author.bot) return;
    if (!message.content.startsWith(prefix)) return;
    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    const command = args.shift().toLowerCase();
    if (command === "help") {
        let embed = new EmbedBuilder()
            .setColor("#0099ff")
            .setTitle("Command List")
            .setDescription("List of available commands:")
            .addFields(
                { name: "+help", value: "Display this help message" },
                { name: "+host", value: "Display server host info" },
                { name: "+status", value: "Check server status" },
                { name: "+players", value: "Display online players list" },
                //{ name: "+role", value: "Display price role" }
            )
            .setTimestamp()
            .setFooter({ text: "Bot created by RAF" }); // Perhatikan penggunaan kurung kurawal siku []

        message.reply({ embeds: [embed] });
 
    } else if (command === "status") {
        isRunning('./database/ITSKYY HTTP.exe', (status_) => {
            let statusMessage;
            if (status_ == true) {
                statusMessage = "STATUS SERVER UP";
            } else {
                statusMessage = "STATUS SERVER DOWN";
            }

            let embed = new EmbedBuilder()
                .setColor("#ff0000")
                .setTitle("Server Status")
                .setDescription(statusMessage)
                .setTimestamp()
                .setFooter({ text: "Bot created by RAF" });

            message.reply({ embeds: [embed] });
        });
    } else if (command === "host") {
        const file = './HOST.txt';
        message.channel.send({ files: [file] })
        if (fs.existsSync(file)) {
            const fileContent = fs.readFileSync(file, 'utf8');
            message.reply(fileContent);
        } else {
            message.channel.send("File not found!")
                .then(() => console.log('File sent successfully'))
                .catch(console.error);
        }
    } else if (command === "players") {
        const playersFile = './database/online.txt';

        if (fs.existsSync(playersFile)) {
            const playersList = fs.readFileSync(playersFile, 'utf8');

            let embed = new EmbedBuilder()
                .setColor("#00ff00")
                .setTitle("Online Players")
                .setDescription("List of players currently online:")
                .addFields({ name: "Players", value: playersList }) // Menggunakan addFields untuk menambahkan bidang
                .setTimestamp()
                .setFooter({ text: "Bot created by RAF" });

            message.reply({ embeds: [embed] });
        } else {
            message.reply("Player data not available.");
        }
    } else if (command === "role66") {
        let embed = new EmbedBuilder()
            .setColor("#0099ff")
            .setTitle("PRICE ROLE")
            .setDescription("This Price Role Server ")
            .addFields(
                { name: "DEVELOPER", value: "Price: 100k", inline: true },
                { name: "ULTRA MODS", value: "Price: 50k", inline: true },
                { name: "MODS", value: "Price: 10k", inline: true },
                { name: "BOOST", value: "Price: 2k", inline: true }
            )
            .setTimestamp()
            .setFooter({text: "Bot created by RAF"});

        message.reply({ embeds: [embed] });
    }

});

client.login('TOKEN_BOT');
