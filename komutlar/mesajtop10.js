const Discord = require("discord.js"),
client = new Discord.Client();
const db = require("quick.db")
const x = require("moment")
require("moment-duration-format")

module.exports.run = async (client, message, args) => {
  
  
let uyelerg = db.get(`sesg`) || "Bulunamadı";
let siralamaListeg = Object.keys(uyelerg).sort((uye1, uye2) => {
  let uye1Toplamg = 0, uye2Toplamg = 0;
  let uye1Verig = uyelerg[uye1], uye2Verig = uyelerg[uye2];
  Object.values(uye1Verig).forEach(c => uye1Toplamg += c);
  Object.values(uye2Verig).forEach(c => uye2Toplamg += c);
  return uye2Toplamg-uye1Toplamg;
}).slice(0, 5).map((uye, index) => {
  let toplamVerig = 0;
  Object.values(uyelerg[uye]).forEach(c => toplamVerig += c);
 return `\`${index+1}.\` ${message.guild.members.cache.get(uye)} \`${x.duration(toplamVerig).format("D [gün,] H [saat,] m [dakika,] s [saniye]")}\``;
}).join('\n');
  
  
  let uyelerh = db.get(`sesh`) || "Bulunamadı";
let siralamaListeh = Object.keys(uyelerh).sort((uye1, uye2) => {
  let uye1Toplamh = 0, uye2Toplamh = 0;
  let uye1Verih = uyelerh[uye1], uye2Verih = uyelerh[uye2];
  Object.values(uye1Verih).forEach(c => uye1Toplamh += c);
  Object.values(uye2Verih).forEach(c => uye2Toplamh += c);
  return uye2Toplamh-uye1Toplamh;
}).slice(0, 5).map((uye, index) => {
  let toplamVerih = 0;
  Object.values(uyelerh[uye]).forEach(c => toplamVerih += c);
 return `\`${index+1}.\` ${message.guild.members.cache.get(uye)} \`${x.duration(x.duration(toplamVerih)).format("D [gün,] H [saat,] m [dakika,] s [saniye]")}\``;
}).join('\n');
  
  
  let uyeleri = db.get(`sesi`) || "Bulunamadı";
let siralamaListei = Object.keys(uyeleri).sort((uye1, uye2) => {
  let uye1Toplami = 0, uye2Toplami = 0;
  let uye1Verii = uyeleri[uye1], uye2Verii = uyeleri[uye2];
  Object.values(uye1Verii).forEach(c => uye1Toplami += c);
  Object.values(uye2Verii).forEach(c => uye2Toplami+= c);
  return uye2Toplami-uye1Toplami;
}).slice(0, 5).map((uye, index) => {
  let toplamVerii = 0;
  Object.values(uyeleri[uye]).forEach(c => toplamVerii += c);
 return `\`${index+1}.\` ${message.guild.members.cache.get(uye)} \`${x.duration(x.duration(toplamVerii)).format("D [gün,] H [saat,] m [dakika,] s [saniye]")}\``;
}).join('\n');
  
  
let uyeler = db.get(`mesajg`) || "Bulunamadı"
let siralamaListe = Object.keys(uyeler).sort((uye1, uye2) => {
let uye1Toplam = 0, uye2Toplam = 0;
let uye1Veri = uyeler[uye1], uye2Veri = uyeler[uye2];
Object.values(uye1Veri).forEach(c => uye1Toplam += c);
Object.values(uye2Veri).forEach(c => uye2Toplam += c);
return uye2Toplam-uye1Toplam;
}).slice(0, 5).map((uye, index) => {
let toplamVeri = 0;
Object.values(uyeler[uye]).forEach(c => toplamVeri += c);
return `\`${index+1}.\` ${message.guild.members.cache.get(uye)} \`${toplamVeri} mesaj\``;
}).join('\n');
  
  
let uyelermh = db.get(`mesajh`) || "Bulunamadı"
let siralamaListemh = Object.keys(uyelermh).sort((uye1, uye2) => {
let uye1Toplammh = 0, uye2Toplammh = 0;
let uye1Verimh = uyelermh[uye1], uye2Verimh = uyelermh[uye2];
Object.values(uye1Verimh).forEach(c => uye1Toplammh += c);
Object.values(uye2Verimh).forEach(c => uye2Toplammh += c);
return uye2Toplammh-uye1Toplammh;
}).slice(0, 5).map((uye, index) => {
let toplamVerimh = 0;
Object.values(uyelermh[uye]).forEach(c => toplamVerimh += c);
return `\`${index+1}.\` ${message.guild.members.cache.get(uye)} \`${toplamVerimh} mesaj\``;
}).join('\n');
  
  
  let uyelermi = db.get(`mesaji`) || "Bulunamadı"
let siralamaListemi = Object.keys(uyelermi).sort((uye1, uye2) => {
let uye1Toplammi = 0, uye2Toplammi = 0;
let uye1Verimi = uyelermi[uye1], uye2Verimi = uyelermi[uye2];
Object.values(uye1Verimi).forEach(c => uye1Toplammi += c);
Object.values(uye2Verimi).forEach(c => uye2Toplammi += c);
return uye2Toplammi-uye1Toplammi;
}).slice(0, 5).map((uye, index) => {
let toplamVerimi = 0;
Object.values(uyelermi[uye]).forEach(c => toplamVerimi += c);
return `\`${index+1}.\` ${message.guild.members.cache.get(uye)} \`${toplamVerimi} mesaj\``;
}).join('\n');
  

message.channel.send(new Discord.MessageEmbed().addField(`Sesli | Günlük Toplam `, siralamaListeg ?siralamaListeg:"Bulunmuyor").addField(`Sesli | Haftalık Toplam`,siralamaListeh ).addField("Sesli | 2 Haftalık Toplam  ",siralamaListei?siralamaListei:"Bulunmuyor").addField("Mesaj | Günlük Toplam",siralamaListe?siralamaListe:"Bulunmuyor").addField("Mesaj | Haftalık Toplam  ",siralamaListemh?siralamaListemh:"Bulunmuyor").addField("Mesaj | 2 Haftalık Toplam  ",siralamaListemi?siralamaListemi:"Bulunmuyor"));
};

exports.conf = {
    guildOnly: true,
    aliases: ["top10"],
  };
  
  exports.help = { 
    name: 'top', 
  };
  