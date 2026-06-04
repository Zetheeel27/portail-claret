const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const fromNumber = process.env.TWILIO_FROM_NUMBER;

if (!accountSid || !authToken || !fromNumber) {
  console.warn('Warning: TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN or TWILIO_FROM_NUMBER not set. /send-sms will fail until configured.');
}

let client;
try {
  client = require('twilio')(accountSid, authToken);
} catch (e) {
  console.error('Twilio client init failed', e.message || e);
}

app.post('/send-sms', async (req, res) => {
  const { to, body } = req.body;
  if (!to || !body) return res.status(400).json({ error: 'Missing "to" or "body" in request' });

  if (!client) return res.status(500).json({ error: 'Twilio client not configured' });

  try {
    const message = await client.messages.create({ from: fromNumber, to, body });
    res.json({ status: 'ok', sid: message.sid });
  } catch (err) {
    console.error('Twilio error', err);
    res.status(500).json({ error: err.message || err });
  }
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Twilio proxy listening on ${port}`));
