const { Rcon } = require('rcon-client');
const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const RCON_HOST = 'your-minecraft-server-ip'; // ใส่ IP เซิร์ฟเวอร์ Minecraft
const RCON_PORT = 25575; // ใส่ RCON Port
const RCON_PASSWORD = 'your-rcon-password'; // ใส่ RCON Password

async function sendCommandToServer(command) {
  const rcon = new Rcon({
    host: RCON_HOST,
    port: RCON_PORT,
    password: RCON_PASSWORD,
  });

  try {
    await rcon.connect();
    const response = await rcon.send(command);
    await rcon.end();
    return response;
  } catch (error) {
    console.error('RCON Error:', error);
    return 'Error connecting to server';
  }
}

app.post('/send-command', async (req, res) => {
  const { command } = req.body;
  if (!command) {
    return res.status(400).json({ error: 'Command is required' });
  }

  const response = await sendCommandToServer(command);
  res.json({ response });
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Backend server is running on http://localhost:${PORT}`);
});