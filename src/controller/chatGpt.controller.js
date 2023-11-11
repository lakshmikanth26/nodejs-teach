require('dotenv').config();
const OpenAI = require('openai');
const axios = require('axios');
const openAIEndpoint = process.env.openAIEndpoint;
const openAIKey = process.env.openAIKey;
const openai = new OpenAI({ apiKey: openAIKey });

const chatWithGPT = async (message) => {
    try {
        const completion = openai.chat.completions.create({
            prompt: message,
            // max_tokens: 60,
            temperature: 0.7,
            // messages: [{ role: 'user', content: message }],
            model: 'text-davinci-003',
            maxTokens: 2048
        });
        return completion;

    } catch (error) {
        console.error('Error:', error);
        return 'Error occurred in chat';
    }
};


async function chatRequest(req, res) {
    try {
    const prompt = req.body.prompt;
        chatWithGPT(prompt)
        .then(response => {
            res.json(response.data); 
        })
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