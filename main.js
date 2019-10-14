const discord = require('discord.js')
const filesync = require('lowdb/adapters/FileSync')
const low = require('lowdb')

const config = require('./config.json')
const secrets = require('./secrets.json')

const adapter = new filesync(__dirname+'/database.json')
const db = low(adapter)

const client = new discord.Client()

client.on('ready', () => {
	if (config.debug)
	    console.log('WARNING: Running in debug mode, this is not secure!')

	var guilds = client.guilds.map((g) => {return g.name}).join(', ')
    console.log(`Bot logged in as '${client.user.tag}'`)
    console.log(`Invite link: https://discordapp.com/oauth2/authorize?client_id=${client.user.id}&scope=bot&permissions=0`)
    console.log(`Connected guilds: ${guilds}`)
})

client.on('message', (msg) => {
    if (msg.content == 'ping')
        msg.reply('pong')
})

client.login(secrets.token)