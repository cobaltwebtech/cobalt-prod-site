export const prerender = false;

import type { APIRoute } from 'astro';
import { Resend } from 'resend';

const resend = new Resend(import.meta.env.RESEND_API_KEY);

export const POST: APIRoute = async ({ request }) => {
  try {
    const formData = await request.formData();
    const firstname = formData.get('firstname');
    const lastname = formData.get('lastname');
    const email = formData.get('email');
    const phone = formData.get('phone');
    const message = formData.get('message');

    const { data, error } = await resend.emails.send({
      from: 'noreply@contact.cobaltweb.tech',
      to: 'info@cobaltweb.tech',
      subject: 'Contact Form Submission',
      html: `<p>Name: ${firstname} ${lastname}</p><p>Email: ${email}</p><p>Phone: ${phone}</p><p>Message: ${message}</p>`,
    });

    if (error) {
      return new Response(JSON.stringify({ success: false, error: error.message }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    return new Response(JSON.stringify({ success: true, data }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    console.error('Failed to send email:', error);
    return new Response(JSON.stringify({ 
      success: false, 
      error: 'Failed to send email' 
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
};
