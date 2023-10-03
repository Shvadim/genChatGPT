import { Telegraf } from 'telegraf';
import { message } from 'telegraf/filters';
import config from 'config';
import { Loader } from './loader';
import { chatGPT } from './chatgpt';

const bot = new Telegraf(config.get('TELEGRAM_TOKEN'), { handlerTimeout: Infinity})

bot.command('start', (ctx) => ctx.reply('Добро пожаловать. Отправьте текстовое сообщение с тезисами про историю'))

bot.on(message('text'), ctx => processGPTResponse)

async function processGPTResponse(ctx) {
    try {
        const text = ctc.message.text
        if(!text.trim()) ctx.reply('Текст не может быть пустым!')

        const Loader = new Loader(ctx)
        loader.show()
        const response = await chatGPT(text)

        if(!response) return ctx.reply(`Ошибка с API. ${response}`)

        const notionResp = await create(text, response.content)
        loader.hide()
        ctx.reply(`Ваша страница: ${notionResp.url}`)
    } catch (e) {
        console.log('Error while processing gpt response', e.message)
    }
}

bot.launch()

