import nodemailer from 'nodemailer';
import Contact from '../models/Contact.js';

// ── Nodemailer transporter (Gmail SMTP) ─────────────────────
const createTransporter = () =>
  nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_APP_PASSWORD,
    },
  });

// ── Email HTML template ─────────────────────────────────────
const buildEmailHtml = ({ name, email, message }) => `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>New Portfolio Contact</title>
</head>
<body style="margin:0;padding:0;background:#06080f;font-family:'Inter',Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#06080f;padding:40px 0;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="background:#0d1220;border-radius:20px;overflow:hidden;border:1px solid rgba(255,255,255,0.07);">

          <!-- Header gradient bar -->
          <tr>
            <td style="background:linear-gradient(135deg,#6366f1,#8b5cf6);padding:4px 0;"></td>
          </tr>

          <!-- Header -->
          <tr>
            <td style="padding:32px 40px 24px;">
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td>
                    <div style="display:inline-block;background:linear-gradient(135deg,#6366f1,#8b5cf6);border-radius:12px;padding:10px 16px;margin-bottom:16px;">
                      <span style="color:#fff;font-weight:800;font-size:18px;letter-spacing:-0.5px;">GP</span>
                    </div>
                    <h1 style="margin:0;color:#e2e8f0;font-size:22px;font-weight:700;">
                      New Contact Message 📬
                    </h1>
                    <p style="margin:6px 0 0;color:#64748b;font-size:14px;">
                      Someone reached out via your portfolio website
                    </p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Divider -->
          <tr>
            <td style="padding:0 40px;">
              <div style="height:1px;background:rgba(255,255,255,0.07);"></div>
            </td>
          </tr>

          <!-- Sender info -->
          <tr>
            <td style="padding:28px 40px 0;">
              <table width="100%" cellpadding="0" cellspacing="0" style="background:rgba(99,102,241,0.07);border-radius:14px;border:1px solid rgba(99,102,241,0.2);padding:20px 24px;">
                <tr>
                  <td style="padding:8px 0;">
                    <span style="color:#6366f1;font-size:10px;font-weight:700;letter-spacing:2px;text-transform:uppercase;">Sender</span>
                    <p style="margin:4px 0 0;color:#e2e8f0;font-size:17px;font-weight:700;">${name}</p>
                  </td>
                </tr>
                <tr>
                  <td style="padding:8px 0 0;">
                    <span style="color:#6366f1;font-size:10px;font-weight:700;letter-spacing:2px;text-transform:uppercase;">Email</span>
                    <p style="margin:4px 0 0;">
                      <a href="mailto:${email}" style="color:#a78bfa;font-size:15px;font-weight:600;text-decoration:none;">${email}</a>
                    </p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Message body -->
          <tr>
            <td style="padding:24px 40px 0;">
              <span style="color:#94a3b8;font-size:10px;font-weight:700;letter-spacing:2px;text-transform:uppercase;">Message</span>
              <div style="margin-top:10px;background:rgba(255,255,255,0.03);border-left:3px solid #8b5cf6;border-radius:0 12px 12px 0;padding:18px 20px;">
                <p style="margin:0;color:#cbd5e1;font-size:15px;line-height:1.75;white-space:pre-wrap;">${message}</p>
              </div>
            </td>
          </tr>

          <!-- Reply CTA -->
          <tr>
            <td style="padding:28px 40px;">
              <a href="mailto:${email}?subject=Re: Your message on Ganesh's Portfolio"
                style="display:inline-block;background:linear-gradient(135deg,#6366f1,#8b5cf6);color:#fff;text-decoration:none;font-size:14px;font-weight:700;padding:14px 28px;border-radius:50px;letter-spacing:0.3px;">
                Reply to ${name} →
              </a>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background:rgba(255,255,255,0.02);padding:18px 40px;border-top:1px solid rgba(255,255,255,0.06);">
              <p style="margin:0;color:#475569;font-size:12px;text-align:center;">
                Sent from your <strong style="color:#6366f1;">Ganesh Patil Portfolio</strong> contact form
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
`;

// ── Submit Contact ──────────────────────────────────────────
export const submitContact = async (req, res) => {
  const { name, email, message } = req.body;

  try {
    if (!name || !email || !message) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    // 1. Save to database
    const contact = new Contact({ name, email, message });
    await contact.save();

    // 2. Send email notification (non-blocking — don't fail submission if email fails)
    try {
      const transporter = createTransporter();
      await transporter.sendMail({
        from: `"Ganesh Portfolio" <${process.env.EMAIL_USER}>`,
        to: process.env.EMAIL_TO,
        replyTo: email,
        subject: `📬 New message from ${name} — Portfolio Contact`,
        text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
        html: buildEmailHtml({ name, email, message }),
      });
      console.log(`✅ Email notification sent for message from ${name} <${email}>`);
    } catch (emailError) {
      // Email failure should NOT block the user's submission
      console.warn('⚠️  Email notification failed (message still saved):', emailError.message);
    }

    res.status(201).json({ message: "Message sent successfully! I'll get back to you soon." });
  } catch (error) {
    console.error('Contact submission error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// ── Get all contacts (admin) ────────────────────────────────
export const getContacts = async (req, res) => {
  try {
    const contacts = await Contact.find({}).sort({ createdAt: -1 });
    res.json(contacts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ── Delete a contact message (admin) ───────────────────────
export const deleteContact = async (req, res) => {
  try {
    const contact = await Contact.findById(req.params.id);
    if (contact) {
      await contact.deleteOne();
      res.json({ message: 'Message removed' });
    } else {
      res.status(404).json({ message: 'Message not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
