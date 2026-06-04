Twilio SMS proxy (minimal)

This small Node.js service exposes a single endpoint `/send-sms` that forwards an SMS via Twilio. It's intended to be run locally or deployed (e.g. on a small VM or a serverless function).

Setup

1. Install dependencies:

```bash
npm install
```

2. Create a `.env` file with your Twilio credentials:

```
TWILIO_ACCOUNT_SID=ACxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
TWILIO_AUTH_TOKEN=your_auth_token
TWILIO_FROM_NUMBER=+1XXXXXXXXXX   # the Twilio phone number to send from
PORT=3000
```

3. Start the server:

```bash
npm start
```

4. Update the frontend if needed to POST to `http://localhost:3000/send-sms`.

API

POST /send-sms
Content-Type: application/json
Body: { "to": "+33xxxxxxxxx", "body": "Message text" }

Response: { status: 'ok', sid: 'SM...' } on success, or 4xx/5xx with `error` on failure.

Notes

- Keep your Twilio credentials secret; do NOT add them to the frontend.
- If you deploy publicly, secure the endpoint (API key, CORS restrictions, or serverless functions).
- Twilio costs per SMS; make sure you understand pricing and limits.
