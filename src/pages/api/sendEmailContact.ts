export const prerender = false;

import type { APIRoute } from 'astro';
import { Resend } from 'resend';

export const POST: APIRoute = async ({ request }) => {
  // Define form inputs here
  const formData = await request.formData();
  const firstname = formData.get('firstname');
  const lastname = formData.get('lastname');
  const email = formData.get('email');
  const phone = formData.get('phone');
  const message = formData.get('message');

  // Import Resend API key
  const resend = new Resend(import.meta.env.RESEND_API_KEY);

  // Email message to Resend
  try {
    await resend.emails.send({
      from: 'noreply@contact.cobaltweb.tech',
      to: 'info@cobaltweb.tech',
      subject: 'Contact Form Submission',
      html: `<p>Name: ${firstname} ${lastname}</p><p>Email: ${email}</p><p>Phone: ${phone}</p><p>Message: ${message}</p>`,
    });

    // Response messages
    return new Response(JSON.stringify({ 
      success: true 
    }), 
    {
      status: 200,
    });
  } catch (error) {
    console.error('Failed to send email:', error);
    return new Response(JSON.stringify({ 
      success: false, 
      error: 'Failed to send email' 
    }), 
    {
      status: 500,
    });
  }
};
