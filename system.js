/*
Base : Kiuu
Pengembang : Danzxx Code/Danzxx Hosting

*/

require('./setting/config');
const fs = require('fs');
const axios = require('axios');
const cheerio = require('cheerio')
const chalk = require("chalk");
const util = require("util");
const moment = require("moment-timezone");
const { spawn, exec, execSync } = require('child_process');

const { default: baileys, proto, generateWAMessage, generateWAMessageFromContent, getContentType, prepareWAMessageMedia } = require("@whiskeysockets/baileys");

module.exports = client = async (client, m, chatUpdate, store) => {
try {
// Message type handling
const body = (
m.mtype === "conversation" ? m.message.conversation :
m.mtype === "imageMessage" ? m.message.imageMessage.caption :
m.mtype === "videoMessage" ? m.message.videoMessage.caption :
m.mtype === "extendedTextMessage" ? m.message.extendedTextMessage.text :
m.mtype === "buttonsResponseMessage" ? m.message.buttonsResponseMessage.selectedButtonId :
//m.mtype === "listResponseMessage" m.message.listResponseMessage.singleSelectReply.selectedRowId :
m.mtype === "templateButtonReplyMessage" ? m.message.templateButtonReplyMessage.selectedId :
m.mtype === "interactiveResponseMessage" ? JSON.parse(m.msg.nativeFlowResponseMessage.paramsJson).id :
m.mtype === "templateButtonReplyMessage" ? m.msg.selectedId :
m.mtype === "messageContextInfo" ? m.message.buttonsResponseMessage?.selectedButtonId || m.message.listResponseMessage?.singleSelectReply.selectedRowId || m.text : ""
);

const sender = m.key.fromMe
? client.user.id.split(":")[0] + "@s.whatsapp.net" || client.user.id
: m.key.participant || m.key.remoteJid;

const senderNumber = sender.split('@')[0];
const budy = (typeof m.text === 'string' ? m.text : '');
const prefa = ["", "!", ".", ",", "🐤", "🗿"];
const prefix = /^[°zZ#$@+,.?=''():√%!¢£¥€π¤ΠΦ&><™©®Δ^βα¦|/\\©^]/.test(body) ? body.match(/^[°zZ#$@+,.?=''():√%¢£¥€π¤ΠΦ&><!™©®Δ^βα¦|/\\©^]/gi) : '.';
const from = m.key.remoteJid;
const isGroup = from.endsWith("@g.us");

const hariini = moment.tz('Asia/Jakarta').format('dddd, DD MMMM YYYY')
const wib = moment.tz('Asia/Jakarta').format('HH : mm : ss')
const wit = moment.tz('Asia/Jayapura').format('HH : mm : ss')
const wita = moment.tz('Asia/Makassar').format('HH : mm : ss')
const time2 = moment().tz('Asia/Jakarta').format('HH:mm:ss')
        if(time2 < "23:59:00"){
        var ucapanWaktu = 'Selamat Malam'
        }
        if(time2 < "19:00:00"){
        var ucapanWaktu = 'Selamat Petang'
        }
        if(time2 < "18:00:00"){
        var ucapanWaktu = 'Selamat Sore'
        }
        if(time2 < "15:00:00"){
        var ucapanWaktu = 'Selamat Siang'
        }
        if(time2 < "10:00:00"){
        var ucapanWaktu = 'Selamat Pagi'
        }
        if(time2 < "05:00:00"){
        var ucapanWaktu = 'Selamat Subuh'
        }
        if(time2 < "03:00:00"){
        var ucapanWaktu = 'Selamat Tengah Malam'
        }
        
 // self mode
 global.public = true
if (!client.public) {
if (!m.key.fromMe) return
}
// Database
const kontributor = JSON.parse(fs.readFileSync('./all/database/owner.json'));
    
const botNumber = await client.decodeJid(client.user.id);
const Access = [botNumber, ...kontributor, ...global.owner];
const isCmd = body.startsWith(prefix);
const command = body.slice(1).trim().split(/ +/).shift().toLowerCase();
const args = body.trim().split(/ +/).slice(1);
const pushname = m.pushName || "No Name";
const text = q = args.join(" ");
const quoted = m.quoted ? m.quoted : m;
const mime = (quoted.msg || quoted).mimetype || '';
const qmsg = (quoted.msg || quoted);
const isMedia = /image|video|sticker|audio/.test(mime);

// Group function
const groupMetadata = isGroup ? await client.groupMetadata(m.chat).catch((e) => {}) : "";
const groupOwner = isGroup ? groupMetadata.owner : "";
const groupName = m.isGroup ? groupMetadata.subject : "";
const participants = isGroup ? await groupMetadata.participants : "";
const groupAdmins = isGroup ? await participants.filter((v) => v.admin !== null).map((v) => v.id) : "";
const groupMembers = isGroup ? groupMetadata.participants : "";
const isGroupAdmins = isGroup ? groupAdmins.includes(m.sender) : false;
const isBotGroupAdmins = isGroup ? groupAdmins.includes(botNumber) : false;
const isBotAdmins = isGroup ? groupAdmins.includes(botNumber) : false;
const isAdmins = isGroup ? groupAdmins.includes(m.sender) : false;

// Database
const contacts = JSON.parse(fs.readFileSync("./all/database/contacts.json"))
const prem = JSON.parse(fs.readFileSync("./all/database/premium.json"))
const ownerNumber = JSON.parse(fs.readFileSync("./all/database/owner.json"))

// Cek Database
const isContacts = contacts.includes(sender)
const isPremium = prem.includes(sender)
const isOwner = ownerNumber.includes(senderNumber)

// Function
const { smsg, sendGmail, formatSize, isUrl, generateMessageTag, getBuffer, getSizeMedia, runtime, fetchJson, sleep } = require('./start/lib/myfunction');
const { ytdl } = require('./start/lib/scrape/scrape-ytdl')

let Buttons = require("./start/lib/buttondoc");
let batten = new Buttons();

// Time
const time = moment.tz("Asia/Makassar").format("HH:mm:ss");

// Console log

// Helper functions
const kiuu = (anu) => {
const {message, key} = generateWAMessageFromContent(m.chat, {
interactiveMessage: {
body: {text: anu},
footer: {text: `${global.footer}`},
nativeFlowMessage: {
buttons: [{text: "Danzxx Hosting"}
],
}
},
}, {quoted: { key: { participant: '0@s.whatsapp.net', remoteJid: "0@s.whatsapp.net" }, message: { conversation: `${body}`}}})
client.relayMessage(m.chat, {viewOnceMessage:{message}}, {messageId:key.id})
}

const reaction = async (jidss, emoji) => {
client.sendMessage(jidss, { react: { text: emoji, key: m.key }})}
  
// Command handler
switch (command) {
  case 'everyone': {
if (!isOwner) return m.reply(mess.owner)
let mem = m.isGroup ? await groupMetadata.participants.map(a => a.id) : ""
client.sendMessage(m.chat, {
	text: `@${m.chat} ${text}`,
	contextInfo: {
mentionedJid: mem, 
		groupMentions: [
			{
				groupSubject: `Halo everyone - [ ${global.botname} ]`,
				groupJid: m.chat,
			},
		],
	},
});
}  
        break
   case 'pantun':{
const jeson = await fetchJson('https://raw.githubusercontent.com/tanakasenn/Database-Json/refs/heads/main/Pantun.json')
let pantunnya = jeson[Math.floor(Math.random() * jeson.length)];
let msg = generateWAMessageFromContent(m.chat, {
    viewOnceMessage: {
        message: {
            "messageContextInfo": {
                "deviceListMetadata": {},
                "deviceListMetadataVersion": 2
            },
            interactiveMessage: proto.Message.InteractiveMessage.create({
                body: proto.Message.InteractiveMessage.Body.create({
                    text: pantunnya
                }),
                footer: proto.Message.InteractiveMessage.Footer.create({
                    text: ''
                }),
                header: proto.Message.InteractiveMessage.Header.create({
                    title: ``,
                    subtitle: "Tanaka Sense",
                    hasMediaAttachment: false
                }),
                nativeFlowMessage: proto.Message.InteractiveMessage.NativeFlowMessage.create({
                    buttons: [
                        {
                            "name": "quick_reply",
                            "buttonParamsJson": `{\"display_text\":\"Next\",\"id\":\"${prefix}pantun\"}`
                        }
                      ],
                   }
                 )
               }
             )
          }
       }
    }, {
     quoted : m
   }
 )
await client.relayMessage(msg.key.remoteJid, msg.message, {
 messageId: msg.key.id
})
}

  break     
case 'animesrc': {
if (!q) return m.reply(`_anime nya?_`)
const axios = require('axios');
const cheerio = require('cheerio');
// wm avz
async function AvoskyZV(keyword, m) {
  try {
// wm avz
    const searchUrl = `https://9animetv.to/search?keyword=${encodeURIComponent(keyword)}`;
// wm avz
    const { data } = await axios.get(searchUrl);
    const $ = cheerio.load(data);
// wm avz
    const animeList = [];
    // wm avz
    $('.flw-item').each((index, element) => {
      const titleElement = $(element).find('.film-name a');
      const title = titleElement.text().trim();
      const link = titleElement.attr('href');
// wm avz
      const imageUrl = $(element).find('.film-poster-img').attr('data-src');
      animeList.push({
        title,
        link: `https://9animetv.to${link}`,
        imageUrl
      });
    });
// wm avz
    if (animeList.length > 0) {
// wm avz
      let AvoskyZ = `Hasil pencarian untuk '${keyword}':\n\n`;
      animeList.forEach(anime => {
        AvoskyZ += `*Title:* ${anime.title}\n`;
        AvoskyZ += `*Link:* ${anime.link}\n`;
        AvoskyZ += `*Image URL:* ${anime.imageUrl}\n\n`;
      });
      m.reply(AvoskyZ);
    } else {
      m.reply(`Anime dengan pencarian '${keyword}' tidak ditemukan.`);
    }
// wm avz
  } catch (error) {
    console.error('Error:', error);
    m.reply('Terjadi Lagi Error.');
  }
}
AvoskyZV(`${encodeURIComponent(text)}`, m);
}
  break
   case 'kataanime':{
    	try {
//wm senn
		let res = await await fetch("https://katanime.vercel.app/api/getrandom");
		if (!res.ok) throw await res.text();
		let json = await res.json();
//wm senn
		if (!json.result) throw json;
		let data = "";
		for (let i = 0; i < json.result.length; i++) {
			let { id, english, indo, character, anime } = json.result[i];
			data += `_*•.* "${indo}"_\n${character} (${anime})\n\n`;
		}
//wm senn
		m.reply(data);
	} catch (e) {
		console.log(e);
		m.reply("Maaf, gagal mengambil data");
	}
//wm senn
};
       
  break
case 'ai-logic':{
      //if (!isOwner) return noregis()
         if(!text) return m.reply('Ada yang bisa ku bantu?');
         try {
        let logic = 'ISI LOGIC KARAKTER YANG MAU KAMU BIKIN' //logic nya terserah asal nyambung dan masuk akal   
      await client.sendMessage(m.chat, { react: { text: "💬", key: m.key } }); 
//wm gwehj ni Tanaka Sense       
        let aii = await fetchJson(`https://widipe.com/ai/c-ai?prompt=${logic}&text=${text}`);
          await client.sendMessage(m.chat, { text: aii.result,
            contextInfo: { 
              mentions: [m.sender],
                externalAdReply: {
                  showAdAttribution: true,
                    title: `L O G I C  -  A I`,//ini bisa di ganti terserah 
                    body: '',
                    thumbnailUrl: "https://e.top4top.io/p_3197kprnb1.jpg",//gambar pun terserah yo
                    sourceUrl: "https://github.com/tanakasenn",
                    mediaType: 1,
                    renderLargerThumbnail: true
                    }
                  }
                },
//wm senn
             { quoted : m }
           )
        } catch ( err ) {
        console.error(err);
       await client.sendMessage(m.chat, { react: { text: "❌", key: m.key } });                
       m.reply("erorr kak nanti juga bener");
     }
//wm senn
   }
 
 break
case 'topdoujin':{
async function topDoujin(type = 'doujin') {
    return new Promise((resolve, reject) => {
        axios.get('https://myanimelist.net/topmanga.php?type='+type)
        .then(({ data }) => {
            let $ = cheerio.load(data)
            let hasil = []
            $('tr.ranking-list').each(function (a, b) {
                hasil.push({
                    rank: $(b).find('td.rank.ac > span').text(),
                    title: $(b).find('td.title.al.va-t.clearfix.word-break > div > h3').text(),
                    info: $(b).find('td.title.al.va-t.clearfix.word-break > div > div.information.di-ib.mt4').text().trim(),
                    rating: $(b).find('td.score.ac.fs14 > div').text(),
                    detail: $(b).find('td.title.al.va-t.clearfix.word-break > div > h3 > a').attr('href'),
                    image: $(b).find('td.title.al.va-t.clearfix.word-break > a > img').attr('data-src') || $(b).find('td.title.al.va-t.clearfix.word-break > a > img').attr('src')
                })
            })
            resolve(hasil)
        })
    })
}
m.reply('wait a minute...')
let results = await topDoujin()
if (results.length > 0) {
let message = '*TOP DOUJIN BULAN INI*\n\n';
results.forEach((result, index) => {
message += `${result.rank}. *${result.title}*\n- Score: ${result.rating}\n- Info: ${result.info}\n- Link: ${result.detail}\n\n`;
 });
 await m.reply(message)
 } else {
m.reply('Tidak Ada Hasil.');
}
}

break
case 'owner': {
client.sendMessage(from, {react: {text: "⏳", key: m.key}})
await sleep(2000)
client.sendMessage(from, {react: {text: "⌛", key: m.key}})
await sleep(1500)
client.sendMessage(from, {react: {text: "🔒", key: m.key}}) 
await sleep(1000)
client.sendMessage(from, {react: {text: "🔓", key: m.key}}) 
await sleep(500)
client.sendMessage(from, {react: {text: "✅", key: m.key}})
await sleep(200)
let name = m.pushName || client.getName(m.sender);
let pan = `
▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰
> *Halo Kak \`${name}\`, Tekan Tombol Yang bertuliskan Chat Owner Untuk Menghubungi Nomor Owner ku*
▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰
`;
const url = fs.readFileSync("./start/lib/media/NDoc.jpg")
async function image(url) {
  const { imageMessage } = await generateWAMessageContent({
    image: {
      url
    }
  }, {
    upload: client.waUploadToServer
  });
  return imageMessage;
}
let msg = generateWAMessageFromContent(
  m.chat,
  {
    viewOnceMessage: {
      message: {
        interactiveMessage: {
          body: {
            text: pan
          },
          carouselMessage: {
            cards: [
              {
                header: proto.Message.InteractiveMessage.Header.create({
          ...(await prepareWAMessageMedia({ image: { url: './start/lib/media/NDoc.jpg' } }, { upload: client.waUploadToServer })),
          title: ``,
          gifPlayback: true,
          subtitle: ownername,
          hasMediaAttachment: false
        }),
                body: {
                  text: `
┏───────────────┈ 
┆     「 *\`[OWNER BOT]\`* 」
┣───────────────┈ 
┣──=[ *\`[ ${global.ownername} ]\`* ]==─
┆ • Jangan Chat Yang Aneh Aneh
┆ • Jangan Telpon/Call Owner 
┆ • Chat Langsung ke intinya aja
┆ • Klo Ada Uang Minimal Bagi
└────────────┈ ⳹`
                },
                nativeFlowMessage: {
                  buttons: [
                    {
                      name: "cta_url",
                      buttonParamsJson: `{"display_text":"👤 Chat Owner ( ${global.ownername} )","url":"https://wa.me/${global.owner}","merchant_url":"https://wa.me/${global.owner}"}`
                    },
                  ],
                },
              },
              {
                header: proto.Message.InteractiveMessage.Header.create({
          ...(await prepareWAMessageMedia({ image: { url: './start/lib/media/NDoc.jpg' } }, { upload: client.waUploadToServer })),
          title: ``,
          gifPlayback: true,
          subtitle: ownername,
          hasMediaAttachment: false
        }),
                body: {
                  text: `
┏───────────────┈ 
┆     「 *\`[NOMOR BOT]\`* 」
┣───────────────┈ 
┣──=[ *\`[ ${botname} ]\`* ]==─
┆ • Jangan Spam Bot
┆ • Jangan Telpon/Call Bot 
┆ • Gaudah Chat Yg Aneh Aneh
┆ • Beli Prem Dll Chat Owner
└────────────┈ ⳹`
                },
                nativeFlowMessage: {
                  buttons: [
                    {
                      name: "cta_url",
                      buttonParamsJson: `{"display_text":"  💬  Chat Bot ( ${botname} )","url":"https://wa.me/${global.botnumber}","merchant_url":"https://wa.me/${global.botnumber}"}`
                    },
                  ],
                },
              },
            ],
            messageVersion: 1,
          },
        },
      },
    },
  },
  {}
);

await client.relayMessage(msg.key.remoteJid, msg.message, {
  messageId: msg.key.id,
});

}
break
//=========================================\\
case 'donate':
case 'pay':
case 'payment': {
  await client.sendMessage(m.chat, { react: { text: `⏱️`, key: m.key }});
  const url = "https://files.catbox.moe/hya2l6.jpg";

  async function image(url) {
    const { imageMessage } = await generateWAMessageContent({
      image: { url }
    }, {
      upload: client.waUploadToServer
    });
    return imageMessage;
  }

  let msg = generateWAMessageFromContent(
    m.chat,
    {
      viewOnceMessage: {
        message: {
          interactiveMessage: {
            body: {
              text: `Berikut daftar metode pembayaran saya ya~`
            },
            carouselMessage: {
              cards: [
                {
                  header: proto.Message.InteractiveMessage.Header.create({
                    ...(await prepareWAMessageMedia({ image: { url: './all/payment/dana.jpg' } }, { upload: client.waUploadToServer })),
                    title: '',
                    gifPlayback: true,
                    subtitle: ownername,
                    hasMediaAttachment: false
                  }),
                  body: { text: `> Klik tombol DANA di bawah\n> DANA A/N: ${global.andana}` },
                  nativeFlowMessage: {
                    buttons: [
                      {
                        "name": "cta_copy",
                        "buttonParamsJson": `{\"display_text\":\"Payment DANA\",\"id\":\"123456789\",\"copy_code\":\"${global.nodana}\"}`
                      },
                    ],
                  },
                },
                {
                  header: proto.Message.InteractiveMessage.Header.create({
                    ...(await prepareWAMessageMedia({ image: { url: './all/payment/gopay.jpg' } }, { upload: client.waUploadToServer })),
                    title: '',
                    gifPlayback: true,
                    subtitle: ownername,
                    hasMediaAttachment: false
                  }),
                  body: { text: `> Klik tombol GOPAY di bawah\n> GOPAY A/N: ${global.angopay}` },
                  nativeFlowMessage: {
                    buttons: [
                      {
                        "name": "cta_copy",
                        "buttonParamsJson": `{\"display_text\":\"Payment GOPAY\",\"id\":\"123456789\",\"copy_code\":\"${global.nogopay}\"}`
                      },
                    ],
                  },
                },
                {
                  header: proto.Message.InteractiveMessage.Header.create({
                    ...(await prepareWAMessageMedia({ image: { url: './all/payment/qris.jpg' } }, { upload: client.waUploadToServer })),
                    title: '',
                    gifPlayback: true,
                    subtitle: ownername,
                    hasMediaAttachment: false
                  }),
                  body: { text: `> SCAN di atas / klik tombol` },
                  nativeFlowMessage: {
                    buttons: [
                      {
                        "name": "cta_url",
                        "buttonParamsJson": `{\"display_text\":\"Payment QRIS\",\"url\":\"https://files.catbox.moe/tlsx10.png\",\"merchant_url\":\"https://www.google.com\"}`
                      },
                    ],
                  },
                },
              ],
              messageVersion: 1,
            },
          },
        },
      },
    },
    { quoted: m }
  );

  await client.relayMessage(msg.key.remoteJid, msg.message, {
    messageId: msg.key.id,
  });
}
        
 break
case 'menu':{
client.sendMessage(from, {react: {text: "⏳", key: m.key}})
await sleep(2000)
client.sendMessage(from, {react: {text: "⌛", key: m.key}})
await sleep(1500)
client.sendMessage(from, {react: {text: "🔒", key: m.key}}) 
await sleep(1000)
client.sendMessage(from, {react: {text: "🔓", key: m.key}}) 
await sleep(500)
client.sendMessage(from, {react: {text: "✅", key: m.key}})
await sleep(200)
let wow = `Hi ${pushname} 🔥,Hello Saya Danzxx Saya Pengembang Script Ini..
╔┈「 INFO USER 」
╎❒ Nama : ${pushname}
╎❒ Creator : ${global.creator}
╎❒ Library : WS-Baileys
╎❒ Versi : ${global.versi}
╎❒ Mode : ${client.public ? 'Publik' : 'Self'}
╎❒ Status : ${isPremium ? "Premium" : "Free"}
╚┈┈┈┈┈┈┈┈┈┈┈┈`
let buttons = new Buttons();   
buttons.setBody(wow)
buttons.addSelection("List Menu");
buttons.makeSections("#! - Show All Menu List!!", "");
buttons.makeRow(
    "#! - Show All Menu",
    "display all menu in the bot !!!",
    "you can see all the features in this bot",
    `${prefix}menuall`
);
buttons.makeSections("#! - Menu Selection", "");
buttons.makeRow(
    "#! - Menu Fun",
    "Whatsapp Fun Bot Menu",
    "This is a fun menu feature just for jokes and fun",
    `${prefix}funmen`
);
buttons.makeRow(
    "#! - Menu Main",
    "Bot Main Menu Features",
    "Fun Main Menu Features Whatsapp Bot",
    `${prefix}mainmen`
);
buttons.makeRow(
    "#! - Menu AI",
    "AI (Artificial Intelligence)",
    "The abbreviation AI stands for Artificial Intelligence",
    `${prefix}menuai`
);
buttons.makeRow(
    "#! - Menu Download",
    "Download Menu for bot",
    "You can download some media From social media",
    `${prefix}menudown`
);
buttons.makeRow(
    "#! - Menu Owner",
    "This menu is for owners only, you must have owner access first to use it.",
    "Before using it, you must be aware first, are you the owner or not the owner?",
    `${prefix}menuowner`
);
buttons.makeRow(
    "#! - Menu Group",
    "You Can Use This Feature in Group Chat",
    "This feature is only used for groups and cannot be used in private chats.",
    `${prefix}menugrup`
);
buttons.makeRow(
    "#! - Menu Tools",
    "This tool may be useful for you",
    "These various tools may be of some use to you.",
    `${prefix}animenu`
);
buttons.makeSections("Contact Creator", "");
buttons.makeRow(
    "#! - Contact Script Owner",
    "Spam and Call Owner are prohibited!!!",
    "later you will be blocked by my owner",
    `${prefix}owner`
);
await buttons.run(m.chat, client, m);
}

break
//=================================================//
case 'menudown':{
client.sendMessage(from, {react: {text: "⏳", key: m.key}})
await sleep(2000)
client.sendMessage(from, {react: {text: "⌛", key: m.key}})
await sleep(1500)
client.sendMessage(from, {react: {text: "🔒", key: m.key}}) 
await sleep(1000)
client.sendMessage(from, {react: {text: "🔓", key: m.key}}) 
await sleep(500)
client.sendMessage(from, {react: {text: "✅", key: m.key}})
await sleep(200)
let wow = `Hi ${pushname} 🔥,Hello Saya Danzxx Saya Pengembang Script Ini..
╔┈「 INFO USER 」
╎❒ Nama : ${pushname}
╎❒ Creator : ${global.creator}
╎❒ Library : WS-Baileys
╎❒ Versi : ${global.versi}
╎❒ Mode : ${client.public ? 'Publik' : 'Self'}
╎❒ Mode : ${isPremium ? "Premium" : "Free"}
╚┈┈┈┈┈┈┈┈┈┈┈┈

╔┈「 *DOWNLOAD MENU* 」
╎❒ytmp3 (linknya) 
╎❒ytmp4 (linknya) 
╎❒ytsearch (linknya) 
╎❒getmusic (reply hasil)
╎❒play (teks) 
╚┈┈┈┈┈┈┈┈┈┈┈┈❀`
let buttons = new Buttons();   
buttons.setBody(wow)
buttons.addSelection("List Menu");
buttons.makeSections("#! - Show All Menu List!!", "");
buttons.makeRow(
    "#! - Show All Menu",
    "display all menu in the bot !!!",
    "you can see all the features in this bot",
    `${prefix}menuall`
);
buttons.makeSections("#! - Menu Selection", "");
buttons.makeRow(
    "#! - Menu Fun",
    "Whatsapp Fun Bot Menu",
    "This is a fun menu feature just for jokes and fun",
    `${prefix}funmen`
);
buttons.makeRow(
    "#! - Menu Main",
    "Bot Main Menu Features",
    "Fun Main Menu Features Whatsapp Bot",
    `${prefix}mainmen`
);
buttons.makeRow(
    "#! - Menu AI",
    "AI (Artificial Intelligence)",
    "The abbreviation AI stands for Artificial Intelligence",
    `${prefix}menuai`
);
buttons.makeRow(
    "#! - Menu Download",
    "Download Menu for bot",
    "You can download some media From social media",
    `${prefix}menudown`
);
buttons.makeRow(
    "#! - Menu Owner",
    "This menu is for owners only, you must have owner access first to use it.",
    "Before using it, you must be aware first, are you the owner or not the owner?",
    `${prefix}menuowner`
);
buttons.makeRow(
    "#! - Menu Group",
    "You Can Use This Feature in Group Chat",
    "This feature is only used for groups and cannot be used in private chats.",
    `${prefix}menugrup`
);
buttons.makeRow(
    "#! - Menu Tools",
    "This tool may be useful for you",
    "These various tools may be of some use to you.",
    `${prefix}animenu`
);
buttons.makeSections("Contact Creator", "");
buttons.makeRow(
    "#! - Contact Script Owner",
    "Spam and Call Owner are prohibited!!!",
    "later you will be blocked by my owner",
    `${prefix}owner`
);
await buttons.run(m.chat, client, m);
}
break
case 'menupan':{
client.sendMessage(from, {react: {text: "⏳", key: m.key}})
await sleep(2000)
client.sendMessage(from, {react: {text: "⌛", key: m.key}})
await sleep(1500)
client.sendMessage(from, {react: {text: "🔒", key: m.key}}) 
await sleep(1000)
client.sendMessage(from, {react: {text: "🔓", key: m.key}}) 
await sleep(500) 
client.sendMessage(from, {react: {text: "✅", key: m.key}})
await sleep(200)
let wow = `Hi ${pushname} 🔥,Hello Saya Danzxx Saya Pengembang Script Ini..
╔┈「 INFO USER 」
╎❒ Nama : ${pushname}
╎❒ Creator : ${global.creator}
╎❒ Library : WS-Baileys
╎❒ Versi : ${global.versi}
╎❒ Mode : ${client.public ? 'Publik' : 'Self'}
╎❒ Status : ${isPremium ? "Premium" : "Free"}
╚┈┈┈┈┈┈┈┈┈┈┈┈
╔┈🕊 {𝗜𝗡𝗙𝗢 𝗕𝗢𝗧} 🕊
╎❒ 𝗡𝗔𝗠𝗘 𝗕𝗢𝗧: ${global.namaowner}
╚┈┈┈┈┈┈┈┈┈┈┈┈❀
╔┈🔥𝙇𝙄𝙎𝙏 𝙋𝘼𝙉𝙀𝙇 𝘿𝘼𝙉𝙕𝙓𝙓 🔥
╎❒1gb *nama,number*
╎❒2gb *nama,number*
╎❒3gb *nama,number*
╎❒4gb *nama,number*
╎❒5gb *nama,number*
╎❒6gb *nama,number*
╎❒7gb *nama,number*
╎❒8gb *nama,number*
╎❒9gb *nama,number*
╎❒10gb *nama,number*
╎❒unli *nama,number*
╚┈┈┈┈┈┈┈┈┈┈┈┈❀
╔┈「 *PT DANZXX* 」
╎❒toadmin
╎❒listadmin
╚┈┈┈┈┈┈┈┈┈┈┈┈❀`
let buttons = new Buttons();   
buttons.setBody(wow)
buttons.addSelection("List Menu");
buttons.makeSections("#! - Show All Menu List!!", "");
buttons.makeRow(
    "#! - Show All Menu",
    "display all menu in the bot !!!",
    "you can see all the features in this bot",
    `${prefix}menuall`
);
buttons.makeSections("#! - Menu Selection", "");
buttons.makeRow(
    "#! - Menu AI",
    "AI (Artificial Intelligence)",
    "The abbreviation AI stands for Artificial Intelligence",
    `${prefix}menuai`
);
buttons.makeRow(
    "#! - Menu Download",
    "Download Menu for bot",
    "You can download some media From social media",
    `${prefix}menudown`
);
buttons.makeRow(
    "#! - Menu Owner",
    "This menu is for owners only, you must have owner access first to use it.",
    "Before using it, you must be aware first, are you the owner or not the owner?",
    `${prefix}menuowner`
);
buttons.makeRow(
    "#! - Menu Group",
    "You Can Use This Feature in Group Chat",
    "This feature is only used for groups and cannot be used in private chats.",
    `${prefix}menugrup`
);
buttons.makeRow(
    "#! - Menu Tools",
    "This tool may be useful for you",
    "These various tools may be of some use to you.",
    `${prefix}menutools`
);
buttons.makeSections("Contact Creator", "");
buttons.makeRow(
    "#! - Contact Script Owner",
    "Spam and Call Owner are prohibited!!!",
    "later you will be blocked by my owner",
    `${prefix}owner`
);
await buttons.run(m.chat, client, m);
}

break
case 'ownermenu': {
client.sendMessage(from, {react: {text: "⏳", key: m.key}})
await sleep(2000)
client.sendMessage(from, {react: {text: "⌛", key: m.key}})
await sleep(1500)
client.sendMessage(from, {react: {text: "🔒", key: m.key}}) 
await sleep(1000)
client.sendMessage(from, {react: {text: "🔓", key: m.key}}) 
await sleep(500) 
client.sendMessage(from, {react: {text: "✅", key: m.key}})
await sleep(200)
let wow = `Hi ${pushname} 🔥,Hello Saya Danzxx Saya Pengembang Script Ini..
╔┈「 INFO USER 」
╎❒ Nama : ${pushname}
╎❒ Creator : ${global.creator}
╎❒ Library : WS-Baileys
╎❒ Versi : ${global.versi}
╎❒ Mode : ${client.public ? 'Publik' : 'Self'}
╎❒ Status : ${isPremium ? "Premium" : "Free"}
╚┈┈┈┈┈┈┈┈┈┈┈┈

╔┈「 𝗢𝗪𝗡𝗘𝗥 𝗠𝗘𝗡𝗨 」
╎❒addowner
╎❒delowner
╎❒addprem
╎❒delprem
╎❒listsrv
╎❒delsrv
╎❒myip
╎❒idch
╚┈┈┈┈┈┈┈┈┈┈┈┈❀`
let buttons = new Buttons();   
buttons.setBody(wow)
buttons.addSelection("List Menu");
buttons.makeSections("#! - Show All Menu List!!", "");
buttons.makeRow(
    "#! - Show All Menu",
    "display all menu in the bot !!!",
    "you can see all the features in this bot",
    `${prefix}menuall`
);
buttons.makeSections("#! - Menu Selection", "");
buttons.makeRow(
    "#! - Menu Fun",
    "Whatsapp Fun Bot Menu",
    "This is a fun menu feature just for jokes and fun",
    `${prefix}funmen`
);
buttons.makeRow(
    "#! - Menu Main",
    "Bot Main Menu Features",
    "Fun Main Menu Features Whatsapp Bot",
    `${prefix}mainmen`
);
buttons.makeRow(
    "#! - Menu AI",
    "AI (Artificial Intelligence)",
    "The abbreviation AI stands for Artificial Intelligence",
    `${prefix}menuai`
);
buttons.makeRow(
    "#! - Menu Download",
    "Download Menu for bot",
    "You can download some media From social media",
    `${prefix}menudown`
);
buttons.makeRow(
    "#! - Menu Owner",
    "This menu is for owners only, you must have owner access first to use it.",
    "Before using it, you must be aware first, are you the owner or not the owner?",
    `${prefix}menuowner`
);
buttons.makeRow(
    "#! - Menu Group",
    "You Can Use This Feature in Group Chat",
    "This feature is only used for groups and cannot be used in private chats.",
    `${prefix}menugrup`
);
buttons.makeRow(
    "#! - Menu Tools",
    "This tool may be useful for you",
    "These various tools may be of some use to you.",
    `${prefix}animenu`
);
buttons.makeSections("Contact Creator", "");
buttons.makeRow(
    "#! - Contact Script Owner",
    "Spam and Call Owner are prohibited!!!",
    "later you will be blocked by my owner",
    `${prefix}owner`
);
await buttons.run(m.chat, client, m);
}
break
case 'mainmen':{
client.sendMessage(from, {react: {text: "⏳", key: m.key}})
await sleep(2000)
client.sendMessage(from, {react: {text: "⌛", key: m.key}})
await sleep(1500)
client.sendMessage(from, {react: {text: "🔒", key: m.key}}) 
await sleep(1000)
client.sendMessage(from, {react: {text: "🔓", key: m.key}}) 
await sleep(500)
client.sendMessage(from, {react: {text: "✅", key: m.key}})
await sleep(200) 
let wow = `Hi ${pushname} 🔥,Hello Saya Danzxx Saya Pengembang Script Ini..
╔┈「 INFO USER 」
╎❒ Nama : ${pushname}
╎❒ Creator : ${global.creator}
╎❒ Library : WS-Baileys
╎❒ Versi : ${global.versi}
╎❒ Mode : ${client.public ? 'Publik' : 'Self'}
╎❒ Status : ${isPremium ? "Premium" : "Free"}
╚┈┈┈┈┈┈┈┈┈┈┈┈

╔┈「 *MAIN MENU* 」
╎❒infobot
╎❒
╎❒
╎❒
╎❒
╎❒
╎❒
╎❒
╚┈┈┈┈┈┈┈┈┈┈┈┈❀`
let buttons = new Buttons();   
buttons.setBody(wow)
buttons.addSelection("List Menu");
buttons.makeSections("#! - Show All Menu List!!", "");
buttons.makeRow(
    "#! - Show All Menu",
    "display all menu in the bot !!!",
    "you can see all the features in this bot",
    `${prefix}menuall`
);
buttons.makeSections("#! - Menu Selection", "");
buttons.makeRow(
    "#! - Menu Fun",
    "Whatsapp Fun Bot Menu",
    "This is a fun menu feature just for jokes and fun",
    `${prefix}funmen`
);
buttons.makeRow(
    "#! - Menu Main",
    "Bot Main Menu Features",
    "Fun Main Menu Features Whatsapp Bot",
    `${prefix}mainmen`
);
buttons.makeRow(
    "#! - Menu AI",
    "AI (Artificial Intelligence)",
    "The abbreviation AI stands for Artificial Intelligence",
    `${prefix}menuai`
);
buttons.makeRow(
    "#! - Menu Download",
    "Download Menu for bot",
    "You can download some media From social media",
    `${prefix}menudown`
);
buttons.makeRow(
    "#! - Menu Owner",
    "This menu is for owners only, you must have owner access first to use it.",
    "Before using it, you must be aware first, are you the owner or not the owner?",
    `${prefix}menuowner`
);
buttons.makeRow(
    "#! - Menu Group",
    "You Can Use This Feature in Group Chat",
    "This feature is only used for groups and cannot be used in private chats.",
    `${prefix}menugrup`
);
buttons.makeRow(
    "#! - Menu Tools",
    "This tool may be useful for you",
    "These various tools may be of some use to you.",
    `${prefix}animenu`
);
buttons.makeSections("Contact Creator", "");
buttons.makeRow(
    "#! - Contact Script Owner",
    "Spam and Call Owner are prohibited!!!",
    "later you will be blocked by my owner",
    `${prefix}owner`
);
await buttons.run(m.chat, client, m);
}
break
case 'funmen': {
client.sendMessage(from, {react: {text: "⏳", key: m.key}})
await sleep(2000)
client.sendMessage(from, {react: {text: "⌛", key: m.key}})
await sleep(1500)
client.sendMessage(from, {react: {text: "🔒", key: m.key}}) 
await sleep(1000)
client.sendMessage(from, {react: {text: "🔓", key: m.key}}) 
await sleep(500) 
client.sendMessage(from, {react: {text: "✅", key: m.key}})
await sleep(200)
let wow = `Hi ${pushname} 🔥,Hello Saya Danzxx Saya Pengembang Script Ini..
╔┈「 INFO USER 」
╎❒ Nama : ${pushname}
╎❒ Creator : ${global.creator}
╎❒ Library : WS-Baileys
╎❒ Versi : ${global.versi}
╎❒ Mode : ${client.public? 'Public' : 'Self'}
╎❒ Status : ${isPremium ? "Premium" : "Free"}
╚┈┈┈┈┈┈┈┈┈┈┈┈

╔┈「 *FUN MENU* 」
╎❒perkosa (nama) 
╎❒genjot (nama) 
╎❒nenen (nama) 
╎❒cekmemek (tag)
╎❒tovn (teks) 
╎❒youai (teks) 
╎❒quotesbijak
╎❒quoteshacker
╎❒quotesgombal
╎❒quotesmotivasi
╎❒quotesgalau
╎❒quotesgombal
╎❒truth
╎❒dare
╚┈┈┈┈┈┈┈┈┈┈┈┈❀`
let buttons = new Buttons();   
buttons.setBody(wow)
buttons.addSelection("List Menu");
buttons.makeSections("#! - Show All Menu List!!", "");
buttons.makeRow(
    "#! - Show All Menu",
    "display all menu in the bot !!!",
    "you can see all the features in this bot",
    `${prefix}menuall`
);
buttons.makeSections("#! - Menu Selection", "");
buttons.makeRow(
    "#! - Menu Fun",
    "Whatsapp Fun Bot Menu",
    "This is a fun menu feature just for jokes and fun",
    `${prefix}funmen`
);
buttons.makeRow(
    "#! - Menu Main",
    "Bot Main Menu Features",
    "Fun Main Menu Features Whatsapp Bot",
    `${prefix}mainmen`
);
buttons.makeRow(
    "#! - Menu AI",
    "AI (Artificial Intelligence)",
    "The abbreviation AI stands for Artificial Intelligence",
    `${prefix}menuai`
);
buttons.makeRow(
    "#! - Menu Download",
    "Download Menu for bot",
    "You can download some media From social media",
    `${prefix}menudown`
);
buttons.makeRow(
    "#! - Menu Owner",
    "This menu is for owners only, you must have owner access first to use it.",
    "Before using it, you must be aware first, are you the owner or not the owner?",
    `${prefix}menuowner`
);
buttons.makeRow(
    "#! - Menu Group",
    "You Can Use This Feature in Group Chat",
    "This feature is only used for groups and cannot be used in private chats.",
    `${prefix}menugrup`
);
buttons.makeRow(
    "#! - Menu Tools",
    "This tool may be useful for you",
    "These various tools may be of some use to you.",
    `${prefix}animenu`
);
buttons.makeSections("Contact Creator", "");
buttons.makeRow(
    "#! - Contact Script Owner",
    "Spam and Call Owner are prohibited!!!",
    "later you will be blocked by my owner",
    `${prefix}owner`
);
await buttons.run(m.chat, client, m);
}

break
case 'animenu': {
client.sendMessage(from, {react: {text: "⏳", key: m.key}})
await sleep(2000)
client.sendMessage(from, {react: {text: "⌛", key: m.key}})
await sleep(1500)
client.sendMessage(from, {react: {text: "🔒", key: m.key}}) 
await sleep(1000)
client.sendMessage(from, {react: {text: "🔓", key: m.key}}) 
await sleep(500) 
client.sendMessage(from, {react: {text: "✅", key: m.key}})
await sleep(200)
let wow = `Hi ${pushname} 🔥,Hello Saya Danzxx Saya Pengembang Script Ini.
╔┈「 INFO USER 」
╎❒ Nama : ${pushname}
╎❒ Creator : ${global.creator}
╎❒ Library : WS-Baileys
╎❒ Versi : ${global.versi}
╎❒ Mode : ${client.public ? 'Publik' : 'Self'}
╎❒ Status : ${isPremium ? "Premium" : "Free"}
╚┈┈┈┈┈┈┈┈┈┈┈┈

╔┈「 *ANIME MENU* 」
╎❒animesrc
╎❒kataanime
╎❒topdoujin
╎❒ai-logic
╎❒
╎❒
╎❒
╎❒
╚┈┈┈┈┈┈┈┈┈┈┈┈❀`
let buttons = new Buttons();   
buttons.setBody(wow)
buttons.addSelection("List Menu");
buttons.makeSections("#! - Show All Menu List!!", "");
buttons.makeRow(
    "#! - Show All Menu",
    "display all menu in the bot !!!",
    "you can see all the features in this bot",
    `${prefix}menuall`
);
buttons.makeSections("#! - Menu Selection", "");
buttons.makeRow(
    "#! - Menu Fun",
    "Whatsapp Fun Bot Menu",
    "This is a fun menu feature just for jokes and fun",
    `${prefix}funmen`
);
buttons.makeRow(
    "#! - Menu Main",
    "Bot Main Menu Features",
    "Fun Main Menu Features Whatsapp Bot",
    `${prefix}mainmen`
);
buttons.makeRow(
    "#! - Menu AI",
    "AI (Artificial Intelligence)",
    "The abbreviation AI stands for Artificial Intelligence",
    `${prefix}menuai`
);
buttons.makeRow(
    "#! - Menu Download",
    "Download Menu for bot",
    "You can download some media From social media",
    `${prefix}menudown`
);
buttons.makeRow(
    "#! - Menu Owner",
    "This menu is for owners only, you must have owner access first to use it.",
    "Before using it, you must be aware first, are you the owner or not the owner?",
    `${prefix}menuowner`
);
buttons.makeRow(
    "#! - Menu Group",
    "You Can Use This Feature in Group Chat",
    "This feature is only used for groups and cannot be used in private chats.",
    `${prefix}menugrup`
);
buttons.makeRow(
    "#! - Menu Tools",
    "This tool may be useful for you",
    "These various tools may be of some use to you.",
    `${prefix}animenu`
);
buttons.makeSections("Contact Creator", "");
buttons.makeRow(
    "#! - Contact Script Owner",
    "Spam and Call Owner are prohibited!!!",
    "later you will be blocked by my owner",
    `${prefix}owner`
);
await buttons.run(m.chat, client, m);
}
break
case "addprem":{
if (!isOwner) return m.reply(mess.only.owner)
if (!args[0]) return m.reply(`Penggunaan ${prefix+command} nomor\nContoh ${prefix+command} 6289676437961`)
prrkek = q.split("|")[0].replace(/[^0-9]/g, '')+`@s.whatsapp.net`
let ceknya = await client.onWhatsApp(prrkek)
if (ceknya.length == 0) return m.reply(`Masukkan Nomor Yang Valid Dan Terdaftar Di WhatsApp!!!`)
prem.push(prrkek)
fs.writeFileSync("./all/database/premium.json", JSON.stringify(prem))
m.reply(`Nomor ${prrkek} Telah Menjadi Premium!`)
}
break
case "delprem":{
if (!isAdmins) return m.reply(mess.only.admins)
if (!args[0]) return m.reply(`Penggunaan ${prefix+command} nomor\nContoh ${prefix+command} 6289676437961`)
ya = q.split("|")[0].replace(/[^0-9]/g, '')+`@s.whatsapp.net`
unp = prem.indexOf(ya)
prem.splice(unp, 1)
fs.writeFileSync("./all/database/premium.json", JSON.stringify(prem))
m.reply(`Nomor ${ya} Telah Di Hapus Premium!`)
}
  
 break
case "addowner":
if (!isOwner) return m.reply(mess.only.owner)
if (!args[0]) return m.reply(`Penggunaan ${prefix+command} nomor\nContoh ${prefix+command} 6289676437961`)
bnnd = q.split("|")[0].replace(/[^0-9]/g, '')
let ceknye = await client.onWhatsApp(bnnd + `@s.whatsapp.net`)
if (ceknye.length == 0) return reply(`Masukkan Nomor Yang Valid Dan Terdaftar Di WhatsApp!!!`)
ownerNumber.push(bnnd)
fs.writeFileSync('./all/database/owner.json', JSON.stringify(ownerNumber))
m.reply(`Nomor ${bnnd} Telah Menjadi Owner!!!`)        
break
//=================================================//
case 'yts': case 'ytsearch': {
if (!isPremium) return m.reply(`Kamu Belum Premium`)
if (!text) throw `Example : ${prefix + command} story wa anime`
let search = await yts(text)
let teks = '*YouTube Search*\n\n Result From '+text+'\n\n'
let no = 1
for (let i of search.all) {
teks += `⭔ No : ${no++}\n⭔ Type : ${i.type}\n⭔ Video ID : ${i.videoId}\n⭔ Title : ${i.title}\n⭔ Views : ${i.views}\n⭔ Duration : ${i.timestamp}\n⭔ Upload At : ${i.ago}\n⭔ Url : ${i.url}\n\n─────────────────\n\n`
}
client.sendMessage(m.chat, { image: { url: search.all[0].thumbnail },  caption: teks }, { quoted: m })
}

break
//=================================================
case 'ytmp4': case 'youtubemp4': {
if (!isAdmins) return m.reply('*khusus Premium*')
if (!text) throw `Example : ${prefix + command} https://youtube.com/watch?v=PtFMh6Tccag%27 360p`
let { ytv } = require('./halffile/y2mate')
let quality = args[1] ? args[1] : '360p'
let media = await ytv(text, quality)
if (media.filesize >= 100000) return m.reply('File Melebihi Batas '+util.format(media))
client.sendMessage(m.chat, { video: { url: media.dl_link }, mimetype: 'video/mp4', fileName: `${media.title}.mp4`, caption: `⭔ Title : ${media.title}\n⭔ File Size : ${media.filesizeF}\n⭔ Url : ${isUrl(text)}\n⭔ Ext : MP4\n⭔ Resolusi : ${args[1] || '360p'}` }, { quoted: m })
}

break
case 'flux':
  if (!text) return m.reply('masukkan prompt nya')
  try {
    m.reply('*Process generating image, mungkin membutuhkan waktu yang lama*')
    let pix = await (await fetch('https://endpoint.web.id/ai/flux-schnell?key=YOUR-KEY&prompt=' + text)).json()
    let shannz = pix.result[0]
    client.sendMessage(m.chat, { image: { url: shannz }, caption: 'by shannz rest api' }, { quoted: m })
} catch (e) {
    m.reply('*terjadi kesalahan*')
}
break
break
//=================================================
case 'getmusic': {
if (!isOwner) return m.reply('*khusus Premium*')
if (!text) throw `Example : ${prefix + command} 1`
if (!m.quoted) return m.reply('Reply Pesan')
if (!m.quoted.isBaileys) throw `Hanya Bisa Membalas Pesan Dari Bot`
let urls = quoted.text.match(new RegExp(/(?:https?:\/\/)?(?:youtu\.be\/|(?:www\.|m\.)?youtube\.com\/(?:watch|v|embed|shorts)(?:\.php)?(?:\?.*v=|\/))([a-zA-Z0-9\_-]+)/, 'gi'))
if (!urls) throw `Mungkin pesan yang anda reply tidak mengandung result ytsearch`
await loading ()
downloadMp3(urls[text - 1])
}

break

case "play": {
if (!text) return m.reply(`*Example:* ${prefix + command} photograph`)
const yts = require('yt-search');
let search = await yts(text);
let telaso = search.all[0].url;
var response = await ytdl(telaso)
var puki = response.data.mp3
client.sendMessage(m.chat, { audio: { url: puki },
mimetype: "audio/mpeg",
fileName: "kiuu.mp3",
contextInfo: {
forwardingScore: 100,
isForwarded: true,
externalAdReply: {
showAdAttribution: true,
title: search.all[0].title,
sourceUrl: search.all[0].timestamp,
thumbnailUrl: search.all[0].thumbnail,
}}},{quoted:m})
}
break
//===================[ TEMPAT CASE MENU OWNER ]=====================\\
case 'self': {
if (!isOwner) return m.reply(mess.OnlyOwner)
client.public = false
m.reply('Sukses Change To Self Mode')
}
break
case 'public': {
if (!isOwner) return m.reply(mess.OnlyOwner)
client.public = true
m.reply('Sukses Change To Public Mode')
}
        
break
case 'linkgroup': case 'linkgc': {
if (!m.isGroup) return m.reply(mess.only.group)
let response = await client.groupInviteCode(from)
client.sendText(m.chat, `https://chat.whatsapp.com/${response}\n\nLink Group : ${groupMetadata.subject}`, m, { detectLink: true })
}

break

//=========================================\\======
case 'quotesmotivasi': {
function pickRandom(list) {
  return list[Math.floor(list.length * Math.random())]
}

const motivasi = [
"ᴊᴀɴɢᴀɴ ʙɪᴄᴀʀᴀ, ʙᴇʀᴛɪɴᴅᴀᴋ ꜱᴀᴊᴀ. ᴊᴀɴɢᴀɴ ᴋᴀᴛᴀᴋᴀɴ, ᴛᴜɴᴊᴜᴋᴋᴀɴ ꜱᴀᴊᴀ. ᴊᴀɴɢᴀɴ ᴊᴀɴᴊɪ, ʙᴜᴋᴛɪᴋᴀɴ ꜱᴀᴊᴀ.",
"ᴊᴀɴɢᴀɴ ᴘᴇʀɴᴀʜ ʙᴇʀʜᴇɴᴛɪ ᴍᴇʟᴀᴋᴜᴋᴀɴ ʏᴀɴɢ ᴛᴇʀʙᴀɪᴋ ʜᴀɴʏᴀ ᴋᴀʀᴇɴᴀ ꜱᴇꜱᴇᴏʀᴀɴɢ ᴛɪᴅᴀᴋ ᴍᴇᴍʙᴇʀɪ ᴀɴᴅᴀ ᴘᴇɴɢʜᴀʀɢᴀᴀɴ.",
"ʙᴇᴋᴇʀᴊᴀ ꜱᴀᴀᴛ ᴍᴇʀᴇᴋᴀ ᴛɪᴅᴜʀ. ʙᴇʟᴀᴊᴀʀ ꜱᴀᴀᴛ ᴍᴇʀᴇᴋᴀ ʙᴇʀᴘᴇꜱᴛᴀ. ʜᴇᴍᴀᴛ ꜱᴇᴍᴇɴᴛᴀʀᴀ ᴍᴇʀᴇᴋᴀ ᴍᴇɴɢʜᴀʙɪꜱᴋᴀɴ. ʜɪᴅᴜᴘʟᴀʜ ꜱᴇᴘᴇʀᴛɪ ᴍɪᴍᴘɪ ᴍᴇʀᴇᴋᴀ.",
"ᴋᴜɴᴄɪ ꜱᴜᴋꜱᴇꜱ ᴀᴅᴀʟᴀʜ ᴍᴇᴍᴜꜱᴀᴛᴋᴀɴ ᴘɪᴋɪʀᴀɴ ꜱᴀᴅᴀʀ ᴋɪᴛᴀ ᴘᴀᴅᴀ ʜᴀʟ-ʜᴀʟ ʏᴀɴɢ ᴋɪᴛᴀ ɪɴɢɪɴᴋᴀɴ, ʙᴜᴋᴀɴ ʜᴀʟ-ʜᴀʟ ʏᴀɴɢ ᴋɪᴛᴀ ᴛᴀᴋᴜᴛɪ.",
"ᴊᴀɴɢᴀɴ ᴛᴀᴋᴜᴛ ɢᴀɢᴀʟ. ᴋᴇᴛᴀᴋᴜᴛᴀɴ ʙᴇʀᴀᴅᴀ ᴅɪ ᴛᴇᴍᴘᴀᴛ ʏᴀɴɢ ꜱᴀᴍᴀ ᴛᴀʜᴜɴ ᴅᴇᴘᴀɴ ꜱᴇᴘᴇʀᴛɪ ᴀɴᴅᴀ ꜱᴀᴀᴛ ɪɴɪ.",
"ᴊɪᴋᴀ ᴋɪᴛᴀ ᴛᴇʀᴜꜱ ᴍᴇʟᴀᴋᴜᴋᴀɴ ᴀᴘᴀ ʏᴀɴɢ ᴋɪᴛᴀ ʟᴀᴋᴜᴋᴀɴ, ᴋɪᴛᴀ ᴀᴋᴀɴ ᴛᴇʀᴜꜱ ᴍᴇɴᴅᴀᴘᴀᴛᴋᴀɴ ᴀᴘᴀ ʏᴀɴɢ ᴋɪᴛᴀ ᴅᴀᴘᴀᴛᴋᴀɴ.",
"ᴊɪᴋᴀ ᴀɴᴅᴀ ᴛɪᴅᴀᴋ ᴅᴀᴘᴀᴛ ᴍᴇɴɢᴀᴛᴀꜱɪ ꜱᴛʀᴇꜱ, ᴀɴᴅᴀ ᴛɪᴅᴀᴋ ᴀᴋᴀɴ ᴍᴇɴɢᴇʟᴏʟᴀ ᴋᴇꜱᴜᴋꜱᴇꜱᴀɴ.",
"ʙᴇʀꜱɪᴋᴀᴘ ᴋᴇʀᴀꜱ ᴋᴇᴘᴀʟᴀ ᴛᴇɴᴛᴀɴɢ ᴛᴜᴊᴜᴀɴ ᴀɴᴅᴀ ᴅᴀɴ ꜰʟᴇᴋꜱɪʙᴇʟ ᴛᴇɴᴛᴀɴɢ ᴍᴇᴛᴏᴅᴇ ᴀɴᴅᴀ.",
"ᴋᴇʀᴊᴀ ᴋᴇʀᴀꜱ ᴍᴇɴɢᴀʟᴀʜᴋᴀɴ ʙᴀᴋᴀᴛ ᴋᴇᴛɪᴋᴀ ʙᴀᴋᴀᴛ ᴛɪᴅᴀᴋ ʙᴇᴋᴇʀᴊᴀ ᴋᴇʀᴀꜱ.",
"ɪɴɢᴀᴛʟᴀʜ ʙᴀʜᴡᴀ ᴘᴇʟᴀᴊᴀʀᴀɴ ᴛᴇʀʙᴇꜱᴀʀ ᴅᴀʟᴀᴍ ʜɪᴅᴜᴘ ʙɪᴀꜱᴀɴʏᴀ ᴅɪᴘᴇʟᴀᴊᴀʀɪ ᴅᴀʀɪ ꜱᴀᴀᴛ-ꜱᴀᴀᴛ ᴛᴇʀʙᴜʀᴜᴋ ᴅᴀɴ ᴅᴀʀɪ ᴋᴇꜱᴀʟᴀʜᴀɴ ᴛᴇʀʙᴜʀᴜᴋ.",
"ʜɪᴅᴜᴘ ʙᴜᴋᴀɴ ᴛᴇɴᴛᴀɴɢ ᴍᴇɴᴜɴɢɢᴜ ʙᴀᴅᴀɪ ʙᴇʀʟᴀʟᴜ, ᴛᴇᴛᴀᴘɪ ʙᴇʟᴀᴊᴀʀ ᴍᴇɴᴀʀɪ ᴅɪ ᴛᴇɴɢᴀʜ ʜᴜᴊᴀɴ.",
"ᴊɪᴋᴀ ʀᴇɴᴄᴀɴᴀɴʏᴀ ᴛɪᴅᴀᴋ ʙᴇʀʜᴀꜱɪʟ, ᴜʙᴀʜ ʀᴇɴᴄᴀɴᴀɴʏᴀ ʙᴜᴋᴀɴ ᴛᴜᴊᴜᴀɴɴʏᴀ.",
"ᴊᴀɴɢᴀɴ ᴛᴀᴋᴜᴛ ᴋᴀʟᴀᴜ ʜɪᴅᴜᴘᴍᴜ ᴀᴋᴀɴ ʙᴇʀᴀᴋʜɪʀ; ᴛᴀᴋᴜᴛʟᴀʜ ᴋᴀʟᴀᴜ ʜɪᴅᴜᴘᴍᴜ ᴛᴀᴋ ᴘᴇʀɴᴀʜ ᴅɪᴍᴜʟᴀɪ.",
"ᴏʀᴀɴɢ ʏᴀɴɢ ʙᴇɴᴀʀ-ʙᴇɴᴀʀ ʜᴇʙᴀᴛ ᴀᴅᴀʟᴀʜ ᴏʀᴀɴɢ ʏᴀɴɢ ᴍᴇᴍʙᴜᴀᴛ ꜱᴇᴛɪᴀᴘ ᴏʀᴀɴɢ ᴍᴇʀᴀꜱᴀ ʜᴇʙᴀᴛ.",
"ᴘᴇɴɢᴀʟᴀᴍᴀɴ ᴀᴅᴀʟᴀʜ ɢᴜʀᴜ ʏᴀɴɢ ʙᴇʀᴀᴛ ᴋᴀʀᴇɴᴀ ᴅɪᴀ ᴍᴇᴍʙᴇʀɪᴋᴀɴ ᴛᴇꜱ ᴛᴇʀʟᴇʙɪʜ ᴅᴀʜᴜʟᴜ, ᴋᴇᴍᴜᴅɪᴀɴ ᴘᴇʟᴀᴊᴀʀᴀɴɴʏᴀ.",
"ᴍᴇɴɢᴇᴛᴀʜᴜɪ ꜱᴇʙᴇʀᴀᴘᴀ ʙᴀɴʏᴀᴋ ʏᴀɴɢ ᴘᴇʀʟᴜ ᴅɪᴋᴇᴛᴀʜᴜɪ ᴀᴅᴀʟᴀʜ ᴀᴡᴀʟ ᴅᴀʀɪ ʙᴇʟᴀᴊᴀʀ ᴜɴᴛᴜᴋ ʜɪᴅᴜᴘ.",
"ꜱᴜᴋꜱᴇꜱ ʙᴜᴋᴀɴʟᴀʜ ᴀᴋʜɪʀ, ᴋᴇɢᴀɢᴀʟᴀɴ ᴛɪᴅᴀᴋ ꜰᴀᴛᴀʟ. ʏᴀɴɢ ᴛᴇʀᴘᴇɴᴛɪɴɢ ᴀᴅᴀʟᴀʜ ᴋᴇʙᴇʀᴀɴɪᴀɴ ᴜɴᴛᴜᴋ ᴍᴇʟᴀɴᴊᴜᴛᴋᴀɴ.",
"ʟᴇʙɪʜ ʙᴀɪᴋ ɢᴀɢᴀʟ ᴅᴀʟᴀᴍ ᴏʀɪꜱɪɴᴀʟɪᴛᴀꜱ ᴅᴀʀɪᴘᴀᴅᴀ ʙᴇʀʜᴀꜱɪʟ ᴍᴇɴɪʀᴜ.",
"ʙᴇʀᴀɴɪ ʙᴇʀᴍɪᴍᴘɪ, ᴛᴀᴘɪ ʏᴀɴɢ ʟᴇʙɪʜ ᴘᴇɴᴛɪɴɢ, ʙᴇʀᴀɴɪ ᴍᴇʟᴀᴋᴜᴋᴀɴ ᴛɪɴᴅᴀᴋᴀɴ ᴅɪ ʙᴀʟɪᴋ ɪᴍᴘɪᴀɴᴍᴜ.",
"ᴛᴇᴛᴀᴘᴋᴀɴ ᴛᴜᴊᴜᴀɴ ᴀɴᴅᴀ ᴛɪɴɢɢɪ-ᴛɪɴɢɢɪ, ᴅᴀɴ ᴊᴀɴɢᴀɴ ʙᴇʀʜᴇɴᴛɪ ꜱᴀᴍᴘᴀɪ ᴀɴᴅᴀ ᴍᴇɴᴄᴀᴘᴀɪɴʏᴀ.",
"ᴋᴇᴍʙᴀɴɢᴋᴀɴ ᴋᴇꜱᴜᴋꜱᴇꜱᴀɴ ᴅᴀʀɪ ᴋᴇɢᴀɢᴀʟᴀɴ. ᴋᴇᴘᴜᴛᴜꜱᴀꜱᴀᴀɴ ᴅᴀɴ ᴋᴇɢᴀɢᴀʟᴀɴ ᴀᴅᴀʟᴀʜ ᴅᴜᴀ ʙᴀᴛᴜ ʟᴏɴᴄᴀᴛᴀɴ ᴘᴀʟɪɴɢ ᴘᴀꜱᴛɪ ᴍᴇɴᴜᴊᴜ ꜱᴜᴋꜱᴇꜱ.",
"ᴊᴇɴɪᴜꜱ ᴀᴅᴀʟᴀʜ ꜱᴀᴛᴜ ᴘᴇʀꜱᴇɴ ɪɴꜱᴘɪʀᴀꜱɪ ᴅᴀɴ ꜱᴇᴍʙɪʟᴀɴ ᴘᴜʟᴜʜ ꜱᴇᴍʙɪʟᴀɴ ᴘᴇʀꜱᴇɴ ᴋᴇʀɪɴɢᴀᴛ.",
"ꜱᴜᴋꜱᴇꜱ ᴀᴅᴀʟᴀʜ ᴛᴇᴍᴘᴀᴛ ᴘᴇʀꜱɪᴀᴘᴀɴ ᴅᴀɴ ᴋᴇꜱᴇᴍᴘᴀᴛᴀɴ ʙᴇʀᴛᴇᴍᴜ.",
"ᴋᴇᴛᴇᴋᴜɴᴀɴ ɢᴀɢᴀʟ 19 ᴋᴀʟɪ ᴅᴀɴ ʙᴇʀʜᴀꜱɪʟ ᴘᴀᴅᴀ ᴋᴇꜱᴇᴍᴘᴀᴛᴀᴍ ʏᴀɴɢ ᴋᴇ-20.",
"ᴊᴀʟᴀɴ ᴍᴇɴᴜᴊᴜ ꜱᴜᴋꜱᴇꜱ ᴅᴀɴ ᴊᴀʟᴀɴ ᴍᴇɴᴜᴊᴜ ᴋᴇɢᴀɢᴀʟᴀɴ ʜᴀᴍᴘɪʀ ᴘᴇʀꜱɪꜱ ꜱᴀᴍᴀ.",
"ꜱᴜᴋꜱᴇꜱ ʙɪᴀꜱᴀɴʏᴀ ᴅᴀᴛᴀɴɢ ᴋᴇᴘᴀᴅᴀ ᴍᴇʀᴇᴋᴀ ʏᴀɴɢ ᴛᴇʀʟᴀʟᴜ ꜱɪʙᴜᴋ ᴍᴇɴᴄᴀʀɪɴʏᴀ.",
"ᴊᴀɴɢᴀɴ ᴛᴜɴᴅᴀ ᴘᴇᴋᴇʀᴊᴀᴀɴᴍᴜ ꜱᴀᴍᴘᴀɪ ʙᴇꜱᴏᴋ, ꜱᴇᴍᴇɴᴛᴀʀᴀ ᴋᴀᴜ ʙɪꜱᴀ ᴍᴇɴɢᴇʀᴊᴀᴋᴀɴɴʏᴀ ʜᴀʀɪ ɪɴɪ.",
"20 ᴛᴀʜᴜɴ ᴅᴀʀɪ ꜱᴇᴋᴀʀᴀɴɢ, ᴋᴀᴜ ᴍᴜɴɢᴋɪɴ ʟᴇʙɪʜ ᴋᴇᴄᴇᴡᴀ ᴅᴇɴɢᴀɴ ʜᴀʟ-ʜᴀʟ ʏᴀɴɢ ᴛɪᴅᴀᴋ ꜱᴇᴍᴘᴀᴛ ᴋᴀᴜ ʟᴀᴋᴜᴋᴀɴ ᴀʟɪʜ-ᴀʟɪʜ ʏᴀɴɢ ꜱᴜᴅᴀʜ.",
"ᴊᴀɴɢᴀɴ ʜᴀʙɪꜱᴋᴀɴ ᴡᴀᴋᴛᴜᴍᴜ ᴍᴇᴍᴜᴋᴜʟɪ ᴛᴇᴍʙᴏᴋ ᴅᴀɴ ʙᴇʀʜᴀʀᴀᴘ ʙɪꜱᴀ ᴍᴇɴɢᴜʙᴀʜɴʏᴀ ᴍᴇɴᴊᴀᴅɪ ᴘɪɴᴛᴜ.",
"ᴋᴇꜱᴇᴍᴘᴀᴛᴀɴ ɪᴛᴜ ᴍɪʀɪᴘ ꜱᴇᴘᴇʀᴛɪ ᴍᴀᴛᴀʜᴀʀɪ ᴛᴇʀʙɪᴛ. ᴋᴀʟᴀᴜ ᴋᴀᴜ ᴍᴇɴᴜɴɢɢᴜ ᴛᴇʀʟᴀʟᴜ ʟᴀᴍᴀ, ᴋᴀᴜ ʙɪꜱᴀ ᴍᴇʟᴇᴡᴀᴛᴋᴀɴɴʏᴀ.",
"ʜɪᴅᴜᴘ ɪɴɪ ᴛᴇʀᴅɪʀɪ ᴅᴀʀɪ 10 ᴘᴇʀꜱᴇɴ ᴀᴘᴀ ʏᴀɴɢ ᴛᴇʀᴊᴀᴅɪ ᴘᴀᴅᴀᴍᴜ ᴅᴀɴ 90 ᴘᴇʀꜱᴇɴ ʙᴀɢᴀɪᴍᴀɴᴀ ᴄᴀʀᴀᴍᴜ ᴍᴇɴʏɪᴋᴀᴘɪɴʏᴀ.",
"ᴀᴅᴀ ᴛɪɢᴀ ᴄᴀʀᴀ ᴜɴᴛᴜᴋ ᴍᴇɴᴄᴀᴘᴀɪ ᴋᴇꜱᴜᴋꜱᴇꜱᴀɴ ᴛᴇʀᴛɪɴɢɢɪ: ᴄᴀʀᴀ ᴘᴇʀᴛᴀᴍᴀ ᴀᴅᴀʟᴀʜ ʙᴇʀꜱɪᴋᴀᴘ ʙᴀɪᴋ. ᴄᴀʀᴀ ᴋᴇᴅᴜᴀ ᴀᴅᴀʟᴀʜ ʙᴇʀꜱɪᴋᴀᴘ ʙᴀɪᴋ. ᴄᴀʀᴀ ᴋᴇᴛɪɢᴀ ᴀᴅᴀʟᴀʜ ᴍᴇɴᴊᴀᴅɪ ʙᴀɪᴋ.",
"ᴀʟᴀꜱᴀɴ ɴᴏᴍᴏʀ ꜱᴀᴛᴜ ᴏʀᴀɴɢ ɢᴀɢᴀʟ ᴅᴀʟᴀᴍ ʜɪᴅᴜᴘ ᴀᴅᴀʟᴀʜ ᴋᴀʀᴇɴᴀ ᴍᴇʀᴇᴋᴀ ᴍᴇɴᴅᴇɴɢᴀʀᴋᴀɴ ᴛᴇᴍᴀɴ, ᴋᴇʟᴜᴀʀɢᴀ, ᴅᴀɴ ᴛᴇᴛᴀɴɢɢᴀ ᴍᴇʀᴇᴋᴀ.",
"ᴡᴀᴋᴛᴜ ʟᴇʙɪʜ ʙᴇʀʜᴀʀɢᴀ ᴅᴀʀɪᴘᴀᴅᴀ ᴜᴀɴɢ. ᴋᴀᴍᴜ ʙɪꜱᴀ ᴍᴇɴᴅᴀᴘᴀᴛᴋᴀɴ ʟᴇʙɪʜ ʙᴀɴʏᴀᴋ ᴜᴀɴɢ, ᴛᴇᴛᴀᴘɪ ᴋᴀᴍᴜ ᴛɪᴅᴀᴋ ʙɪꜱᴀ ᴍᴇɴᴅᴀᴘᴀᴛᴋᴀɴ ʟᴇʙɪʜ ʙᴀɴʏᴀᴋ ᴡᴀᴋᴛᴜ.",
"ᴘᴇɴᴇᴛᴀᴘᴀɴ ᴛᴜᴊᴜᴀɴ ᴀᴅᴀʟᴀʜ ʀᴀʜᴀꜱɪᴀ ᴍᴀꜱᴀ ᴅᴇᴘᴀɴ ʏᴀɴɢ ᴍᴇɴᴀʀɪᴋ.",
"ꜱᴀᴀᴛ ᴋɪᴛᴀ ʙᴇʀᴜꜱᴀʜᴀ ᴜɴᴛᴜᴋ ᴍᴇɴᴊᴀᴅɪ ʟᴇʙɪʜ ʙᴀɪᴋ ᴅᴀʀɪ ᴋɪᴛᴀ, ꜱᴇɢᴀʟᴀ ꜱᴇꜱᴜᴀᴛᴜ ᴅɪ ꜱᴇᴋɪᴛᴀʀ ᴋɪᴛᴀ ᴊᴜɢᴀ ᴍᴇɴᴊᴀᴅɪ ʟᴇʙɪʜ ʙᴀɪᴋ.",
"ᴘᴇʀᴛᴜᴍʙᴜʜᴀɴ ᴅɪᴍᴜʟᴀɪ ᴋᴇᴛɪᴋᴀ ᴋɪᴛᴀ ᴍᴜʟᴀɪ ᴍᴇɴᴇʀɪᴍᴀ ᴋᴇʟᴇᴍᴀʜᴀɴ ᴋɪᴛᴀ ꜱᴇɴᴅɪʀɪ.",
"ᴊᴀɴɢᴀɴʟᴀʜ ᴘᴇʀɴᴀʜ ᴍᴇɴʏᴇʀᴀʜ ᴋᴇᴛɪᴋᴀ ᴀɴᴅᴀ ᴍᴀꜱɪʜ ᴍᴀᴍᴘᴜ ʙᴇʀᴜꜱᴀʜᴀ ʟᴀɢɪ. ᴛɪᴅᴀᴋ ᴀᴅᴀ ᴋᴀᴛᴀ ʙᴇʀᴀᴋʜɪʀ ꜱᴀᴍᴘᴀɪ ᴀɴᴅᴀ ʙᴇʀʜᴇɴᴛɪ ᴍᴇɴᴄᴏʙᴀ.",
"ᴋᴇᴍᴀᴜᴀɴ ᴀᴅᴀʟᴀʜ ᴋᴜɴᴄɪ ꜱᴜᴋꜱᴇꜱ. ᴏʀᴀɴɢ-ᴏʀᴀɴɢ ꜱᴜᴋꜱᴇꜱ, ʙᴇʀᴜꜱᴀʜᴀ ᴋᴇʀᴀꜱ ᴀᴘᴀ ᴘᴜɴ ʏᴀɴɢ ᴍᴇʀᴇᴋᴀ ʀᴀꜱᴀᴋᴀɴ ᴅᴇɴɢᴀɴ ᴍᴇɴᴇʀᴀᴘᴋᴀɴ ᴋᴇɪɴɢɪɴᴀɴ ᴍᴇʀᴇᴋᴀ ᴜɴᴛᴜᴋ ᴍᴇɴɢᴀᴛᴀꜱɪ ꜱɪᴋᴀᴘ ᴀᴘᴀᴛɪꜱ, ᴋᴇʀᴀɢᴜᴀɴ ᴀᴛᴀᴜ ᴋᴇᴛᴀᴋᴜᴛᴀɴ.",
"ᴊᴀɴɢᴀɴʟᴀʜ ᴘᴇʀɴᴀʜ ᴍᴇɴʏᴇʀᴀʜ ᴋᴇᴛɪᴋᴀ ᴀɴᴅᴀ ᴍᴀꜱɪʜ ᴍᴀᴍᴘᴜ ʙᴇʀᴜꜱᴀʜᴀ ʟᴀɢɪ. ᴛɪᴅᴀᴋ ᴀᴅᴀ ᴋᴀᴛᴀ ʙᴇʀᴀᴋʜɪʀ ꜱᴀᴍᴘᴀɪ ᴀɴᴅᴀ ʙᴇʀʜᴇɴᴛɪ ᴍᴇɴᴄᴏʙᴀ.",
"ᴋᴇᴍᴀᴜᴀɴ ᴀᴅᴀʟᴀʜ ᴋᴜɴᴄɪ ꜱᴜᴋꜱᴇꜱ. ᴏʀᴀɴɢ-ᴏʀᴀɴɢ ꜱᴜᴋꜱᴇꜱ, ʙᴇʀᴜꜱᴀʜᴀ ᴋᴇʀᴀꜱ ᴀᴘᴀ ᴘᴜɴ ʏᴀɴɢ ᴍᴇʀᴇᴋᴀ ʀᴀꜱᴀᴋᴀɴ ᴅᴇɴɢᴀɴ ᴍᴇɴᴇʀᴀᴘᴋᴀɴ ᴋᴇɪɴɢɪɴᴀɴ ᴍᴇʀᴇᴋᴀ ᴜɴᴛᴜᴋ ᴍᴇɴɢᴀᴛᴀꜱɪ ꜱɪᴋᴀᴘ ᴀᴘᴀᴛɪꜱ, ᴋᴇʀᴀɢᴜᴀɴ ᴀᴛᴀᴜ ᴋᴇᴛᴀᴋᴜᴛᴀɴ.",
"ʜᴀʟ ᴘᴇʀᴛᴀᴍᴀ ʏᴀɴɢ ᴅɪʟᴀᴋᴜᴋᴀɴ ᴏʀᴀɴɢ ꜱᴜᴋꜱᴇꜱ ᴀᴅᴀʟᴀʜ ᴍᴇᴍᴀɴᴅᴀɴɢ ᴋᴇɢᴀɢᴀʟᴀɴ ꜱᴇʙᴀɢᴀɪ ꜱɪɴʏᴀʟ ᴘᴏꜱɪᴛɪꜰ ᴜɴᴛᴜᴋ ꜱᴜᴋꜱᴇꜱ.",
"ᴄɪʀɪ ᴋʜᴀꜱ ᴏʀᴀɴɢ ꜱᴜᴋꜱᴇꜱ ᴀᴅᴀʟᴀʜ ᴍᴇʀᴇᴋᴀ ꜱᴇʟᴀʟᴜ ʙᴇʀᴜꜱᴀʜᴀ ᴋᴇʀᴀꜱ ᴜɴᴛᴜᴋ ᴍᴇᴍᴘᴇʟᴀᴊᴀʀɪ ʜᴀʟ-ʜᴀʟ ʙᴀʀᴜ.",
"ꜱᴜᴋꜱᴇꜱ ᴀᴅᴀʟᴀʜ ᴍᴇɴᴅᴀᴘᴀᴛᴋᴀɴ ᴀᴘᴀ ʏᴀɴɢ ᴋᴀᴍᴜ ɪɴɢɪɴᴋᴀɴ, ᴋᴇʙᴀʜᴀɢɪᴀᴀɴ ᴍᴇɴɢɪɴɢɪɴᴋᴀɴ ᴀᴘᴀ ʏᴀɴɢ ᴋᴀᴍᴜ ᴅᴀᴘᴀᴛᴋᴀɴ.",
"ᴏʀᴀɴɢ ᴘᴇꜱɪᴍɪꜱ ᴍᴇʟɪʜᴀᴛ ᴋᴇꜱᴜʟɪᴛᴀɴ ᴅɪ ꜱᴇᴛɪᴀᴘ ᴋᴇꜱᴇᴍᴘᴀᴛᴀɴ. ᴏʀᴀɴɢ ʏᴀɴɢ ᴏᴘᴛɪᴍɪꜱ ᴍᴇʟɪʜᴀᴛ ᴘᴇʟᴜᴀɴɢ ᴅᴀʟᴀᴍ ꜱᴇᴛɪᴀᴘ ᴋᴇꜱᴜʟɪᴛᴀɴ.",
"ᴋᴇʀᴀɢᴜᴀɴ ᴍᴇᴍʙᴜɴᴜʜ ʟᴇʙɪʜ ʙᴀɴʏᴀᴋ ᴍɪᴍᴘɪ ᴅᴀʀɪᴘᴀᴅᴀ ᴋᴇɢᴀɢᴀʟᴀɴ.",
"ʟᴀᴋᴜᴋᴀɴ ᴀᴘᴀ ʏᴀɴɢ ʜᴀʀᴜꜱ ᴋᴀᴍᴜ ʟᴀᴋᴜᴋᴀɴ ꜱᴀᴍᴘᴀɪ ᴋᴀᴍᴜ ᴅᴀᴘᴀᴛ ᴍᴇʟᴀᴋᴜᴋᴀɴ ᴀᴘᴀ ʏᴀɴɢ ɪɴɢɪɴ ᴋᴀᴍᴜ ʟᴀᴋᴜᴋᴀɴ.",
"ᴏᴘᴛɪᴍɪꜱᴛɪꜱ ᴀᴅᴀʟᴀʜ ꜱᴀʟᴀʜ ꜱᴀᴛᴜ ᴋᴜᴀʟɪᴛᴀꜱ ʏᴀɴɢ ʟᴇʙɪʜ ᴛᴇʀᴋᴀɪᴛ ᴅᴇɴɢᴀɴ ᴋᴇꜱᴜᴋꜱᴇꜱᴀɴ ᴅᴀɴ ᴋᴇʙᴀʜᴀɢɪᴀᴀɴ ᴅᴀʀɪᴘᴀᴅᴀ ʏᴀɴɢ ʟᴀɪɴ.",
"ᴘᴇɴɢʜᴀʀɢᴀᴀɴ ᴘᴀʟɪɴɢ ᴛɪɴɢɢɪ ʙᴀɢɪ ꜱᴇᴏʀᴀɴɢ ᴘᴇᴋᴇʀᴊᴀ ᴋᴇʀᴀꜱ ʙᴜᴋᴀɴʟᴀʜ ᴀᴘᴀ ʏᴀɴɢ ᴅɪᴀ ᴘᴇʀᴏʟᴇʜ ᴅᴀʀɪ ᴘᴇᴋᴇʀᴊᴀᴀɴ ɪᴛᴜ, ᴛᴀᴘɪ ꜱᴇʙᴇʀᴀᴘᴀ ʙᴇʀᴋᴇᴍʙᴀɴɢ ɪᴀ ᴅᴇɴɢᴀɴ ᴋᴇʀᴊᴀ ᴋᴇʀᴀꜱɴʏᴀ ɪᴛᴜ.",
"ᴄᴀʀᴀ ᴛᴇʀʙᴀɪᴋ ᴜɴᴛᴜᴋ ᴍᴇᴍᴜʟᴀɪ ᴀᴅᴀʟᴀʜ ᴅᴇɴɢᴀɴ ʙᴇʀʜᴇɴᴛɪ ʙᴇʀʙɪᴄᴀʀᴀ ᴅᴀɴ ᴍᴜʟᴀɪ ᴍᴇʟᴀᴋᴜᴋᴀɴ.",
"ᴋᴇɢᴀɢᴀʟᴀɴ ᴛɪᴅᴀᴋ ᴀᴋᴀɴ ᴘᴇʀɴᴀʜ ᴍᴇɴʏᴜꜱᴜʟ ᴊɪᴋᴀ ᴛᴇᴋᴀᴅ ᴜɴᴛᴜᴋ ꜱᴜᴋꜱᴇꜱ ᴄᴜᴋᴜᴘ ᴋᴜᴀᴛ."
]
let motivasii = pickRandom(motivasi)
    m.reply(`"${motivasii}"`)
}
break
//=========================================\\======
case 'quotesgalau': {
  function pickRandom(list) {
  return list[Math.floor(list.length * Math.random())]
}
const galau = [
    "Gak salah kalo aku lebih berharap sama orang yang lebih pasti tanpa khianati janji-janji",
    "Kalau aku memang tidak sayang sama kamu ngapain aku mikirin kamu. Tapi semuanya kamu yang ngganggap aku gak sayang sama kamu",
    "Jangan iri dan sedih jika kamu tidak memiliki kemampuan seperti yang orang miliki. Yakinlah orang lain juga tidak memiliki kemampuan sepertimu",
    "Hanya kamu yang bisa membuat langkahku terhenti, sambil berkata dalam hati mana bisa aku meninggalkanmu",
    "Tetap tersenyum walaluku masih dibuat menunggu dan rindu olehmu, tapi itu demi kamu",
    "Tak semudah itu melupakanmu",
    "Secuek-cueknya kamu ke aku, aku tetap sayang sama kamu karena kamu telah menerima aku apa adanya",
    "Aku sangat bahagia jika kamu bahagia didekatku, bukan didekatnya",
    "Jadilah diri sendiri, jangan mengikuti orang lain, tetapi tidak sanggup untuk menjalaninya",
    "Cobalah terdiam sejenak untuk memikirkan bagaimana caranya agar kita dapat menyelesaikan masalah ini bersama-sama",
    "Bisakah kita tidak bermusuhan setelah berpisah, aku mau kita seperti dulu sebelum kita jadian yang seru-seruan bareng, bercanda dan yang lainnya",
    "Aku ingin kamu bisa langgeng sama aku dan yang aku harapkan kamu bisa jadi jodohku",
    "Cinta tak bisa dijelaskan dengan kata-kata saja, karena cinta hanya mampu dirasakan oleh hati",
    "Masalah terbesar dalam diri seseorang adalah tak sanggup melawan rasa takutnya",
    "Selamat pagi buat orang yang aku sayang dan orang yang membenciku, semoga hari ini hari yang lebih baik daripada hari kemarin buat aku dan kamu",
    "Jangan menyerah dengan keadaanmu sekarang, optimis karena optimislah yang bikin kita kuat",
    "Kepada pria yang selalu ada di doaku aku mencintaimu dengan tulus apa adanya",
    "Tolong jangan pergi saat aku sudah sangat sayang padamu",
    "Coba kamu yang berada diposisiku, lalu kamu ditinggalin gitu aja sama orang yang lo sayang banget",
    "Aku takut kamu kenapa-napa, aku panik jika kamu sakit, itu karena aku cinta dan sayang padamu",
    "Sakit itu ketika cinta yang aku beri tidak kamu hargai",
    "Kamu tiba-tiba berubah tanpa sebab tapi jika memang ada sebabnya kamu berubah tolong katakan biar saya perbaiki kesalahan itu",
    "Karenamu aku jadi tau cinta yang sesungguhnya",
    "Senyum manismu sangatlah indah, jadi janganlah sampai kamu bersedih",
    "Berawal dari kenalan, bercanda bareng, ejek-ejekan kemudian berubah menjadi suka, nyaman dan akhirnya saling sayang dan mencintai",
    "Tersenyumlah pada orang yang telah menyakitimu agar sia tau arti kesabaran yang luar biasa",
    "Aku akan ingat kenangan pahit itu dan aku akan jadikan pelajaran untuk masa depan yang manis",
    "Kalau memang tak sanggup menepati janjimu itu setidaknya kamu ingat dan usahakan jagan membiarkan janjimu itu sampai kau lupa",
    "Hanya bisa diam dan berfikir Kenapa orang yang setia dan baik ditinggalin yang nakal dikejar-kejar giliran ditinggalin bilangnya laki-laki itu semuanya sama",
    "Walaupun hanya sesaat saja kau membahagiakanku tapi rasa bahagia yang dia tidak cepat dilupakan",
    "Aku tak menyangka kamu pergi dan melupakan ku begitu cepat",
    "Jomblo gak usah diam rumah mumpung malam minggu ya keluar jalan lah kan jomblo bebas bisa dekat sama siapapun pacar orang mantan sahabat bahkan sendiri atau bareng setan pun bisa",
    "Kamu adalah teman yang selalu di sampingku dalam keadaan senang maupun susah Terimakasih kamu selalu ada di sampingku",
    "Aku tak tahu sebenarnya di dalam hatimu itu ada aku atau dia",
    "Tak mudah melupakanmu karena aku sangat mencintaimu meskipun engkau telah menyakiti aku berkali-kali",
    "Hidup ini hanya sebentar jadi lepaskan saja mereka yang menyakitimu Sayangi Mereka yang peduli padamu dan perjuangan mereka yang berarti bagimu",
    "Tolong jangan pergi meninggalkanku aku masih sangat mencintai dan menyayangimu",
    "Saya mencintaimu dan menyayangimu jadi tolong jangan engkau pergi dan meninggalkan ku sendiri",
    "Saya sudah cukup tahu bagaimana sifatmu itu kamu hanya dapat memberikan harapan palsu kepadaku",
    "Aku berusaha mendapatkan cinta darimu tetapi Kamunya nggak peka",
    "Aku bangkit dari jatuh ku setelah kau jatuhkan aku dan aku akan memulainya lagi dari awal Tanpamu",
    "Mungkin sekarang jodohku masih jauh dan belum bisa aku dapat tapi aku yakin jodoh itu Takkan kemana-mana dan akan ku dapatkan",
    "Datang aja dulu baru menghina orang lain kalau memang dirimu dan lebih baik dari yang kau hina",
    "Membelakanginya mungkin lebih baik daripada melihatnya selingkuh didepan mata sendiri",
    "Bisakah hatimu seperti angsa yang hanya setia pada satu orang saja",
    "Aku berdiri disini sendiri menunggu kehadiran dirimu",
    "Aku hanya tersenyum padamu setelah kau menyakitiku agar kamu tahu arti kesabaran",
    "Maaf aku lupa ternyata aku bukan siapa-siapa",
    "Untuk memegang janjimu itu harus ada buktinya jangan sampai hanya janji palsu",
    "Aku tidak bisa selamanya menunggu dan kini aku menjadi ragu Apakah kamu masih mencintaiku",
    "Jangan buat aku terlalu berharap jika kamu tidak menginginkanku",
    "Lebih baik sendiri daripada berdua tapi tanpa kepastian",
    "Pergi bukan berarti berhenti mencintai tapi kecewa dan lelah karena harus berjuang sendiri",
    "Bukannya aku tidak ingin menjadi pacarmu Aku hanya ingin dipersatukan dengan cara yang benar",
    "Akan ada saatnya kok aku akan benar-benar lupa dan tidak memikirkan mu lagi",
    "Kenapa harus jatuh cinta kepada orang yang tak bisa dimiliki",
    "Jujur aku juga memiliki perasaan terhadapmu dan tidak bisa menolakmu tapi aku juga takut untuk mencintaimu",
    "Maafkan aku sayang tidak bisa menjadi seperti yang kamu mau",
    "Jangan memberi perhatian lebih seperti itu cukup biasa saja tanpa perlu menimbulkan rasa",
    "Aku bukan mencari yang sempurna tapi yang terbaik untukku",
    "Sendiri itu tenang tidak ada pertengkaran kebohongan dan banyak aturan",
    "Cewek strong itu adalah yang sabar dan tetap tersenyum meskipun dalam keadaan terluka",
    "Terima kasih karena kamu aku menjadi lupa tentang masa laluku",
    "Cerita cinta indah tanpa masalah itu hanya di dunia dongeng saja",
    "Kamu tidak akan menemukan apa-apa di masa lalu Yang ada hanyalah penyesalan dan sakit hati",
    "Mikirin orang yang gak pernah mikirin kita itu emang bikin gila",
    "Dari sekian lama menunggu apa yang sudah didapat",
    "Perasaan Bodo gue adalah bisa jatuh cinta sama orang yang sama meski udah disakiti berkali-kali",
    "Yang sendiri adalah yang bersabar menunggu pasangan sejatinya",
    "Aku terlahir sederhana dan ditinggal sudah biasa",
    "Aku sayang kamu tapi aku masih takut untuk mencintaimu",
    "Bisa berbagi suka dan duka bersamamu itu sudah membuatku bahagia",
    "Aku tidak pernah berpikir kamu akan menjadi yang sementara",
    "Jodoh itu bukan seberapa dekat kamu dengannya tapi seberapa yakin kamu dengan Allah",
    "Jangan paksa aku menjadi cewek seperti seleramu",
    "Hanya yang sabar yang mampu melewati semua kekecewaan",
    "Balikan sama kamu itu sama saja bunuh diri dan melukai perasaan ku sendiri",
    "Tak perlu membalas dengan menyakiti biar Karma yang akan urus semua itu",
    "Aku masih ingat kamu tapi perasaanku sudah tidak sakit seperti dulu",
    "Punya kalimat sendiri & mau ditambahin? chat *.owner*"
]
    let bacotan = pickRandom(galau)
  m.reply(bacotan)
}
break
//=========================================\\======
case 'quotesgombal': {
    function pickRandom(list) {
  return list[Math.floor(list.length * Math.random())]
}
const gombal = [
    "Hal yang paling aku suka yaitu ngemil, namun tau gak ngemil apa yang paling aku suka? ngemilikin kamu sepenuhnya.",
    "Seandainya sekarang adalah tanggal 28 oktober 1928, aku akan ubah naskah sumpah pemuda menjadi sumpah aku cinta kamu.",
    "Aku gak pernah merasakan ketakutan sedikit pun ketika berada didekat kamu, karena kamulah kekuatanku.",
    "Kamu tahu apa persamaan rasa sayangku ke kamu dengan matahari? Persamaannya adalah sama-sama terbit setiap hari dan hanya akan berakhir sampai kiamat.",
    "Kalau bus kota jauh dekat ongkosnya sama, tapi cinta ini dekat-dekat makin saling cinta.",
    "Kalausaja aku harus mengorbankan semua kebahagiaanku hanya untuk sekedar membuat kamu tertawa. Aku rela.",
    "Anjing menggonggong kafilah berlalu, tiap hari bengong mikirin kamu melulu.",
    "Kalau aku jadi wakil rakyat kayaknya bakalan gagal deh. Gimana aku mau mikiran rakyat kalau yang ada dipikiran aku itu cuman ada kamu.",
    "denganambah satu sama dengan dua. Aku sama kamu sama dengan saling cinta.",
    "Kalo kita beda kartu GSM, itu gak masalah asalkan nantinya nama kita berdua ada di kartu Keluarga yang sama.",
    "Masalah yang selalu sulit untukku membuat mu mencintai ku, tapi lebih sulit memaksa hatiku untuk berhenti memikirkan dirimu.",
    "Aku harap kamu tidak menanyakan hal terindah yang pernah singgah di kehidupanku, karena jawaban nya adalah kamu.",
    "Hal yang paling aku suka yaitu ngemil, namun tau gak ngemil apa yang paling aku suka? ngemilikin kamu sepenuhnya.",
    "seandainyaa sekarang adalah tanggal 28 oktober 1928, aku akan ubah naskah sumpah pemuda menjadi sumpah aku cinta kamu.",
    "kuu gak pernah merasakan ketakutan sedikit pun ketika berada didekat kamu, karena kamulah kekuatanku.",
    "kamuu tahu apa persamaan rasa sayangku ke kamu dengan matahari? Persamaannya adalah sama-sama terbit setiap hari dan hanya akan berakhir sampai kiamat.",
    "Kalau bus kota jauh dekat ongkosnya sama, tapi cinta ini dekat-dekat makin saling cinta.",
    "jikaa saja aku harus mengorbankan semua kebahagiaanku hanya untuk sekedar membuat kamu tertawa. Aku rela.",
    "Anjing menggonggong kafilah berlalu, tiap hari bengong mikirin kamu melulu.",
    "Kalau aku jadi wakil rakyat kayaknya bakalan gagal deh. Gimana aku mau mikiran rakyat kalau yang ada dipikiran aku itu cuman ada kamu.",
    "atuu tambah satu sama dengan dua. Aku sama kamu sama dengan saling cinta,.",
    "aloo kita beda kartu GSM, itu gak masalah asalkan nantinya nama kita berdua ada di kartu Keluarga yang sama.",
    "Masalah yang selalu sulit untukku membuat mu mencintai ku, tapi lebih sulit memaksa hatiku untuk berhenti memikirkan dirimu.",
    "Aku tak pernah berjanji untuk sebuah perasaan, namun aku berusaha berjanji untuk sebuah kesetiaan.",
    "Aku sangat berharap kamu tau, kalau aku tidak pernah menyesali cintaku untuk mu, karena bagiku memiliki kamu sudah cukup bagi ku.",
    "Jangankan memilikimu, mendengar kamu kentut aja aku sudah bahagia.",
    "Aku mohon jangan jalan-jalan terus di pikiranku, duduk yang manis di hatiku saja.",
    "Berulang tahun memang indah, namun bagiku yang lebih indah jika berulang kali bersamamu.",
    "Napas aku kok sesek banget ya?, karena separuh nafasku ada di kamu.",
    "Jika ada seseorang lebih memilih pergi meninggalkan kamu, jangan pernah memohon padanya untuk tetap bertahan. Karena jika dia cinta, dia tak akan mau pergi.",
    "jangann diam aja dong, memang diam itu emas, tapi ketahuilah suara kamu itu seperti berlian.",
    "Kesasar itu serasa rugi banget, namun aku nggak merasa rugi karena cintaku sudah Biasanya orang yang lagi nyasar itu rugi ya, tapi tau gak? Aku gak merasa rugi sebab cintaku sudah nyasar ke hati bidadari.",
    "Ada 3 hal yang paling aku sukai di dunia ini, yaitu Matahari, Bulan dan Kamu. Matahari untuk siang hari, Bulan untuk malam hari dan Kamu untuk selamanya dihatiku.",
    "Sayang, kamu itu seperti garam di lautan, tidak terlihat namun akan selalu ada untuk selamanya.",
    "kuu gak perlu wanita yang sholeha, tapi bagaimana menuntun wanita yang aku cintai menjadi seorang yang sholehah.",
    "Aku tidak minta bintang atau bulan kepadamu. Cukup temani aku selamanya di bawah cahayanya.",
    "Akuana kalo kita berdua jadi komplotan penjahat: Aku mencuri hatimu, dan kamu mencuri hatiku?",
    "Aku gak perlu wanita yang cantik, tapi bagaimana aku menyanjung wanita yang aku cintai seperti wanita yang paling cantik di bumi ini.",
    "Aku pengen bersamamu cuma pada dua waktu: SEKARANG dan SELAMANYA.",
    "Akuu tuh bikin aku ga bisa tidur tau ga?",
    "Soalnya kamu selalu ada dibayang-bayang aku terus.",
    "Jika aku bisa jadi bagian dari dirimu,aku mau jadi air matamu,yang tersimpan di hatimu, lahir dari matamu, hidup di pipimu, dan mati di bibirmu.",
    "Papa kamu pasti kerja di apotik ya? | kenapa bang? | karena cuma kamu obat sakit hatiku.",
    "akuu selalu berusaha tak menangis karenamu, karena setiap butir yang jatuh, hanya makin mengingatkan, betapa aku tak bisa melepaskanmu.",
    "mauu nanya jalan nih. Jalan ke hatimu lewat mana ya?",
    "Andai sebuah bintang akan jatuh setiap kali aku mengingatmu, bulan pasti protes. Soalnya dia bakal sendirian di angkasa.",
    "Andai kamu gawang aku bolanya. Aku rela ditendang orang-orang demi aku dapat bersamamu,",
    "Dingin malam ini menusuk tulang. Kesendirian adalah kesepian. Maukah kau jadi selimut penghangat diriku?",
    "Keindahan Borobudur keajaiban dunia, keindahan kamu keajaiban cinta.",
    "Aku ingin mengaku dosa. Jangan pernah marah ya. Maafkan sebelumnya. Tadi malam aku mimpiin kamu jadi pacarku. Setelah bangun, akankah mimpiku jadi nyata?",
    "Kalau nggak sih aku bilang aku cinta kamu hari ini? Kalau besok gimana? Besok lusa? Besoknya besok lusa? Gimana kalau selamanya?",
    "Orangtuamu pengrajin bantal yah? Karena terasa nyaman jika di dekatmu.",
    "Jika malam adalah jeruji gelap yang menjadi sangkar, saya ingin terjebak selamanya di sana bersamamu.",
    "Sekarang aku gendutan gak sih? Kamu tau gak kenapa ? Soalnya kamu sudah mengembangkan cinta yang banyak di hatiku.",
    "Di atas langit masih ada langit. Di bawah langit masih ada aku yang mencintai kamu.",
    "Tau tidak kenapa malam ini tidak ada bintang? Soalnya bintangnya pindah semua ke matamu?",
    "Aku mencintaimu! Jika kamu benci aku, panah saja diriku. Tapi jangan di hatiku ya, karena di situ kamu berada.",
    "Bapak kamu pasti seorang astronot? | kok tau? | Soalnya aku melihat banyak bintang di matamu.",
    "Bapak kamu dosen ya? | kok tau? | karena nilai kamu A+ di hatiku.",
    "Kamu pasti kuliah di seni pahat ya? | kok tau sih? | Soalnya kamu pintar sekali memahat namamu di hatiku.",
    "Ya Tuhan, jika dia jodohku, menangkanlah tender pembangunan proyek menara cintaku di hatinya.",
    "Kamu mantan pencuri ya? | kok tau? | Abisnya kamu mencuri hatiku sih!",
    "Cowok : Aku suka senyum-senyum sendiri lho. | Cewek : Hah .. Gila Ya | Cowok : Nggak. Aku sedang mikirin kamu.",
    "Setiap malam aku berjalan-jalan di suatu tempat. Kamu tau di mana itu ? | gatau, emang dimana? | Di hatimu.",
    "Kamu pake Telkomesl ya? Karena sinyal-sinyal cintamu sangat kuat sampai ke hatiku.",
    "Kamu tahu gak sih? AKu tuh capek banget. Capek nahan kangen terus sama kamu.",
    "katanyaa kalau sering hujan itu bisa membuat seseorang terhanyut, kalau aku sekarang sedang terhanyut di dalam cintamu.",
    "Aku harap kamu jangan pergi lagi ya? karena, bila aku berpisah dengamu sedetik saja bagaikan 1000 tahun rasanya.",
    "Aku sih gak butuh week end, yang aku butuhkan hanyalah love you till the end.",
    "Emak kamu tukang Gado gado ya?, kok tau sih?, Pantesan saja kamu telah mencampur adukan perasaanku",
    "Walau hari ini cerah, tetapi tanpa kamu disisiku sama saja berselimutkan awan gelap di hati ini",
    "Kamu ngizinin aku kangen sehari berapa kali neng? Abang takut over dosis.",
    "cintaa aku ke kamu tuh bagaikan hutang, awalnya kecil, lama-lama didiemin malah tambah gede.",
    "Berulang tahun adalah hari yang indah. Tapih akin lebih indah kalo udah berulang-ulang kali bersama kamu."
]
let bacotan = pickRandom(gombal)
  m.reply(bacotan)

}
break
//=========================================\\======
case 'quoteshacker': {
  function pickRandom(list) {
  return list[Math.floor(list.length * Math.random())]
}
const heker = [
  "Dear kamu yang tertulis di halaman defacementku, Kapan jadi pacarku?",
  "Aku rela ko jadi Processor yg kepanasan, asalkan kmu yg jadi heatsink'y yg setiap saat bisa mendinginkan ku.",
  "Gak usah nyari celah xss deh, karena ketika kamu ngeklik hatiku udah muncul pop up namamu.",
  "berharap setelah aku berhasil login di hati kamu ga akan ada tombol logout, dan sessionku ga bakal pernah expired.",
  "Masa aku harus pake teknik symlink bypass buat buka-buka folder hatimu yg open_basedir enabled.",
  "Diriku dan Dirimu itu ibarat PHP dan MySQL yang belum terkoneksi.",
  "Jangan cuma bisa inject hatinya,tapi harus bisa patchnya juga. Biar tidak selingkuh sama hacker lain.",
  "Aku memang programmer PHP,tapi aku nggak akan php-in kamu kok.",
  "Eneeeng. | Apache? | Km wanita yg paling Unix yg pernah aku kenal |",
  "Sayang, capslock kamu nyala ya? | ngga, kenapa emangnya? | soalnya nama kamu ketulis gede bgt di hati aku | zzz! smile",
  "Aku deketin kamu cuma untuk redirect ke hati temenmu.",
  "Domain aja bisa parkir, masa cintaku ga bisa parkir dihatimu?",
  "Aku boleh jadi pacarmu? | 400(Bad Request) | Aku cium boleh? | 401(Authorization Required) | Aku buka bajumu yah | 402(Payment Required) sad",
  "kamu tau ga beda'y kamu sama sintax PHP, kalo sintax PHP itu susah di hafalin kalo kamu itu susah di lupain",
  "Kamu dulu sekolah SMK ambil kejuruan apa? | Teknik Komputer Jaringan | Terus sekarang bisa apa aja? | Menjaring hatimu lewat komputerku | biggrin",
  "Jika cinta itu Array, maka,cintaku padamu tak pernah empty jika di unset().",
  "SQLI ( Structured Query Love Injection )",
  "aku ingin kamu rm -rf kan semua mantan di otak mu,akulah root hati kamu",
  "Senyumu bagaikan cooler yang menyejukan hatiku ketika sedang overclock.",
  "kamu adalah terminalku, dimana aku menghabiskan waktuku untuk mengetikan beribu baris kode cinta untukmu smile",
  "Aku seneng nongkrong di zone-h, karena disanalah aku arsipkan beberapa website yang ada foto kamunya.",
  "hatiku ibarat vps hanya untukmu saja bukan shared hosting yg bisa tumpuk berbagai domain cinta.",
  "Aku bukanlah VNC Server Tanpa Authentication yg bisa kamu pantau kapan saja.",
  "Jangan men-dualboot-kan hatiku kepadamu.",
  "cintaku kan ku Ctrl+A lalu kan ku Ctrl+C dan kan ku Ctrl+V tepat di folder system hatimu.",
  "KDE kalah Cantiknya, GNOME kalah Simplenya, FluxBox kalah Ringannya, pokonya Semua DE itu Kalah Sama Kamu.",
  "Cintamu bagaikan TeamViewer yang selalu mengendalikan hatiku",
  "cinta kita tak akan bisa dipisahkan walau setebal apapun itu firewall...!!"
]

let bacotan = pickRandom(heker)
  m.reply(bacotan)
}
break
//=========================================\\======
case 'quotesbijak':{
  function pickRandom(list) {
  return list[Math.floor(list.length * Math.random())]
}
const quotes = [
"Keyakinan merupakan suatu pengetahuan di dalam hati, jauh tak terjangkau oleh bukti.",
"Rasa bahagia dan tak bahagia bukan berasal dari apa yang kamu miliki, bukan pula berasal dari siapa diri kamu, atau apa yang kamu kerjakan. Bahagia dan tak bahagia berasal dari pikiran kamu.",
"Sakit dalam perjuangan itu hanya sementara. Bisa jadi kamu rasakan dalam semenit, sejam, sehari, atau setahun. Namun jika menyerah, rasa sakit itu akan terasa selamanya.",
"Hanya seseorang yang takut yang bisa bertindak berani. Tanpa rasa takut itu tidak ada apapun yang bisa disebut berani.",
"Jadilah diri kamu sendiri. Siapa lagi yang bisa melakukannya lebih baik ketimbang diri kamu sendiri?",
"Kesempatan kamu untuk sukses di setiap kondisi selalu dapat diukur oleh seberapa besar kepercayaan kamu pada diri sendiri.",
"Kebanggaan kita yang terbesar adalah bukan tidak pernah gagal, tetapi bangkit kembali setiap kali kita jatuh.",
"Suatu pekerjaan yang paling tak kunjung bisa diselesaikan adalah pekerjaan yang tak kunjung pernah dimulai.",
"Pikiran kamu bagaikan api yang perlu dinyalakan, bukan bejana yang menanti untuk diisi.",
"Kejujuran adalah batu penjuru dari segala kesuksesan. Pengakuan adalah motivasi terkuat. Bahkan kritik dapat membangun rasa percaya diri saat disisipkan di antara pujian.",
"Segala sesuatu memiliki kesudahan, yang sudah berakhir biarlah berlalu dan yakinlah semua akan baik-baik saja.",
"Setiap detik sangatlah berharga karena waktu mengetahui banyak hal, termasuk rahasia hati.",
"Jika kamu tak menemukan buku yang kamu cari di rak, maka tulislah sendiri.",
"Jika hatimu banyak merasakan sakit, maka belajarlah dari rasa sakit itu untuk tidak memberikan rasa sakit pada orang lain.",
"Hidup tak selamanya tentang pacar.",
"Rumah bukan hanya sebuah tempat, tetapi itu adalah perasaan.",
"Pilih mana: Orang yang memimpikan kesuksesan atau orang yang membuatnya menjadi kenyataan?",
"Kamu mungkin tidak bisa menyiram bunga yang sudah layu dan berharap ia akan mekar kembali, tapi kamu bisa menanam bunga yang baru dengan harapan yang lebih baik dari sebelumnya.",
"Bukan bahagia yang menjadikan kita bersyukur, tetapi dengan bersyukurlah yang akan menjadikan hidup kita bahagia.",
"Aku memang diam. Tapi aku tidak buta.",
]
let bacotan = pickRandom(quotes)
 m.reply(bacotan)
}
break//==================================================================

case 'youai': {
  if (!text) return m.reply(`Example : ${command} siapakah elon musk`)
  m.reply(mess.wait)
const data1 = await fetchJson(`https://skizo.tech/api/openai?apikey=nanogembul&text=${encodeURIComponent(text)}&system=kamu adalah Owner `)
    const msgai = data1.result;
m.reply(`${msgai}`)
}        
  break
    case 'cekmemek':
			case 'cekmeki':			 
if (!q) return m.reply('tag temanmu!')
				const persengayy = text
          const gay = ["*Udah Ga Perawan:v*\n昤 Warna Item🙈\n昤 Bulu Lebat\n昤 Katanya Polos Ko Lima Jari Lolos Chuackk","*Masih Perawan*\n昤 Warna Pink🤤\n昤 Tidak Berbulu\n昤 Wah Yang ini Buat Owner Ku Aja😋","*Bjir Bau 😵‍💫*\n\n昤 Kang Colmek\n昤 Sangat Lebat:v\n昤 Ishh Sarang Jin Itu😵","*Masih Perawan*\n昤 Warna Putih Mati\n昤 Masih Polos\n昤 Sepertinya Anda Butuh Ktetotgatan Dari Owner ku🥸 ","*Meki nya Semu Coklat*\n 昤 Korban Pemerkosaan 😑\n昤 Lu Sih Main Ma Kumpulan Cowo Sengklek\n昤 Sebaiknya Jan Terlalu Gegabah 🤧","*Normal Seperti Biasanya*\n昤 Wuanjay Ko Bulu Nya Pada Kriput🙈\n昤 Ternyata Oh Ternyata Kamu Suka Lesby🫤","*Bahaya Noh Gan*\n昤 Udah Kena Virus\n昤 Kalo wik wik Ntar Ke Patil Cowoknya\n😶‍🌫️Takut BerNanah Kelamin Ku ntarr😬","*Lah Ireng Amat bjirr*\n昤 Hati² Sama Ni Orang Beneran Dah\n昤 Jangankan Pria Hewan Pun Dia Layani🫣","*74%*\n*Astagfirullah Kabur Gan🏃🌬️*"]
				const kl = gay[Math.floor(Math.random() * gay.length)]
    client.sendMessage(m.chat, { contextInfo: { externalAdReply: { showAdAttribution: true,
title: `- Check And Check -ㅤㅤㅤㅤㅤㅤㅤㅤㅤ`,body:`⌜ ${ucapanWaktu} ⌟`,previewType:"PHOTO",thumbnail: fs.readFileSync("./start/lib/media/NDoc.jpg"),sourceUrl: global.sourceurl,}
}, text :'Hasil Dari: *'+persengayy+'*\n\nJawaban : '+kl}, { quoted: m }) 
   
 break
 case 'genjot' : {
if (!q) return m.reply('Yang ingin di genjot sapa we')
let ahah = q.toUpperCase()
              let mamah = `${ahah} Buruan, panggil gue SIMP, ato BAPERAN. ini MURNI PERASAAN GUE. Gue pengen genjot bareng ${ahah}. Ini seriusan, suaranya yang imut, mukanya yang cantik, apalagi badannya yang aduhai ningkatin gairah gue buat genjot ${ahah}. Setiap lapisan kulitnya pengen gue jilat. Saat gue mau crot, gue bakal moncrot sepenuh hati, bisa di perut, muka, badan, teteknya, sampai lubang burit pun bakal gue crot sampai puncak klimaks. Gue bakal meluk dia abis gue moncrot, lalu nanya gimana kabarnya, ngrasain enggas bareng saat telanjang. Dia bakal bilang kalau genjotan gue mantep dan nyatain perasaannya ke gue, bilang kalo dia cinta ama gue. Gue bakal bilang balik seberapa gue cinta ama dia, dan dia bakal kecup gue di pipi. Terus kita ganti pakaian dan ngabisin waktu nonton film, sambil pelukan ama makan hidangan favorit. Gue mau ${ahah} jadi pacar, pasangan, istri, dan idup gue. Gue cinta dia dan ingin dia jadi bagian tubuh gue. Lo kira ini copypasta? Kagak cok. Gue ngetik tiap kata nyatain prasaan gue. Setiap kali elo nanya dia siapa, denger ini baik-baik : DIA ISTRI GUE. Gue sayang ${ahah}, dan INI MURNI PIKIRAN DAN PERASAAN GUE.`
              m.reply(mamah)
}
break
case 'perkosa': {
if (!text) return m.reply('Astaga Mau Perkosa Siapa Bang🗿')
let aww = text.toUpperCase()
              let kondom = `GW BENAR-BENAR PENGEN JILAT KAKI *${aww}*,GW PENGEN BANGET MENJILAT SETIAP BAGIAN KAKINYA SAMPAI AIR LIUR GW BERCUCURAN KAYAK AIR KERINGAT LALU NGENTOD DENGAN NYA SETIAP HARI SAMPAI TUBUH KITA MATI RASA, YA TUHAN GW INGIN MEMBUAT ANAK ANAK DENGAN *${aww}* SEBANYAK SATU TIM SEPAK BOLA DAN MEMBUAT SATU TIM SEPAK BOLA LAINYA UNTUK MELAWAN ANAK-ANAK TIM SEPAK BOLA PERTAMA GW  YANG GW BUAT SAMA *${aww}* GW PENGEN MASUK KE SETIAP LUBANG TUBUHNYA, MAU ITU LUBANG HIDUNG LUBANG MATA MAUPUN LUBANG BOOL, KEMUDIAN GW AKAN MANUSIA YANG TIDAK BISA HIDUP KALO GW GA ENTOD SETIAP HARI.`
m.reply(kondom)
}
break
 case 'nenen':
if (!q) return m.reply('Mau Nenen Ama Siapa Si Bang:v')
let nyot = q.toUpperCase()
              let pentil = `NENEN NENEN KEPENGEN NENEN SAMA ${nyot}. TETEK GEDE NAN KENCANG MILIK ${nyot} MEMBUATKU KEPENGEN NENEN. DIBALUT PAKAIAN KETAT YANG ADUHAI CROOOOTOTOTOTOTOT ANJING SANGE GUA BANGSAT. ${nyot}, PLIS DENGERIN BAIK BAIK. TOLONG BUKA BAJU SEBENTAR SAJA PLISSS TOLOOONG BANGET, BIARKAN MULUT KERINGKU BISA MENGECAP NENEN ${nyot}. BIARKAN AKU MENGENYOT NENENMU ${nyot}. AKU RELA NGASIH SESEMBAHAN APA AJA BERAPAPUN ITU DUIT YANG AKU BAKAR KHUSUS TERKHUSUS BUATMU. TAPI TOLOOOONG BANGET BUKA BAJUMU AKU MAU NENEN. NENEN NENEEEEN NENEN ${nyot} WANGIIII`
m.reply(pentil) 
  break
  case 'dare':
              const dare =[
"Makan 2 sendok makan nasi tanpa lauk apapun, jika terasa berat, kamu bisa minum.",
"Sebutkan orang yang membuatmu terdiam",
"Telepon gebetan/pacar sekarang dan kirim tangkapan layar di sini",
"Kirim emot hanya setiap kali kamu mengetik di grup obrolan/obrolan pribadi selama 1 hari.",
"Ucapkan 'Selamat datang di Who Wants To Be a Millionaire!' ke semua grup yang kamu punya",
"Telepon mantan dengan mengatakan rindu",
"nyanyikan chorus dari lagu terakhir yang kamu mainkan",
"Rekam suara untuk mantan/pacar/gebemmu, katakan 'Hai (nama), ingin menelepon, tunggu sebentar. Aku sangat merindukanmu'",
"Pukul meja (yang ada di rumah) sampai kamu dimarahi karena berisik",
"Katakan pada orang asing 'Aku baru saja diberitahu bahwa aku adalah saudaramu yang pertama, kami berpisah, lalu aku melakukan operasi plastik. Dan ini hal paling 'ciyusss'",
"Sebutkan nama mantan",
"buat 1 sajak untuk anggota grup!",
"Kirim daftar percakapan WhatsAppmu",
"Obrol dengan orang asing dengan bahasa ghetto lalu tangkap layar di sini",
"Ceritakan versimu sendiri tentang hal-hal memalukan",
"Tag orang yang kamu benci",
"Pura-pura seperti terkena pengaruh, misalnya: terkena pengaruh anjing, terkena pengaruh belalang, terkena pengaruh lemari es, dll.",
"Ubah nama menjadi *I AM DONKEY* selama 24 jam",
"Teriak *ma chuda ma chuda ma chuda* di depan rumahmu",
"Ambil foto/potret pacar atau gebetanmu dan kirimkan di sini",
"Ceritakan tipe pacar yang kamu sukai!",
"Ucapkan *aku naksir kamu, maukah kamu menjadi pacarku?* kepada lawan jenis, terakhir kali kamu berbicara dengannya (kirim di WA/Telegram), tunggu sampai dia membalas, jika sudah, berikan di sini",
"Rekam suaramu yang membaca *titar ke age do titar, titar ke piche do titar*",
"Chatingan lelucon dengan mantan dan katakan *aku mencintaimu, tolong kembalilah.* tanpa menyebutkan bahwa itu adalah tantangan!",
"Obrol dengan kontak WhatsApp berurutan sesuai dengan persentase baterai ponselmu, lalu katakan 'Aku beruntung memiliki kamu!'",
"Ubah nama menjadi *I am a child of randi* selama 5 jam",
"Ketik dalam bahasa Bengali selama 24 jam",
"Gunakan foto Selmon Bhoi selama 3 hari",
"Kirim kutipan lagu lalu tag anggota yang cocok untuk kutipan tersebut",
"Kirim pesan suara dengan ucapan 'Bolehkah aku memanggilmu sayang?'",
"Tangkapan layar percakapan terakhir di WhatsAppmu",
"Ucapkan *KAMU SANGAT CANTIK, JANGAN BERBOHONG* kepada teman pria!",
"Telepon salah satu anggota grup dan katakan kata kasar kepada mereka",
"Berlakulah seperti ayam di depan orangtua kamu",
"Ambil sebuah buku secara acak dan bacakan satu halaman secara keras dan rekam suara lalu kirimkan di sini",
"Buka pintu depan rumahmu dan menyalak seperti serigala selama 10 detik",
"Ambil foto selfie yang memalukan dan jadikan sebagai foto profilmu",
"Biar grup memilih sebuah kata dan lagu yang dikenal. Kamu harus menyanyikan lagu tersebut dan kirim dalam bentuk pesan suara di sini",
"Berjalanlah dengan menopang dengan siku dan lutut selama yang kamu bisa",
"nyanyikan lagu kebangsaan dalam pesan suara",
"Lakukan breakdance selama 30 detik di ruang tamu",
"Ceritakan cerita sedih yang kamu ketahui",
"Buat video tari twerk singkat dan unggah sebagai status selama 5 menit",
"Makan sepotong bawang putih mentah",
"Tunjukkan lima orang terakhir yang kamu kirim pesan dan isi pesan mereka",
"Jadikan nama lengkapmu sebagai status selama 5 jam",
"Buat video tari singkat tanpa filter hanya dengan musik dan unggah sebagai status selama 5 jam",
"Telepon sahabatmu, omong kosong",
"Jadikan foto dirimu tanpa filter sebagai status selama 10 menit",
"Ucapkan 'aku cinta Oli London' dalam pesan suara 😄",
"Kirim pesan kepada mantanmu dan katakan bahwa kamu masih menyukainya",
"Telepon gebetan/pacar/sahabatmu sekarang dan tangkapan layar di sini",
"Berkata kasar pada salah satu anggota grup di percakapan pribadi dan katakan 'kamu jelek, beban'",
"Ucapkan 'KAMU CANTIK/GANTENG' pada salah satu orang yang ada di atas pinlistmu atau orang pertama di daftar percakapanmu",
"Kirim pesan suara dan katakan 'Bisakah aku memanggilmu sayang?'. Jika kamu seorang pria, sebutkan nama seorang wanita. Jika kamu seorang wanita, sebutkan nama seorang pria",
"Tulis 'Aku mencintaimu (nama anggota grup acak yang sedang online) dalam percakapan pribadi (jika kamu pria, tulis nama wanita; jika kamu wanita, tulis nama pria), ambil tangkapan layar dan kirimkan di sini",
"Gunakan foto aktor Bollywood sebagai foto profilmu selama 3 hari",
"Jadikan foto crushmu sebagai status dengan caption 'Ini adalah crushku'",
"Ubah nama menjadi *I AM GAY* selama 5 jam",
"Obrol dengan salah satu kontak di WhatsApp dan katakan 'Aku akan menjadi pacarmu selama 5 jam'",
"Kirim pesan suara dan katakan 'Aku naksir kamu, maukah kamu menjadi pacarku?' kepada orang acak dari grup (jika kamu perempuan, pilih nama laki-laki; jika kamu laki-laki, pilih nama perempuan)",
"Pukul pantatmu dengan keras dan kirim suara tamparan melalui pesan suara 😂",
"Sebutkan tipe pacarmu dan kirim fotonya di sini dengan keterangan 'Perempuan/laki-laki paling jelek di dunia'",
"Teriak 'bravooooooooo' dan kirimkan melalui pesan suara di sini",
"Ambil foto wajahmu dan kirim di sini",
"Kirim foto dirimu dengan keterangan 'Aku lesbian'",
"Teriak dengan menggunakan kata-kata kasar dan kirim melalui pesan suara",
"Teriak 'kamu bajingan' di depan ibu atau ayahmu",
"Ubah nama menjadi *aku bodoh selama 24 jam*",
"Pukul dirimu sendiri dengan mantap dan kirim suara pukulan melalui pesan suara 😂",
"Ucapkan 'aku cinta pemilik bot danz' melalui pesan suara",
"Kirim foto pacar atau gebetanmu di sini",
"Buat video tantangan tarian TikTok apa pun dan unggah sebagai status, kamu bisa menghapusnya setelah 5 jam",
"Putuskan pertemanan dengan sahabatmu selama 5 jam tanpa memberitahunya bahwa itu adalah tantangan",
"Katakan pada salah satu temanmu bahwa kamu mencintainya dan ingin menikahinya, tanpa memberitahunya bahwa itu adalah tantangan",
"Ucapkan 'aku cinta Depak Kalal' melalui pesan suara",
"Tulis 'aku merasa horny' dan unggah sebagai status, kamu hanya bisa menghapusnya setelah 5 jam",
"Tulis 'aku lesbian' dan unggah sebagai status, kamu hanya bisa menghapusnya setelah 5 jam",
"Cium ibu atau ayahmu dan katakan 'aku mencintaimu' 😌",
"Jadikan nama ayahmu sebagai status selama 5 jam",
"Kirim kata-kata kasar dalam grup manapun, kecuali grup ini, dan kirim bukti tangkapan layarnya di sini"
]
              const xeondare = dare[Math.floor(Math.random() * dare.length)]
              bufferdare = await getBuffer(`https://i.ibb.co/305yt26/bf84f20635dedd5dde31e7e5b6983ae9.jpg`)
              client.sendMessage(from, { image: bufferdare, caption: '_You choose DARE_\n'+ xeondare }, {quoted:m})
              break
        break
       case 'truth':
              const truth =[
"Pernahkah kamu menyukai seseorang? Berapa lama?",
    "Jika kamu bisa atau jika kamu mau, grup obrolan atau grup di luar mana yang ingin kamu jadikan teman? (bisa berbeda/jenis yang sama)",
    "Apa ketakutan terbesar kamu?",
    "Pernahkah kamu menyukai seseorang dan merasa bahwa orang tersebut juga menyukaimu?",
    "Siapa nama mantan pacar temanmu yang dulu pernah kamu sukai diam-diam?",
    "Pernahkah kamu mengambil uang dari ayah atau ibumu? Alasannya?",
    "Apa yang membuatmu bahagia saat sedang sedih?",
    "Pernahkah kamu memiliki perasaan cinta satu arah? jika ya kepada siapa? bagaimana perasaannya, bro?",
    "Pernah menjadi selingkuhan seseorang?",
    "Hal paling ditakuti?",
    "Siapa orang yang paling berpengaruh dalam hidupmu?",
    "Prestasi apa yang berhasil kamu raih tahun ini?",
    "Siapa orang yang bisa membuatmu keren?",
    "Siapa orang yang pernah membuatmu sangat bahagia?",
    "Siapa yang paling mendekati tipe pasangan idamanmu di sini?",
    "Dengan siapa kamu suka bermain?",
    "Pernahkah kamu menolak seseorang? alasan mengapa?",
    "Sebutkan insiden yang pernah menyakiti perasaanmu yang masih kamu ingat",
    "Prestasi apa yang sudah kamu capai tahun ini?",
    "Kebiasaan terburukmu di sekolah?",
    "Lagu apa yang paling sering kamu nyanyikan di dalam kamar mandi?",
    "Pernahkah kamu mengalami pengalaman dekat dengan kematian?",
    "Kapan terakhir kali kamu sangat marah? Mengapa?",
    "Siapa orang terakhir yang meneleponmu?",
    "Apakah kamu memiliki bakat tersembunyi? Apa sajakah itu?",
    "Kata apa yang paling kamu benci?",
    "Video YouTube terakhir apa yang kamu tonton?",
    "Hal terakhir apa yang kamu cari di Google?",
    "Dalam grup ini, dengan siapa yang ingin kamu tukar kehidupan selama seminggu?",
    "Apa hal paling menakutkan yang pernah terjadi padamu?",
    "Pernahkah kamu kentut dan menyalahkannya kepada orang lain?",
    "Kapan terakhir kali kamu membuat orang lain menangis?",
    "Pernahkah kamu menghilangkan jejak dari seorang teman?",
    "Pernahkah kamu melihat mayat?",
    "Anggota keluargamu yang paling mengganggumu dan mengapa?",
    "Jika kamu harus menghapus satu aplikasi dari ponselmu, aplikasi mana yang akan kamu hapus?",
    "Aplikasi apa yang paling sering kamu buang-buang waktu di dalamnya?",
    "Pernahkah kamu berpura-pura sakit untuk pulang dari sekolah?",
    "Apa barang paling memalukan di dalam kamar kamarmu?",
    "Jika terdampar di pulau terpencil, lima barang apa yang akan kamu bawa?",
    "Pernahkah kamu tertawa begitu keras hingga pipismu basah?",
    "Apakah kamu mencium bau kentutmu sendiri?",
    "Pernahkah kamu kencing di tempat tidur saat tidur?",
    "Apa kesalahan terbesar yang pernah kamu buat?",
    "Pernahkah kamu mencontek dalam ujian?",
    "Apa hal terburuk yang pernah kamu lakukan?",
    "Kapan terakhir kali kamu menangis?",
    "Di antara orang tua kamu, siapa yang kamu cintai paling?",
    "Apakah kamu kadang-kadang memasukkan jari ke dalam lubang hidungmu?",
    "Siapa pujaan hati kamu saat masa sekolah dulu?",
    "Berbicara jujur, apakah kamu menyukai seorang anak laki-laki dalam grup ini?",
    "Pernahkah kamu menyukai seseorang? Berapa lama?",
    "Apakah kamu punya pacar? Apa ketakutan terbesarmu?",
    "Pernahkah kamu menyukai seseorang dan merasa bahwa orang tersebut juga menyukaimu?",
    "Siapa nama mantan pacar temanmu yang pernah kamu sukai diam-diam?",
    "Pernahkah kamu mengambil uang milik ibu atau ayahmu? Apa alasannya?",
    "Apa yang membuatmu bahagia saat sedang sedih?",
    "Apakah kamu menyukai seseorang dalam grup ini? Jika ya, siapa?",
    "Pernahkah kamu ditipu oleh seseorang?",
    "Siapa orang yang paling penting dalam hidupmu?",
    "Prestasi apa yang telah kamu capai tahun ini?",
    "Siapa orang yang bisa membuatmu bahagia saat sedang sedih?",
    "Siapa orang yang pernah membuatmu merasa tidak nyaman?",
    "Pernahkah kamu berbohong kepada orang tua?",
    "Apakah kamu masih menyukai mantan pacarmu?",
    "Siapa yang ingin kamu ajak bermain bersama?",
    "Pernahkah kamu mencuri sesuatu yang besar? Alasannya apa?",
    "Sebutkan insiden yang pernah membuatmu terluka dan masih kamu ingat?",
    "Prestasi apa yang sudah kamu raih tahun ini?",
    "Apa kebiasaan terburukmu saat di sekolah?",
    "Apakah kamu mencintai pencipta bot ini, Dani 😄",
    "Pernahkah kamu berpikir untuk membalas dendam pada guru?",
    "Apakah kamu menyukai perdana menteri saat ini di negaramu?",
    "Apakah kamu vegetarian atau non-vegetarian?",
    "Jika kamu bisa menjadi tak terlihat, apa yang pertama kali akan kamu lakukan?",
    "Apa rahasia yang kamu simpan dari orang tua kamu?",
    "Siapa pujaan hati rahasiamu?",
    "Siapa orang terakhir yang kamu intip di media sosial?",
    "Jika seorang jin memberimu tiga permintaan, apa yang akan kamu minta?",
    "Apa penyesalan terbesarmu?",
    "Hewan seperti apa menurutmu yang paling mirip denganmu?",
    "Berapa banyak foto selfie yang kamu ambil dalam sehari?",
    "Apa acara favoritmu saat masa kanak-kanak?",
    "Jika kamu bisa menjadi karakter fiksi dalam satu hari, siapa yang akan kamu pilih?",
    "Dengan siapa kamu paling sering mengirim pesan?",
    "Apa kebohongan terbesar yang pernah kamu ceritakan kepada orang tua kamu?",
    "Siapa selebriti yang menjadi pujaan hatimu?",
    "Mimpi paling aneh yang pernah kamu alami?",
    "Apakah kamu bermain PUBG? Jika ya, berikan nomor ID-mu."
]
              const Nanotruth = truth[Math.floor(Math.random() * truth.length)]
              buffertruth = await getBuffer(`https://i.ibb.co/305yt26/bf84f20635dedd5dde31e7e5b6983ae9.jpg`)
              client.sendMessage(from, { image: buffertruth, caption: '_You choose TRUTH_\n'+ Nanotruth }, {quoted:m})
     
break
case 'cekidgc': {
if (!isPremium) return m.reply(mess.premium)
let getGroups = await client.groupFetchAllParticipating()
let groups = Object.entries(getGroups).slice(0).map((entry) => entry[1])
let anu = groups.map((v) => v.id)
let teks = `⬣ *LIST GROUP DI BAWAH*\n\nTotal Group : ${anu.length} Group\n\n`
for (let x of anu) {
let metadata2 = await client.groupMetadata(x)
teks += `◉ Nama : ${metadata2.subject}\n◉ ID : ${metadata2.id}\n◉ Member : ${metadata2.participants.length}\n\n────────────────────────\n\n`
}
m.reply(teks + `Untuk Penggunaan Silahkan Ketik Command ${prefix}pushkontakv3 id|teks\n\nSebelum Menggunakan Silahkan Salin Dulu Id Group Nya Di Atas`)
}
break
case 'jadibot': {
     m.reply('mau jadi bot ?')
}
break     
case 'listjadibot': 
try {
let user = [... new Set([...global.conns.filter(client => client.user).map(client => client.user)])]
te = "*Rentbot List*\n\n"
for (let i of user){
y = await client.decodeJid(i.id)
te += " × User : @" + y.split("@")[0] + "\n"
te += " × Name : " + i.name + "\n\n"
}
client.sendMessage(from,{text:te,mentions: [y], },{quoted:m})
} catch (err) {
m.reply(`Belum ada pengguna yang menyewa bot`)
}
break
case 'myip': {
        if (!isOwner) return m.reply(mess.only.owner)
var http = require('http')
http.get({
'host': 'api.ipify.org',
'port': 80,
'path': '/'
}, function(resp) {
resp.on('data', function(ip) {
    m.reply("🔎 Ip Andreas Anda Adalah: " + ip)
})
})
            }
             
  break      
case 'idch': {
if (!isOwner) return m.reply(msg.owner)
if (!m.quoted) return m.reply('reply saluran channel nya')
try {
let id = (await m.getQuotedObj()).msg.contextInfo.forwardedNewsletterMessageInfo 
let send_ch = `*BERIKUT DATA CHANNEL ANDA*\n
*Name Channel*: ${id.newsletterName}\n*ID Channel*: ${id.newsletterJid}
`
let msgii = generateWAMessageFromContent(m.chat, { viewOnceMessage: { message: { 
"messageContextInfo": { 
"deviceListMetadata": {}, 
"deviceListMetadataVersion": 2
}, 
interactiveMessage: proto.Message.InteractiveMessage.create({
contextInfo: { 
mentionedJid: [m.sender], 
externalAdReply: {
showAdAttribution: true }
}, body: proto.Message.InteractiveMessage.Body.create({ 
text: send_ch
}), 
footer: proto.Message.InteractiveMessage.Footer.create({ 
text: `© Powered By ${botname}`
}), 
nativeFlowMessage: proto.Message.InteractiveMessage.NativeFlowMessage.create({ 
buttons: [{
"name": "cta_copy",
"buttonParamsJson": `{\"display_text\":\"ID CHANNEL\",\"id\":\"123456789\",\"copy_code\":\"${id.newsletterJid}\"}`
}]
}) 
})} 
}}, {userJid: m.sender, quoted: m}) 
await client.relayMessage(msgii.key.remoteJid, msgii.message, { 
messageId: msgii.key.id 
});
} catch (e) {
m.reply('Harus chat dari channel bang') 
}
}
 
        
break    
case 'tovn': {
if (!/video/.test(mime) && !/audio/.test(mime)) return m.reply(`reply video/vn with caption ${prefix + command}`)
if (!quoted) return m.reply(`reply video/vn with caption ${prefix + command}`)
await reaction(m.chat, "⏳");
await sleep(5000)
await reaction(m.chat, "⌛");
await sleep(5000)
let media = await quoted.download()
let { toAudio } = require('./lib/converter')
let audio = await toAudio(media, 'mp4')
await reaction(m.chat, "🔓");
client.sendMessage(m.chat, {audio, mimetype:'audio/mpeg', ptt: true}, { quoted : m })
}
break

default:
if (budy.startsWith('>')) {
if (!Access) return;
try {
let evaled = await eval(budy.slice(2));
if (typeof evaled !== 'string') evaled = require('util').inspect(evaled);
await m.reply(evaled);
} catch (err) {
m.reply(String(err));
}
}
        
if (budy.startsWith('<')) {
if (!Access) return
let kode = budy.trim().split(/ +/)[0]
let teks
try {
teks = await eval(`(async () => { ${kode == ">>" ? "return" : ""} ${q}})()`)
} catch (e) {
teks = e
} finally {
await m.reply(require('util').format(teks))
}
}
        
}
} catch (err) {
console.log(require("util").format(err));
}
};

let file = require.resolve(__filename) 
fs.watchFile(file, () => {
fs.unwatchFile(file)
console.log(chalk.redBright(`Update ${__filename}`))
delete require.cache[file]
require(file)
})