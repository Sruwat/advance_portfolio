const CONTACT_TO_EMAIL = process.env.CONTACT_TO_EMAIL || 'shankranand332@gmail.com';
const CONTACT_FROM_EMAIL = process.env.CONTACT_FROM_EMAIL || 'Portfolio Contact <onboarding@resend.dev>';
const RESEND_API_KEY = process.env.RESEND_API_KEY;

function sanitize(value, maxLength = 2000) {
  return String(value || '')
    .replace(/[\u0000-\u001F\u007F]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
    .slice(0, maxLength);
}

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function parseBody(req) {
  if (!req.body) return {};
  if (typeof req.body === 'string') {
    try {
      return JSON.parse(req.body);
    } catch {
      return {};
    }
  }
  return req.body;
}

module.exports = async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const body = parseBody(req);
  const name = sanitize(body.name, 120);
  const email = sanitize(body.email, 180);
  const phone = sanitize(body.phone, 80) || 'Not provided';
  const company = sanitize(body.company, 180) || 'Not provided';
  const service = sanitize(body.service, 180) || 'Not specified';
  const message = sanitize(body.message, 4000);

  if (!name || !email || !message) {
    return res.status(400).json({ error: 'Name, email, and message are required.' });
  }

  if (!isValidEmail(email)) {
    return res.status(400).json({ error: 'Please enter a valid email address.' });
  }

  if (!RESEND_API_KEY) {
    return res.status(503).json({ error: 'Email service is not configured.' });
  }

  const submittedAt = new Date().toISOString();
  const html = `
    <h2>New Portfolio Inquiry</h2>
    <table cellpadding="8" cellspacing="0" border="0">
      <tr><td><strong>Name</strong></td><td>${name}</td></tr>
      <tr><td><strong>Email</strong></td><td>${email}</td></tr>
      <tr><td><strong>Phone</strong></td><td>${phone}</td></tr>
      <tr><td><strong>Company</strong></td><td>${company}</td></tr>
      <tr><td><strong>Service</strong></td><td>${service}</td></tr>
      <tr><td><strong>Submitted</strong></td><td>${submittedAt}</td></tr>
    </table>
    <hr />
    <p style="white-space: pre-line;">${message}</p>
  `;

  const text = [
    'New Portfolio Inquiry',
    '',
    `Name: ${name}`,
    `Email: ${email}`,
    `Phone: ${phone}`,
    `Company: ${company}`,
    `Service: ${service}`,
    `Submitted: ${submittedAt}`,
    '',
    message,
  ].join('\n');

  try {
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: CONTACT_FROM_EMAIL,
        to: CONTACT_TO_EMAIL,
        reply_to: email,
        subject: `New Portfolio Inquiry - ${service}`,
        html,
        text,
      }),
    });

    if (!response.ok) {
      return res.status(502).json({ error: 'Email provider rejected the message.' });
    }

    return res.status(200).json({ ok: true });
  } catch {
    return res.status(502).json({ error: 'Email service unavailable.' });
  }
};
