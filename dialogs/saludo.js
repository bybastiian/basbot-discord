client.on('message', (message)=>{
    console.log(message.content);
    if(message.content === 'hola')
    {
        message.channel.send(`Hola ${message.author}`);
    }
})