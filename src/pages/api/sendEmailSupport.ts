import type { APIRoute } from 'astro';
import { Resend } from 'resend';

export const prerender = false;

export const POST: APIRoute = async ({ request }) => {
  try {
    // Define form inputs here
    const formData = await request.formData();
    const supportType = formData.get('support-type') as string;
    const firstName = formData.get('first-name') as string;
    const lastName = formData.get('last-name') as string;
    const email = formData.get('email') as string;
    const phone = formData.get('phone') as string;
    const supportMessage = formData.get('support-message') as string;
  
    // Import Resend API key
    const resend = new Resend(import.meta.env.RESEND_API_KEY);

    // Email message to Resend
    await resend.emails.send({
      from: 'noreply@contact.cobaltweb.tech',
      to: 'info@cobaltweb.tech',
      subject: 'Support Form Submission',
      html: `<p>Support Type: ${supportType}</p><p>Name: ${firstName} ${lastName}</p><p>Email: ${email}</p><p>Phone: ${phone}</p><p>Message: ${supportMessage}</p>`,
    });

    // Response messages
    return new Response(JSON.stringify({ 
      success: true 
    }), 
    {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    console.error('Failed to send email:', error);
    return new Response(JSON.stringify({ 
      success: false, 
      error: 'Failed to send email' 
    }), 
    {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
};