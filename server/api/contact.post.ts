import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY!);

export default defineEventHandler(async (event) => {
  const body = await readBody(event);

  if (!body.name || !body.email || !body.subject || !body.message) {
    return { success: false, error: 'Missing required fields.' };
  }

  try {
    await resend.emails.send({
      from: process.env.RESEND_FROM!,
      to: process.env.CONTACT_EMAIL!,
      subject: body.subject,
      html: `
        <p><strong>Name:</strong> ${body.name}</p>
        <p><strong>Email:</strong> ${body.email}</p>
        <p><strong>Message:</strong><br>${body.message.replace(/\n/g, '<br>')}</p>
      `
    });
    return { success: true };
  } catch (error: any) {
    return { success: false, error: error.message || 'Failed to send email.' };
  }
});