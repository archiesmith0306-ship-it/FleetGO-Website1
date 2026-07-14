// Vercel Serverless Function: receives a consultation lead from the website,
// notifies you on Telegram (one or more recipients), and appends it to a
// Google Sheet for a permanent, searchable record.
//
// Environment variables (Vercel → Settings → Environment Variables):
//   TELEGRAM_BOT_TOKEN  — bot token from @BotFather
//   TELEGRAM_CHAT_ID    — one chat id, or several separated by commas
//   GSHEET_WEBHOOK_URL  — (optional) Google Apps Script web-app URL that
//                         appends a row to the "FleetGO Marketing Leads" sheet
//
// Secrets live only on the server, never in the frontend bundle.

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
    const chatIds = (process.env.TELEGRAM_CHAT_ID || '')
      .split(',')
      .map((s) => s.trim())
      .filter(Boolean);

    const text =
      '🚚 New FleetGO Lead\n\n' +
      `Name: ${name}\n` +
      `Email: ${email}\n` +
      `Phone: ${phone || '—'}\n` +
      `Company: ${company || '—'}\n` +
      `Fleet size: ${fleetSize || '—'}\n\n` +
      `Message:\n${message}`;

    const jobs: Promise<any>[] = [];

    // Notify every configured Telegram recipient.
    if (token && chatIds.length) {
      for (const chatId of chatIds) {
        jobs.push(
          fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ chat_id: chatId, text, disable_web_page_preview: true }),
          }).catch(() => null)
        );
      }
    }

    // Append to the Google Sheet, if configured.
    if (process.env.GSHEET_WEBHOOK_URL) {
      jobs.push(
        fetch(process.env.GSHEET_WEBHOOK_URL, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            timestamp: new Date().toISOString(),
            name,
            email,
            phone,
            company,
            fleetSize,
            message,
          }),
        }).catch(() => null)
      );
    }

    if (!jobs.length) {
      res.status(500).json({ ok: false, error: 'Lead delivery is not configured yet.' });
      return;
    }

    await Promise.allSettled(jobs);
    res.status(200).json({ ok: true });
  } catch (err: any) {
    res.status(500).json({ ok: false, error: err?.message || 'Unexpected error' });
  }
}
