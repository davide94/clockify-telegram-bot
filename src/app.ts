import TelegramBot = require('node-telegram-bot-api')

const token = process.env.TELEGRAM_API_TOKEN!
const bot = new TelegramBot(token)

export const handler = async (event: any) => {
  const body = JSON.parse(event.body!) as TelegramBot.Update
  bot.processUpdate(body)
  return { body: 'ok' }
}

bot.on('message', async msg => {
  const chatId = msg.chat.id
  await bot.sendMessage(chatId, 'Received your message')
})
