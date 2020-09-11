const Discord = require('discord.js');
const fs = require('fs');
const http = require('http');
const client = new Discord.Client();
const db = require('quick.db');
const express = require('express');
const ayarlar = require('./ayarlar.json');
const app = express();
const moment = require("moment")
const humanizeDuration = require("humanize-duration") 
//READY.JS 



client.on('ready', async () => {
client.appInfo = await client.fetchApplication();
setInterval( async () => {
client.appInfo = await client.fetchApplication();
}, 600);
client.user.setActivity('Emperor :)', { url: 'https://www.twitch.tv/', type: 'STREAMING' });
console.log("KARILARR2")});

const log = message => {
console.log(` ${message}`);
};
require('./util/eventLoader.js')(client);

//READY.JS SON

//KOMUT ALGILAYICI

client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
fs.readdir('./komutlar/', (err, files) => {
if (err) console.error(err);
log(`${files.length} komut yüklenecek.`);
files.forEach(f => {
let props = require(`./komutlar/${f}`);
log(`Yüklenen komut: ${props.help.name}.`);
client.commands.set(props.help.name, props);
props.conf.aliases.forEach(alias => {
client.aliases.set(alias, props.help.name);
});});});




client.reload = command => {
return new Promise((resolve, reject) => {
try {
delete require.cache[require.resolve(`./komutlar/${command}`)];
let cmd = require(`./komutlar/${command}`);
client.commands.delete(command);
client.aliases.forEach((cmd, alias) => {
if (cmd === command) client.aliases.delete(alias);
});
client.commands.set(command, cmd);
cmd.conf.aliases.forEach(alias => {
client.aliases.set(alias, cmd.help.name);
});
resolve();} catch (e) {
reject(e);}
});};

client.load = command => {
return new Promise((resolve, reject) => {
try {
let cmd = require(`./komutlar/${command}`);
client.commands.set(command, cmd);
cmd.conf.aliases.forEach(alias => {
client.aliases.set(alias, cmd.help.name);
});
resolve();} catch (e) {
reject(e);
}});};

client.unload = command => {
return new Promise((resolve, reject) => {
try {
delete require.cache[require.resolve(`./komutlar/${command}`)];
let cmd = require(`./komutlar/${command}`);
client.commands.delete(command);
client.aliases.forEach((cmd, alias) => {
if (cmd === command) client.aliases.delete(alias);});
resolve();
} catch (e) {
reject(e);
}});};

//KOMUT ALGILAYICI SON

client.elevation = message => {
if (!message.guild) {
return;}
let permlvl = 0;
if (message.member.hasPermission("BAN_MEMBERS")) permlvl = 2;
if (message.member.hasPermission("ADMINISTRATOR")) permlvl = 3;
if (message.author.id === ayarlar.sahip) permlvl = 4;
return permlvl;
};

client.on("ready", () =>{ 
  setInterval(() => {
    //+ (1000 * 60 * 60 * 24)
    client.guilds.cache.get(``).members.cache.forEach(member => {
  let mesajg = db.get(`tarih.${member.id}.gunluk`)
  let mesajh= db.get(`tarih.${member.id}.hafta`)
  let mesaj2 = db.get(`tarih.${member.id}.ikihafta`)
  let sesg = db.get(`tarihs.${member.id}.gunluk`)
  let sesh = db.get(`tarihs.${member.id}.hafta`)
  let ses2 = db.get(`tarihs.${member.id}.ikihafta`)
  if(Date.now() <= mesajg )  { 
  db.delete(`tarih.${member.id}.gunluk`) 
  db.delete(`mesajg.${member.id}`)
  }
  if(Date.now() <= mesajh ) {
  db.delete(`tarih.${member.id}.hafta`) 
  db.delete(`mesajh.${member.id}`)
  }
  if(Date.now() <= mesaj2 ) {
  db.delete(`tarih.${member.id}.ikihafta`) 
  db.delete(`mesaji.${member.id}`)
  }
  if(Date.now() <= sesg ) {
  db.delete(`tarihs.${member.id}.gunluk`) 
  db.delete(`sesg.${member.id}`)
  console.log(sesg)
  }
  if(Date.now() <= sesh  ) {  
  db.delete(`tarihs.${member.id}.hafta`) 
  db.delete(`sesh.${member.id}`)
  }
  if(Date.now() <= ses2 + (1000 * 60 * 60 * 24 * 7 * 2)) { 
  db.delete(`tarihs.${member.id}.ikihafta`) 
  db.delete(`sesi${member.id}`)
  }})
    })
  }, 100000)
  
        
  let sesVerisi = {}
  client.on('voiceStateUpdate', async (oldState, newState) => {
  if(newState.member.user.bot === true) return
  if (!oldState.channelID && newState.channelID){ 
  sesVerisi[newState.id] = Date.now() }
  if (oldState.channelID && !newState.channelID) {
  db.add(`sesg.${newState.id}.${oldState.channelID}`, Number(Date.now() - sesVerisi[newState.id]))
  db.add(`sesh.${newState.id}.${oldState.channelID}`, Number(Date.now() - sesVerisi[newState.id]))
  db.add(`sesi.${newState.id}.${oldState.channelID}`, Number(Date.now() - sesVerisi[newState.id]))  
  if(db.get(`tarihs.${newState.id}.gunluk`))return
  db.set(`tarihs.${newState.id}.gunluk`, Date.now())
  if(db.get(`tarihs.${newState.id}.hafta`))return
  db.set(`tarihs.${newState.id}.hafta`, Date.now()) 
  if(db.get(`tarihs.${newState.id}.ikihafta`))return
  db.set(`tarihs.${newState.id}.ikihafta`, Date.now())
  }});
  
  client.on("message", message => {
  if(!message.guild) return
  if(message.author === true) return 
  db.add(`mesajg.${message.author.id}.${message.channel.id}`, 1)
  db.add(`mesajh.${message.author.id}.${message.channel.id}`,1)
  db.add(`mesaji.${message.author.id}.${message.channel.id}`,1)
  if(db.get(`tarih.${message.author.id}.gunluk`))return
  db.set(`tarih.${message.author.id}.gunluk`, Date.now())
  if(db.get(`tarih.${message.author.id}.hafta`))return
  db.set(`tarih.${message.author.id}.hafta`, Date.now())
  if(db.get(`tarih.${message.author.id}.ikihafta`))return
  db.set(`tarih.${message.author.id}.ikihafta`, Date.now())
  })
  
  client.on("message", message => {
    let soz=[
      "Yaşadığın yeri cennet yapamadığın sürece, kaçtığın her yer cehennemdir.",
      "Beyinlerde nüksediyor sahte sevinçler.",
    ]
    let soz2 = soz[Math.floor(Math.random() * soz.length)];
    var s = 0;
  
    s++
  
    if (s == 20) message.reply(`${soz2}`)
  })
    

client.login(ayarlar.token)

