require("dotenv").config();

const { bot } = require("./telegramBot");


const CHANNEL_TAG = `
 
 🔴 حزب ناسیونالیست بزرگ ایران | NIGP
 ✪ @hezbnigp ✪
 `;


 // انتشار خبر در کانال اصلی
 async function publishNews(text) {

   const finalText =
       text +
           "\n\n" +
               CHANNEL_TAG;


                 await bot.sendMessage(
                     process.env.TARGET_CHANNEL,
                         finalText
                           );

                           }


                           module.exports = {
                             publishNews
                             };