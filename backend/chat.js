import { OpenAI } from 'openai';
import dotenv from 'dotenv';

dotenv.config();
const max_tokens = 110

const openai = new OpenAI({
    apiKey: process.env.CHATGPT_API_KEY, 
});


export async function getChatResponse(personality , textPropm) {

    const promp = `Answer me as you are ${personality} , i want the answer in about 
    ${max_tokens/5 * 3} words or less. Promp : ${textPropm}` 

    const completion = await openai.chat.completions.create({
        messages: [{ role: "system", content: promp}],
        model: "gpt-3.5-turbo",
        max_tokens: max_tokens
    });
    
    console.log(completion.choices[0].message.content);
    return (completion.choices[0].message.content);

};
