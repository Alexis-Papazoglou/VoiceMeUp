import express from 'express';
import cors from 'cors';
import { getChatResponse } from './chat.js';
import { evenlyDestructureText } from './utils.js';
import { error } from 'console';
import dotenv from 'dotenv';
import Client from 'fakeyou.ts';

dotenv.config();

const app = express();
const port = process.env.PORT || 3001;

app.use(express.json());

app.use(cors());


app.get('/list', async (req, res) => {
  try {
    const data = await fetch('https://api.fakeyou.com/tts/list')
    const listData = await data.json()
    res.send(listData)
  } catch (error) {
    throw error
  }
});

app.post('/generate-tts', async (req, res) => {
  try {
    const model = req.body.model || 'Elon Musk (Version 3.0)';
    const text = await getChatResponse(req.body.model, req.body.text) || 'Tesla is the best';

    // Function to destructure text into smaller parts because FakeYou.js can't handle text over a certain length.
    const destructuredText = evenlyDestructureText(text, 25);

    console.log(destructuredText);

    // Generate TTS using function
    const audioBuffers = await useTTSFy(model, destructuredText);
    let responseBuffers = [];
    for (let i = 0; i < audioBuffers.length; i++) {
      console.log(audioBuffers[i].resourceUrl);
      responseBuffers[i] = (audioBuffers[i].resourceUrl);
    }

    let responseObj = {
      text: text,
      buffers: responseBuffers
    }

    res.setHeader('Content-Type', 'application/json');
    res.send(responseObj);

  } catch (error) {
    console.error('Error:', error);
    res.status(500).send('Internal Server Error');
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

async function useTTSFy(model, destructuredText) {
  const client = new Client({
    logging: true,
  });

  await client.login({
    username: process.env.FAKEYOU_USERNAME,
    password: process.env.FAKEYOU_PASSWORD,
  });

  try {
    const rModel = await client.fetchTtsModelByName(model);

    // Map each piece of destructured text to a promise
    const ttsPromises = destructuredText.map(text => rModel.infer(text));

    // Wait for all promises to resolve
    const audioBuffers = await Promise.all(ttsPromises);

    return audioBuffers;

  } catch (err) {
    console.error('Error:', err);
    return null; // You might want to handle errors more gracefully
  }
}

