import OpenAI from "openai";
import config from "config";

const CHATGPT_MODEL = "gpt-3.5-turbo";

const ROLES = {
  ASSISTANT: "assistant",
  SYSTEM: "system",
  USER: "user",
};

const openai = new OpenAI({ apiKey: config.get("OPENAI_KEY") });

const getMessage = (m) => {};
// Напиши на основе этих тезисов последовательную эмоциональную историю: ${m}

// Эти тезисы с описание ключевых моментов дня.
// Необходимо в итоге получить такую историю, чтобы я запомнил этот день и смог рассказать ее друзьям.
// Текст не должен быть больше 100 слов.
// Главное — чтобы были эмоции, правильная последовательность и учитывался контекст.

export async function chatGPT(message = "") {
  const messages = [
    {
      role: ROLES.SYSTEM,
      content:
        "Ты опытный копирайтер, который пишет краткие эмоциональные статьи для соц сетей.",
    },
    {
      role: ROLES.USER,
      content: getMessage(message),
    },
  ];
  try {
    const completion = await openai.chat.completions.create({
      messages,
      model: CHATGPT_MODEL,
    });
    return completion.choices[0].message;
  } catch (e) {
    console.error("Error while chat completion", e.message);
  }
}
