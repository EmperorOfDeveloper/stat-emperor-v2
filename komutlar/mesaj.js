const Discord = require("discord.js"),
client = new Discord.Client();
const db = require("quick.db")
const x = require("moment")

module.exports.run = async (client, message, args) =>{
  
  let user = message.mentions.members.first()|| message.author
let top = message.guild.channels.cache.filter(uye => db.get(`mesajg.${user.id}.${uye.id}`)).array().sort((uye1, uye2) => Number(db.get(`mesajg.${user.id}.${uye2.id}`))-Number(db.get(`mesajg.${user.id}.${uye1.id}`))).map((uye, index) => "\`"+(index+1)+".\` <#"+ uye + "> \`" + db.get(`mesajg.${user.id}.${uye.id}`)+" mesaj\`").join('\n'); 
  let tops = message.guild.channels.cache.filter(uye => db.get(`sesg.${user.id}.${uye.id}`)).array().sort((uye1, uye2) => Number(db.get(`sesg.${user.id}.${uye2.id}`))-Number(db.get(`sesg.${user.id}.${uye1.id}`))).map((uye, index) => "\`"+(index+1)+".\` <#"+ uye+"> \`"+ x.duration(db.get(`sesg.${user.id}.${uye.id}`)).format("D [gün,] H [saat,] m [dakika,] s [saniye]") +"\`").join('\n'); 


  
  
message.channel.send(new Discord.MessageEmbed().setTitle(`${user.username} İstatistik`).setTimestamp().setFooter(message.member.displayName+" tarafından istendi!", message.author.avatarURL).addField(`Mesaj:`,top || 'Bulunamadı',true).addField(`Ses:`,tops || 'Bulunamadı')); 

};

exports.conf = {
   guildOnly: true,
    aliases: ["mesaj"],
  };
  
  exports.help = { 
    name: 'mesaj'
  };
  