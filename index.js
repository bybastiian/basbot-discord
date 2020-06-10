const {
    TOKEN_DISCORD
  } = require("./name_keys");
const Discord = require('discord.js');
global.client = new Discord.Client();
const{getWeather}=require("./apis/weather")

//Funcion al inicio del bot que declara su precensia
function presence(){
  client.user.setPresence({
    status:'online',
    activity:{
      name:'Con tu mama',
      type:'STREAMING'
    }
  })
}

//Inicia el bot
client.on('ready',()=>{
    console.log(`El bot a iniciado con el nombre de ${client.user.tag}`);
    presence()
});

//Saluda a nuevo integrante del grupo
client.on('guildMemberAdd', member => {
    const channel = member.guild.channels.cache.find(ch => ch.id === '716450775488004206');
    if (!channel) return;
    channel.send(`Bienvenido al grupo, ${member.user} :hearts:\nEspero disfrutes la estadia`);
  });

client.on('message', async (message)=>{
  if(message.content.startsWith('/mencion')){
    let user = message.mentions.users.first();
    //poner nombre del grupo y despue el del canal 
    user.send(`Hola te estan buscando del grupo ${message.channel.name}`)
  }
  // }else{
  //   message.channel.send('Para usar la menciona la estructura es \n/mencion @user')
  // }
  if(message.content.startsWith('/clima')){
    const userText = message.content.substring(6).trim()
    const resultWeather = await getWeather(userText);
    console.log("clima",resultWeather)
    // message.channel.send(`Actualmente la temperatura en ${aux.name} es de: ${aux.main.temp}`)
    message.channel.send(resultWeather)
  }
})

client.login(`${TOKEN_DISCORD}`);