require('dotenv').config();
const OpenAI = require('openai');
const axios = require('axios');
const openAIEndpoint = process.env.openAIEndpoint;
const openAIKey = process.env.openAIKey;
const openai = new OpenAI({ apiKey: openAIKey });

const chatWithGPT = async (message,res) => {
    try {
        // normal response
        // const completion = await openai.chat.completions.create({
        //     messages: [{ role: "system", content: "You are a helpful assistant." }],
        //     model: "gpt-3.5-turbo",
        // });
        
        // return completion.choices[0];
        // response send in stream
        const completion = await openai.beta.chat.completions.stream({
            messages: [{ role: "system", content: message }],
            model: "gpt-3.5-turbo-0301",
            stream: true,
        });

        res.writeHead(200, {
            'Content-Type': 'text/plain',
            'Transfer-Encoding': 'chunked',
        });
        for await (const chunk of completion) {
            res.write(JSON.stringify(chunk));
        }
        
        const chatCompletion = await completion.finalChatCompletion();
        res.end();
    } catch (error) {
        console.error('Error:', error);
        return 'Error occurred in chat';
    }
};


async function chatRequest(req, res) {
    try {
    const prompt = req.body.prompt;
        chatWithGPT(prompt,res)
        .catch(error => {
            console.error('Error:', error);
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'An error occurred while chatting.' });
    }
}

module.exports = {
    chatRequest
};