require('dotenv').config()

const { Client,Intents, MessageFlags }=require('discord.js')
const client=new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] },
    {partials:['MESSAGE','REACTION']})
const PREFIX="$";

client.on('ready',()=>{
    console.log(`${client.user.tag} has logged in.`) 
});
client.on('messageCreate',async (messageCreate)=>{
    if(messageCreate.author.bot) return ;
    
    if(messageCreate.content.startsWith(PREFIX)){
        const [CMD_NAME,...args]=messageCreate.content
        .trim()
        .substring(PREFIX.length)
        .split(/\s+/);
        console.log(CMD_NAME)
       if(CMD_NAME ==='kick'){
       // if(!messageCreate.member.hasPermission('KICK_MEMBERS'))
       // return messageCreate.reply('You do not have permissions to use the command')
           if(args.length === 0) return messageCreate.reply('Please provide an id')
       const member=messageCreate.guild.members.cache.get(args[0]);
       if(member){
           member
           .kick()
           .then((member)=>{
               messageCreate.channel.send(`${member} was kicked`)
           })
           .catch((err)=>messageCreate.channel.send('that member was not found'))
       }
       else{
           messageCreate.channel.send("That memeber is not found")
       }
       }
       else if(CMD_NAME==='ban'){
        if(args.length === 0) return messageCreate.reply('Please provide an id')
     
       try{
       const user= await  messageCreate.guild.members.ban(args[0])
      messageCreate.channel.send('user was banned successfully')
       }
       catch(err){
       console.log(err)
       messageCreate.channel.send('an error occured')
       }
       }
    }
})
client.on('messageReactionAdd',(reaction,user)=>{
    const {name}=reaction.emoji;
    const member=reaction.message.guild.members.cache.get(user.id)
   if(reaction.message.id==='976787648972734485'){
   switch(name){
        case '🍑': 
          member.roles.add('')
            break;
        case '🍇':
            member.roles.add('')
            break;
        case '🍌':
            member.roles.add('')
            break;

    }
    }
})

client.on('messageReactionRemove',(reaction,user)=>{
    const {name}=reaction.emoji;
    const member=reaction.message.guild.members.cache.get(user.id)
   if(reaction.message.id==='976787648972734485'){
   switch(name){
        case '🍑': 
          member.roles.remove('') //id of the roles
            break;
        case '🍇':
            member.roles.remove('')
            break;
        case '🍌':
            member.roles.remove('')
            break;

    }
    }
})
client.login(process.env.DISCORDJS_BOT_TOKEN)