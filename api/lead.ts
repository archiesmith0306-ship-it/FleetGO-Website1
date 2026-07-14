// Vercel Serverless Function: receives a consultation lead from the website
// and delivers it to you instantly via a Telegram bot.
//
// Required environment variables (set these in Vercel → Settings → Environment Variables):
//   TELEGRAM_BOT_TOKEN  — the token from @BotFather (e.g. 123456:ABC-DEF...)
//   TELEGRAM_CHAT_ID    — your chat id (or group id) the bot should message
//
// The secrets live only on the server, never in the frontend bundle.

export const config = { runtime: 'nodejs' };

export default async function handler(req: any, res: any) {
  if (req.method !== 'POST') {
    res.status(405).json({ ok: false, error: 'Method not allowed' });
    return;
  }

  try {
    const body = typeof req.body === 'string' ? JSON.parse(req.body || '{}') : req.body || {};
    const name = (body.name || '').toString().trim();
    const email = (body.email || '').toString().trim();
    const phone = (body.phone || '').toString().trim();
    const company = (body.company || '').toString().trim();
    const fleetSize = (body.fleetSize || '').toString().trim();
    const message = (body.message || '').toString().trim();

    // Honeypot: bots fill hidden fields; humans leave them empty.
    if ((body.website || '').toString().trim() !== '') {
      res.status(200).json({ ok: true });
      return;
    }

    if (!name || !email || !message) {
      res.status(400).json({ ok: false, error: 'Please fill in name, email, and message.' });
      return;
    }

    const token = process.env.TELEGRAM_BOT_TOKEN;
    const chatId = process.env.TELEGRAM_CHAT_ID;
    if (!token || !chatId) {
      res.status(500).json({ ok: false, error: 'Lead delivery is not configured yet.' });
      return;
    }

    const text =
      '🚚 New FleetGO Lead\n\n' +
      `Name: ${name}\n` +
      `Email: ${email}\n` +
      `Phone: ${phone || '—'}\n` +
      `Company: ${company || '—'}\n` +
      `Fleet size: ${fleetSize || '—'}\n\n` +
      `Message:\n${message}`;

    const tg = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ chat_id: chatId, text, disable_web_page_preview: true }),
    });

    if (!tg.ok) {
      const detail = await tg.text().catch(() => '');
      res.status(502).json({ ok: false, error: 'Could not deliver the lead.', detail });
      return;
    }

    res.status(200).json({ ok: true });
  } catch (err: any) {
    res.status(500).json({ ok: false, error: err?.message || 'Unexpected error' });
  }
}
