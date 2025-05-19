export const prerender = false;

import type { APIRoute } from "astro";
import { Resend } from "resend";

export const POST: APIRoute = async ({ request }) => {
  try {
    console.log("API route initiated");
    const formData = await request.json();
    console.log("Form data submitted:", formData);
    const {
      supporttype,
      firstname,
      lastname,
      email,
      phone,
      message,
      "cf-turnstile-response": turnstileResponse,
    } = formData;

    // Verify the Turnstile token server-side
    const verificationResponse = await fetch(
      "https://challenges.cloudflare.com/turnstile/v0/siteverify",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          secret: import.meta.env.TURNSTILE_SECRET_KEY,
          response: turnstileResponse,
        }),
      },
    );

    const verificationResult = await verificationResponse.json();

    if (!verificationResult.success) {
      console.log("Turnstile verification failed");
      return new Response(
        JSON.stringify({
          success: false,
          error: "CAPTCHA verification failed. Please try again.",
        }),
        {
          status: 400,
          headers: {
            "Content-Type": "application/json",
          },
        },
      );
    }

    // Import Resend API key
    const resend = new Resend(import.meta.env.RESEND_API_KEY);

    // Email message to Resend
    await resend.emails.send({
      from: "notifications@contact.cobaltweb.tech",
      to: "info@cobaltweb.tech",
      subject: `Support Request: ${supporttype}`,
      html: `<p>Support Type: ${supporttype}</p><p>Name: ${firstname} ${lastname}</p><p>Email: ${email}</p><p>Phone: ${phone}</p><p>Message: ${message}</p>`,
    });

    console.log("Email sent successfully");
    return new Response(
      JSON.stringify({
        success: true,
        redirectUrl: "/support/submission-received/",
      }),
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
        },
      },
    );
  } catch (error) {
    console.error("Failed to send email:", error);
    return new Response(
      JSON.stringify({
        success: false,
        error: "Failed to send email",
      }),
      {
        status: 500,
        headers: {
          "Content-Type": "application/json",
        },
      },
    );
  }
};
