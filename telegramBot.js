require("dotenv").config();

const TelegramBot = require("node-telegram-bot-api");
const { publishNews } = require("./publishNews");

// ساخت ربات با polling (نسخه قدیمی)
const bot = new TelegramBot(process.env.BOT_TOKEN, {
  polling: true,
});

// ارسال خبر به گروه ادمین‌ها
async function sendNewsToAdmins(text) {
  const keyboard = {
    inline_keyboard: [
      [
        {
          text: "✅ تأیید انتشار",
          callback_data: "approve",
        },
        {
          text: "❌ رد خبر",
          callback_data: "reject",
        },
      ],
    ],
  };

  await bot.sendMessage(process.env.ADMIN_GROUP_ID, text, {
    message_thread_id: Number(process.env.NEWS_TOPIC_ID),
    reply_markup: keyboard,
  });
}

// مدیریت دکمه‌ها
bot.on("callback_query", async (query) => {
  const message = query.message;

  if (!message.text) {
    await bot.answerCallbackQuery(query.id);
    return;
  }

  // تایید انتشار
  if (query.data === "approve") {
    try {
      await publishNews(message.text);

      await bot.editMessageText(message.text + "\n\n✅ منتشر شد", {
        chat_id: message.chat.id,
        message_id: message.message_id,
        reply_markup: { inline_keyboard: [] },
      });
    } catch (error) {
      console.log("Publish error:", error);

      await bot.answerCallbackQuery(query.id, {
        text: "خطا در انتشار خبر",
      });

      return;
    }
  }

  // رد خبر
  if (query.data === "reject") {
    await bot.editMessageText(message.text + "\n\n❌ رد شد", {
      chat_id: message.chat.id,
      message_id: message.message_id,
      reply_markup: { inline_keyboard: [] },
    });
  }

  await bot.answerCallbackQuery(query.id);
});

module.exports = {
  bot,
  sendNewsToAdmins,
};
