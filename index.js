const { TOKEN_DISCORD } = require("./name_keys");
const Discord = require("discord.js");
global.client = new Discord.Client();
const { getWeather } = require("./apis/weather");
const { getInfoBip } = require("./apis/bip");
const conditions = require("./conditions.json");

var prefix = conditions.prefix;
var prefixSpecials = conditions.prefixSpecials;

//Funcion al inicio del bot que declara su precensia
function presence() {
  client.user.setPresence({
    status: "online",
    activity: {
      name: "Con tu mama",
      type: "PLAYING",
    },
  });
}

//Inicia el bot
client.on("ready", () => {
  console.log(`El bot a iniciado con el nombre de ${client.user.tag}`);
  presence();
});

//Saluda a nuevo integrante del grupo
client.on("guildMemberAdd", (member) => {
  const channel = member.guild.channels.cache.find(
    (ch) => ch.name === "member-log"
  );
  if (!channel) return;
  channel.send(
    `Bienvenido al grupo, ${member.user} :hearts:\nEspero disfrutes la estadia`
  );
});

client.on("message", async (message) => {
  //Para no interactuar con otros bot y generar bucle infinito
  if (!message.content.startsWith(conditions.prefix)) return;
  if (!message.content.startsWith(conditions.prefixSpecials)) return;
  if (message.author.bot) return;

  if (message.content.startsWith(prefix + "mencion")) {
    let user = message.mentions.users.first();
    //poner nombre del grupo y despue el del canal
    user.send(`Hola te estan buscando del grupo ${message.channel.name}`);
  }
  // }else{
  //   message.channel.send('Para usar la menciona la estructura es \n/mencion @user')
  // }
  if (message.content.startsWith(prefix + "clima")) {
    const userText = message.content.substring(6).trim();
    const resultWeather = await getWeather(userText);
    message.channel.send(resultWeather);
  }

  if (message.content.startsWith(prefix + "bip")) {
    const userText = message.content.substring(4).trim();
    const infoBip = await getInfoBip(userText);
    message.channel.send(infoBip);
  }

  if (message.content.startsWith(prefixSpecials + "expulsar")) {
    const user = message.mentions.users.first();
    if (user) {
      const member = message.guild.member(user);
      if (member) {
        member
          .kick("Motivo que se mostrara de la expulsión")
          .then(() => {
            message.reply(`expulso al usuario: ${user.tag}`);
          })
          .catch((err) => {
            message.reply("No se pudo expulsar al usuario");
            console.error("Error en funcion de expulsar usuario", err);
          });
      } else {
        message.reply("El usuario no se encuentra en el grupo");
      }
    } else {
      message.reply("No mencionaste al usuario que deseas expulsar EJ: ");
    }
  }

  if (message.content.startsWith(prefixSpecials + "borrar")) {
    let number = message.content.substring(7).trim();
    if (isNaN(number) || number === "") {
      message.channel.send(
        "Para borrar mensajes debes colocar al final un numero min 1 max 100 EJ: !borrar 2"
      );
    } else if (number >= 100 || number <= 0) {
      message.channel.send(
        "El numero para borrar no puede ser ni negativo ni mayor a 100"
      );
    } else {
      message.channel
        .bulkDelete(number)
        .then(() => {
          message.channel.send(`Los mensajes eliminados fueron: ${number}`);
        })
        .catch((error) => {
          console.log("Error al eliminar mensajes", error);
          message.channel.send(
            "No se pudo realizar la eliminacion de mensajes"
          );
        });
    }
  }
});

client.login(`${TOKEN_DISCORD}`);
