const {
    TOKEN_DISCORD
  } = require("./name_keys");
const Discord = require('discord.js');
const client = new Discord.Client();

client.on('ready',()=>{
    console.log(`El bot a iniciado con el nombre de ${client.user.tag}`);
    client.user.setStatus('online');
});

client.on('guildMemberAdd', member => {
    const channel = member.guild.channels.cache.find(ch => ch.name === 'member-log');
    if (!channel) return;
    channel.send(`Bienvenido al grupo, ${member}`);
  });

client.on('message', (message)=>{
    console.log(message.content);
    if(message.content === 'hola')
    {
        message.channel.send(`Hola ${message.author}`);
    }
})
console.log('TOKEN',TOKEN_DISCORD)
client.login(`${TOKEN_DISCORD}`);